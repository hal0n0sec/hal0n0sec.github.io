# Cloudflare CDN 加速 Verlcel 访问

## 0x01 什么是CDN

内容分发网络（CDN，Content Delivery Network）是一种分布式网络架构，它将网站的静态资源（图片、视频、CSS、JavaScript等）缓存到全球各地的服务器上，用户访问网站时，可以从距离自己最近的服务器获取所需要的内容，从而大大减少了数据传输的延迟，提升了网站的加载速度和响应能力。

CDN的核心优势在于它的分布式缓存机制，通过将网站内容分发到全球各地的服务器上，CDN能够实现对用户的就近访问，有效的减轻服务器的负载压力，同时降低了网络拥塞的可能性，此外，CDN还提供了高可用性和可扩展性，即使部分服务器出现故障或者访问量激增，也能保证网站的正常访问。

![](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20241010095122.png)

用个通俗的说法来解释，就是CDN的服务公司（CloudFlare）通过在全球各地建立很多的服务器，然后当你加入他们的网络之后，他们会缓存（复制）你的网站上的内容到各地的服务器上，这样的话如果有附近的访客访问你的网站的时候，他们就会直接从距离他们IP地理位置最近的缓存服务器上读取到你的网站的内容，而不需要跑到网站原始服务器上去读取内容，大大缩减了访客看到你网站的时间，变相缩减了网站的加载时间。

另外，从安全性角度出发，如果你的网站是部署在云服务器端，那么CDN从某种角度上来说还可以隐藏真实网站服务器的地址（当然，花点精力还是有很多方法可以获取到真实的IP的），并且还能够从一定程度上防止了DDoS攻击。从下面这张图可以看到，从不同的地址位置来访问我们的博客网站，响应的IP地址都是不一样的。

![](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20241010094740.png)

说到CDN的原理时，那么就需要说到DNS、Anycast这些了。

[参考文章1：深入理解 CDN 服务, 并使用 Cloudflare 优化网络链路](https://rapidsu.cn/articles/3872)

[参考文章2：什么是CDN? 独立站速度优化之Cloudflare CDN](https://www.qingsongb2c.com/speed-up-your-website-with-cloudflare-cdn/)

## 0x02 什么是AS（自治系统）

> 互联网（Internet）是由不同网络组成的网络，自治系统是组成互联网的大型网络。更具体的说，自治系统是具有统一路由策略的巨型网络或网络群组，连接到 Internet 的每台计算机或设备都连接到一个AS

为了方便理解，打个比方，假如现在房间里的两台家用路由器就是2个单独的AS，称为AS1、AS2，忽略掉内外网的概念，AS1负责解析1.1.1.1-2.2.2.2网段，AS2负责3.3.3.3~4.4.4.4网段，所有拉网线到AS1这台路由器的设备会获取这个网段的一个IP，其他设备也都接到这个路由器下，那么设备之间就可以使用AS1网段的IP来进行局域网的通信了。

假设现在有20个这样的路由器（想象为20个AS），且AS之间建立连接的方式只有物理拉网线，AS1和AS2直接网线对接，通过路由协议同步了两边可以解析的IP，由此，2个“局域网”就可以实现相互通信了。

由于直接相连的AS之间会根据路由协议同步路由表，因此即使20台路由器串连，每台设备最终也可以知道其他全部的AS的路由器情况。比如 `AS1 <=> AS2 <=> AS3`，对于AS2来说AS1、2、3的路由表它都知道，并且也能告诉AS1、3，所以AS1也知道AS3的路由表，即使他们没有直接相连。对于拉网线接到了AS1的设备，自己的AS1（边界）知道目标IP归属于哪个具体的AS，从而就可以传输数据实现通信。

真实世界的AS就是上面所述的扩大化，由国家、运营商、跨国公司运营的网络集群就是AS，单个AS可以看作一个巨大的“局域网”，AS之间也是根据地理位置来拉网线，比如沪日专线、太平洋光缆等等。

![](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20241010101806.png)

## 0x03 什么是BGP（边界网关协议）

> 每个AS使用BGP通知它们负责的IP地址以及它们连接的其他 AS，BGP路由器从世界各地的AS中获取所有这些信息，并将其放入路由表的“数据库”中，以确定从AS到AS之间的最快路径，当数据包到达时，BGP路由器会参考其路由表来决定数据包接下来要转发到哪个AS中。

想象一下，互联网就像是一张巨大的地图，而BGP路由器就像是地图上的主要城市，每个BGP路由器都知道如何到达其他城市（即其他网络）。我们可以用百度地图来理解BGP的工作过程：

1. 起点和目的地：假设现在你在北京（代表源），想要发送一个数据包到上海（即目标网络）。
2. 路径的选择：就像我们平时使用百度地图进行导航一样，它会给你提供多条路线，BGP也会知道多条到达目的地的路径，它会选择最优的路径，通常是“跳数”最少的路径（就类比于百度地图默认推荐最短时间的路线）。
3. 中转站：在你从北京到上海的途中，一定会经过一些中间城市，比如天津、济南等，那么在BGP中，这些中间城市就相当于中间的自治系统（AS）。
4. 路况更新：如果我们在途中的某条高速公路遇到了堵车（在网络环境中可能会遇到链路故障等），百度地图会实时更新，然后给我们推荐新的路线，同样的，BGP路由器也会不断的交换路由信息，及时来更新最佳路径。
5. 分布式决策：每个城市（BGP路由器）只负责决定下一站往哪里走，这就好比当你到达天津了，天津的BGP路由器会决定下一站是去济南还是走南京。
6. 策略路由：有的时候，即便不是最短的路径，百度地图也可能会推荐你走某条特定的路（就像会帮助你避开收费站），BGP协议也允许网络管理员设置策略，从而来选择特定的路线。
7. 大型转运中心：一些大的城市比如上海、广州等，属于重要的交通枢纽，那么在BGP协议的网络中，一些大型的ISP（互联网服务提供商）的路由器就扮演类似的角色，处理大量的网络流量。

## 0x04 什么是Anycast（任播）

任播Anycast就是在多个不同地点的AS广播同一个IP地址（比如223.5.5.5），不同地理位置的用户请求这个相同的IP地址的时候，会借由BGP协议自动找到离他最近的AS，从而来优化链路和响应时间。

![CleanShot 2024-10-11 at 00.30.34@2x](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-10-11%20at%2000.30.34@2x.png)

> 大多数AS连接到其他的几个AS，如果一个AS仅连接到另外一个AS并且共享相同的路由策略，则可以将其视为第一个AS的子网。

AS取决于真实世界中物理设备的连接情况，往往一栋楼、一个学校都可以是同一个AS，只要他们属于同一个运营商（也就是ISP，比如电信、联通等），当然AS编号是可能有所不同的。

比如，阿里要部署一个服务到223.5.5.5，并且用北上广深多个AS机房广播这个IP，在全国不同地方的用户请求这个相同的IP，则可以借由BGP找到离自己最近的AS地址，优化网络链路。

**并且，Anycast 是防御DDoS攻击的最佳手段**

假设一个服务域名是 xxoo.com，解析到 223.5.5.5 这个地址，此时 xxoo.com 被DDoS打挂了，有2种方式可以进行缓解：

1. DNS切流：将 xxoo.com 切换解析到 223.6.6.6，因为存在世界范围的解析以及客户端的 TTL 缓存，仍会有小段时间，服务处于挂掉的状态。
2. 将223.5.5.5做Anycast，同时在许多的AS中进行广播，那么即便是其中一个AS被打挂了，BGP会立马更新到AS2，这就可以理解为我们上面说的，如果在高速路上出现了堵车，BGP协议会进行更新，采用这种方式的话，就不会出现短时间的挂掉的状态了。

## 0x05 什么是弹性公网IP（EIP）？

> 来自亚马逊科技的描述：弹性公网IP（Elastic IP Address，简称 EIP）作为能够独立购买和持有的公网IP资源，主要作用是为云资源提供稳定的公网访问能力，用户可以通过绑定 EIP 将云资源与公网通信连接，使它能够通过公网IP进行访问。

那么弹性公网IP和我们平时所说的公网IP有什么区别？

EIP和公网IP都是IP，IP本质上是没有区别的，EIP 是一种更灵活的公网IP，它需要单独付费购买，而普通的公网IP则是当我们购买了云服务器之后，会自动分配的IP地址，EIP 最大的优点在于其可以长时间持有和无需绑定固定实例。

比如，一台云服务器都有分配一个固定的公网IP（普通的公网IP），那么这个公网IP只能用于这个云服务器，当这台云服务器资源被释放的时候，这个分配的固定公网IP也会随之被释放。

EIP 没有像普通公网IP一样绑定了固定的云服务器，它是单独的，用户可以将它们绑定到任意的云服务器上，并且当云服务器资源被释放的时候，EIP 不会被释放，因为这是用户单独购买的产品。

在下面这几种场景下，EIP 的优势就凸显出来了：

1. 业务连续性和出现故障的时候：当运行业务的服务器出现故障的时候，EIP 可以快速的将IP地址重新绑定到备用服务器上，大大的减小了服务中断的时间，对于需要高可用性的应用，这种快速切换能力就显得非常重要了。
2. 动态资源扩展：在需要根据负载动态增减服务器数量的场景中，EIP 可以方便的在不同实例间迁移，这对于实现自动扩缩容（auto-scaling）策略特别有用。
3. 多环境切换：在开发、测试、生产多个环境之间，可以通过切换 EIP 快速改变流量的走向。
4. 网络拓扑灵活调整：在复杂的网络架构中，EIP 允许更灵活的调整网络拓扑结构，例如快速切换主备系统。



对于AWS、阿里云这种使用Anycast提供的 EIP 服务就是我们上面说到的这些知识点的实践，绑定用户机器实例的固定IP已经有了Anycast优化，IP会最快的通过阿里自己的AS，然后再找到目标AS，最终优化链路。



