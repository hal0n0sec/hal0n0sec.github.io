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


基于以上对AIX系统的基线核查命令，可以编写一个自动化执行的核查脚本，脚本内容：

```bash
#!/bin/bash

# 定义日志文件路径
log_file=/tmp/aix_baseline_$(hostname)_$(date +%Y%m%d).log
exception_file=/tmp/aix_baseline_exceptions_$(hostname)_$(date +%Y%m%d).log

# 记录基本系统信息
echo '---------------------基本系统信息---------------------' | tee -a $log_file $exception_file
date | tee -a $log_file
hostname | tee -a $log_file
oslevel -r | tee -a $log_file

# 检查网络配置
echo '---------------------网络配置---------------------' | tee -a $log_file $exception_file
ifconfig -a | tee -a $log_file
netstat -an | egrep "LISTEN|UDP" | tee -a $log_file
netstat -anr | tee -a $log_file
ndd=$(netstat -an | grep LISTEN | grep -vE "127.0.0.1|::1" | wc -l)
if [[ $ndd -gt 0]]; then
  echo "【异常】存在 $ndd 个监听外网的高危端口" | tee -a $log_file $exception_file
fi

# 检查用户和组信息
echo '---------------------用户和组---------------------' | tee -a $log_file $exception_file
cat /etc/passwd | tee -a $log_file
cat /etc/group | tee -a $log_file
cat /etc/security/passwd | tee -a $log_file
cat /etc/security/user | tee -a $log_file
lsuser -a SYSTEM default | tee -a $log_file
lsgroup -a ALL | tee -a $log_file
id0=$(cat /etc/passwd | awk -F: '($3==0) && ($1!="root")' | wc -l)
if [[ $id0 -gt 0]]; then
  echo "【异常】存在 $id0 个UID为0的非root用户" | tee -a $log_file $exception_file
fi

# 检查认证和授权的相关配置
echo '---------------------认证和授权---------------------' | tee -a $log_file $exception_file
cat /etc/security/login.cfg | tee -a $log_file
cat /etc/security/limits | tee -a $log_file
lsuser -a ttys rlogin telnet root | tee -a $log_file
if lsuser -a rlogin=true root; then
  echo "【异常】root用户允许rlogin登录" | tee -a $log_file $exception_file
fi
if lsuser -a telnet=true root; then
  echo "【异常】root用户允许telnet登录" | tee -a $log_file $exception_file
fi

# 检查文件系统和目录权限
echo '---------------------文件系统和目录权限检查---------------------' | tee -a $log_file $exception_file
ls -ld / | tee -a $log_file
ls -ld /tmp | tee -a $log_file
ls -la /etc | tee -a $log_file
if [[ $(stat -c %a /) -gt 755 ]]; then
  echo "【异常】 /目录权限过大" | tee -a $log_file $exception_file
fi
if [[ $(stat -c %a /tmp ) -gt 777 ]]; then
  ehco "【异常】/tmp目录权限过大" | tee -a $log_file $exception_file
fi

# 检查日志和审计配置
echo '---------------------日志和审计配置检查---------------------' | tee -a $log_file $exception_file
cat /etc/syslog.conf | tee -a $log_file
cat /etc/security/audit/config | tee -a $log_file
cat /etc/security/audit/events | tee -a $log_file
cat /etc/security/audit/objects | tee -a $log_file
audit query | tee -a $log_file
if ! egrep -q "^start" /etc/security/audit/config; then
  echo "【异常】系统审计未开启" | tee -a $log_file $exception_file
fi

# 检查网络服务和端口
echo '---------------------网络和服务端口检查---------------------' | tee -a $log_file $exception_file
lssrc -a | tee -a $log_file
lsof -i -n -P | tee -a $log_file
rpcinfo -p | tee -a $log_file

# 检查SSH配置
echo '---------------------检查SSH配置---------------------' | tee -a $log_file $exception_file
cat /etc/ssh/sshd_config | tee -a $log_file
cat /etc/ssh/ssh_config | tee -a $log_file
ps -elf | grep sshd | grep -v grep | tee -a $log_file
ssh_ver=$(ssh -V 2>&1 | awk '{print $1}')
if [[ $ssh_ver < '7.5' ]]; then
  echo '【异常】SSH版本低于7.5，存在安全风险' | tee -a $log_file $exception_file
fi

# 检查软件安装以及版本信息
echo '---------------------软件安装和版本信息---------------------' | tee -a $log_file $exception_file
lslpp -L all | tee -a $log_file
rpm -qa | tee -a $log_file
instfix -i | grep ML | tee -a $log_file
bash_ver=$(bash --version | head -1 | awk '{print $4}')
if echo "$bash_ver" | grep -q "^3"; then
  echo "【异常】Bash版本为3.x，可能存在ShellShock漏洞" | tee -a $log_file $exception_file
fi
if bash -c 'x() { :;}; echo vulnerable' 2>/dev/null; then
  echo "【异常】Bash存在Shellshock漏洞" | tee -a $log_file $exception_file
fi

# 检查环境变量配置
echo '---------------------环境变量配置---------------------' | tee -a $log_file $exception_file
cat /etc/environment | tee -a $log_file
cat /etc/profile | tee -a $log_file
cat /etc/security/.profile | tee -a $log_file

# 检查定时任务配置
echo '---------------------定时任务配置---------------------' | tee -a $log_file $exception_file
crontab -l | tee -a $log_file
lscrontab | xargs -I {} sh -c "echo {}; crontab -l -u {}" | tee -a $log_file
lsitab -a | tee -a $log_file

# 检查其他配置项
echo '---------------------其他配置项---------------------' | tee -a $log_file $exception_file
vmo -a | tee -a $log_file
lsattr -El sys0 -a maxuproc | tee -a $log_file
lsps -a | tee -a $log_file
lsvg | tee -a $log_file
lspv | tee -a $log_file
lsvg -o | xargs lsvg -p | tee -a $log_file
lsvg -o | xargs lsvg -l | tee -a $log_file
df -gt | tee -a $log_file

echo "AIX系统基线核查已完成，请查看${log_file}了解详情，异常信息已经记录到${exception_file}" | tee -a $log_file
```

    