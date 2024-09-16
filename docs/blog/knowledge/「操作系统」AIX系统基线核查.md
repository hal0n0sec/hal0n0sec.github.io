---
date: 2024-09-17 00:14:00
---

# AIX系统基线核查

1. 显示当前日期和时间。

   ```bash
   date
   ```

   

2. 显示当前主机名。

   ```bash
   hostname
   ```

   

3. 显示AIX操作系统的版本和技术级别；

   ```bash
   oslevel -r
   ```

   

4. 显示所有网络接口的配置信息，包括IP地址、MAC地址等；

   ```bash
   ifconfig -a
   ```



5. 显示所有网络连接的详细信息，`grep LISTEN`用于过滤出处于监听状态的连接信息。

   ```bash
   netstat -an
   ```

   

6. 显示路由表信息。

   ```bash
   netstat -anr
   ```

   

7. 显示所有用户账号的基本信息。

   ```bash
   cat /etc/passwd
   ```

   

8. 显示所有用于组的信息。

   ```bash
   cat /etc/group
   ```

   

9. 显示所有用于的安全属性，如是否允许远程登录等。

   ```bash
   cat /etc/security/user
   ```

   

10. 显示系统登录的相关配置信息。

    ```bash
    cat /etc/security/login.cfg
    ```

11. 显示系统全局的环境变量配置文件。

    ```bash
    cat /etc/profile
    ```

    

12. 显示系统全局的环境变量配置文件

    ```bash
    cat /etc/environment
    ```

    

13. 显示系统安全Shell的环境变量配置文件

    ```bash
    cat /etc/security/.profile
    ```



14. 显示`/tmp`目录的权限信息。

    ```bash
    ls -ld /tmp
    ```

    

15. 显示`/etc`目录下所有文件的详细信息

    ```bash
    ls -al /etc
    ```



16. 显示syslog日志配置文件的内容。

    ```bash
    cat /etc/syslog.conf
    ```

    

17. 显示`inetd`守护进程的配置信息。

    ```bash
    lssrc -l -s inetd
    ```

    

18. 显示所有用户的详细属性信息。

    ```bash
    lsuser ALL
    ```

    

19. 显示所有用户组的详细属性信息。

    ```bash
    lsgroup ALL
    ```

    

20. 显示用户密码的加密方式和相关属性。

    ```bash
    cat /etc/security/passwd
    ```

    

21. 显示用户登录后看到的消息内容。

    ```bash
    cat /etc/motd
    ```

    

22. 显示系统初始化配置文件的内容。

    ```bash
    cat /etc/inittab
    ```

    

23. 显示所有进程的详细信息。

    ```bash
    ps -ef
    ```

    

24. 显示所有注册的RPC服务器的信息。

    ```bash
    rpcinfo -p
    ```

    

25. 显示所有已安装的软件包的详细信息。

    ```bash
    lslpp -L all
    ```

    

26. 显示系统审计配置信息。

    ```bash
    audit query
    ```

    

27. 显示审计子系统的配置文件内容。

    ```bash
    cat /etc/security/audit/config
    ```



28. 显示审计事件的配置信息。

    ```bash
    cat /etc/security/audit/events
    ```

    

29. 显示审计对象的配置信息。

    ```bash
    cat /etc/security/audit/objects
    ```

    

30. 显示syslog守护进程的信息。

    ```bash
    ps -ef | grep syslogd
    ```

    

31. 显示SNMP守护进程的配置信息。

    ```bash
    cat /etc/snmpd.conf
    ```

    

32. 显示SNMPV3的配置信息。

    ```bash
    cat /etc/snmpdv3.conf
    ```

    

33. 显示CDE桌面环境的启动脚本。

    ```bash
    cat /etc/rc.dt
    ```

    

34. 显示TCP/IP网络的启动脚本。

    ```bash
    cat /etc/rc.tcpip
    ```

    

35. 显示所有子系统资源的状态。

    ```bash
    lssrc -a
    ```

    

36. 显示系统中所有可用的 cron jobs。

    ```bash
    lsitab -a
    ```

    

37. 显示当前AIX操作系统的详细信息。

    ```bash
    uname -a
    ```

    

38. 显示已经安装的 Program temporary fix。

    ```bash
    instfix -i | grep ML
    ```

    

39. 显示intend配置文件的内容。

    ```bash
    cat /etc/inetd.conf
    ```

    

40. 显示运行远程登录且无需密码的主机列表。

    ```bash
    cat /etc/hosts.equiv
    ```

    

41. 显示可执行远程打印的主机列表。

    ```bash
    cat /etc/hosts.lpd
    ```

    

42. 显示 Sendmail 邮件服务器的配置文件。

    ```bash
    cat /etc/mail/sendmail.cf /etc/sendmail.cf
    ```

    

43. 显示NFS服务的配置信息。

    ```bash
    cat /etc/rc.nfs /etc/export
    ```

    

44. 列出所有已安装的RPM包。

    ```bash
    rpm -qa
    ```

    

45. 显示系统资源限制的配置文件内容。

    ```bash
    cat /etc/security/limits
    ```

    

46. 显示SSH客户端的配置文件内容。

    ```bash
    cat /etc/ssh/ssh_config
    ```

    

47. 显示SSH服务端的配置文件内容。

    ```bash
    cat /etc/ssh/sshd_config
    ```

    

48. 列出系统中的所有卷组。

    ```bash
    lsvg
    ```

    

49. 显示root用户的telnet属性配置。

    ```bash
    lsuser -a telnet root
    ```

    

50. 显示root用户允许登录的TTY设备配置。

    ```bash
    lsuser -a ttys root
    ```



51. 列出系统中所有物理卷的信息

    ```bash
    lspv
    ```

    

52. 列出所有分页空间的使用情况

    ```bash
    lsps -a
    ```

    

53. 显示每个卷组的所有物理卷信息

    ```bash
    lsvg -p
    ```

    

54. 显示每个卷组的所有逻辑卷信息

    ```bash
    lsvg -l
    ```

    

55. 显示文件系统的磁盘使用情况

    ```bash
    df -g
    ```

    

56. 显示当前用户的PATH环境变量内容

    ```bash
    echo $PATH
    ```

    

57. 显示所有与SSH相关的进程。

    ```bash
    ps -elf | grep ssh
    ```

    

58. 在CDE配置文件中查找超时相关的设置。

    ```bash
    cat /usr/dt/config/*/sys.resources|grep Timeout
    ```

    

59. 显示NTP时间同步服务的配置文件

    ```bash
    cat /etc/ntp.conf
    ```

    

60. 显示OpenSSL的详细版本信息

    ```bash
    openssl version -a
    ```

    

61. 显示SSH客户端的版本信息。

    ```bash
    ssh -V
    ```

    

62. 这是一个Shellshock漏洞的测试命令，用于检查Bash是否存在代码执行漏洞。

    ```bash
    env x='() { :;}; echo vulnerable' bash -c "echo this is a test"
    ```

    