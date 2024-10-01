# 「Docker」代理配置

## 0x01 优雅配置Docker代理

有时候因为网络原因，需要使用代理，Docker的代理配置，有3种场景，但是基本上原理都差不多，都是利用了 Linux 的 `http_proxy` 等环境变量。

### 1.1 Dockerd 代理

在执行 `docker pull` 的时候，是由守护进程 `dockerd` 来执行的。因此，代理需要配置在 `dockerd` 的环境中，而在这个环境中，则是受 `systemd` 的管控，因此实际上是 `systemd` 的配置。

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf
```

在这个 `proxy.conf` 文件中，添加以下内容：

```bash
[Service]
Environment="HTTP_PROXY=http://x.x.x.x:7890"
Environment="HTTPS_PROXY=http://x.x.x.x:7890"
Environment="NO_PROXY=localhost,127.0.0.1,.baidu.com"
```

其中，如果想要换成可用的免密代理，通常使用 `cntlm` 在本机自建免密代理，去对接其他的代理。

### 1.2 Container代理

在容器运行阶段，如果想要代理上网，则需要配置 `~/.docker/config.json`，以下配置，只能在 Docker 17.07及以上版本生效。

```json
{
"proxies":
    {
        "default":
        {
            "httpProxy": "http://x.x.x.x:7890",
            "httpsProxy": "http://x.x.x.x:7890",
            "noProxy": "localhost,127.0.0.1,.baidu.com"
        }
    }
}
```

以上这个是用户级的配置，除了 `proxies`, `docker login` 等相关信息也会在其中，而且还可以配置信息展现的格式、插件参数等。

另外，容器的网络代理，也可以直接在其运行时通过 `-e`注入`http_proxy`等环境变量，这两种方法分别适用于不同的场景，`config.json`比较方便，默认在所有配置修改后启动的容器生效，适用于个人开发环境。在 CI/CD 的自动构建环境、或者实际上线运行的环境中，这种方式就不太适用，用 `-e` 注入这种显示配置方式会更合适，减轻对构建、部署环境的依赖，最好用良好的设计避免配置代理进行上网。

### 1.3 Docker build 代理

虽然 `docker build` 的本质，也是启动一个容器，但是环境会略有不同，用户级的配置是无效的，在构建的时候，需要注入 `http_proxy` 等参数。

```bash
docker build . \
	--build-arg "HTTP_PROXY=http://proxy.example.com:7890/" \
	--build-arg "HTTPS_PROXY=http://proxy.example.com:7890/" \
	--build-arg "NO_PROXY=localhost,127.0.0.1,.example.com" \
	-t your/image:tag
```

注意：无论是 `docker run` 还是 `docker build` ，默认情况下网络是相互隔离的，如果代理使用的是 `localhost:7890` 这种，则会无效，这一类仅限本地的代理，必须加上 `--network host` 才能正常使用，而一般则需要配置代理的外部IP，而且代理本身要开启 `Gateway` 模式。

### 1.4 重启生效

代理配置完成后，`reboot`重启当然是可以生效的，但是不重启的话也是可以的。

`docker build` 代理都是在执行前进行配置的，所以修改后，下次执行就会生效。`Container` 代理的修改也是立即生效的，但是只针对以后启动的 `Container` ，对已经启动的 `Container` 则无效。

`dockerd` 代理的修改比较特殊，它实际上是修改 `systemd` 的配置，因此需要重载 `systemd` 并重启 dockerd 才能生效，所以需要执行下面的命令：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```



## 0x02 配置docker通过代理拉取镜像

如果docker所在的环境是通过代理服务器进行上网的，那么需要配置之后才能让docker也通过代理来拉取镜像，然而仅仅通过配置环境变量的方法是不行的。

### 2.1 问题现象

如果不配置代理服务器就直接拉取镜像，docker 会直接尝试连接镜像仓库，并且出现连接超时的报错，如下：

```bash
$ docker pull busybox
Using default tag: latest
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled 
while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

常规的命令行程序如果要使用代理，需要配置两个环境变量，也就是 `HTTP_PROXY` 和 `HTTPS_PROXY`，但是仅仅这样配置，也是不能让docker成功拉取镜像。

因为镜像的拉取和管理都是 `docker daemon`负责的，因此需要让 `docker daemon` 知道代理服务器的存在，而 `docker daemon` 是由 `systemd` 管理的，所以想要解决问题，则需要从 `systemd` 配置入手。

### 2.2 解决问题

1. 黄健 dockerd 相关的 `systemd` 目录，则个目录下的配置将覆盖 dockerd 的默认配置

   ```bash
   sudo mkdir -p /etc/systemd/system/docker.service.d
   ```

2. 新建配置文件，并配置相关的环境变量

   ```bash
   sudo touch /etc/systemd/system/docker.service.d/http-proxy.conf
   
   # 配置内容：
   [Service]
   Environment="HTTP_PROXY=http://x.x.x.x:7890"
   Environment="HTTPS_PROXY=http://x.x.x.x:7890"
   ```

   如果自己建立了私有的镜像仓库，需要 dockerd 绕过代理服务器直连，那么就需要配置 `NO_PROXY` 变量

   ```bash
   [Service]
   Environment="HTTP_PROXY=http://x.x.x.x:7890"
   Environment="HTTPS_PROXY=http://x.x.x.x:7890"
   Environment="NO_PROXY=localhost,127.0.0.1,*.baidu.com,your-registry.com"
   ```

   多个 `NO_PROXY` 变量之间使用逗号 `,`隔开，而且可以使用通配符 `*`，极端情况下，如果 `NO_PROXY=*`则表示所有的请求都不通过代理服务器。

3. 最后需要重新加载配置文件，重启 dockerd

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

4. 检查确认环境变量已经正确配置

   ```bash
   sudo systemctl show --property=Environment docker
   ```

   或者从 `docker info`的结果中来查看配置项是否成功。



​	