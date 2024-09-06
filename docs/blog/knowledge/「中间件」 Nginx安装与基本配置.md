---
date: 2024-05-08 00:53:58
---

# 「中间件」 Nginx安装与基本配置

## 一、nginx介绍

Nginx是一款轻量级的web服务器、反向代理服务器及电子邮件（IMAP/POP3）代理服务器。

*什么是反向代理？*

反向代理（Reverse Proxy）方式是指以代理服务器来接受 Internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给Internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

nginx的其他二次开发版本：
1. Tengine：由淘宝网发起的Web服务器项目，它在nginx的基础之上，针对大访问量网站的需求，添加了很多高级功能和特性，Tegine的性能和稳定性已经在大型的网站例如淘宝、天猫等得到了很好的检验。
2. OpenResty：基于Nginx与Lua语言的高性能Web平台。

## 二、nginx 功能介绍

- 静态的web资源服务器html、图片、js、css、txt等静态资源。
    - 静态资源：客户端与服务器端看到的文件是一样的。**nginx是静态服务器**，它不是动态服务器
    - 动态资源：服务端将程序的请求执行完成了，客户端看到的是执行结果。动态服务器最典型的就是Tomcat，可以动态处理java。
- http/https协议的反向代理
- 结合FastCGI/uWSGI/SCGI等协议反向代理动态资源请求
- tcp/udp协议的请求转发（反向代理）
- lamp4/pop3协议的反向代理

### 2.1 基础特性

- 模块化设计，较好的扩展性
- 高可靠性
- 支持热部署：不停机更新配置文件，升级版本，更换日志文件
- 低内存消耗：10000个keep-alive连接模式下的非活动连接，仅需2.5M内存
- event-driven，aio，mmap，sendfile

### 2.2 web服务相关的功能

- 虚拟主机（server）
- 支持keep-alive 和管道连接（利用一个连接做多次请求）
- 访问日志（支持基于日志缓冲提高其性能）
- url rewrite
- 路径别名
- 基于IP及用户的访问控制
- 支持速率限制及并发数限制
- 重新配置和在线升级而无需中断客户的工作进程。

## 三、Nginx架构和进程

### 3.1 Nginx架构

![CleanShot 2024-05-05 at 23.53.09@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-05%20at%2023.53.09@2x.png)


### 3.2 nginx 进程结构

nginx是多进程组织模型，而且是一个由Master主进程和worker工作进程组成的。

![CleanShot 2024-05-05 at 23.57.14@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-05%20at%2023.57.14@2x.png)

### 3.3 Nginx模块介绍

nginx 有多种模块：
- 核心模块：是Nginx服务器正常运行下必不可少的模块，提供错误日志记录、配置文件解析、事件驱动机制、进程管理等核心功能。
- 标准HTTP模块：提供HTTP协议解析相关的功能，比如：端口配置、网页编码设置、HTTP响应头设置等。
- 可选HTTP模块：主要用于扩展标准的HTTP功能，让Nginx能处理一些特殊的服务，比如：Flash多媒体传输、解析GeoIP请求、网络传输压缩、安全协议SSL支持等。
- 邮件服务模块：主要用于支持Nginx的邮件服务，包括对POP3协议、IMAP协议和SMTP协议的支持。
- Stream服务模块：实现反向代理功能，包括TCP协议代理。
- 第三方模块：是为了扩展Nginx服务器应用，完成开发者自定义功能，比如：json支持、Lua支持等。

Nginx高度模块化，但其模块早期不支持DSO机制，1.9.11版本支持动态装载和卸载。

模块分类：

```
核心模块：core module
标准模块：
    HTTP 模块： ngx_http_*
             HTTP Core modules
             HTTP Optional modules
    Mail 模块： ngx_mail_*
    Stream 模块：ngx_stream_*
第三方模块
```


## 四、nginx安装

### 4.1 nginx版本和安装方式

nginx分为社区版和商业版，一般都是使用社区版

Nginx版本：
- `Mainline version`：主要开发版本，一般为奇数版本号，在生产环境中不要使用。
- `Stable version`：当前最新稳定版，一般为偶数版本号。
- `Legacy version`：旧的稳定版，一般为偶数版本号。

Nginx安装可以使用yum、apt的包安装方式或者源码安装，但是推荐使用源码编译安装的方式。原因是：
- yum/apt的系统仓库版本比较旧。
- 编译安装可以更方便自定义相关路径，使用源码编译可以自定义相关功能，更方便业务上的使用。
- docker容器可以直接运行。

### 4.2 包安装

[Ubuntu系统官方安装教程](https://nginx.org/en/linux_packages.html#Ubuntu)

### 4.3 源码编译安装

在[nginx官方网站下载](https://nginx.org/en/download.html)对应的版本安装包，当前下载的是 nginx-1.22.1 版本的。

下载完成后，将安装包进行解压

```bash
ubuntu@p0w1r:~$ tar -xzvf nginx-1.22.1.tar.gz 

ubuntu@p0w1r:~/下载$ cd nginx-1.22.1/
ubuntu@p0w1r:~/下载/nginx-1.22.1$ ls -al
总计 832
drwxr-xr-x 8 ubuntu ubuntu   4096 10月 19  2022 .
drwxr-xr-x 3 ubuntu ubuntu   4096  5月  6 10:29 ..
drwxr-xr-x 6 ubuntu ubuntu   4096  5月  6 10:29 auto
-rw-r--r-- 1 ubuntu ubuntu 317399 10月 19  2022 CHANGES
-rw-r--r-- 1 ubuntu ubuntu 485035 10月 19  2022 CHANGES.ru
drwxr-xr-x 2 ubuntu ubuntu   4096  5月  6 10:29 conf
-rwxr-xr-x 1 ubuntu ubuntu   2590 10月 19  2022 configure
drwxr-xr-x 4 ubuntu ubuntu   4096  5月  6 10:29 contrib
drwxr-xr-x 2 ubuntu ubuntu   4096  5月  6 10:29 html
-rw-r--r-- 1 ubuntu ubuntu   1397 10月 19  2022 LICENSE
drwxr-xr-x 2 ubuntu ubuntu   4096  5月  6 10:29 man
-rw-r--r-- 1 ubuntu ubuntu     49 10月 19  2022 README
drwxr-xr-x 9 ubuntu ubuntu   4096  5月  6 10:29 src
```

安装依赖包

```bash
ubuntu@p0w1r:~/下载/nginx-1.22.1$ sudo apt update && sudo apt -y install gcc make libpcre3 libpcre3-dev openssl libssl-dev zlib1g-dev
```

创建nginx的用户和组，后续使用该用户来运行nginx

```bash
sudo useradd -s /sbin/nologin nginx
```

然后接下来进行编译安装，执行如下命令：

```bash
sudo mkdir -p /apps/nginx

sudo ./configure --prefix=/apps/nginx \
> --user=nginx \
> --group=nginx \
> --with-http_ssl_module \            # 支持ssl
> --with-http_v2_module \             # 支持http v2 模块
> --with-http_realip_module \         # 支持realip模块
> --with-http_stub_status_module \    # 支持状态页面
> --with-http_gzip_static_module \    # 支持解压缩模块 
> --with-pcre \
> --with-stream \
> --with-stream_ssl_module \
> --with-stream_realip_module

sudo make && sudo make install 

sudo chown -R nginx.nginx /apps/nginx
```

nginx安装完成后，会有4个主要的目录：

```bash
ubuntu@p0w1r:/apps$ ll /apps/nginx/
总计 24
drwxr-xr-x 6 nginx nginx 4096  5月  6 11:00 ./
drwxr-xr-x 3 root  root  4096  5月  6 10:51 ../
drwxr-xr-x 2 nginx nginx 4096  5月  6 11:00 conf/
drwxr-xr-x 2 nginx nginx 4096  5月  6 11:00 html/
drwxr-xr-x 2 nginx nginx 4096  5月  6 11:00 logs/
drwxr-xr-x 2 nginx nginx 4096  5月  6 11:00 sbin/
```

以下是对这4个主要目录介绍：
1. `conf`：保存nginx所有的配置文件，其中`nginx.conf`是nginx服务器的最核心最主要的配置文件，其他的`.conf`则是用来配置nginx的相关功能的，例如fastcgi功能使用的是`fastcgi.conf`和`fastcgi_params`这两个文件，配置文件一般都有一个样板配置文件，是以`.default`后缀结尾的，使用时可以将它复制并将`.default`后缀去掉。
2. `html`：该目录中保存了nginx服务器的web文件，但是可以更改为其他目录来保存web文件，另外还有一个 50x 的web文件是默认的错误页面提示。
3. `logs`：用来保存nginx服务器的访问日志、错误日志等，logs 目录可以放在其他路径下，例如`/var/logs/nginx`中。
5. `sbin`：保存nginx二进制启动脚本，可以接受不同的参数以实现不同的功能。

接下来为了启动该更加方便，会创建一个nginx 的 service 文件，文件内容如下：

```bash
sudo vim /lib/systemd/system/nginx.service
# 文件内容如下：
[Unit]
Description=nginx - high performance web server
Documentation=http://nginx.org/en/docs
After=network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
# 指定pid文件的目录，默认是在logs目录下，可选配置项
PIDFile=/apps/nginx/run/nginx.pid
ExecStart=/apps/nginx/sbin/nginx -c /apps/nginx/conf/nginx.conf    # 定义了nginx的启动路径和配置文件路径
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target
```

创建pid文件存放的目录：

```bash
sudo mkdir /apps/nginx/run/
```

由于安装目录是在`/apps/nginx/`下，所以当前使用`nginx`命令会出现没有该服务的信息，需要将其添加到环境变量文件中，添加全局环境变量需要在`/etc/profiles`目录下添加以下内容：

```bash
export PATH="/apps/nginx/sbin:$PATH"
```

添加完成后重启或者重新登录即可。

修改nginx配置文件`sudo vim /apps/nginx/conf/nginx.conf`

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240506111505.png)


接下来就可以验证nginx的自启动文件了。

```bash
ubuntu@p0w1r:/apps$ sudo systemctl daemon-reload 

ubuntu@p0w1r:/apps$ sudo systemctl enable --now nginx

ubuntu@p0w1r:/apps$ sudo systemctl status nginx.service 
● nginx.service - nginx - high performance web server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2024-05-06 11:18:31 CST; 57s ago
       Docs: http://nginx.org/en/docs
   Main PID: 22681 (nginx)
      Tasks: 2 (limit: 38469)
     Memory: 1.8M
        CPU: 13ms
     CGroup: /system.slice/nginx.service
             ├─22681 "nginx: master process /apps/nginx/sbin/nginx -c /apps/nginx/conf/nginx.conf"
             └─22682 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""

5月 06 11:18:31 p0w1r systemd[1]: Starting nginx - high performance web server...
5月 06 11:18:31 p0w1r systemd[1]: Started nginx - high performance web server.
```


这是一个nginx的自动部署安装的脚本：

```bash
#! /bin/bash

NGINX_VERSION=1.22.1                         						# 定义nginx的编译版本
NGINX_FILE=nginx-${NGINX_VERSION}.tar.gz   # nginx 的安装包文件名 
NGINX_URL=http://nginx.org/download/           # nginx 的官方下载地址
NGINX_INSTALL_DIR=/apps/nginx							# nginx的安装目录
SRC_DIR=/usr/local/src												#  
CPUS=`lscpu | awk '/^CPU\ (s\) /{print $2}'`

. /etc/os-release

color () {
		RES_COL=60
		MOVE_TO_COL="echo -en \\033 [${RES_COL}G"
		SETCOLOR_SUCCESS="echo -en \\033 [1;32m"
		SETCOLOR_FAILURE="echo -en \\033 [1;31m"
		SETCOLOR_WARNING="echo -en \\033 [1;33m"
		SETCOLOR_NORMAL="echo -en \E[0m"
		echo -n "$1" && $MOVE_TO_COL
		echo -n "["
		if [ $2 = "success" -o $2 = "0" ]  ; then
				${SETCOLOR_SUCCESS}
				echo -n $" OK "
			elif [ $2 = "failure" -o $2 = "1" ]; then
					$ {SETCOLOR_FAILURE}
					echo -n $" FAILED "
			else
					${SETCOLOR_WARNING}
					echo -n $" WARNING"
			fi
			${SETCOLOR_NORMAL}
			echo -n "]"
			echo 
}

check () {
			[ 	-e ${NGINX_INSTALL_DIR} ] && { color "nginx 已经安装过了，请卸载后重新再安装" 1; exit; }
			cd ${SRC_DIR}
			if [ -e ${NGINX_FILE} ${TAR} ] ; then
					color "相关文件已经准备好" 0
			else
					color ' 开始下载 nginx 源码包' 0
					wget ${NGINX_URL} ${NGINX_FILE} ${TAR}
					[ $? -ne 0 ] && { color "下载 ${NGINX_FILE} ${TAR} 文件失败" 1; exit; }
			fi
}

install () {
			color "开始安装nginx" 0
			if id nginx &> /dev/null; then
					color "nginx 用户已经存在" 1
			else 
					useradd -s /sbin/nologin -r nginx
					color "创建 nginx 用户" 0
			fi
			color "开始安装nginx依赖包" 0
			if [ $ID == "centos" ] ; then 
					if [[ $VERSION_ID =~ ^7 ]]; then
							yum -y install gcc make pcre-devel openssl-devel zlib-devel perl-ExUtils-Embed
					elif [[ $VERSION_ID = ~ ^8 ]]; then
							yum -y install make gcc-c++ libtool pcre pcre-devel zlib zlib-devel openssl openssl-devel perl-ExUtils-Embed
					else
							color '不支持此系统' 1
							exit
					fi
			elif [ $ID == 'rocky' ];then
					yum -y install gcc make gcc-c++ libtool pcre pcre-devel zlib zlib-devel openssl openssl-devel perl-ExUtils-Embed
			else
					apt update
					apt -y install gcc make libpcre3 libpcre3-dev openssl libssl-dev zlib1g-dev
			fi
			[ $? -ne 0 ] && { color "安装依赖包失败" 1; exit; }
			cd $SRC_DIR
			tar xf ${NGINX_FILE}
			./configure --prefix=${NGINX_INSTALL_DIR} --user=nginx --group=nginx --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_stub_status_module --with-http_gzip_static_module --with-pcre --with-stream --with-stream_ssl_module --with-stream_realip_module
			make -j $CPUS && make install
			[ $? -eq 0 ] && color "nginx 编译安装完成" 0 || { color "nginx 编译安装失败，退出！" 1 ; exit; }
			chown -R nginx.nginx ${NGINX_INSTALL_DIR}
			ln -s ${NGINX_INSTALL_DIR}/sbin/nginx /usr/local/sbin/nginx
			echo "PATH=${NGINX_INSTALL_DIR}/sbin:${PATH}" > /etc/profile.d/nginx.sh
			cat > /lib/systemd/system/nginx.service <<EOF
[Unit]
Description=nginx - high performance web server
Documentation=http://nginx.org/en/docs
After=network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/apps/nginx/run/nginx.pid
ExecStart=/apps/nginx/sbin/nginx -c /apps/nginx/conf/nginx.conf    # 定义了nginx的启动路径和配置文件路径
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target
EOF
			systemctl daemon-reload
			systemctl enable --now nginx &> /dev/null
			systemctl is-active nginx &> /dev/null || { color "nginx 启动失败，退出！"  1 ; exit; }
			color "nginx 安装完成" 0
}

check 


install

```

安装完成后，可以查看nginx的目录结构，如下所示：

```bash
ubuntu@p0w1r:/apps$ sudo tree /apps/nginx/
/apps/nginx/
├── client_body_temp
├── conf
│   ├── fastcgi.conf
│   ├── fastcgi.conf.default
│   ├── fastcgi_params
│   ├── fastcgi_params.default
│   ├── koi-utf
│   ├── koi-win
│   ├── mime.types
│   ├── mime.types.default
│   ├── nginx.conf
│   ├── nginx.conf.default
│   ├── scgi_params
│   ├── scgi_params.default
│   ├── uwsgi_params
│   ├── uwsgi_params.default
│   └── win-utf
├── fastcgi_temp
├── html
│   ├── 50x.html
│   └── index.html
├── logs
│   ├── access.log
│   └── error.log
├── proxy_temp
├── run
│   └── nginx.pid
├── sbin
│   └── nginx
├── scgi_temp
└── uwsgi_temp
```

查看 nginx 的工作进程（nginx的进程有2种，分为 master 进程和 worker 进程）

```bash
ubuntu@p0w1r:/apps$ ps aux | grep nginx
root       22681  0.0  0.0  10168  1568 ?        Ss   11:18   0:00 nginx: master process /apps/nginx/sbin/nginx -c /apps/nginx/conf/nginx.conf
nginx      22682  0.0  0.0  10904  3744 ?        S    11:18   0:00 nginx: worker process
ubuntu     23766  0.0  0.0  12192  2560 pts/1    S+   13:30   0:00 grep --color=auto nginx
```

注意，nginx的主进程是root身份运行的，nginx用户仅仅是用来启动worker进程的。

> 原因是因为，nginx的master进程对外监听80端口，收到用户请求之后再交给worker进程进行处理，然而80端口是一个特权端口（特权端口只有root身份才有权限使用，普通用户没有权限监听1023以内的端口），所以master进程是以root身份运行的。


## 五、nginx命令常见用法

nginx的命令行参数有如下这些：

```bash
nginx version: nginx/1.22.1
Usage: nginx [-?hvVtTq] [-s signal] [-p prefix]
             [-e filename] [-c filename] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /apps/nginx/)        # 设置nginx的默认目录，当前默认的就是我们编译的目录
  -e filename   : set error log file (default: logs/error.log)      # 指定错误日志的路径，当前就是/apps/nginx/logs/error.log
  -c filename   : set configuration file (default: conf/nginx.conf) # 指定配置文件路径，当前就是/apps/nginx/conf/nginx.conf
  -g directives : set global directives out of configuration file   # 指定除了配置文件以外的配置文件的路径
```

### 5.1 nginx 的启动与关闭

使用system管理方式的来对nginx服务的启动与关闭：

```bash
sudo systemctl start nginx.service
sudo systemctl stop nginx.service
sudo systemctl restart nginx.service
```

使用源码包中`sbin`目录下的可执行文件：

```bash
/app/nginx/sbin/nginx
/apps/nginx/sbin/nginx -s stop   # 不管有没有用户在连接，立即停止服务。
/apps/nginx/sbin/nginx -s quit   # 如果有用户连接，需要等待用户退出之后再停止服务
```

### 5.2 查看版本及配置信息

查看nginx 的版本和配置信息，使用参数`-v`、`-V`

查看简要的版本信息：

```bash
ubuntu@p0w1r:~$ nginx -v
nginx version: nginx/1.22.1
```

查看版本信息和配置信息（编译安装时添加的配置信息）：

```bash
ubuntu@p0w1r:~$ nginx -V
nginx version: nginx/1.22.1
built by gcc 11.4.0 (Ubuntu 11.4.0-1ubuntu1~22.04) 
built with OpenSSL 3.0.2 15 Mar 2022
TLS SNI support enabled
configure arguments: --prefix=/apps/nginx --user=nginx --group=nginx --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_stub_status_module --with-http_gzip_static_module --with-pcre --with-stream --with-stream_ssl_module --with-stream_realip_module
```


### 5.3 检查配置文件

nginx中修改了配置文件之后，需要对配置文件是否配置正确进行检查，则使用参数`-t`

```bash
ubuntu@p0w1r:~$ sudo nginx -t
nginx: the configuration file /apps/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /apps/nginx/conf/nginx.conf test is successful
```

改完配置文件，记得进行配置检查。

还有一个参数`-T`，该参数会对配置进行检查，并且将配置打印，看到的并不是生效的配置文件的内容，而是磁盘上的配置内容，生效的配置文件内容还需要加载到内存里面。

```bash
ubuntu@p0w1r:~$ sudo nginx -T
nginx: the configuration file /apps/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /apps/nginx/conf/nginx.conf test is successful
# configuration file /apps/nginx/conf/nginx.conf:

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

pid        /apps/nginx/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

# configuration file /apps/nginx/conf/mime.types:

types {
    text/html                                        html htm shtml;
    text/css                                         css;
    text/xml                                         xml;
    image/gif                                        gif;
    image/jpeg                                       jpeg jpg;
    application/javascript                           js;
    application/atom+xml                             atom;
    application/rss+xml                              rss;

    text/mathml                                      mml;
    text/plain                                       txt;
    text/vnd.sun.j2me.app-descriptor                 jad;
    text/vnd.wap.wml                                 wml;
    text/x-component                                 htc;

    image/avif                                       avif;
    image/png                                        png;
    image/svg+xml                                    svg svgz;
    image/tiff                                       tif tiff;
    image/vnd.wap.wbmp                               wbmp;
    image/webp                                       webp;
    image/x-icon                                     ico;
    image/x-jng                                      jng;
    image/x-ms-bmp                                   bmp;

    font/woff                                        woff;
    font/woff2                                       woff2;

    application/java-archive                         jar war ear;
    application/json                                 json;
    application/mac-binhex40                         hqx;
    application/msword                               doc;
    application/pdf                                  pdf;
    application/postscript                           ps eps ai;
    application/rtf                                  rtf;
    application/vnd.apple.mpegurl                    m3u8;
    application/vnd.google-earth.kml+xml             kml;
    application/vnd.google-earth.kmz                 kmz;
    application/vnd.ms-excel                         xls;
    application/vnd.ms-fontobject                    eot;
    application/vnd.ms-powerpoint                    ppt;
    application/vnd.oasis.opendocument.graphics      odg;
    application/vnd.oasis.opendocument.presentation  odp;
    application/vnd.oasis.opendocument.spreadsheet   ods;
    application/vnd.oasis.opendocument.text          odt;
    application/vnd.openxmlformats-officedocument.presentationml.presentation
                                                     pptx;
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                                                     xlsx;
    application/vnd.openxmlformats-officedocument.wordprocessingml.document
                                                     docx;
    application/vnd.wap.wmlc                         wmlc;
    application/wasm                                 wasm;
    application/x-7z-compressed                      7z;
    application/x-cocoa                              cco;
    application/x-java-archive-diff                  jardiff;
    application/x-java-jnlp-file                     jnlp;
    application/x-makeself                           run;
    application/x-perl                               pl pm;
    application/x-pilot                              prc pdb;
    application/x-rar-compressed                     rar;
    application/x-redhat-package-manager             rpm;
    application/x-sea                                sea;
    application/x-shockwave-flash                    swf;
    application/x-stuffit                            sit;
    application/x-tcl                                tcl tk;
    application/x-x509-ca-cert                       der pem crt;
    application/x-xpinstall                          xpi;
    application/xhtml+xml                            xhtml;
    application/xspf+xml                             xspf;
    application/zip                                  zip;

    application/octet-stream                         bin exe dll;
    application/octet-stream                         deb;
    application/octet-stream                         dmg;
    application/octet-stream                         iso img;
    application/octet-stream                         msi msp msm;

    audio/midi                                       mid midi kar;
    audio/mpeg                                       mp3;
    audio/ogg                                        ogg;
    audio/x-m4a                                      m4a;
    audio/x-realaudio                                ra;

    video/3gpp                                       3gpp 3gp;
    video/mp2t                                       ts;
    video/mp4                                        mp4;
    video/mpeg                                       mpeg mpg;
    video/quicktime                                  mov;
    video/webm                                       webm;
    video/x-flv                                      flv;
    video/x-m4v                                      m4v;
    video/x-mng                                      mng;
    video/x-ms-asf                                   asx asf;
    video/x-ms-wmv                                   wmv;
    video/x-msvideo                                  avi;
}
```

