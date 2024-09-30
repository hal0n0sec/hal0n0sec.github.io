---
date: 2024-09-29 12:00:00
---

# 「应用协议」什么是DNS泄露

## 0x01 前置知识

首先让我们回顾一下计算机网络中的TCP/IP五次那个结构模型



### 系统代理

启用系统代理之后，遵循系统代理规则的软件就会将访问网络的请求交给 clash。

> 系统代理只是一种行业内的非强制性 “约定”，并非所有程序都遵守，完全靠软件开发者自发，实际上除了浏览器，很多软件都不走系统代理的。

整个过程是这样的：
1. 打开 clash 的系统代理，当我们在浏览器中访问网页发起 HTTP 请求之后，就比如我们访问了`google.com`，访问 `google.com` 请求就被交给 clash；
2. clash会先根据分流规则判断是否需要走代理，这里访问的是Google，显然是需要走代理的；
3. 于是 clash 将收到的数据进行加密封装，这里 clash 运行在网络协议中的应用层，再加上传输层的头、网络层的协议头等；
4. 最后经过家里的路由器，最终发到代理服务器上（即俗称的节点）。
5. 之后就由节点来完成访问 Google 网页的过程，并作为访问者和 Google 的中转，我们和 Google 之间的双向数据传输都要通过刚刚的路径，于是借助节点，完成了我们访问外网的需求。

### Tun模式

之前也提过，很多软件是不走系统代理的，所以 `Tun` 模式就派上用场了。

Tun 模式的原理是：代理程序（以前面提到的 clash 为例）会创建一张虚拟网卡，将所有网络请求重定向到这张虚拟网卡上，代理程序从虚拟网卡中读取并处理网络请求。

Tun 模式工作在 **网络层**，这里的 `所有网络请求` 指的是*在网络层接管所有的网络流量*，由于路由器也是工作在网络层的设备，所以通过软路由的方式与 Tun 模式其实是差不多的。

Tun 模式下整个过程是这样的：
1. 打开 clash 的Tun模式，当我们在浏览器中访问网页后会发起HTTP请求，例如接下来我们要访问 `google.com` ；
2. 访问 `google.com` 请求会按照正常流程根据协议栈先后进行封装，加上传输层的头部、网络层的头部；
3. 由于 clash 会接管网络层的所有流量，于是流量来到了 clash，接下来还是根据分流规则判断是否走代理；
4. 假设判断的结果是要走代理，clash 处理完加密等操作后，流量就从 clash 的虚拟网卡流量物理网卡，后面的过程就和之前所述的一样了。

### DNS的过程

本机向互联网请求外部网页的时候，比如访问 `baidu.com` ，需要将 `baidu.com` 这种方便人类记的域名解析成 `baidu.com` 域名服务器真实的IP地址，而 DNS 协议就是完成这项工作的。

完成的DNS解析过程是这样的：
1. 本机的浏览器访问 `baidu.com` 时，在检查浏览器DNS缓存和操作系统DNS缓存（相关联的文件就是Windows 系统中的 `hosts` 文件）中不存在 `baidu.com` 后，便会发送一条 DNS 查询请求。
2. 如果接下来经过的所有DNS服务器中都不存在 `baidu.com` 的 DNS 缓存，这条 DNS 查询请求会先后经过家里的路由器（也就是你电脑上的默认DNS服务器）、运营商DNS、中间一系列DNS服务器（运营商会配置多个上游的DNS服务器），最终到达 `baidu` 权威DNS服务器（这台服务器一定能够解析到 `baidu.com` 的IP地址）。
3. `baidu` 的权威DNS服务器会把含有 `baidu.com` 对应的IP地址的数据包原路返回给访问者，拿到这个IP地址之后，那么我们就可以访问 `baidu.com` 了。
4. 原路返回的过程中，经过的那些DNS服务器也会缓存下来 `baidu` 的这条DNS查询结果，下次查询 DNS 查询请求就不需要经过那么多设备一直到权威DNS服务器了。

## 0x02 DNS泄露

### 什么是DNS泄露

当开启了系统代理来访问 `google.com` 时，浏览器的请求被 clash 接管，之后 clash 会按照分流规则来处理这条请求，此时分为两种情况：
1. 一种情况是有类似 `DOMAIN-SUFFIX, google.com, 节点1`  这种分流规则，这种情况匹配到规则后，就会直接把由远程的代理服务器来接管所有的网络请求相关的操作（包括DNS查询）。
2. 另一种情况就是，如果没有第一种情况提到的规则时，一般的机场配置文件的 rules（即分流规则）部分的最后2行一般是：
```text
- GEOIP,CN,DIRECT
- MATCH, 代理节点1
```
3. 这种情况，前面没有能够匹配 `google.com` 的规则，那最终就会尝试匹配 `GEOIP, CN, DIRECT` ，这条规则的意思是，遇到来自国内的 IP 就走直连不走代理；
4. `google.com` 是一个域名，但是这里匹配的是IP地址，所以当匹配到这条规则的时候会使用本机默认的DNS服务器进行DNS查询，由于这个 DNS 查询是没有经过了 clash 代理的，DNS是明文数据包，因此这样一来，运营商便知道了我们在尝试访问 `google.com`。
5. 由于 `GEOIP, CN, DIRECT` 这条规则没有匹配上（因为 `google.com` 的IP不是国内的IP，其实是由于 GFW 的存在 ，`google.com` 的DNS会被污染，不会拿到真正的 Google 的 IP，但这里被污染的 IP 一般也是非国内的 IP）；
6. 访问 Google 的请求会被最后一行的 `MATCH, 代理节点1` 匹配，从而走了代理，所以访问 Google 还是可以实现的（代理节点会重新进行 DNS查询，拿到真正的、未被污染的Google的真实IP）；
7. 但是由于前面所提到的那个DNS查询，运营商知道了我们在尝试访问 Google，这就是我们所说的 DNS 泄露。

### ipleak等检测DNS泄露的网站的原理

ipleak 这个网站可以检测是否有 DNS泄露发生，下面讨论一下关于这类网站检测的原理；

当我们访问 `ipleak.com` 的时候，这个网站就会在后台发送一系列的 DNS请求，并且每个请求的域名都是不一样的，这些域名实际上都是完全随机生成的，因此可以保证2点：
1. 域名是唯一的；
2. 域名不会再一系列中间DNS服务器的缓存中存在；

这保证了DNS查询请求可以最终到达 ipleak 权威DNS服务器，基于以上两点，ipleak 便能够定位到哪些DNS 查询是访问者请求的。

假设现在访问 ipleak 时随机生成了一个 `12306.ipleak.com` ，接下来将发送一条DNS查询请求，最终到了 ipleak 权威DNS服务器，由于这个 `12306` 是访问者电脑上生成的，且独一无二的，那么 ipleak 就知道这条是访问者的电脑上发起的请求。

实际上，ipleak 的权威DNS服务器会记录下DNS查询请求的DNS服务器的 IP 地址（在整条DNS查询链路中则对应着倒数第2个DNS服务器），这个信息也会同步给 ipleak 网站，这样一来，ipleak 便知道了访问者请求的DNS服务器的IP地址，由于一般会有多个上游DNS服务器，所以 ipleak 也不止随机生成一个域名来进行 DNS 请求，经过了多次这样的 DNS 请求，ipleak 就会得到访问者所有的上游 DNS 服务器的IP地址。

于是，ipleak 就会把这些DNS服务器的IP地址都列出来，如果访问者发生了DNS泄露，那么在列表中就一定会存在来自国内的IP地址，这就说明发生了 DNS 泄露。
如果没有发生泄漏的话，也就是就是所有DNS请求都走了 clash 代理，一般就是和访问者的节点的 IP 地址的位置一样，比如香港节点的话，那么这些IP地址应该也是属于香港的IP。

### Netflix这类网站的检测原理

像奈飞这种对地区要求高的网站也可能在后台会偷偷的发送DNS请求，这样一来如果存在DNS泄露，那么负责和奈飞的权威DNS服务器进行会话的DNS服务器的IP地址的归属地就会和当前访问奈飞的代理节点的IP地址不在同一个地区，导致奈飞会判定访问者在使用代理工具从而导致无法访问并观看视频，甚至于封号。

## 0x03 试图解决DNS泄露

### 配置好分流规则

上面提到了，只有在没有 `DOMAIN-SUFFIX, google.com, 节点1` 这一类分流规则的时候，才会发生这种情况，那么只要将我们平时要访问的外国网站都配置好分流规则，DNS泄露的问题就可以解决。

但其实仅仅这样还是不完整的，毕竟有可能某一天会访问一个新的国外的网站，这样就需要每次都手动去修改规则，所以像这种方式只适合平时主要访问国内网站比较多、访问国外的网站就固定那么几个的人。

### no-resolve

我们可以在 `GEOIP, CN, DIRECT` 这条规则后面加一个 `no-resolve` 关键字，完整的规则是 `GEOIP, CN, DIRECT, no-resolve` ，这个关键字的作用是，当触发 dns 解析来检查域名的 目标IP 是否匹配规则时，加上了 `no-resolve` 后就可以跳过DNS解析。

这样就没有直接DNS解析了，但是这样一来，又存在一个新的问题，如果我们把上面提到的 `google.com` 换成 `baidu.com` ，当 `baidu.com` 遇到了 `GEOIP, CN, DIRECT, no-resolve` 这条规则的时候，由于 `baidu.com`  是一个域名，那么就不会进行DNS解析。

由于跳过了这条规则，那么就会匹配到下面这条，最终 `baidu.com` 就会走代理，但是我们访问国内的网站是不需要走代理的，走代理的话会导致访问的速度很慢，还会使用更多的流量，当前，也可以给国内经常访问的站点手动添加直连规则，这样就不会匹配到倒数第二行的 `GEOIP` 的规则了（规则按照从上到下的顺序匹配，列表顶部的规则优先级高于下面的规则）。

由于需要手动配置国内网站的直连规则，所以这个方法比较适合平时访问国外网站更多的人。

## 0x04 透明代理下的DNS泄露

根据TCP/IP协议所述：在应用发起 TCP 连接的时候，会先发出一个 DNS Question（发出一个IP Packet），获取要连接的服务器的IP地址，然后直接向这个IP地址发起连接。

在Tun模式下应用程序是不会感知到代理客户端的存在的，会正常发起TCP连接，所以在拿到DNS解析结果之前，连接是不能建立的。

一般代理工具会劫持所有 53 端口的请求，DNS是由代理工具完成的，也就是说 IP是由代理工具来提供的，这个IP可以是真实解析再提供（即 redir-host 模式），也可以是提供一个假的IP欺骗终端先发起连接（即 fake-ip 模式）。

### redir-host模式

假设现在用户访问 `google.com` ，浏览器会先发起 DNS 请求试图获取 Google 的IP，如上所述，DNS请求的数据包会被clash的虚拟网卡截获，访问者的主机需要先拿到一个IP才可以发起连接，在redir-host模式下，clash会返回给浏览器一个真实的IP，所以 clash 会向配置文件（配置见下，`nameserver`就是为 clash 虚拟网卡配置的DNS服务器）中写好的两个上游的DNS服务器同时发起DNS请求，看谁先返回就先用谁的。

```text
dns:
  enable: true
  enhanced-mode: redir-host
  nameserver:
  	- 114.114.114.114
  	- 223.5.5.5
```

接下来，假设 223.5.5.5 这个返回了一个被污染过的IP地址 4.4.4.4，clash 会维护一个域名和IP的映射表，查询到 `google.com` 的IP是4.4.4.4之后会存储到映射表中，然后将DNS查询结果返回给访问者的主机。

浏览器拿到了这个返回的 `google.com` 的IP之后，就可以发起请求了，请求到达clash之后，clash根据IP （4.4.4.4）查询到对应的域名是 `google.com`，然后进行分流，如果当前存在的规则中有 `DOMAIN,google.com, 节点1` 诸如此类的规则，那么这个请求后续就由节点1来进行代理，那么节点1就会重新进行DNS查询，来获取未被污染的 Google 的IP。

⚠️ 综上，由于必须返回一个真实的IP后，浏览器才能发起连接，那么势必会进行一次DNS查询，那就必然会产生NS泄露。

### redir-host模式存在的另一个问题

假设浏览器又试图访问 `youtube.com` ，这个过程和访问 `google.com` 差不多，查询到的污染的IP也是 4.4.4.4，也存储在映射表中，但是这次查询映射表，对应的域名就有2个了，那么导致的结果就是 clash 不知道该访问 `google.com` 还是访问 `youtube.com` 。

⚠️ 由于HTTP请求中有 `youtube.com` 这个域名，并且clash没有类似 v2ry 流量探测的功能，所以无法得知这个域名对应的IP到底是什么，只能通过映射表去进行查询。

### 改进后的redir-host

为了解决上面提到的问题，redir-host 模式不再进行远程DNS，而是在clash这里完成DNS解析后，将得到的 4.4.4.4这个IP直接传给节点，这样就不需要再去查询映射表了，但是这里又会存在一个问题，就是4.4.4.4这个IP实际上是被污染过的，并不是真正的IP，拿到了这个IP的代理节点实际上是无法访问到目标站点的。

这个时候，我们需要修改DNS的配置：

```text
dns:
	enable: true
	enhanced-mode: redir-host
	nameserver:
		- 114.114.114.114
		- 223.5.5.5
  fallback:
  	- http:///1.1.1.1/dns-query
```

这里的 `fallback` 配置的是国外的、不会被污染的DNS服务器，加入了 `fallback` 配置之后，当clash 发起DNS请求的时候，`nameserver` 和 `fallback` 中的所有DNS服务器会并发进行查询，当查询的IP归属地不是国内的时候，就选择使用 `fallback` 的结果，如果是国内的就使用 `nameserver` 的结果。

使用国外加密的DNS服务器加上 `fallback`，这样就解决了上面提到的使用了被污染后的IP的问题，国内的域名也就会使用国内的DNS服务器请求的结果了。

当 `fallback` 不为空的时候，会默认启用 `fallback-filter` （即 `fallback-filter` 的 `GEOIP` 这一项值为`true` ），切 `GEOIP-CODE` 的值为 `CN`，所以上面的这个配置就等价于：

```text
fallback:
	- http://1.1.1.1/dns-query
fallback-filter:
	- geoip: true
	- geoip-code: CN
```

`geoip` 为 `true` 代表启用 `geoip` 的判断，`geoip-code` 为 `CN` 的意思是除了国内的IP，其他的IP结果会比判定为被污染过的IP，这些IP会采用 `fallback` 查询的结果。

所以，只用加上 `fallback`就可以实现 *当查询的IP的归属地不是国内的时候就使用 `fallback`中的响应*。

另外，如果担心 `geoip`  的数据库不全，其实可以自己手动添加一些域名（使用 domain）或者IP段，例如：

```text
fallback:
	- https://1.1.1.1/dns-query
fallback-filter:
	geoip: true
	geoip-code: CN
	domain:
		- '+.google.com'
		- '+.youtube.com'
  ipcidr:
  	- 224.0.0.0/4
```

⚠️ 但是上面提到的解决方法只是解决了IP污染的问题，实际上DNS泄漏的问题并没有完全解决，因为 `fallback` 和 `nameserver` 是并发的请求，假设此时请求的域名的IP是国外的，实际上这个DNS请求还是被发送给了 `nameserver`中配置的国内的DNS服务商，只是最后实际使用了 `fallback` 中返回的结果罢了。

那么解决方法就是在 `fallback` 中加上 `geosite`，`geosite` 列表的内容将被视作为已经污染了，匹配到 `geosite`的域名，将只使用 `fallback` 来进行解析，并不会使用 `nameserver` 去进行解析，这样就可以避免在 GFW 外的域名（也就是禁止我们访问的一些国外的站点）向 `nameserver` 中的国内的DNS服务器发起DNS解析的请求，从而避免了DNS泄漏。

```text
fallback-filter:
	geoip: true
	geoip-code: CN
	geosite:
		- gfw
  ipcidr:
  	- 240.0.0.0/4
  domain:
  	- '+.google.com'
  	- '+.youtube.com'
```

#### `nameserver-policy`和`fallback-filter`

配置了 `geosite: - gfw`之后，会在 clash 中看到 `使用nameserver-policy 代替 geosite（geosite将在未来移除）`诸如此类的提示消息。

目前更多的是使用 `nameserver-policy` 来代替 `fallback` 的功能；

`fallback` 的功能之前已经讲过，如果没有配置 `geosite` ，会同时并发请求 `fallback` 和 `nameserver`，然后根据 `geoip` 数据库判断是否为国内的 IP，以此判断是采用 `fallback` 还是 `nameserver` 的结果，配置了 `geosite` 的话，如果遇到 GFW 外的域名时，就只会请求 `fallback`，不会使用 `nameserver`。

而 `nameserver-policy` 的功能会更加的强大一些，`nameserver-policy` 加入了命中时需要交给哪个 DNS 服务器解析的逻辑，也可以延伸出更多更个性化的DNS分流，不会像 `fallback-filter` 一样，只能区分是否要用 `fallback` 解析。下面是一个比较简单的配置示例：

```text
dns:
	nameserver:
	- tls://8.8.4.4
	- tls://1.1.1.1
	nameserver-policy:
		+.youtube.com: tls://dns.jerryw.cn
		geosite:cn:
		- 223.5.5.5
		- 114.114.114.114
```

通过上面的示例可以看到，`nameserver-policy`可以直接指定域名查询的解析服务器，优先于 `nameserver/fallback`的查询，也可以使用 `geosite`，例子中实现的就是访问 youtube 的域名时，使用的是 `tls://dns.jerryw.cn`z 这个DNS服务器，访问国内的站点时使用的是 223.5.5.5 和 114.114.114.114 这两个国内DNS来解析的，而剩下的没有匹配到的国外的站点则交给 `nameserver` 中配置的2个国外的DNS服务器来进行解析。
