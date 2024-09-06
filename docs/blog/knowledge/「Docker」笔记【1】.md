---
date : 2024-05-03 00:50:00
---

# 「Docker」笔记【1】

## 一、Docker概述
### 1.1 Docker 和传统虚拟机的区别

虚拟机是一个主机虚拟出多个主机，需要先拥有独立的系统，传统虚拟机，利用 hypervisor，模拟出独立的硬件和系统，在此之上创建应用。*docker是在主机系统中建立多个应用及配套环境，把应用及配套环境独立打包成一个单位，是进程级的隔离。*

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240429150713.png)

**应用更快速的交付和部署**
- 传统：一堆帮助文档、安装程序
- Docker：打包镜像发布测试，一键运行；
  **更便捷的升级和扩缩容**：使用了Docker之后，部署应用就和搭积木一样；
  **更简单的系统运维**：在容器化之后，开发、测试环境都是高度一致的；
  **更高效的计算资源利用**：Docker是内核级别的虚拟化，可以在一个物理机上运行很多的容器实例；

### 1.2 Docker架构

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240429150944.png)

镜像（image）：Docker镜像就好比一个模板，可以通过这个模板来创建容器服务，且镜像可以i创建多个容器（最终服务运行或者项目运行就是在容器中的）；
容器（container）：Docker利用容器技术，独立运行一个或者一个组应用，容器时通过镜像来创建的。可以把容器简单的理解为一个简易的Linux系统；
仓库（repository）：仓库就是存放镜像的地方，可以分为公有仓库和私有仓库；

配置阿里云镜像加速
```bash
sudo mkdir -p /etc/docker
sudo vim /etc/docker/daemon.json
{
	"registry-mirrors":["https://xxx.mirror.aliyuns.com]
}
systemctl daemon-reload
systemctl restart docker 
```

### 1.3 底层原理

Docker是怎么工作的？
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240429161828.png)

```
Docker是一个Client-Server结构的系统，Docker的守护进程运行在主机上，通过Socket从客户端访问；
Docker-Server收到Docker-Client的指令，就会执行这个命令
```

Docker为什么比虚拟机快？

```
1. Docker有着比虚拟机更少的抽象层；
2. Docker利用的是宿主机的内核，而虚拟机需要Guest OS；
所以说，新建一个容器的时候，Docker不需要像虚拟机一样重新加载一个操作系统内核，避免引导，虚拟机是加载Guest OS，分钟级别的，而Docker是利用宿主机的操作系统，省略了虚拟机的哪些复杂的过程；
```

## 二、Docker常用命令

### 2.1 帮助命令

```bash
docker version    # 显示docker的版本信息
docker info       # 显示docker的系统信息，包括镜像和容器的信息；
docker 命令 --help # 帮助命令
```

[官方帮助文档地址](https://docs.docker.com/)
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240429162525.png)


### 2.2 镜像常用命令

#### `docker images` 查看镜像

`docker images`：查看所有本地的主机上的镜像

```bash
ubuntu@ubuntu:~$ sudo docker images
REPOSITORY                   TAG       IMAGE ID       CREATED         SIZE
affectionate_mclean/ubuntu   18.04     189ac15bc1c3   7 hours ago     63.2MB
ubuntu                       18.04     f9a80a55f492   11 months ago   63.2MB

# 解释
REPOSITORY：镜像的仓库源
TAG：       镜像的标签
IMAGE ID：  镜像的ID
CREATED：   镜像的创建时间
SIZE：      镜像的大小
```

```bash
ubuntu@ubuntu:~$ sudo docker images --help

Usage:  docker images [OPTIONS] [REPOSITORY[:TAG]]

List images

Aliases:
  docker image ls, docker image list, docker images

Options:
  -a, --all             Show all images (default hides intermediate images)
      --digests         Show digests
  -f, --filter filter   Filter output based on conditions provided
      --format string   Format output using a custom template:
                        'table':            Print output in table format with column headers (default)
                        'table TEMPLATE':   Print output in table format using the given Go template
                        'json':             Print in JSON format
                        'TEMPLATE':         Print output using the given Go template.
                        Refer to https://docs.docker.com/go/formatting/ for more information about formatting
                        output with templates
      --no-trunc        Don't truncate output
  -q, --quiet           Only show image IDs

# 常用可选项的解释：
-a， --all     # 列出所有的镜像；
-q， --quiet   # 只显示镜像的ID；
```


#### `docker search` 搜索镜像

`docker search`：搜索镜像

```bash
ubuntu@ubuntu:~$ sudo docker search mysql
NAME                            DESCRIPTION                                      STARS     OFFICIAL   AUTOMATED
mysql                           MySQL is a widely used, open-source relation…   15008     [OK]
mariadb                         MariaDB Server is a high performing open sou…   5722      [OK]
percona                         Percona Server is a fork of the MySQL relati…   627       [OK]
phpmyadmin                      phpMyAdmin - A web interface for MySQL and M…   966       [OK]
circleci/mysql                  MySQL is a widely used, open-source relation…   29
bitnami/mysql                   Bitnami container image for MySQL                110                  [OK]
bitnami/mysqld-exporter         Bitnami container image for MySQL Server Exp…   7
```


```bash
ubuntu@ubuntu:~$ sudo docker search --help

Usage:  docker search [OPTIONS] TERM

Search Docker Hub for images

Options:
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print search using a Go template
      --limit int       Max number of search results
      --no-trunc        Don't truncate output

# 可选参数解释：
--filter              # 通过参数进行过滤，例如：
--filter=STARS=3000   # 搜索出来的镜像就是starts大于3000的；
```

#### `docker pull` 下载镜像

`docker pull`：下载镜像；

```bash
docker pull 镜像名:[:tag(版本，默认最新版本)]
```

```bash
# 命令等价于：docker pull mysql == docker pull docker.io/library/mysql:latest
ubuntu@ubuntu:~$ sudo docker pull mysql  
Using default tag: latest               # 如果不写tag，默认就是 latest
latest: Pulling from library/mysql
bd37f6d99203: Pull complete             # 分层下载，docker image的核心，联合文件系统
e733cb057651: Pull complete
af2fd35011dc: Pull complete
e5233d0f6ee3: Pull complete
cf11fd8658d3: Pull complete
85344d57c3cb: Pull complete
0eebca71f40d: Pull complete
18e468a1ddac: Pull complete
d9b2b8d35c75: Pull complete
57ba1b7684b4: Pull complete
Digest: sha256:9de9d54fecee6253130e65154b930978b1fcc336bcc86dfd06e89b72a2588ebe    # 签名信息
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest            # 真实信息
```

指定版本下载

```bash
ubuntu@ubuntu:~$ sudo docker pull mysql:5.7
5.7: Pulling from library/mysql
20e4dcae4c69: Pull complete     # 这里如果显示的是 Already exists，则说明之前已经存在了，只需要下载没有的层
1c56c3d4ce74: Pull complete
e9f03a1c24ce: Pull complete
68c3898c2015: Pull complete
6b95a940e7b6: Pull complete
90986bb8de6e: Pull complete
ae71319cb779: Pull complete
ffc89e9dfd88: Pull complete
43d05e938198: Pull complete
064b2d298fba: Pull complete
df9a4d85569b: Pull complete
Digest: sha256:4bc6bc963e6d8443453676cae56536f4b8156d78bae03c0145cbe47c2aad73bb
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7

ubuntu@ubuntu:~$ sudo docker images
REPOSITORY                   TAG       IMAGE ID       CREATED         SIZE
mysql                        latest    6f343283ab56   4 weeks ago     632MB
mysql                        5.7       5107333e08a8   4 months ago    501MB
```

```bash
ubuntu@ubuntu:~$ sudo docker pull --help

Usage:  docker pull [OPTIONS] NAME[:TAG|@DIGEST]

Download an image from a registry

Aliases:
  docker image pull, docker pull

Options:
  -a, --all-tags                Download all tagged images in the repository
      --disable-content-trust   Skip image verification (default true)
      --platform string         Set platform if server is multi-platform capable
  -q, --quiet                   Suppress verbose output
```

#### `docker rmi` 删除镜像

删除指定的镜像
```bash
ubuntu@ubuntu:~$ sudo docker rmi -f 容器ID
```

删除多个镜像
```bash
ubuntu@ubuntu:~$ sudo docker rmi -f 容器ID1 容器id2
```

删除全部镜像
```bash
ubuntu@ubuntu:~$ sudo docker rmi -f $(sudo docker images -aq)
```

### 2.3 容器命令

> 说明：有了镜像才可以创建容器，接下来下载centos镜像作为测试;

```bash
docker pull centos:7.4
```

```bash
ubuntu@ubuntu:~$ sudo docker pull centos
Using default tag: latest
latest: Pulling from library/centos
a1d0c7532777: Pull complete
Digest: sha256:a27fd8080b517143cbbbab9dfb7c8571c40d67d534bbdee55bd6c473f432b177
Status: Downloaded newer image for centos:latest
docker.io/library/centos:latest

**ubuntu@ubuntu:~$ sudo docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
centos       latest    5d0da3dc9764   2 years ago   231MB
```

#### `docker run` 启动容器

```bash
docker run [可选参数] imageID

# 参数说明
--name="name"    容器名字，例如：tomcat01，tomcat02，用于区分容器
-d               后台方式运行，例如nohup
-it              使用交互方式运行，进入容器查看内容；
-p               指定容器的端口，例如：-p 8080:8080
-P(大写)          随机指定端口
--rm             用完之后就删除，一般用于测试，例如 docker run -it --rm tomcat:9.0
```


启动并进入容器：
```bash
ubuntu@ubuntu:~$ sudo docker run -it centos /bin/bash
[root@58da19cd4748 /]#
```

列出所有运行的容器：`docker ps`
- `docker ps`：列出所有正在运行的容器；
- `docker ps -a`：列出所有正在运行的容器和历史运行过的容器；
- `docker ps -n=?`，例如`docker ps -n=1`：显示最近创建的容器
- `docker ps -q`：只显示容器的编号

```bash
ubuntu@ubuntu:~$ sudo docker ps          # 列出所有正在运行的容器
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

ubuntu@ubuntu:~$ sudo docker ps -a      # 列出所有正在运行的容器+历史运行过的容器
CONTAINER ID   IMAGE          COMMAND       CREATED         STATUS                     PORTS     NAMES
58da19cd4748   centos         "/bin/bash"   7 minutes ago   Exited (0) 9 seconds ago             happy_cartwright
a215d85c51be   f9a80a55f492   "/bin/bash"   24 hours ago    Exited (0) 16 hours ago              affectionate_mclean

ubuntu@ubuntu:~$ sudo docker ps -n=1   # 显示最近创建的容器，n=1则显示1个
CONTAINER ID   IMAGE     COMMAND       CREATED         STATUS                      PORTS     NAMES
58da19cd4748   centos    "/bin/bash"   7 minutes ago   Exited (0) 18 seconds ago   
 
ubuntu@ubuntu:~$ sudo docker ps -aq    # 列出所有正在运行、历史运行过的容器，且只显示容器的ID；
58da19cd4748
a215d85c51be
```

#### 退出容器

直接停止容器并退出：`exit`；
`ctrl + P + Q`：容器不停止运行退出；

```bash
ubuntu@ubuntu:~$ sudo docker run -it centos /bin/bash   # 启动容器，并使用交互式终端

[root@00f2372e8279 /]#         # 进入容器后此时按下ctrl + P + Q，不停止容器退出到宿主机

ubuntu@ubuntu:~$ sudo docker ps    # 此时再次查看运行中的容器，发现前面的容器并没有停止运行
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
00f2372e8279   centos    "/bin/bash"   12 seconds ago   Up 10 seconds             strange_cray
```

#### 删除容器

1. 删除指定的容器（不能删除正在运行的容器，如果要强制删除，则需要使用`rm -f`：`docker rm 容器ID`
2. 删除所有的容器：`docker rm -f $(docker ps -aq)`

```bash
ubuntu@ubuntu:~$ sudo docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED          STATUS                     PORTS     NAMES
00f2372e8279   centos         "/bin/bash"   3 minutes ago    Exited (0) 8 seconds ago             strange_cray
58da19cd4748   centos         "/bin/bash"   13 minutes ago   Exited (0) 6 minutes ago             happy_cartwright
a215d85c51be   f9a80a55f492   "/bin/bash"   24 hours ago     Exited (0) 16 hours ago              affectionate_mclean

ubuntu@ubuntu:~$ sudo docker rm -f $(sudo docker ps -aq)
00f2372e8279
58da19cd4748
a215d85c51be

ubuntu@ubuntu:~$ sudo docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

#### 启动和停止容器

```bash
docker stop 容器di          # 停止当前正在运行的容器
docker kill 容器id          # 强制停止当前容器
docker start 容器id         # 启动容器
docker restart 容器id       # 重启容器
```

### 2.4 常用其他命令

#### 后台启动容器

`docker run -d 镜像名称`：后台启动容器

```bash
ubuntu@ubuntu:~$ sudo docker run -d centos
b0bf302e8d4456295c5a9d3f59c571d9672985529ecd185633a422456b47c53c

ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

问题：使用后台启动容器后，使用命令`docker ps`查看发现容器停止了，这是一个常见的坑，容器使用后台运行，就必须要有一个前台进程（即没有提供服务），docker发现没有应用，那么就会自动停止。

#### 查看日志

查看日志信息：`docker logs`

```bash
ubuntu@ubuntu:~$ sudo docker logs --help

Usage:  docker logs [OPTIONS] CONTAINER

Fetch the logs of a container

Aliases:
  docker container logs, docker logs

Options:
      --details        Show extra details provided to logs
  -f, --follow         Follow log output
      --since string   Show logs since timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42 minutes)
  -n, --tail string    Number of lines to show from the end of the logs (default "all")
  -t, --timestamps     Show timestamps
      --until string   Show logs before a timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42
                       minutes)
```

```bash
# 启动容器后，编写一段脚本，该脚本在容器中运行，每个一秒钟输出"takuya"
ubuntu@ubuntu:~$ sudo docker run -d  centos /bin/bash -c "while true; do echo takuya;sleep 1;done"
d56471b6c4f3c732ee5ca25dd9f93b85a785bf50ddb20bb5e02006295ad031f2

# 查看当前容器的日志信息
ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED              STATUS              PORTS     NAMES
d56471b6c4f3   centos    "/bin/bash -c 'while…"   About a minute ago   Up About a minute             relaxed_feistel

# 查看当前容器的日志信息，-tf：显示日志，--tail：要显示的日志条目数
ubuntu@ubuntu:~$ sudo docker logs -tf --tail 10 d56471b6c4f3   
2024-04-30T01:25:54.954449120Z takuya
2024-04-30T01:25:55.959407770Z takuya
2024-04-30T01:25:56.964569716Z takuya
2024-04-30T01:25:57.969604912Z takuya
2024-04-30T01:25:58.973439636Z takuya
2024-04-30T01:25:59.977627827Z takuya
2024-04-30T01:26:00.981731644Z takuya
......
```

#### 查看容器中的进程信息

查看容器中的进程信息：`docker top 容器id`

```bash
ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS         PORTS     NAMES
d56471b6c4f3   centos    "/bin/bash -c 'while…"   5 minutes ago   Up 5 minutes             relaxed_feistel

ubuntu@ubuntu:~$ sudo docker top d56471b6c4f3
UID                 PID                 PPID                C                   STIME               TTY
TIME                CMD
root                6132                6101                0                   09:23               ?
00:00:00            /bin/bash -c while true; do echo takuya;sleep 1;done
root                6735                6132                0                   09:28               ?
00:00:00            /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sleep 1
```

#### 查看容器的元数据

`docker inspect 容器id`：查看容器的元信息

```bash
ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS         PORTS     NAMES
d56471b6c4f3   centos    "/bin/bash -c 'while…"   7 minutes ago   Up 7 minutes             relaxed_feistel

ubuntu@ubuntu:~$ sudo docker inspect d56471b6c4f3
[
    {
        "Id": "d56471b6c4f3c732ee5ca25dd9f93b85a785bf50ddb20bb5e02006295ad031f2",   # 容器的ID
        "Created": "2024-04-30T01:23:15.511376226Z",   # 容器创建的时间
        "Path": "/bin/bash",      # 默认的环境变量
        "Args": [                 # 传递的参数
            "-c",
            "while true; do echo takuya;sleep 1;done"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 6132,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-04-30T01:23:16.242510681Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6",
        "ResolvConfPath": "/var/lib/docker/containers/d56471b6c4f3c732ee5ca25dd9f93b85a785bf50ddb20bb5e02006295ad031f2/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/d56471b6c4f3c732ee5ca25dd9f93b85a785bf50ddb20bb5e02006295ad031f2/hostname",
        "HostsPath": "/var/lib/docker/containers/d56471b6c4f3c732ee5ca25dd9f93b85a785bf50ddb20bb5e02006295ad031f2/hosts",
        "LogPath": "/var/lib/docker/containers/d56471b6c4f3c732ee5ca25dd9f93b85a785bf50ddb20bb5e02006295ad031f2/d56471b6c4f3c732ee5ca25dd9f93b85a785bf50ddb20bb5e02006295ad031f2-json.log",
        "Name": "/relaxed_feistel",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "docker-default",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                23,
                120
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/15f2e95ac3eb0408069f4e18483640df4cb87088d38d2d5bc1a10b922fac79d4-init/diff:/var/lib/docker/overlay2/fd77fab390014fdc51701265dd36cb7d6e0ebc0cfd58f50a7cc9d6658ece770c/diff",
                "MergedDir": "/var/lib/docker/overlay2/15f2e95ac3eb0408069f4e18483640df4cb87088d38d2d5bc1a10b922fac79d4/merged",
                "UpperDir": "/var/lib/docker/overlay2/15f2e95ac3eb0408069f4e18483640df4cb87088d38d2d5bc1a10b922fac79d4/diff",
                "WorkDir": "/var/lib/docker/overlay2/15f2e95ac3eb0408069f4e18483640df4cb87088d38d2d5bc1a10b922fac79d4/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "d56471b6c4f3",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/bash",
                "-c",
                "while true; do echo takuya;sleep 1;done"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20210915",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "fe11984d1e9ab2939720da3594ccb47003d9e44d8b43f21856e5afdb1ad1cd09",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/fe11984d1e9a",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "f5363a6a8500e34f07d76000d18cb9a1db290e3a804604f8dcf502657f8426f2",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "525bfe1cc9bf236cf248bae43ff8cfc50385bc4a4752a26ac51e7617d8f14a92",
                    "EndpointID": "f5363a6a8500e34f07d76000d18cb9a1db290e3a804604f8dcf502657f8426f2",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]

```

#### 进入当前正在运行的容器

方式一：`docker exec -it 容器id /bin/bash`：容器通常都是后台方式运行的，但是在有些情况下需要进入容器修改一些配置，那么就需要使用到该命令；

```bash
ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED          STATUS          PORTS     NAMES
d56471b6c4f3   centos    "/bin/bash -c 'while…"   15 minutes ago   Up 15 minutes             relaxed_feistel

ubuntu@ubuntu:~$ sudo docker exec -it d56471b6c4f3 /bin/bash

[root@d56471b6c4f3 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

方式二：`docker attach 容器id`；

`docker exec`与`docker attch`的区别：
- `docker exec`：进入容器后开启一个新的终端，可以在里面操作（常用的方式）
- `docker attach`：进入容器正在执行的终端，不会启动新的进程；

#### 从容器拷贝文件到主机上

`docker cp 容器id:容器文件路径 目标主机的路径`

```bash
ubuntu@ubuntu:~$ sudo docker run -it centos /bin/bash   # 启动容器
[root@6378392bf2b5 /]# 
ubuntu@ubuntu:~$         # 使用ctrl + P + Q保持容器运行并退出

ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
6378392bf2b5   centos    "/bin/bash"   14 seconds ago   Up 13 seconds             peaceful_easley

# 将容器内/etc/passwd 文件拷贝到主机的/home/ubuntu目录下
ubuntu@ubuntu:~$ sudo docker cp 6378392bf2b5:/etc/passwd /home/ubuntu
Successfully copied 2.56kB to /home/ubuntu

ubuntu@ubuntu:~$ ls /home/ubuntu/
公共的  视频  文档  音乐  muou-v0.0.1-amd64         passwd      ryu-master.zip  snap
模板    图片  下载  桌面  muou-v0.0.1-amd64.tar.gz  ryu-master  ryu-venv        ubuntu.tar
```

> 拷贝是一个手动的过程，后续可以使用 -v 卷的技术实现自动同步；

#### 练习1：Docker安装Nginx

步骤：
1. 搜索nginx镜像
```bash
ubuntu@ubuntu:~$ sudo docker search nginx
NAME                                              DESCRIPTION                                      STARS     OFFICIAL   AUTOMATED
nginx                                             Official build of Nginx.                         19768     [OK] 
unit                                              Official build of NGINX Unit: Universal Web …   26        [OK]  
nginx/nginx-ingress                               NGINX and  NGINX Plus Ingress Controllers fo…   89              
nginxinc/nginx-unprivileged                       Unprivileged NGINX Dockerfiles                   144            
nginx/nginx-prometheus-exporter                   NGINX Prometheus Exporter for NGINX and NGIN…   40              
nginxinc/nginx-s3-gateway                         Authenticating and caching gateway based on …   6               
nginx/unit                                        This repository is retired, use the Docker o…   64              
nginx/nginx-ingress-operator                      NGINX Ingress Operator for NGINX and NGINX P…   2               
nginxinc/amplify-agent                            NGINX Amplify Agent docker repository            1

nginx/nginx-quic-qns                              NGINX QUIC interop                               1

nginxinc/ingress-demo                             Ingress Demo                                     4

nginxproxy/nginx-proxy                            Automated nginx proxy for Docker containers …   135

nginxproxy/acme-companion                         Automated ACME SSL certificate generation fo…   130

bitnami/nginx                                     Bitnami container image for NGINX                186
      [OK]
bitnami/nginx-ingress-controller                  Bitnami container image for NGINX Ingress Co…   33
     [OK]
bitnami/nginx-exporter                            Bitnami container image for NGINX Exporter       5

nginxproxy/docker-gen                             Generate files from docker container meta-da…   17

ubuntu/nginx                                      Nginx, a high-performance reverse proxy & we…   112

nginxinc/mra-fakes3                                                                                0

kasmweb/nginx                                     An Nginx image based off nginx:alpine and in…   7

rancher/nginx-ingress-controller                                                                   13

nginxinc/mra_python_base                                                                           0

nginxinc/ngx-rust-tool                                                                             0

rancher/nginx-ingress-controller-defaultbackend                                                    2
```

2. 拉取镜像文件
```bash
ubuntu@ubuntu:~$ sudo docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
b0a0cf830b12: Pull complete
8ddb1e6cdf34: Pull complete
5252b206aac2: Pull complete
988b92d96970: Pull complete
7102627a7a6e: Pull complete
93295add984d: Pull complete
ebde0aa1d1aa: Pull complete
Digest: sha256:ed6d2c43c8fbcd3eaa44c9dab6d94cb346234476230dc1681227aa72d07181ee
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest

ubuntu@ubuntu:~$ sudo docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        latest    7383c266ef25   6 days ago    188MB
```

3. 启动nginx容器（要求设置名称为nginx01，端口为8880）
```bash
ubuntu@ubuntu:~$ sudo docker run -d --name nginx01 -p 8880:80 nginx
5e2907126be7ad8561d163e4f6ff2f0710fe04e2c1dabcdb51d6c9ee6f6c61a3
```

4. 运行测试
```bash
ubuntu@ubuntu:~$
ubuntu@ubuntu:~$ curl http://127.0.0.1:8880
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430101922.png)

5. 进入容器，然后找到nginx的配置文件
```bash
ubuntu@ubuntu:~$ sudo docker ps -a
CONTAINER ID   IMAGE     COMMAND                   CREATED          STATUS          PORTS                                   NAMES
5e2907126be7   nginx     "/docker-entrypoint.…"   2 minutes ago    Up 2 minutes    0.0.0.0:8880->80/tcp, :::8880->80/tcp   nginx01

ubuntu@ubuntu:~$ sudo docker exec -it 5e2907126be7 /bin/bash

root@5e2907126be7:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx

root@5e2907126be7:/# cd /etc/nginx/
root@5e2907126be7:/etc/nginx# ls
conf.d  fastcgi_params  mime.types  modules  nginx.conf  scgi_params  uwsgi_params
```

*思考问题：每次需要修改 nginx 配置文件，都需要进入容器内部的话就非常麻烦，是否可以在容器外部映射一个文件，当修改该路径下的文件后，就可以自动映射到容器内部的配置文件。*


#### 练习02：Docker 安装tomcat

安装步骤：
1. 搜索 tomcat 镜像
```bash
ubuntu@ubuntu:~$ sudo docker search tomcat
NAME                                            DESCRIPTION                                      STARS     OFFICIAL   AUTOMATED
tomcat                                          Apache Tomcat is an open source implementati…   3657      [OK]    
tomee                                           Apache TomEE is an all-Apache Java EE certif…   114       [OK]    
bitnami/tomcat                                  Bitnami container image for Tomcat               50                   [OK]
bitnamicharts/tomcat                                                                             0                
secoresearch/tomcat-varnish                     Tomcat and Varnish 5.0                           0                    [OK]
chainguard/tomcat                               Build, ship and run secure software with Cha…   0                 
vulhub/tomcat                                                                                    0                
rapidfort/tomcat10-openjdk17-ib                                                                  0                
wnprcehr/tomcat                                                                                  0                
samply/tomcat-common                                                                             0                
jumpserver/tomcat                               Apache Tomcat is an open source implementati…   0                 
hivdb/tomcat-with-nucamino                                                                       0                
eclipse/rdf4j-workbench                         Dockerfile for Eclipse RDF4J Server and Work…   8                 
semoss/docker-tomcat                            Tomcat, Java, Maven, and Git on top of debian    0                    [OK]
eclipse/hadoop-dev                              Ubuntu 14.04, Maven 3.3.9, JDK8, Tomcat 8        0                    [OK]
eclipse/alpine_jdk8                             Based on Alpine 3.3. JDK 1.8, Maven 3.3.9, T…   1                    [OK]
openidentityplatform/openam-j2ee-agent-tomcat   OpenAM Java EE Policy Agent for Apache Tomcat    1

jelastic/tomcat                                 An image of the Tomcat Java application serv…   4

cfje/tomcat-resource                            Tomcat Concourse Resource                        2

rightctrl/tomcat                                CentOS , Oracle Java, tomcat application ssl…   7
   [OK]
tomcat2111/papercut-mf                          PaperCut MF Application Server                   0

tomcat2111/phpredisadmin                        This is a Docker image for phpredisadmin         0
    [OK]
amd64/tomcat                                    Apache Tomcat is an open source implementati…   8

tomcat2111/pisignage-server                     PiSignage Server                                 3
    [OK]
arm64v8/tomcat                                  Apache Tomcat is an open source implementati…   11
```

2. 拉取tomcat 9.0镜像
```bash
ubuntu@ubuntu:~$ sudo docker pull tomcat:9.0
9.0: Pulling from library/tomcat
a271f97708e3: Pull complete
55658331de81: Pull complete
4b8e686262e6: Pull complete
3ee9c63e92e8: Pull complete
cdbbcba47533: Pull complete
f899b682a227: Pull complete
d3525279d40f: Pull complete
94b59ae3d3b6: Pull complete
Digest: sha256:1109b66e72a539d52556aa673756943ed44248f017e27e3f65a3a30595c68c85
Status: Downloaded newer image for tomcat:9.0
docker.io/library/tomcat:9.0

ubuntu@ubuntu:~$ sudo docker images
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
tomcat       9.0       23007dc2df99   4 days ago   471MB
```

3. 启动tomcat容器（要求用完即删，容器名称设定为 tomcat01，端口设定为10080）
```bash
ubuntu@ubuntu:~$ sudo docker run -d --name tomcat01 --rm -p 8888:8080 tomcat:9.0
7b9861d587e173f29e56f2457f8559c9085ecacd91e87c3c2dced85fa55f9673

ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE        COMMAND             CREATED          STATUS          PORTS
           NAMES
bd3cc086963a   tomcat:9.0   "catalina.sh run"   45 seconds ago   Up 44 seconds   0.0.0.0:8888->8080/tcp, :::8888->8080/tcp   tomcat01
```

4. 测试
   ![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430104345.png)

5. 为什么显示404？进入容器后通过查看可以发现，少了很多Linux系统的命令，并且也没有webapp的目录。因为官方的镜像默认是最小镜像，将所有的不必要的都剔除了，保证最小可运行文件；
   解决方法：
```bash
ubuntu@ubuntu:~$ sudo docker exec -it bd3cc086963a /bin/bash  # 进入容器

root@bd3cc086963a:/usr/local/tomcat# ls
bin           conf             lib      logs            NOTICE     RELEASE-NOTES  temp     webapps.dist
BUILDING.txt  CONTRIBUTING.md  LICENSE  native-jni-lib  README.md  RUNNING.txt    webapps  work

# 将webapps.dist目录下所有文件拷贝到webapps目录下
root@bd3cc086963a:/usr/local/tomcat# cp -r webapps.dist/* webapps     
```

重新刷新页面后就显示正常了：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430104947.png)

*思考：如果以后部署项目，每次都要进入容器会非常麻烦，是否可以在容器外部提供一个映射路径，实现只需要在外部放置项目，就自动同步到内部容器中。*

#### 练习03：Docker安装ES+Kibana

**Elasticsearch(ES) 概述**：ES是基于Lucene的搜索服务器，它提供了一个分布式多用户能力的全问搜索引擎，且ES支持RestFulweb风格的ur访问。ES是基于java开发的开源搜索引擎，设计用于云计算，能够达到实时搜索，稳定、可靠、快速。此外，ES还提供了数据聚合分析功能，但在数据分析方面，es的时效性不是很理想，在企业应用中一般还是用于搜索。ES自2016年起已经超过Solr等，称为排名第一的搜索引擎应用。

使用Docker部署ES面临的问题：
1. ES暴露的端口非常多
2. ES非常消耗内存资源
3. ES的数据一般需要放置到安全目录内，

步骤：
1. 搜索ES，可以到Docker Hub上进行查找对应的版本 [here](https://hub.docker.com/_/elasticsearch)；
   ![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430134413.png)


2. 下载ES 8.13.0;
```bash
ubuntu@ubuntu:~$ sudo docker pull elasticsearch:7.6.2 
8.13.0: Pulling from library/elasticsearch
4477f8fe99eb: Pull complete
ee18bf6d37c5: Pull complete
12bceb331b91: Pull complete
4f4fb700ef54: Pull complete
ad262b52003c: Pull complete
19485f8ea70f: Pull complete
3fc5e360733c: Pull complete
2cb731a7c4fa: Pull complete
783f4eec344a: Pull complete
626d3b664138: Pull complete
Digest: sha256:4f4b290a8a08f94b299a2b8dd20b7140b606b3685bd2bb25b1328273eaadc899
Status: Downloaded newer image for elasticsearch:7.6.2 
docker.io/library/elasticsearch:7.6.2 

ubuntu@ubuntu:~$ sudo docker images
REPOSITORY      TAG       IMAGE ID       CREATED       SIZE
elasticsearch   7.6.2    65a9b5f8609f   4 weeks ago   1.24GB
```


3. 启动运行ES

```bash
ubuntu@ubuntu:~$ sudo docker run -d --name ES -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2 
99facce17bd94df092162e4a6f84499bd271ed0596ae8408c84e1378669988c1
```

4. 查看 Docker状态，使用命令`docker stats`，可以看到ES是非常消耗内存资源的；

```bash
ubuntu@ubuntu:~$ sudo docker stats
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT    MEM %     NET I/O       BLOCK I/O       PIDS
99facce17bd9   ES        0.46%     2.145GiB / 3.78GiB   56.75%    3.15kB / 0B   115MB / 582kB   41
```

5. 现在打算要限制该容器运行时的内存使用资源，也就是在运行的时候添加`-e 环境配置修改`

```bash
ubuntu@ubuntu:~$ sudo docker run -d --name ES -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA
_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2 
c63a0393b7ee6d8be11aed2a5f8f4e77e9d62fd0640893dd42b206e7c00e82ed

ubuntu@ubuntu:~$ sudo docker stats
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT    MEM %     NET I/O        BLOCK I/O    PIDS
f9671e833022   elasticsearch   0.39%     360.2MiB / 3.78GiB   9.31%     35MB / 496kB   0B / 250MB   43
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT    MEM %     NET I/O        BLOCK I/O    PIDS
f9671e833022   elasticsearch   0.39%     360.2MiB / 3.78GiB   9.31%     35MB / 496kB   0B / 250MB   43
```
可以看到，内存使用率明显降低！


6. 测试访问：
```bash
ubuntu@ubuntu:~$ curl localhost:9200
{
  "name" : "f9671e833022",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "WidMi3ifSJu6eDJeWEJorA",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

### 2.5 可视化

什么是 portainer？Docker的图形化界面管理工具，提供一个后台面板供我们操作。等同的还有Rancher（CI/CD再用）；

启动：
```bash
ubuntu@ubuntu:~$  sudo docker run -d -p 8088:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
Unable to find image 'portainer/portainer:latest' locally
latest: Pulling from portainer/portainer
772227786281: Pull complete
96fd13befc87: Pull complete
0bad1d247b5b: Pull complete
b5d1b01b1d39: Pull complete
Digest: sha256:47b064434edf437badf7337e516e07f64477485c8ecc663ddabbe824b20c672d
Status: Downloaded newer image for portainer/portainer:latest
f726e84629d93af245be55e772e0903b6c7c78f7e605bc680e0dbab4eb0a8720

-v /var/run/docker.sock:/var/run/docker.sock       # 将本地目录与容器内的目录进行挂载
```

访问测试：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430144406.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430144749.png)

## 三、Docker镜像理论

### 3.1 镜像是什么

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件；

也就是说，所有的应用，可以直接打包成Docker镜像，就可以直接运行起来了；

如何获取得到镜像：
- 从远程仓库下载
- 别人拷贝给你
- 自己制作一个镜像，DockerFile

### 3.2 Docker镜像加载原理

#### UnionFS（联合文件系统）

*在下载的时候看到的就是这个~*

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下。Union 文件系统是Docker镜像的基础，镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像；

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。

#### Docker镜像加载原理

Docker的镜像实际上由一层层的文件系统组成，这种层级的文件系统叫UnionFS；

bootfs（boot file system）主要包含 bootloader 和 kernel，bootloader主要是引导加载kernel，Linux刚启动的时候会加载 bootfs 文件系统，在Docker镜像的最底层是 bootfs，这一层与典型的Linux/Unix是一样的，包含boot加载器和内核，当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已经由bootfs转交给内核了，此时系统也会卸载bootfs。*所以，这部分是公用的*；

rootfs（root file system），在bootfs之上，包含的就是典型Linux系统中的`/dev/`，`/proc/`，`/etc/`，`/bin`等标准目录和文件，rootfs就是各种不同的操作系统发行版，例如 Ubuntu、Centos等；

> *平时安装虚拟机的Centos都是好几个G，为什么Docker中才只有200M？*
> 对于一个精简的OS系统，rootfs可以很小，只需要包含最基本的命令、工具和程序库就可以了，因为底层直接用Host的Kernel，自己只需要提供rootfs就可以了，由此可见对于不同的Linux发行版，bootfs基本是一致的，rootfs会有差别，因此不同的发行版可以公用bootfs；**正是因为这个的改变，所以虚拟机启动是分钟级的，而容器的启动是秒级的**；

#### 分层理解

##### 分层的镜像

在下载镜像的时候，观察下载的日志可以发现，镜像是一层一层的在下载的；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430171826.png)

*思考：为什么Docker镜像要采用这种分层的结构呢？*
最大的好处，应该就是资源共享，比如有多个镜像都从相同的Base镜像构建而来，那么宿主机只需要在磁盘上保留一份Base镜像，同时内存中也只需要加载一份Base镜像，这样就可以为所有的容器服务了，而且镜像的每一层都是可以被共享的；

查看镜像分层的方式可以通过命令`docker image inspect`查看；
```bash
ubuntu@ubuntu:~$ sudo docker images
REPOSITORY            TAG       IMAGE ID       CREATED         SIZE
redis                 latest    9509c4dd19fb   3 weeks ago     116MB
portainer/portainer   latest    5f11582196a4   17 months ago   287MB
elasticsearch         7.6.2     f29a1ee41030   4 years ago     791MB

ubuntu@ubuntu:~$ sudo docker image inspect redis
[
    {
        "Id": "sha256:9509c4dd19fbb2a8abe044ab2edba261139c141ef4ebba4dcb9e0d9295431288",
        "RepoTags": [
            "redis:latest"
        ],
        "RepoDigests": [
            "redis@sha256:f14f42fc7e824b93c0e2fe3cdf42f68197ee0311c3d2e0235be37480b2e208e6"
        ],
        "Parent": "",
        "Comment": "buildkit.dockerfile.v0",
        "Created": "2024-04-05T21:53:10Z",
        "Container": "",
        "ContainerConfig": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": null,
            "Cmd": null,
            "Image": "",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": null
        },
        "DockerVersion": "",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "6379/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GOSU_VERSION=1.17",
                "REDIS_VERSION=7.2.4",
                "REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-7.2.4.tar.gz",
                "REDIS_DOWNLOAD_SHA=8d104c26a154b29fd67d6568b4f375212212ad41e0c2caa3d66480e78dbd3b59"
            ],
            "Cmd": [
                "redis-server"
            ],
            "ArgsEscaped": true,
            "Image": "",
            "Volumes": {
                "/data": {}
            },
            "WorkingDir": "/data",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": null
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 116496163,
        "VirtualSize": 116496163,
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/e5790f9071a91ae7f1edacb2162d33a2f8f512a62fba2a8a0f8c55c9e8a893bf/diff:/var/lib/docker/overlay2/f49768ddc6cb1c15266a116bb210e370fa4c26e3984e6c761a016b6b0d8c5be7/diff:/var/lib/docker/overlay2/c905ad00a57ac6ca8f83e9b4e0b6f773624127179e2de1122fa7a82886de470c/diff:/var/lib/docker/overlay2/33f86a7fa8404297d6c9a2a77f3b15e6a9d351d5523d20751f2ad5df63d6decd/diff:/var/lib/docker/overlay2/408ef05af29eccec50c6def9ae9f4766d0b5219befeac1cc1e6298a703d111a9/diff:/var/lib/docker/overlay2/17d1231518601e15899d182fc275f972067d748d57fbde0bb8a6d0aff0b92110/diff:/var/lib/docker/overlay2/25a9ab88448b870c72b3faf88aa2043198a8b2f621fc32387abcf49c6dbc066b/diff",
                "MergedDir": "/var/lib/docker/overlay2/ce8a5803bea97e969ee8fc574356d8512a9c5da622a9cbdb83fb29790a79aff8/merged",
                "UpperDir": "/var/lib/docker/overlay2/ce8a5803bea97e969ee8fc574356d8512a9c5da622a9cbdb83fb29790a79aff8/diff",
                "WorkDir": "/var/lib/docker/overlay2/ce8a5803bea97e969ee8fc574356d8512a9c5da622a9cbdb83fb29790a79aff8/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",   
            "Layers": [         # 这里就可以看到所有的层
                "sha256:52ec5a4316fadc09a4a51f82b8d7b66ead0d71bea4f75e81e25b4094c4219061",
                "sha256:c92e7d4d470709c28e500db21b377e957b8df548395b91e7125383a7aa2d45f8",
                "sha256:b4d6fc2df94af8aa941de0d3f06c066437032ab991117fbc86c8d5e769ad7721",
                "sha256:422df2762dcb3650fe9e768fe0a1d6df8fb4e289703793d3fc7872c18bbc96af",
                "sha256:4102eab4cfabcf9667f4f38910f8f583fae2807575c4e78e184877cfa5dccf8e",
                "sha256:738e88fe8c69efb12a74dea83a53cff095c46449346161428e4fe072971a45e5",
                "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef",
                "sha256:32f9033ea7ae061bbeb9323def643b607786372643dcb0a25e4c9fabdd4be5cd"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]
```

**理解**：
所有的Docker镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之上，创建新的镜像层；

例如现在需要基于Ubuntu 16.04创建一个新的镜像，这就是新镜像的第1层，如果在该镜像中添加一个python包，那么就会在基础镜像层之上创建第2个镜像层，如果继续添加一个安全补丁，那么就会创建第3个镜像层；
该镜像当前已经包含3个镜像层，如下图所示：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430172525.png)

在添加额外的镜像层的同时，镜像始终保持时当前所有镜像的组合，理解这一点非常的重要，下图中举了一个简单的例子，每个镜像层包含了3个文件，而镜像包含了来自两个镜像层的6个文件；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430173622.png)

上图中的镜像层跟之前图中的略有区别，主要的目的是便于展示文件；
下图中展示了一个较为复杂的三层镜像，在外部看来整个镜像只有6个文件，这是因为最上层的文件7是文件5的更新版本；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430173812.png)

这种情况下，上层镜像层中的文件覆盖了底层镜像层中的文件这样就使得文件的更新版本作为一个新镜像层添加到镜像中；

Docker通过存储引擎（新版本中采用的是快照机制）的方式来实现镜像层堆栈，并保证多镜像层对外展示为统一的文件系统；

Linux上可用的存储引擎有：AUFS、Overlay2、Device Mapper、Btrfs以及ZFS，顾名思义，每种存储引擎都基于Linux中对应的文件系统或者块设备技术，并且每种存储引擎都有其独有的性能特点；

Docker在Windows上仅支持 Windowsfiler 一种存储引擎，该存储引擎基于NTFS文件系统之上实现了分层和Cow；

下图展示了与系统显示相同的三层镜像，所有镜像层堆叠并合并，对外提供统一的视图：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430174354.png)

##### 特点

Docker镜像都是只读的，当容器启动的时候，一个新的可写层被加载到镜像的顶部；
这一层就是通常说的*容器层*，容器之下的都叫做*镜像层*；

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430174728.png)


### 3.3 `commit` 提交镜像

`docker commit`：提交容器称为一个新的副本

```bash
# 命令和git类似
docker commit -m="提交的描述信息" -a="作者" 容器id 目标镜像名:[TAG]
```

实际操作演示，以tomcat为例，步骤和思路如下：
1. 下载并启动一个默认的tomcat，可以发现，这个默认的tomcat是没有webapps的应用，这是镜像的原因，官方的镜像默认webapps下是没有文件的；
```bash
ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE                 COMMAND             CREATED          STATUS          PORTS                                                           NAMES
de9772432210   tomcat                "catalina.sh run"   24 seconds ago   Up 22 seconds   8080/tcp, 0.0.0.0:8880->80/tcp, :::8880->80/tcp                 festive_mcnulty
f726e84629d9   portainer/portainer   "/portainer"        3 hours ago      Up 39 minutes   8000/tcp, 9443/tcp, 0.0.0.0:8088->9000/tcp, :::8088->9000/tcp   focused_allen

ubuntu@ubuntu:~$ sudo docker exec -it de9772432210 /bin/bash

root@de9772432210:/usr/local/tomcat# ls
bin           conf             lib      logs            NOTICE     RELEASE-NOTES  temp     webapps.dist
BUILDING.txt  CONTRIBUTING.md  LICENSE  native-jni-lib  README.md  RUNNING.txt    webapps  work
```

2. 现在我们自己将基本的文件拷贝进去；
```bash
# 将基本文件拷贝到webapps目录下
root@de9772432210:/usr/local/tomcat# cp -r webapps.dist/* webapps
root@de9772432210:/usr/local/tomcat# cd webapps
root@de9772432210:/usr/local/tomcat/webapps# ls
docs  examples  host-manager  manager  ROOT

root@de9772432210:/usr/local/tomcat/webapps# exit
```

3. 将我们操作过的容器通过commit提交为一个新的镜像，那么以后我们就可以使用修改过的镜像了；
```bash
ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE                 COMMAND             CREATED         STATUS          PORTS
                                 NAMES
de9772432210   tomcat                "catalina.sh run"   2 minutes ago   Up 2 minutes    8080/tcp, 0.0.0.0:8880->80/tcp, :::8880->80/tcp                 festive_mcnulty

ubuntu@ubuntu:~$ sudo docker commit -a="takuyasec" -m="add webapps" de9772432210 tomcat02:1.1
sha256:723caab60ae599889df0d19af16d6576ab6a6b3bc15ea8938f665caa63326a4b
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430180034.png)


> 如果想要保存当前容器的状态，就可以通过commit来提交，获得一个新的镜像，这个就和VMware的快照类似；


## 四、容器数据卷

### 4.1 什么是容器数据卷

**容器数据卷的目的：实现容器数据的持久化和同步操作，同时容器和容器之间的数据也可以共享。**

Docker的理念就是*将应用和环境打包成一个镜像*，在使用容器过程中数据都是在容器中的，如果我们将容器删除，那么数据就会丢失，所有就有一个需求：**如何让数据可以持久化**？

为了解决数据持久化的问题，就需要容器和宿主机之间可以有一个数据共享的技术，也就是Docker容器中产生的数据，将其同步到本地；这就需要使用到 **卷技术**，也就是目录的挂载，将容器中的目录挂载到Linux上；

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430181329.png)

### 4.2 使用数据卷

可以使用命令进行挂载，参数是`-v`，具体语法格式：
```bash
docker run -it -v 宿主机目录:容器目录 镜像名
```

```bash
ubuntu@ubuntu:~$ sudo docker run -it -v /home/ubuntu/ceshi:/home centos /bin/bash
Unable to find image 'centos:latest' locally
latest: Pulling from library/centos
a1d0c7532777: Pull complete
Digest: sha256:a27fd8080b517143cbbbab9dfb7c8571c40d67d534bbdee55bd6c473f432b177
Status: Downloaded newer image for centos:latest
```

此时在宿主机的/home/ubuntu目录下，可以看到对应的数据卷的目录：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430182745.png)

挂载后，在宿主机上通过命令`docker inspect`命令可以看到具体信息：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430183006.png)


测试1：在容器内的home目录下添加文件，观察宿主机的/home/ubuntu/ceshi目录下是否能够成功同步
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430183333.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430183411.png)

测试2：将容器停止运行 --> 在宿主机的/home/ubuntu/ceshi目录下对test.java文件进行修改 --> 重新运行容器，并进入容器查看 /home 目录下的test.java文件是否发生了变化，宿主机的修改是否同步到容器中的该文件；

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430183756.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430184030.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430184214.png)

> 好处：以后修改就只需要在本地修改即可，容器会自动同步；


### 4.3 实战：安装MySQL

*需要解决的问题：MySQL的数据持久化问题*

思路和步骤：
1. 获取MySQL 5.7的镜像；
```bash
ubuntu@ubuntu:~/ceshi$ sudo docker pull mysql:5.7
5.7: Pulling from library/mysql
20e4dcae4c69: Pull complete
1c56c3d4ce74: Pull complete
e9f03a1c24ce: Pull complete
68c3898c2015: Pull complete
6b95a940e7b6: Pull complete
90986bb8de6e: Pull complete
ae71319cb779: Pull complete
ffc89e9dfd88: Pull complete
43d05e938198: Pull complete
064b2d298fba: Pull complete
df9a4d85569b: Pull complete
Digest: sha256:4bc6bc963e6d8443453676cae56536f4b8156d78bae03c0145cbe47c2aad73bb
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7
```

2. 运行容器，在运行的同时需要满足以下条件：
    - 需要配置MySQL的密码；
    - 需要设定映射端口为3310；
    - 需要自定义容器名称为MySQL01
    - 需要挂载MySQL的配置文件、数据存放目录到宿主机上；
```bash
ubuntu@ubuntu:~/ceshi$ sudo docker run -d -p 3310:3306 -v /home/ubuntu/mysql/conf:/etc/mysql/conf.d -v /home/ubuntu/mysq
l/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root --name mysql01 mysql:5.7
490302633f2ec6e198a66153eba01cd5cee4f3b8313d732b5b118ad3455e2c79

# 参数解释：
-d         # 后台运行
-p         # 端口映射
-v         # 数据卷挂载，2个-v则表示挂载2个目录
-e         # 环境配置
-name      # 容器名字
```

启动成功之后，测试连接：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430190507.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430190528.png)


测试2：在外部创建一个数据库，观察宿主机映射的/home/ubuntu/mysql/data目录下是否存在新建的数据库test
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430190816.png)

可以看到宿主机的/home/ubuntu/mysql/data目录下同步了新创建的数据库test
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430190911.png)

测试：删除容器，观察宿主机上的数据是否还存在；

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430191141.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430191219.png)

### 4.4 具名挂载和匿名挂载

#### 匿名挂载

匿名挂载：在运行容器时，`-v`只指定了容器内的目录，而并没有指定宿主机的目录；
```bash
ubuntu@ubuntu:~/mysql/data$ sudo docker run -d -P --name nginx01 -v /etc/nginx nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
b0a0cf830b12: Pull complete
8ddb1e6cdf34: Pull complete
5252b206aac2: Pull complete
988b92d96970: Pull complete
7102627a7a6e: Pull complete
93295add984d: Pull complete
ebde0aa1d1aa: Pull complete
Digest: sha256:ed6d2c43c8fbcd3eaa44c9dab6d94cb346234476230dc1681227aa72d07181ee
Status: Downloaded newer image for nginx:latest
4fb6efbb752f9b8dce3f8d9a7f3c0a4d9d434a351a30789756cd7cd6ac2272b9
ubuntu@ubuntu:~/mysql/data$
```

查看所有的卷组的情况：`docker volumn ls`
```bash
ubuntu@ubuntu:~/mysql/data$ sudo docker volume ls
DRIVER    VOLUME NAME
# 以下这些就是匿名挂载，我们在-v的时候只写了容器内的路径，没有指定宿主机的目录路径
local     234740b6641b005fcdc4fb5151b3717b03c5f4524e0db40bd063075c470bdbb2
local     b0a4e68fda4fcf7125279765c424ce3164cb4fce17cd9c86d17d6790dae592fe
```

#### 具名挂载

具名挂载：在启动容器的时候，`-v`即配置了宿主机的目录路径，也配置了容器的目录路径

```bash
ubuntu@ubuntu:~/mysql/data$ sudo docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
1dc4882282ebe5a75b219d95bf0442dc3686a3980ab76d9cf1d4cd8b0f7b8d6b
```

此时查看Docker的卷组详细信息：
```bash
ubuntu@ubuntu:~/mysql/data$ sudo docker volume ls
DRIVER    VOLUME NAME
local     juming-nginx
```

查看该具名挂载的详细信息：`docker volumn inspect 宿主机的目录名`

```bash
ubuntu@ubuntu:~/mysql/data$ sudo docker volume inspect juming-nginx
[
    {
        "CreatedAt": "2024-04-30T19:39:22+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data",  # 具体的挂载的目录的地址
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]
```

**所有的Docker容器内的卷，没有指定目录的情况下，都是在/var/lib/docker/volumnes/xxxx/_data**
```bash
root@ubuntu:/home/ubuntu/mysql/data# cd /var/lib/docker/volumes/
root@ubuntu:/var/lib/docker/volumes# ls
234740b6641b005fcdc4fb5151b3717b03c5f4524e0db40bd063075c470bdbb2  backingFsBlockDev  metadata.db
b0a4e68fda4fcf7125279765c424ce3164cb4fce17cd9c86d17d6790dae592fe  juming-nginx
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240430194601.png)

> 所以通过具名挂载的方式可以方便的找到一个卷，大多数情况下都是使用的具名挂载的方式！

*如何区分匿名挂载、具名挂载和指定路径挂载？*

1. 具名挂载：`-v 卷名:容器内路径`
2. 匿名挂载：`-v 容器内路径`
3. 指定路径挂载：`-v /宿主机路径:容器内路径`

*拓展知识*
在有些时候，会遇到如下这种命令：
```bash
sudo docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:ro nginx
sudo docker run -d -P --name nginx03 -v juming-nginx:/etc/nginx:rw nginx

# 参数解读：
通过 -v 容器路径:rw/ro  就可以改变文件的读写权限
ro       # readonly 只读
rw       # readwrite 可读可写
```

> 一旦设置了容器权限，容器对挂载出来的内容就有限定了！

*PS：如果看到`ro`就说明这个路径只能通过宿主机来操作，而容器内部是无法进行操作的！*

### 4.5 初始DockerFile

DockerFile就是用来构建Docker镜像的构建文件，实质就是一个命令脚本，通过这个脚本生成镜像，镜像是一层一层的，那么在这个脚本中体现的就是一个个的命令，每个命令就是一层；

一个简单的通过DockerFile来构建容器的过程：
1. 创建一个DockerFile文件，文件名是可以随机的，但是建议文件名叫DockerFile；
```bash
ubuntu@ubuntu:~$ mkdir docker-volumn-test
ubuntu@ubuntu:~$ cd docker-volumn-test/

ubuntu@ubuntu:~/docker-volumn-test$ vim dockerfile01
# 文件中的内容 指令（要求大写）
# 这里的每个命令，就是镜像的一层
FROM centos

VOLUME ["volume01","volume02"]

CMD echo "=====end====="
CMD /bin/bash
```

2. 构建/生成镜像文件
```bash
ubuntu@ubuntu:~/docker-volumn-test$ sudo docker build -f /home/ubuntu/docker-volumn-test/dockerfile01 -t takuyasec/centos:1.0 .
[sudo] ubuntu 的密码：
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM centos
latest: Pulling from library/centos
a1d0c7532777: Pull complete
Digest: sha256:a27fd8080b517143cbbbab9dfb7c8571c40d67d534bbdee55bd6c473f432b177
Status: Downloaded newer image for centos:latest
 ---> 5d0da3dc9764
Step 2/4 : VOLUME ["volume01","volume02"]
 ---> Running in f95594f0c6b6
Removing intermediate container f95594f0c6b6
 ---> 2f1a63a3331a
Step 3/4 : CMD echo "=====end====="
 ---> Running in 90e34a2fb580
Removing intermediate container 90e34a2fb580
 ---> f2c1dc1e7262
Step 4/4 : CMD /bin/bash
 ---> Running in 27c81f52b3d6
Removing intermediate container 27c81f52b3d6
 ---> 85d3d897a654
Successfully built 85d3d897a654
Successfully tagged takuyasec/centos:1.0
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501105335.png)

这个卷和外部一定有一个同步的目录 ，以下图中的就是通过`docker inspect 容器id`命令查看容器详细信息后，获取到的在宿主机对应的数据目录的位置；

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501110134.png)


### 4.6 数据卷容器

为了实现多个MySQL数据库容器之间同步数据。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501110750.png)

测试：启动3个容器，使用之前自己写的镜像来启动

1. 启动父容器，名称设置为`docker-father`
```bash
# 启动父容器
ubuntu@ubuntu:~$ sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
takuyasec/centos   1.0       85d3d897a654   11 hours ago   231MB
nginx              latest    7383c266ef25   7 days ago     188MB
centos             latest    5d0da3dc9764   2 years ago    231MB

ubuntu@ubuntu:~$ sudo docker run -it --name docker-father takuyasec/centos:1.0 /bin/bash
[root@c324700745a3 /]# 
ubuntu@ubuntu:~$        # ctrl + P + Q保持运行并退出容器

ubuntu@ubuntu:~$ sudo docker ps
CONTAINER ID   IMAGE                  COMMAND       CREATED         STATUS         PORTS     NAMES
c324700745a3   takuyasec/centos:1.0   "/bin/bash"   9 seconds ago   Up 8 seconds             docker-father
```

启动子容器，名称设置为`docker-son01`，继承父容器，通过参数`--volumes-from 父容器名称`
```bash
# 启动子容器
ubuntu@ubuntu:~$ sudo docker run -it --name docker-son01 --volumes-from  docker-father takuyasec/centos:1.0 /bin/bash
[root@49ae6a0cbcd8 /]#
```

3. 在父容器中创建一个文件，观察在子容器中是否同步
```bash
[root@c324700745a3 /]# cd volume01

[root@c324700745a3 volume01]# ls -al
total 8
drwxr-xr-x 2 root root 4096 May  1 03:10 .
drwxr-xr-x 1 root root 4096 May  1 03:10 ..

[root@c324700745a3 volume01]# touch test.java     # 在父容器中创建了一个新的文件

[root@c324700745a3 volume01]# ls -al
total 8
drwxr-xr-x 2 root root 4096 May  1 03:16 .
drwxr-xr-x 1 root root 4096 May  1 03:10 ..
-rw-r--r-- 1 root root    0 May  1 03:16 test.java
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501111759.png)

此时，`docker-father`就是数据卷容器；

**只要在创建容器的时候，使用了参数`--volumes-from 容器名`，那么在容器间就能实现数据共享！**

*如果将`docker-father`容器删除了，那么在`docker-son01`这些子容器中数据还是否存在?*

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501112323.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501112357.png)

从测试结果可以看到，数据依旧还是存在的，所以容器之间的数据是一种备份的机制，而并非一种共享机制。

那么如何实现多个MySQL数据库容器之间的数据共享？
```bash
# MySQL的父容器
docker run -d -p 3310:3306 -v /etc/mysql/conf.d -v /var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql-father mysql:5.7

# MySQL子容器的创建
sudo docker run -d -p 3310:3306 --volumes-from docker-father -e MYSQL_ROOT_PASSWORD=123456 --name mysql-son01 mysql:5.7
```

> **总结：**
> 容器之间配置信息的传递，数据卷容器的生命周期一直持续到没有容器使用为止，但是一旦持久化到了本地，这个时候，本地的数据是不会删除的！


## 五、DockerFile

### 5.1 DockerFile 介绍

DockerFile 是用来构建Docker镜像的文件，实质就是一个命令参数脚本。

构建步骤：
1. 编写一个DockerFile文件；
2. `docker build` 构建成为一个镜像；
3. `docker run`运行镜像
4. `docker pull`发布镜像（可以发布到 Docker Hub、阿里云镜像仓库）

*如何查看官方的镜像的DockerFile？*

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501113848.png)


![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501113925.png)


很多官方镜像都是基础包，很多功能都是没有的，所以通常会搭建自己的镜像；

### 5.2 DockerFile 构建过程

基础知识：
1. 每个保留关键字（指令）都必须是大写字母；
2. 指令的执行顺序是从上到下按顺序执行的；
3. `#`表示注释；
4. 每一个指令都会创建提交一个新的镜像层，并提交。
   ![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501114443.png)

DockerFile 是面向开发的，以后要发布项目，做镜像，就需要编写DockerFile文件。

Docker镜像已经逐渐称为了企业交付的标准。

Docker的开发、部署、运维：
- DockerFile：构建文件，定义了镜像构成的一切步骤，源代码；
- DockerImages：通过 DockerFile 构建生成的镜像，最终发布和运行的产品。
- Docker容器：容器就是镜像运行起来提供服务的。

### 5.3 DockerFile 常用指令

```shell
FROM           # 基础镜像，一切从这里开始构建，这个镜像的妈妈是谁
MAINTAINER     # 维护者的信息，镜像是谁写的，一般写姓名和邮箱。告诉别人，这是谁负责养他的。
RUN            # 镜像构建的时候需要运行的命令
ADD            # 如果需要在这个镜像中添加文件，例如tomcat的安装包，就需要使用ADD，压缩包会自动解压。
WORKDIR        # 镜像的工作目录
VOLUMES        # 挂载的目录位置
EXPOSE         # 指定对外的端口
CMD            # 指定这个容器启动的时候需要运行的命令，只有最后一个会生效，且可被替代。
ENTRYPOINT     # 指定这个容器运行的时候需要运行的命令，可以追加命令。
ONBUILD        # 当构建一个被继承的 DockerFile，这个时候就会运行ONBUILD的指令，触发指令/
COPY           # 类似ADD，将文件拷贝到镜像中。
ENV            # 构建的时候设置环境变量
```


### 5.4 实战：构建自己的CentOS

Docker Hub中 99%的镜像都是从`FROM scratch`这个基础镜像过来的，然后配置需要的软件和配置来进行构建的。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240501121026.png)

构建一个自己的CentOS
1. 编写DockerFile文件
```bash
FROM centos             # 基础镜像
MAINTAINER takuyasec<takuyasec@163.com>    # 作者信息

ENV MYPATH /usr/local            # 设置环境变量
WORKDIR $MYPATH               # 设置工作目录，也就是进入容器的目录

RUN yum -y install vim        # 需要执行的命令
RUN yum -y install net-tools

EXPOSE 80                     # 设置对外暴露的端口

CMD echo $MYPATH              # 设置需要执行的命令
CMD echo "------end-----"
CMD /bin/bash
```

2. 通过这个DockerFile文件构建镜像
```bash
ubuntu@10-7-103-141:~/dockerfile$ sudo docker build -f myDockerFile -t mycentos:1.0 .
Sending build context to Docker daemon  2.048kB
Step 1/10 : FROM centos:7
7: Pulling from library/centos
2d473b07cdd5: Pull complete
Digest: sha256:be65f488b7764ad3638f236b7b515b3678369a5124c47b8d32916d6487418ea4
Status: Downloaded newer image for centos:7
 ---> eeb6ee3f44bd
Step 2/10 : MAINTAINER takuyasec<takuyasec@163.com>
 ---> Running in 190ccfb04aad
Removing intermediate container 190ccfb04aad
 ---> 70ff1b5def75
Step 3/10 : ENV MYPATH /usr/local
 ---> Running in f4ba2566c14b
Removing intermediate container f4ba2566c14b
 ---> 614b0996edd6
Step 4/10 : WORKDIR $MYPATH
 ---> Running in daa252fc1434
Removing intermediate container daa252fc1434
 ---> 066ee78b2f02
Step 5/10 : RUN yum -y install vim
 ---> Running in d9538148b89d

# 参数解释：
-f      # 后面跟的是DockerFile的文件名
-t      # target，要生成的镜像的名称
.       # 指的是目录，`.`表示当前目录
```

![CleanShot 2024-05-01 at 20.02.55@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-01%20at%2020.02.55@2x.png)

3. 测试运行
   ![CleanShot 2024-05-01 at 20.04.11@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-01%20at%2020.04.11@2x.png)

还可以列出镜像的变更历史信息，通过命令`docker history 镜像ID`
![CleanShot 2024-05-01 at 20.08.25@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-01%20at%2020.08.25@2x.png)

所以在平时拿到一个镜像之后，可以研究下它是怎么做的；

### 5.5 `CMD` 和 `ENTRYPOINT`的区别

```bash
CMD            # 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可以被替代；
ENTRYPOINT     # 指定这个容器启动的时候要执行的命令，可以追加命令
```

首先创建一个用于测试CMD的DockerFile，内容如下：
```bash
ubuntu@10-7-103-141:~/dockerfile$ cat dockerfile-cmd-test
FROM centos
CMD ["ls","-a"]
```

构建这个镜像，通过`docker build`
```bash
ubuntu@10-7-103-141:~/dockerfile$ sudo docker build -f dockerfile-cmd-test -t cmdtest .
Sending build context to Docker daemon  3.072kB
Step 1/2 : FROM centos:7
 ---> eeb6ee3f44bd
Step 2/2 : CMD ["ls","-a"]
 ---> Running in f6e05b75f8a4
Removing intermediate container f6e05b75f8a4
 ---> a6dc875fa16c
Successfully built a6dc875fa16c
Successfully tagged cmdtest:latest
```

![CleanShot 2024-05-01 at 20.15.37@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-01%20at%2020.15.37@2x.png)

接下来尝试在启动容器的时候在后面追加参数（注意，此时是`CMD`）
![CleanShot 2024-05-01 at 20.20.10@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-01%20at%2020.20.10@2x.png)

```bash
docker: Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "-l": executable file not found in $PATH: unknown.
```

> 在使用CMD的情况下，`-l`替换了`CMD ["ls","-a"]`，而`-l`并不是一个命令，所以出现了报错。

如果想要替换成功，则需要进行以下操作：
![CleanShot 2024-05-01 at 20.24.00@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-01%20at%2020.24.00@2x.png)

接下来对`ENTRYPOINT`进行测试

1. 首先创建一个`ENTRYPOINT`的DockerFile测试文件
```bash
ubuntu@10-7-103-141:~/dockerfile$ cat dockerfile-test-entrypoint
FROM centos:7

ENTRYPOINT ["ls","-a"]
```

2. 创建这个镜像文件
```bash
ubuntu@10-7-103-141:~/dockerfile$ sudo docker build -f dockerfile-test-entrypoint -t testentrypoint
.
Sending build context to Docker daemon  4.096kB
Step 1/2 : FROM centos:7
 ---> eeb6ee3f44bd
Step 2/2 : ENTRYPOINT ["ls","-a"]
 ---> Running in 6bf330763b1b
Removing intermediate container 6bf330763b1b
 ---> a7b37d3b4548
Successfully built a7b37d3b4548
Successfully tagged testentrypoint:latest
```

3. 运行这个镜像，并且对追加参数进行测试
   ![CleanShot 2024-05-01 at 20.28.28@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-01%20at%2020.28.28@2x.png)

*在DockerFile中很多命令都非常的相似，所以需要了解他们的区别！*

### 5.6 实战：制作Tomcat镜像

制作Tomcat的镜像，主要的步骤有：
1. 准备镜像文件、tomcat压缩包、JDK的压缩包。
   ![CleanShot 2024-05-02 at 00.01.15@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2000.01.15@2x.png)

2. 编写DockerFile文件,官方命名`DockerFile`,`build`会自动寻找这个文件，就不需要`-f`来进行指定了。
```bash
FROM centos:7
MAINTAINER takuyasec<takuyasec@163.com>

COPY readme.txt /usr/local/readme.txt

ADD jdk-8u411-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.88.tar.gz /usr/local/

RUN yum -y install vim
RUN chmod +x /usr/local/apache-tomcat-9.0.88/bin/*.sh

ENV MYPATH /usr/local
WORKDIR $MYPATH

ENV JAVA_HOME=/usr/local/jdk1.8.0_411
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.88
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.88
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

EXPOSE 8080

CMD /usr/local/apache-tomcat-9.0.88/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.88/logs/catalina.out
```

3. 构建镜像
```bash
ubuntu@10-7-103-141:~/dockerfile/tomcat-dockerfile-test$ sudo docker build -t mytomcat .
Sending build context to Docker daemon  158.7MB
Step 1/15 : FROM centos:7
 ---> eeb6ee3f44bd
Step 2/15 : MAINTAINER takuyasec<takuyasec@163.com>
 ---> Using cache
 ---> 70ff1b5def75
Step 3/15 : COPY readme.txt /usr/local/readme.txt
 ---> 40553aa2d711
Step 4/15 : ADD jdk-8u411-linux-x64.tar.gz /usr/local
 ---> 64cb09aaba92
Step 5/15 : ADD apache-tomcat-9.0.88.tar.gz /usr/local
 ---> fc54d8d3e663
Step 6/15 : RUN yum -y install vim
 ---> Running in 38cd0fc85e05
```

最后构建成功如下所示：
![CleanShot 2024-05-02 at 00.23.20@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2000.23.20@2x.png)

![CleanShot 2024-05-02 at 00.24.25@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2000.24.25@2x.png)

4. 启动新构建的镜像文件
```bash
ubuntu@10-7-103-141:~/dockerfile/tomcat-dockerfile-test$ sudo docker run -d -p 8083:8080 --name mytomcattest -v /home/ubuntu/dockerfile/tomcat-dockerfile-test/test:/usr/local/apache-tomcat-9.0.88/webapps/test -v /home/ubuntu/dockerfile/tomcat-dockerfile-test/tomcat-logs:/usr/local/apache-tomcat-9.0.88/logs mytomcatos
87f0c5790f2d580ec41eda3439d2d36c5360b90ca122261f38f97b9b5b8a7d7d
```

![CleanShot 2024-05-02 at 01.29.30@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2001.29.30@2x.png)


挂载目录如下：
![CleanShot 2024-05-02 at 00.32.27@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2000.32.27@2x.png)

5. 发布项目（由于做了卷的挂载，所以可以直接在本地编写项目就可以发布了）
```xml
<?xml version="1.0" encoding="utf-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                                     http://java.sun.com/xml/ns/javaee/web-app_2.5.xsd"
                 version="2.5">
</web-app>
```

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCYTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>takuya study docker</title>
</head>
<body>
Hello world<br/>
<%
out.println("你的IP地址" + request.getRemoteAddr());
%>
</body>
</html>
```

通过测试结果可以看到，项目部署成功，并且可以成功访问。
![CleanShot 2024-05-02 at 01.27.03@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2001.27.03@2x.png)

### 5.6 发布自己的镜像

#### Docker Hub 发布

发布的具体步骤如下所示：
1. 前往[官网地址](https://hub.docker.com/)注册自己的账号。
2. 确认这个账号是可以登录的。
```bash
sudo docker login -u takuya
<输入密码>
```
3. 在服务器上提交自己的镜像.
4. 登录完成之后就可以提交镜像了，使用的命令是`docker push`
```bash
sudo docker push takuya/mytomcatos:1.0
```

登录命令：
```bash
ubuntu@10-7-103-141:~$ sudo docker login --help

Usage:  docker login [OPTIONS] [SERVER]

Log in to a Docker registry.
If no server is specified, the default is defined by the daemon.

Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username
```

提交的时候也是按照镜像的层级来进行提交的。

#### 提交到阿里云镜像服务

具体步骤如下所示：
1. 登录阿里云
2. 找到容器镜像服务
3. 创建命名空间
4. 创建容器镜像
5. 浏览阿里云
```bash
# 1. 登录阿里云Docker Registry,用于登录的用户名为阿里云账号全名，密码为开通服务时设置的密码
sudo docker login --username=xxxxx registry.cn-shanghai.aliyuncs.com

# 2. 从Registry中拉取镜像
sudo docker pull registry.cn-shanghai.aliyuncs.com/takuya-tomcat/tomcat:[镜像版本号]

# 3. 将镜像推送到Registry
sudo docker login --username=xxxxx registry.cn-shanghai.aliyuncs.com
sudo docker tag [Imaged] registry.cn-shanghai.aliyuncs.com/takuya-tomcat/tomcat-test:[版本号]
sudo docker push registry.cn-shanghai.aliyuncs.com/takuya-tomcat/tomcat-test:[镜像版本号]
```


## 六、Docker网络

### 6.1 理解Docker0

![CleanShot 2024-05-02 at 10.48.42@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2010.48.42@2x.png)

*思考：Docker 是如何处理容器的网络访问的？*

测试：运行一个Tomcat的容器，然后查看该容器的网卡信息：
通过查看网卡信息可以发现有一个`eth0`的网卡地址，这是 Docker 分配的。
![CleanShot 2024-05-02 at 11.05.17@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2011.05.17@2x.png)

*外部Linux系统能否ping通这个容器内部地址？*

![CleanShot 2024-05-02 at 11.07.46@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2011.07.46@2x.png)

**原理**
1. 当每启动一个Docker容器，Docker就会给Docker容器分配一个IP地址，只要安装了Docker，就会有一个网卡即Docker0，这个网卡的模式是桥接模式的，使用的技术是`evth-pair`技术。
2. Docker容器启动后生成的网卡都是一对一对的，这是因为使用了`evth-pair`技术，这个技术会让每一个启动后的容器生成一对虚拟设备接口，它们都是成对出现的，一端连着协议，一端彼此相连，从而实现通信。
3. 正因为有这个特性，`evth-pair`相当于充当了一个桥梁，连接各种虚拟网络设备。

网络模型图如下所示：
![CleanShot 2024-05-02 at 15.46.54@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2015.46.54@2x.png)

> 总结：
> 1. tomcat01 和 tomcat02 是将宿主机的 Docker0 作为桥接的路由器，所有的容器在不指定网络的情况下，都是由 Docker 0 路由的。Docker 0会给容器分配一个默认的可用IP。
> 2. Docker中的所有的网络接口都是虚拟的，虚拟的转发效率高。
> 3. 只要容器删除，对应的网桥也就删除了。

*思考：如果有一种场景下，当编写了一个微服务，例如`database url=ip`，项目不重启，但是此时数据库的IP地址变了，例如测试ping的时候，希望不是ping的IP地址，而是主机名，该如何实现？*

正常情况下，通过容器名称去进行联通性测试的时候，会遇到如下报错：
![CleanShot 2024-05-02 at 16.08.13@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2016.08.13@2x.png)

如果想要实现，那么就需要在启动容器的时候加上参数`--link 需要连通的容器名称`，例如：

```bash
ubuntu@10-7-103-141:~$ sudo docker run -it -P --name testnetwork04 --link testnetwork02 dockernetwork
```

测试结果如下所示：
![CleanShot 2024-05-02 at 16.16.05@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2016.16.05@2x.png)

*思考：那么 testnetwork02 是否可以反向ping通 testnetwork04？*
> 不可以，因为没有进行配置。

查看Docker网络的详细信息，可以通过命令`docker network inspect xxxx`

```bash
ubuntu@10-7-103-141:~$ sudo docker network ls
NETWORK ID     NAME             DRIVER    SCOPE
669f8fc951dc   bridge           bridge    local
8d0c8c94b87c   docker_default   bridge    local
6f1c24bc210a   host             host      local
5233b442f3a1   none             null      local
48321e8e6631   safeline-ce      bridge    local
ubuntu@10-7-103-141:~$

ubuntu@10-7-103-141:~$ sudo docker network inspect 669f8fc951dc
ubuntu@10-7-103-141:~$ sudo docker network inspect 669f8fc951dc
[
    {
        "Name": "bridge",
        "Id": "669f8fc951dce759a7935ee80142a726a5838c33aa462aa588563f3e9624df47",
        "Created": "2024-01-03T20:04:37.454981099+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",     # 网卡可以使用的IP地址个数
                    "Gateway": "172.17.0.1"        # Docker 0地址
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {          # 容器的IP地址和网络信息
            "60d6a6208f0a6103b945959b61d72b05c5d03980ef5ee2c58ade7ae7989f5180": {
                "Name": "testnetwork02",
                "EndpointID": "69ab3db0f3b1e1e3f7f3a152e8360049485a739880fc24c49c81b0b009df2a0c",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "abdc6a482ddec421f33d9af564f5046b4a913797747173acccd1b56b15fd94fe": {
                "Name": "testnetwork04",
                "EndpointID": "fbb79468d89e8d3a9e54785f6906fcfe9dca0fbed525716884c7181f2448e744",
                "MacAddress": "02:42:ac:11:00:04",
                "IPv4Address": "172.17.0.4/16",
                "IPv6Address": ""
            },
            "f30aad0f74f25e161577f1acfacc21387b91af207b34d48d39de79d79026deeb": {
                "Name": "testnetwork",
                "EndpointID": "7a852863e9ff34ca460e50e5fc8a58a1d026ef06fe7f401703e9ab862448e9b3",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
ubuntu@10-7-103-141:~$
```

`--link`参数的本质是什么？
![CleanShot 2024-05-02 at 16.25.26@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2016.25.26@2x.png)

> 现在玩Docker 已经不建议使用`--link`了。

现在通常都使用自定义网络，Docker0的缺陷：不支持通过容器名连接访问。

### 6.2 自定义网络

查看所有的Docker网络，可以使用命令`docker network ls`
![CleanShot 2024-05-02 at 16.31.09@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-02%20at%2016.31.09@2x.png)

**网络模式**
网络模式有以下几种：
1. bridge：桥接模式
2. none：不配置网络
3. host：和宿主机共享网络
4. container：容器网络连通（用的很少，局限性很大）

测试：
1. 在默认情况下，启动容器时就会自动带上参数`--net bridge`.
```bash
sudo docker run -it -P --name testnetwork --net bridge dockernetwork
```

2. 创建一个自定义网络
```bash
sudo docker network create --driver bridge --subnet 192.168.0.0/24 --gateway 192.168.0.1 mynewdockernetwork


# 参数解释：
--driver bridge           # 网络模式设置为桥接，默认的
--subnet 192.168.0.0/24   # 设置所属网段
--gateway 192.168.0.1     # 设置网关地址，也就是宿主机的IP地址
mynewdockernetwork        # 设置网卡名称
```

3. 在启动容器的时候，指定使用刚才创建的网络
```bash
sudo docker run -it -P --name docker-my-net --net mynewdockernetwork
```

> 使用自定义网络的好处：不同的集群使用不同的网络，可以保护集群是安全和健康的。

### 6.3 网络互通

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240503000928.png)
那么就需要使用到一个`docker network`命令中的一个参数`connect`
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240503001029.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240503001147.png)

该命令的实质就是将容器添加到对应的网络中，也就是**实现了一个容器2个IP**；

### 6.4 实战；创建Redis集群

1. 创建一个Redis的网络
```bash
ubuntu@ubuntu:~/mydockerfile/test-dockerfile$ sudo docker network create redis --subnet 172.38.0.0/16
e40e40a039ceece36931b532cdf1d294f1a8d536bdea54def8f24a675a872b9d

ubuntu@ubuntu:~/mydockerfile/test-dockerfile$ sudo docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
.........
e40e40a039ce   redis     bridge    local
```

2. 通过编写脚本，实现配置6个redis配置
```bash
for port in $(seq 1 6); \
do \
mkdir -p  /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
appendonly yes
EOF
done
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240503003421.png)

3. 接下来就是启动 redis 的容器
```bash
sudo docker run -p 6371:6379 -p 16371:16379 --name redis-node1 -v /mydata/redis/node-1/data:/data -v /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf -d --net redis -ip 172.38.0.11 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
```

当然也可以使用脚本的形式直接一次就启动6个redis的容器，脚本相关内容如下：
```bash
docker run -p 637${port}:6379 -p 1637${port}:1637p --name redis-${port} \
-v /mydata/redis/node-${port}/data:/data \
-v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.${port} redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
```

4. 创建集群
```bash
# 启动容器之后，进入其中的一个容器
sudo docker exec -it xxxxx /bin/sh

redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1
```