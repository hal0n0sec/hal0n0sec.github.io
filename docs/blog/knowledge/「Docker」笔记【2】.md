---
date: 2024-05-04 00:37:00
---

# 「Docker」笔记【2】

## 一、容器编排

*容器编排可以让使用容器变得更加简单。*

### 1.1 基本概念

#### 1.1.1 什么是容器编排

容器编排：就是针对容器生命周期的管理，对容器的生命周期进行更快速方便的方式进行管理。

#### 1.1.2 为什么需要容器编排？

- **依赖管理**：当一个容器必须在另一个容器运行完成后，才能开始运行，此时就需要依赖管理；
- **副本数控制**：容器有些时候也需要集群，副本数控制可以实现快速的对容器集群进行弹性伸缩的处理。
- **配置共享**：通过配置文件统一描述需要运行的服务相关信息，自动化的解析配置内容，并构建相应的服务。

---

### 1.2 容器编排实现的方式

#### 1.2.1 Docker-compose （单机）

有些时候会需要涉及到在一台机器上部署多个容器，那么此时在手动的每次输入类似的一堆配置命令来启动容器，产生了很多无意义的重复性劳动，针对单机的多容器部署的情况，Docker提供了一个单机版本的服务编排工具 Docker Comopse。

Docker compose可以高效便捷的管理单机上运行的所有容器，它他通过`yaml`配置文件的方式完成之前执行`docker run`命令所设置的所有参数，所以可以先针对单机上的所有容器进行相关配置，配置完成后即可使用`docker-compose`对单机多容器进行高效的管理。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240503131912.png)

##### 安装docker-compose v2

1. 安装pip
```bash
curl -s https://bootstrap.pypa.io/get-pip.py | python3
```

2. 安装docker-compose
   安装了pip之后就可以直接使用pip来安装docker-compose了
```bash
sudo pip3 install docker-compose
```

安装完成后，执行`docker-compose -v`，有返回则说明安装成功。

##### 关于docker-compose的版本和docker-compose.yml中version的理解

Docker Compose是一个用于管理Docker应用程序的工具，它允许使用YAML文件来定义应用程序的服务、网络和卷等内容，并在单个主机或者多个主机上进行部署，Docker Compose有以下版本：

- V1版本：这是最早的版本，支持基本功能，例如构建镜像、启动容器、设置环境变量等；
- V2.x版本：增加了对Swarm模式的支持，可以通过`docker stack`命令将Compose文件部署到Swarm集群中；
- V3.x版本：引入了一些新的特性，例如配置命名空间、healthcheck检查、秘密管理等，同时也提供了对Kubernetes的支持。

在`docker-compose.yml`文件中执行的`version`必须与安装在主机上的Docker Compose版本相互匹配，如果使用不同版本之间的兼容性问题，可能会导致意外行为或错误，通常情况下，使用最新版本的docker compose是最好的选择，因为它包含了最新的特性和修复了已知的漏洞，可以通过以下命令来检查所安装的Docker Compose版本：

```bash
docker-compose version
```

然后在`docker-compose.yml`文件中指定适当的版本号，例如：
```yml
version: "3.8"
services:
   .....
```

> 总之，Docker Compose有几个版本 ，每个版本都提供了不同的特性和兼容性，在编写Docker-compose.yml我呢见时，需要确保所指定的version与主机上安装的Docker Compose版本相互匹配，以避免出现问题。

版本对应关系包表如下所示：


| Docker Compose 版本 | Version字段值   |
| ----------------- | ------------ |
| 1.0.x             | "1"          |
| 1.1.x             | "2"          |
| 1.2.x             | "2.1"        |
| 1.3.x             | "2.1"        |
| 1.4.x             | "2.1"        |
| 1.5.x             | "2.1"        |
| 1.6.x             | "2.1"        |
| 1.7.x             | "2.1"        |
| 1.8.x~1.10.x      | "2.1"        |
| 1.11.x            | "2.1"或"2.2"  |
| 1.12.x~1.13.x     | "2.1"或者"2.2" |
| 1.14.x            | "2.1"或者"2.3" |
| 1.15.x            | "2.1"或者"2.3" |
| 1.16.x~1.17.x     | "2.1"或者"2.3" |
| 1.18.x            | "2.1"或者"2.4" |
| 1.19.x            | "3.0"        |
| 1.20.x            | "3.0"        |
| 1.21.x            | "3.0"        |
| 1.22.x            | "3.0"        |
| 1.23.x            | "3.0"        |
| 1.24.x~1.27.x     | "3.0"        |
| 1.28.x            | "3.7"或"3.8"  |
| 1.29.x            | "3.7"或"3.8"  |

##### `docker-compose`和`docker compose`的区别

在实际应用过程中，会发现有些时候命令是`docker-compose`，而有些时候会遇到命令是`docker compose`，那是因为Compose分为V1和V2 两个版本，安装方式也分为两中国，一种是*独立安装*，一种是*插件安装*，所以有4中组合方式：

|                  | V1             | V2             |
| ---------------- | -------------- | -------------- |
| standalone(独立安装) | docker-compose | docker-compose |
| plugin(插件式安装)    | 无法安装成功         | docker compose |

**结论**：
1. 独立安装的Compose，无论是V1 还是V2版本，都是使用命令`docker-compose`
2. 插件安装的 Compose，在V2版本，命令是`docker compose`，最新版本的Docker安装时会自动以插件的方式安装docker compose；
3. 支持同时采用两种方式安装Compose，安装后也可以同时使用`docker-compose`和`docker compose`


##### 实战：Docker compose

[官方docker-comopse文档地址](https://docs.docker.com/compose/reference/)

对于docker-compose的配置文件，重点是在于服务（services）、网络（networks）、数据卷（volumes)。

- 服务（services）
    - 需要运行的容器配置，可以理解为原先用`docker run`命令后面跟的一系列配置信息，都配置在这个下面。
- 网络（networks）
    - docker-compose公共自定义网络管理，配置好之后，可以直接在services中引用该网络配置，这个配置可以被多个services使用。
- 数据卷（volumes）
    - docker-compose 下的统一数据卷管理，可以提供给多个services使用。

1. 编写的第一个docker-compose.yml文件内容如下：
```yml
version: "2"
services:
  # 其中的一个service的配置
  nginx-demo:
    image: "nginx"
    # 指定容器的名称
    container_name: "mydockercompose"
    restart: "always"
    networks:
       - mytest_net
    volumes:
       # 或者也可以在这里直接写：/www/test.com:/usr/share/nginx/html
        - /www/test.com:/usr/share/nginx/html
    # 环境变量配置
    environment:
       APP_ENV: dev
    # 指定容器内使用的dns地址
    dns:
      - 114.114.114.114

networks:
   mytest_net:
     driver: bridge
     ipam:
       config:
          - subnet: 172.48.0.0/16
            gateway: 172.48.0.1

volumes:
   mytest_volume:
     - nginx_volume: /usr/share/nginx/html
```

编写完成后，通过`docker-compose config`检查配置文件是否存在问题

![CleanShot 2024-05-03 at 23.49.10@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-03%20at%2023.49.10@2x.png)

2. **创建服务**，有两种创建的方式，命令分别为：
```bash
sudo docker-compose create         # 创建所有的services
sudo docker-compose create nginx-demo      # 只创建指定的服务
```

![CleanShot 2024-05-03 at 23.55.04@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-03%20at%2023.55.04@2x.png)

可以通过命令`docker-compose ps -a`来查看已经创建的服务（创建但是没有运行的）
```bash
ubuntu@10-7-103-141:~/dockerfile/dockercompose-tets/nginx$ sudo docker-compose ps -a
NAME                IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
mydockercompose     nginx               "/docker-entrypoint.…"   nginx-demo          2 minutes ago       Created
ubuntu@10-7-103-141:~/dockerfile/dockercompose-tets/nginx$
```

3. **运行服务**，运行服务也有两种方式，可以是运行docker-compose.yml中的所有services，也可以指定某个service。
```bash
sudo docker-compose up -d
sudo docker-compose up -d nginx-demo
```

![CleanShot 2024-05-03 at 23.59.53@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-03%20at%2023.59.53@2x.png)

*注意，此时看到的80端口指的是容器内的80端口，与容器外部访问的端口没有任何关系！*

所以此时，还需要修改docker-compose.yml文件，添加端口映射的相关参数。

![CleanShot 2024-05-04 at 00.03.38@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.03.38@2x.png)

然后接下来对docker-compose.yml文件修改后需要重新进行读取，使用命令`docker-compose up -d`
![CleanShot 2024-05-04 at 00.07.10@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.07.10@2x.png)

使用curl访问8088端口，就可以看到403页面内容
![CleanShot 2024-05-04 at 00.08.18@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.08.18@2x.png)

4. **弹性扩容**，接下来测试一次运行多个容器，进行弹性扩容的测试，假设现在需要运行3个nginx-demo的容器，就可以使用命令`docker-compose scale nginx-demo=3`（Docker Compose V1中使用的命令），在V2中使用命令`docker-compose up -d --scale nginx-demo=3`
   ![CleanShot 2024-05-04 at 00.17.18@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.17.18@2x.png)

*解决方法：修改docker-compose.yml文件，将container_name注释*

![CleanShot 2024-05-04 at 00.18.52@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.18.52@2x.png)

接下来重新进行弹性扩容的测试：

![CleanShot 2024-05-04 at 00.20.04@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.20.04@2x.png)

*解决方法：修改docker-compose.yml文件，将ports参数进行修改*

![CleanShot 2024-05-04 at 00.22.52@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.22.52@2x.png)

![CleanShot 2024-05-04 at 00.23.57@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.23.57@2x.png)

接下来，假设希望进行缩容，不需要运行3个nginx-demo了，实现方式如下：

![CleanShot 2024-05-04 at 00.27.31@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.27.31@2x.png)

如果希望查看docker-compose的相关日志信息，则可以使用命令`docker-compose logs`（查看所有的容器的日志），也可以针对某个service的日志进行查看，则使用命令`docker-compose logs -f nginx-demo`

![CleanShot 2024-05-04 at 00.30.21@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-05-04%20at%2000.30.21@2x.png)

**docker-compose的常用命令**，更加详细的帮助信息可以通过命令`sudo docker compose COMMAND --help`来进行查看。

```bash
ubuntu@10-7-103-141:~/dockerfile/dockercompose-tets/nginx$ docker-compose -h

Usage:  docker compose [OPTIONS] COMMAND

Define and run multi-container applications with Docker.

Options:
      --ansi string                Control when to print ANSI control characters
                                   ("never"|"always"|"auto") (default "auto")
      --compatibility              Run compose in backward compatibility mode
      --dry-run                    Execute command in dry run mode
      --env-file stringArray       Specify an alternate environment file.
  -f, --file stringArray           Compose configuration files
      --parallel int               Control max parallelism, -1 for unlimited (default -1)
      --profile stringArray        Specify a profile to enable
      --progress string            Set type of progress output (auto, tty, plain, quiet) (default "auto")
      --project-directory string   Specify an alternate working directory
                                   (default: the path of the, first specified, Compose file)
  -p, --project-name string        Project name

Commands:
  build       构建或重新构建一个服务
  config      验证并查看compose文件
  cp          Copy files/folders between a service container and the local filesystem
  create      创建一个服务
  down        停止并删除容器、网络、镜像和数据卷
  events      Receive real time events from containers.
  exec        在一个运行中的容器执行命令
  images      List images used by the created containers
  kill        关闭一个容器
  logs        显示服务的日志信息
  ls          List running compose projects
  pause       暂停一个服务
  port        打印一个端口绑定的公开端口
  ps          查看容器列表
  pull        拉取镜像
  push        推送镜像
  restart     重启容器
  rm          删除已经停止的容器
  run         运行一个一次性执行的命令
  start       启动服务
  stop        停止服务
  top         Display the running processes
  unpause     恢复一个暂停的服务
  up          创建并启动一个容器
  version     显示compose的版本信息 
```

#### 1.2.2 Swarm（分布式）

Swarm可以实现跨机器的Docker自动化部署。

{未完待续.....}