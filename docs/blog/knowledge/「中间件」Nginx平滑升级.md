---
date: 2024-05-06 19:07:32
---

# 「中间件」Nginx平滑升级

Nginx 平滑升级一共可以分为4个阶段；
- 只有旧的 nginx 的 master 进程和 worker 进程
- 旧版和新版 nginx 的 master 和 worker 进程并存，由旧版 nginx 接收处理用户的新请求；
- 旧版和新版 nginx 的 master 和 worker 进程并存，由新版 nginx 接受处理用户的新请求（如果还有用户连接老的进程，那旧的worker进程会处理完之后再退出），在此阶段，如果新版本worker进程在处理用户请求时出现问题，就可以在这个阶段进行回滚。
- 只有新版本的 nginx 的 master 和 worker 进程。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506145714.png)

升级过程如下：
1. 编译新版本，生成新版本的二进制文件；
2. 用新Nginx程序文件替换旧的Nginx二进制文件（注意先备份旧的二进制文件）
3. 向旧版本的 master 进程发送 USR2 信号启动新nginx进程；
    - master 进程修改 pid 文件名加上后缀`.oldbin`，成为`nginx.pid.oldbin`
    - 将新生成的master进程的PID存放到新生成的pid文件`nginx.pid`
    - master 进程用新 Nginx 二进制文件启动新 master 进程及 worker 子进程成为旧 master 的子进程。
    - 系统中将有新旧2个 nginx 主进程和对应的 worker 子进程并存。
    - 当前新的请求任然由旧的 nginx 的 worker 进程处理。
4. 向旧的Nginx服务进程发送`WINCH`信号，使旧的Nginx worker进程平滑停止，旧的 Nginx worker 进程将不再接收新的请求。
    - 当前新的请求由新的Nginx的worker进程进行处理。
    - 旧的 Nginx master 进程仍然存在
    - 测试访问确认新版本是否正常工作。
5. 如果发现升级正常，向旧的 master 进程发送`QUIT`信号，关闭旧的 master，并删除 `nginx.pid.oldbin`文件，到此旧版本的nginx彻底下线，新版本正式上线。
6. 如果发现升级存在问题，可以进行版本回滚：向旧的 master 发送`HUP`，旧版本的 worker 开始接收新请求，向新 master 发送`QUIT`.

为了演示平滑升级过程中，不会对用户的使用造成影响，首先需要生成一个大文件，然后持续进行下载，生成大文件命令：

```bash
sudo dd if=/dev/zero of=/apps/nginx/html/test.img bs=1M count=10

# 命令解释：
dd       # 用于在Unix和类Unix系统中转换和复制文件的命令行工具，常用于处理磁盘映像或制作备份。
if       # 指定输入文件
of=      # 指定输出文件
bs=1M    # 指定块大小，该命令中每个块为1M，dd会以每次1MB的数据块进行读写操作
count=10 # 指定块的数量，此命令中，dd会复制10个块，每个块是1M，则总共复制10MB的数据
```

```bash
ubuntu@p0w1r:~$ sudo dd if=/dev/zero of=/apps/nginx/html/test.img bs=1M count=10
[sudo] ubuntu 的密码： 
记录了10+0 的读入
记录了10+0 的写出
10485760字节（10 MB，10 MiB）已复制，0.0128037 s，819 MB/s

ubuntu@p0w1r:~$ ll /apps/nginx/html/test.img 
-rw-r--r-- 1 root root 10485760  5月  6 15:07 /apps/nginx/html/test.img
```

接下来，会使用`wget`来模拟用户下载生成的该文件，但是10M下载其实很快，所以需要对下载的速度进行控制，所以就需要使用`--limit-rate`参数

```bash
wget --limit-rate=1K http://x.x.x.x/test.img
```

下载nginx新版本的源码包，当前最新的版本是1.26.0，使用如下命令进行下载：

```bash
wget https://nginx.org/download/nginx-1.26.0.tar.gz
```

将源码包解压到`/usr/local/src`目录下

```bash
tar xf nginx-1.26.0.tar.gz -C /usr/local/src
```

```bash
ubuntu@p0w1r:~$ sudo tar xf nginx-1.26.0.tar.gz -C /usr/local/src/
[sudo] ubuntu 的密码： 

ubuntu@p0w1r:~$ cd /usr/local/src/
ubuntu@p0w1r:/usr/local/src$ ll
总计 16
drwxr-xr-x  4 root   root   4096  5月  6 15:50 ./
drwxr-xr-x 10 root   root   4096  8月  8  2023 ../
drwxr-xr-x  9 ubuntu ubuntu 4096  5月  6 10:53 nginx-1.22.1/
drwxr-xr-x  8    502 staff  4096  4月 23 22:58 nginx-1.26.0/
```

接下来，进入到源码包的目录下，开始进行相关配置和编译的步骤，注意配置`./configure`相关的参数时，先查看下已经安装的旧的版本安装时的参数，保持一致，或者进行添加，使用命令`nginx -V`可以进行查看。

```bash
ubuntu@p0w1r:/usr/local/src$ cd nginx-1.26.0/

ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ ls
auto  CHANGES  CHANGES.ru  conf  configure  contrib  html  LICENSE  man  README  src

ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo nginx  -V
nginx version: nginx/1.22.1
built by gcc 11.4.0 (Ubuntu 11.4.0-1ubuntu1~22.04) 
built with OpenSSL 3.0.2 15 Mar 2022
TLS SNI support enabled
configure arguments: --prefix=/apps/nginx --user=nginx --group=nginx --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_stub_status_module --with-http_gzip_static_module --with-pcre --with-stream --with-stream_ssl_module --with-stream_realip_module
]
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo ./configure --prefix=/apps/nginx --user=nginx --group=nginx --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_stub_status_module --with-http_gzip_static_module --with-pcre --with-stream --with-stream_ssl_module --with-stream_realip_module
```

接下来开始编译，新版本的编译只需要执行`make`，不要执行`make install`！！！

```bash
sudo make 
```

此时当前目录下就会多出一个`obj`的目录，该目录下的可执行文件`nginx`就是新版本的

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ objs/nginx -v
nginx version: nginx/1.26.0
```

接下来把之前的旧版本的nginx命令进行备份

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo cp /apps/nginx/sbin/nginx /opt/nginx.old
```

然后把新版本的nginx命令复制过去覆盖旧版本的可执行文件，这里需要注意要加`-f`参数强制覆盖，否则会提示`Text file busy`

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo cp -f ./objs/nginx /apps/nginx/sbin/
```

到目前为止，虽然新版本已经覆盖了老版本，但是只是在硬盘中，而内存中的还是旧版本的进程。需要将新版本的nginx进程拉起，使得新版本和旧版本共存。

为了启动的时候避免出现错误，首先检测一下新版本和配置文件语法兼容性。

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo /apps/nginx/sbin/nginx -t
nginx: the configuration file /apps/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /apps/nginx/conf/nginx.conf test is successful
```

此时开始进入第2阶段：
接下来发送信号USR2 平滑升级可执行程序，将存储有旧版本主进程PID的文件重命名为`nginx.pid.oldbin`，并启动新的nginx；
此时，2个master的进程都在运行，只是旧的master 不在监听，由新的 master 来监听80端口。
此时，nginx开启一个新的master 进程，且这个新的master 进程会生成新的worker进程，即升级后的nginx进程，此时老的进程不会自动退出，新的请求还是旧的进程来处理（旧版本的worker进程还在的）。

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo kill -USR2 `cat /apps/nginx/run/nginx.pid`

# 参数解读
kill       # 发送信号
USR2       # 专门用来平滑升级的参数
```

此时的`/apps/nginx/run`目录下会发生变化，多了一个`nginx.pid.oldbin`文件

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ ll /apps/nginx/run/
总计 16
drwxr-xr-x  2 root  root  4096  5月  6 16:26 ./
drwxr-xr-x 12 nginx nginx 4096  5月  6 11:16 ../
-rw-r--r--  1 root  root     5  5月  6 16:26 nginx.pid
-rw-r--r--  1 root  root     5  5月  6 14:07 nginx.pid.oldbin
```

此时还可以看到，由2个master，新的master是旧的master的子进程，并生成新版本的worker进程。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506163114.png)

现在开始进入第3阶段：
先关闭旧版本nginx的worker进程，而不关闭旧版本的master进程，方便如果出现问题及时回滚。
向旧版本的Nginx主进程发送`WINCH`信号，它会平滑关闭旧版本的 worker 进程（master进程不退出），这时，所有新的请求都会由新版本的Nginx来进行处理。

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo kill -WINCH `cat /apps/nginx/run/nginx.pid.oldbin`

# 参数解读：
WINCH     # 优雅的关闭worker进程
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506163757.png)

此时再查看进程信息，可以看到新版本的master进程已经开始工作了，老版本的虽然存在，但是已经是处于`shutting down`的状态了。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506164501.png)

当前新版本已经开始工作了，接下来就可以开始测试新版本是否工作正常，测试页面等显示是否正常。

如果经过一段时间的测试，新版本的服务没有问题，最后就可以发送`QUIT`信号，退出老的 master 进程，完成全部的升级过程。

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo kill -QUIT `cat /apps/nginx/run/nginx.pid.oldbin`
```

最终，查看版本信息可以看到，已经是新版本了。

```bash
ubuntu@p0w1r:/usr/local/src/nginx-1.26.0$ sudo nginx -v
nginx version: nginx/1.26.0
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506165050.png)

并且，之前的请求测试（下载test.img）还是没有出现中断，等到该用户退出（下载完成）老的master进程就彻底退出了。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506165127.png)


![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506165313.png)


![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506165406.png)

到此，整个平滑升级的过程结束了。
