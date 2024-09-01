---
date: 2024-07-13 12:00:00
---

# Ubuntu24.04部署LNMP


系统信息：

```bash
ubuntu@sec:~$ cat /etc/issue
Ubuntu 24.04 LTS \n \l
```

1. 系统安装完成后，首先先安装 `vim`

```bash
sudo apt-get install vim
```

2. 修改阿里云镜像源

```bash
sudo vim /etc/apt/source.list

# 添加以下内容：
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
```

3. 更新apt源

```bash
sudo apt-get update
sudo apt-get upgrade
```


### 安装mysql 5.7

1. 将下载好的mysql安装包上传到需要安装的服务器的`/opt/mysql5.7`目录下。

```bash
ubuntu@sec:~$ cd /opt/mysql5.7/
ubuntu@sec:/opt/mysql5.7$ ls
mysql-server_5.7.36-1ubuntu18.04_amd64.deb-bundle.tar
```

2. 解压安装包并进行安装

```bash
ubuntu@sec:/opt/mysql5.7$ sudo tar xvf mysql-server_5.7.36-1ubuntu18.04_amd64.deb-bundle.tar

ubuntu@sec:/opt/mysql5.7$ ls
libmysqlclient20_5.7.36-1ubuntu18.04_amd64.deb
libmysqlclient-dev_5.7.36-1ubuntu18.04_amd64.deb
libmysqld-dev_5.7.36-1ubuntu18.04_amd64.deb
mysql-client_5.7.36-1ubuntu18.04_amd64.deb
mysql-common_5.7.36-1ubuntu18.04_amd64.deb
mysql-community-client_5.7.36-1ubuntu18.04_amd64.deb
mysql-community-server_5.7.36-1ubuntu18.04_amd64.deb
mysql-community-source_5.7.36-1ubuntu18.04_amd64.deb
mysql-community-test_5.7.36-1ubuntu18.04_amd64.deb
mysql-server_5.7.36-1ubuntu18.04_amd64.deb
mysql-testsuite_5.7.36-1ubuntu18.04_amd64.deb

# 接下来是安装：
ubuntu@sec:/opt/mysql5.7$ sudo apt-get install ./libmysql*
ubuntu@sec:/opt/mysql5.7$ sudo apt-get install libtinfo5
ubuntu@sec:/opt/mysql5.7$ sudo apt-get install ./mysql-community-client_5.7.36-1ubuntu18.04_amd64.deb
ubuntu@sec:/opt/mysql5.7$ sudo apt-get install ./mysql-client_5.7.36-1ubuntu18.04_amd64.deb
# 注意一下，安装这个包的时候会让你设置mysql的root用户密码，界面和下面的图一样
ubuntu@sec:/opt/mysql5.7$ sudo apt-get install ./mysql-community-server_5.7.36-1ubuntu18.04_amd64.deb

ubuntu@sec:/opt/mysql5.7$ sudo apt-get install ./mysql-server_5.7.36-1ubuntu18.04_amd64.deb
```

![CleanShot 2024-07-13 at 00.13.50@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2000.13.50@2x.png)

到此，mysql 5.7的安装就完成了，接下来的步骤就是检测是否安装成功，以及是否能够正常登录mysql。

```bash
ubuntu@sec:/opt/mysql5.7$ systemctl status mysql
```

正常运行：

![CleanShot 2024-07-13 at 00.18.21@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2000.18.21@2x.png)

尝试登录mysql，检查密码是否设置正确、版本是否正确

```bash
ubuntu@sec:/opt/mysql5.7$ mysql -u root -p
```

![CleanShot 2024-07-13 at 00.19.00@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2000.19.00@2x.png)

补充说明：mysql的配置文件所在的目录是 `/etc/mysql/mysql.conf.d/mysqld.cnf`

![CleanShot 2024-07-13 at 00.20.33@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2000.20.33@2x.png)

### 安装Nginx

这里使用编译安装的方式，安装后的目录是在 `/usr/local/nginx`

1. 首先安装依赖

```bash
ubuntu@sec:/opt/mysql5.7$ sudo apt-get install g++ openssl libssl-dev libpcre3 libpcre3-dev zlib1g-dev libgd-dev make
```

2. 下载nginx 1.24.0的包（或者上传到服务器）

```bash
ubuntu@sec:/opt/nginx-install-page$ sudo wget https://nginx.org/download/nginx-1.24.0.tar.gz

ubuntu@sec:/opt/nginx-install-page$ ls -al
总计 1096
drwxr-xr-x 2 root root    4096  7月 13 00:35 .
drwxr-xr-x 4 root root    4096  7月 13 00:35 ..
-rw-r--r-- 1 root root 1112471  4月 12  2023 nginx-1.24.0.tar.gz
```

3. 解压nginx包

```bash
ubuntu@sec:/opt/nginx-install-page$ sudo tar xvf nginx-1.24.0.tar.gz
ubuntu@sec:/opt/nginx-install-page$ cd nginx-1.24.0/

ubuntu@sec:/opt/nginx-install-page/nginx-1.24.0$ ls -al
总计 844
drwxr-xr-x 8 1001 1001   4096  4月 11  2023 .
drwxr-xr-x 3 root root   4096  7月 13 00:37 ..
drwxr-xr-x 6 1001 1001   4096  7月 13 00:37 auto
-rw-r--r-- 1 1001 1001 323312  4月 11  2023 CHANGES
-rw-r--r-- 1 1001 1001 494234  4月 11  2023 CHANGES.ru
drwxr-xr-x 2 1001 1001   4096  7月 13 00:37 conf
-rwxr-xr-x 1 1001 1001   2611  4月 11  2023 configure
drwxr-xr-x 4 1001 1001   4096  7月 13 00:37 contrib
drwxr-xr-x 2 1001 1001   4096  7月 13 00:37 html
-rw-r--r-- 1 1001 1001   1397  4月 11  2023 LICENSE
drwxr-xr-x 2 1001 1001   4096  7月 13 00:37 man
-rw-r--r-- 1 1001 1001     49  4月 11  2023 README
drwxr-xr-x 9 1001 1001   4096  7月 13 00:37 src
```

4. 编译安装

```bash
ubuntu@sec:/opt/nginx-install-page/nginx-1.24.0$ sudo ./configure --prefix=/usr/local/nginx \
> --with-pcre \
> --with-http_ssl_module \
> --with-http_v2_module \
> --with-http_realip_module \
> --with-http_addition_module \
> --with-http_sub_module \
> --with-http_dav_module \
> --with-http_flv_module \
> --with-http_mp4_module \
> --with-http_gunzip_module \
> --with-http_gzip_static_module \
> --with-http_random_index_module \
> --with-http_secure_link_module \
> --with-http_stub_status_module \
> --with-http_auth_request_module \
> --with-http_image_filter_module \
> --with-http_slice_module \
> --with-mail \
> --with-threads \
> --with-file-aio \
> --with-stream \
> --with-mail_ssl_module \
> --with-stream_ssl_module
```

![CleanShot 2024-07-13 at 00.43.59@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2000.43.59@2x.png)

```bash
ubuntu@sec:/opt/nginx-install-page/nginx-1.24.0$ sudo make

ubuntu@sec:/opt/nginx-install-page/nginx-1.24.0$ sudo make install
```

到此，nginx安装成功了，接下来就进入安装目录，启动nginx，并检查下版本是否是我们安装的

```bash
ubuntu@sec:/usr/local/nginx/sbin$ cd /usr/local/nginx/sbin/
ubuntu@sec:/usr/local/nginx/sbin$ ls
nginx

# 启动nginx
ubuntu@sec:/usr/local/nginx/sbin$ ./nginx
# 检查版本
ubuntu@sec:/usr/local/nginx/sbin$ ./nginx -v
nginx version: nginx/1.24.0
```

该目录下的文件：

```bash
ubuntu@sec:/usr/local/nginx$ ls -al
总计 44
drwxr-xr-x 11 root   root 4096  7月 13 00:48 .
drwxr-xr-x 11 root   root 4096  7月 13 00:48 ..
drwx------  2 nobody root 4096  7月 13 00:48 client_body_temp
drwxr-xr-x  2 root   root 4096  7月 13 00:48 conf
drwx------  2 nobody root 4096  7月 13 00:48 fastcgi_temp
drwxr-xr-x  2 root   root 4096  7月 13 00:48 html
drwxr-xr-x  2 root   root 4096  7月 13 00:48 logs
drwx------  2 nobody root 4096  7月 13 00:48 proxy_temp
drwxr-xr-x  2 root   root 4096  7月 13 00:48 sbin
drwx------  2 nobody root 4096  7月 13 00:48 scgi_temp
drwx------  2 nobody root 4096  7月 13 00:48 uwsgi_temp
```

使用浏览器访问本地页面看到如下页面则说明正常：

![CleanShot 2024-07-13 at 00.55.55@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2000.55.55@2x.png)

为了方便，使用 `systemctl` 来管理nginx服务的启动、停止。

```bash
# 创建文件nginx.service，然后添加以下内容
ubuntu@sec:/usr/local/nginx/conf$ sudo vim /lib/systemd/system/nginx.service

[Unit]
Description=The Nginx Http and reverse proxy server
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PIDFile=/usr/local/nginx/logs/nginx.pid
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

重新加载 `systemd` 配置

```bash
ubuntu@sec:/usr/local/nginx/conf$ sudo systemctl daemon-reload
```

尝试启动nginx，这里因为上面已经启动了nginx，如果再次启动会出现报错，所以要先停止掉原来的进程。

报错信息：

![CleanShot 2024-07-13 at 01.07.07@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2001.07.07@2x.png)

处理：

```bash
ubuntu@sec:/usr/local/nginx/logs$ ps aux | grep nginx
root       10949  0.0  0.0  22792  2100 ?        Ss   00:48   0:00 nginx: master process ./nginx
nobody     10950  0.0  0.0  23724  5556 ?        S    00:48   0:00 nginx: worker process
ubuntu     11255  0.0  0.0   9304  2304 pts/1    S+   01:03   0:00 grep --color=auto nginx
ubuntu@sec:/usr/local/nginx/logs$ sudo kill -9 10949 10950
ubuntu@sec:/usr/local/nginx/logs$ sudo vim /usr/local/nginx/conf/nginx.conf
ubuntu@sec:/usr/local/nginx/logs$ sudo systemctl start nginx
```

正常界面如下所示：

![CleanShot 2024-07-13 at 01.06.10@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2001.06.10@2x.png)

### 安装 PHP 8.3

1. 安装依赖

```bash
ubuntu@sec:/opt/lib$ sudo apt install -y build-essential autoconf bison re2c libxml2-dev libsqlite3-dev libssl-dev libcurl4-openssl-dev libjpeg-dev libpng-dev libwebp-dev  libonig-dev libzip-dev libsodium-dev libmhash-dev libreadline-dev libxslt-dev pkg-config libfcgi-dev libgmp-dev libmcrypt-dev libldap2-dev libsystemd-dev
```

2. 下载php8.3源码包或者上传到服务器

```bash
ubuntu@sec:/opt/php8.3_install_page$ sudo wget https://www.php.net/distributions/php-8.3.0.tar.gz

ubuntu@sec:/opt/php8.3_install_page$ ls -al
总计 19264
drwxr-xr-x 2 root root     4096  7月 13 01:30 .
drwxr-xr-x 6 root root     4096  7月 13 01:30 ..
-rw-r--r-- 1 root root 19717561  2月  8 01:29 php-8.3.0.tar.gz
```

3. 解压缩源码包

```bash
ubuntu@sec:/opt/php8.3_install_page$ sudo tar -xvf php-8.3.0.tar.gz

ubuntu@sec:/opt/php8.3_install_page$ cd php-8.3.0/
```

4. 进行编译

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo ./configure --prefix=/usr/local/php --with-fpm-user=www --with-fpm-group=www --with-config-file-path=/usr/local/php/etc --enable-mysqlnd --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --with-freetype --with-zlib --with-libxml --enable-xml --disable-rpath --enable-bcmath --with-curl --enable-mbregex --enable-fpm --enable-mbstring --enable-gd --with-openssl --with-mhash --enable-pcntl --enable-sockets --with-zip --enable-intl --enable-soap --with-jpeg --with-webp --with-sodium --enable-ftp --with-fpm-systemd --with-pear --enable-embed --disable-phpdbg
```

出现图中界面则表示编译成功了：

![CleanShot 2024-07-13 at 01.37.47@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2001.37.47@2x.png)

6. 接下来继续安装

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo make 
```

![CleanShot 2024-07-13 at 05.46.20@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2005.46.20@2x.png)

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo make install
```

出现如图界面则表示安装成功：

![CleanShot 2024-07-13 at 06.48.52@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2006.48.52@2x.png)

确认一下安装的PHP版本是否正确：

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ /usr/local/php/bin/php -v
```

![CleanShot 2024-07-13 at 07.05.52@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2007.05.52@2x.png)

7. 接下来配置PHP-FPM，复制默认的PHP-FPM配置文件

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo cp sapi/fpm/php-fpm.conf /usr/local/php/etc/php-fpm.conf
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo cp sapi/fpm/www.conf /usr/local/php/etc/php-fpm.d/www.conf
```

检查 `www.conf` 文件中的用户和组是否为 `www`，也可以换成其他用户名，只要是定义好用来启动php的用户即可。

![CleanShot 2024-07-13 at 06.52.08@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2006.52.08@2x.png)

复制默认的 PHP 配置文件

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo cp php.ini-development /usr/local/php/etc/php.ini
```

8. 创建 `systemd` 服务文件

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo vim /lib/systemd/system/php-fpm.service

# 写入以下内容：
[Unit]
Description=The PHP FastCGI Process Manager
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/php/sbin/php-fpm --nodaemonize --fpm-config /usr/local/php/etc/php-fpm.conf
ExecReload=/bin/kill -USR2 $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

9. 重新加载 `Systemd` 配置并启动PHP-FPM

```bash
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo systemctl daemon-reload
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo systemctl start php-fpm.service
ubuntu@sec:/opt/php8.3_install_page/php-8.3.0$ sudo systemctl status php-fpm.service
```

如图所示表示启动成功

![CleanShot 2024-07-13 at 07.04.05@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2007.04.05@2x.png)

尝试打印查看 `phpinfo` 信息，如下界面所示，`phpinfo`信息显示正确

![CleanShot 2024-07-13 at 07.13.15@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-07-13%20at%2007.13.15@2x.png)



