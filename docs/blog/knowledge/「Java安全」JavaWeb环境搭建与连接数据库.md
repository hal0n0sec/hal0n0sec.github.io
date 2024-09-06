---
date: 2024-04-14 23:17:57
---

# 「Java安全」JavaWeb环境搭建与连接数据库

## 1. Java EE介绍

Java2 平台包括Java SE（Java 标准版）、Java EE 和 Java ME三个版本，J2SE、J2ME 和 J2EE 都是Sun ONE体系；
J2SE是Java 2的标准版，主要用于桌面应用软件的编程，J2ME主要应用于嵌入式系统开发，例如手机和机顶盒的编程；J2EE是Java2的企业版，主要用于分布式网络的开发，例如ERP系统和电商网站等；

## 2. Java EE环境搭建

在Java Web开发中，最常见的开发环境为 JDK+IDEA+Tomcat+SQL（Oracle/MySQL）。
Web服务器除了Tomcat之外还有Resin、Jboss、WebSpere、Weblogic等；

### 2.1 JDK安装与配置

略；

### 2.2 Tomcat安装与配置  

Tomcat Web 服务器是Apache 软件基金会（Apache Software Foundation）的Jakarta 项
目中的一个核心项目，由Apache、Sun 和其他一些公司及个人共同开发而成。

1. [进入官网下载Tomcat](https://tomcat.apache.org/)

2. 下载后解压，然后将目录copy到非系统盘的英文目录下
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414190143.png)

3. 配置Tomcat的环境变量，首先在系统的环境变量配置中添加tomcat的环境变量；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414191107.png)

4. 然后在path中添加tomcat的路径：

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414191504.png)


5. 打开cmd，输入`start.bat`，尝试启动tomcat；
出现以下报错：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414193234.png)

解决方法：在bin目录下有一个setclasspath.bat文件，将自己电脑的Java_HOME和JRE_HOME添加进这个文件中；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414193441.png)

6. 重新启动，但是出现了乱码的情况。
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414193513.png)

解决方法：在tomcat安装目录下`conf`目录内找到`logging.properties`，在52行左右加入：
```java
java.util.logging.ConsoleHandler.encoding = GBK
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414193748.png)

7. 进入管理后台，发现怎么登录都是用户名密码错误，解决方案：先将弹窗关掉，在401页面出现如下关键信息：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414194318.png)
然后在tomcat的安装目录下进入`conf`目录后找到`tomcat-users.xml`文件，加入以下内容：
```xml
<role rolename="manager-gui"/>
<user username="tomcat" password="p@ssw0d" roles="manager-gui"/>
```

此时`p@ssw0d`就是新的密码，然后使用这个密码登录；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414194529.png)

### 2.3 IDEA安装与配置

略

### 3. Java使用JDBC连接数据库

#### 3.1 MySQL JDBC下载

前往[MySQL JDBC进行下载](https://dev.mysql.com/downloads/connector/j/)，根据自己的系统平台进行选择；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414195338.png)

下载后解压即可；

#### 3.2 IDEA新建Java Web项目

1. IDEA新建一个Java项目
2. 但是右键项目发现没有`Add Framework support`选项，解决方法如下：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414200737.png)

或者双击shift键直接进行搜索
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414201722.png)

3. 选择`web Application 4.0`，然后点击OK，此时就多出一个web的文件夹；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414201853.png)


4. 配置tomcat服务器
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414203108.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414203126.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414203141.png)

5. 配置tomcat服务器
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414203259.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414203420.png)

6. 配置maven
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414203551.png)

7. 运行项目进行测试，如下界面则说明正常：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414203809.png)

#### 3.3 导入MySQL JDBC包

项目中导入刚才下载的MySQL JDBC包，具体设置如下所示：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414204142.png)

#### 3.4 编写连接数据库代码

```java
import com.mysql.cj.jdbc.Driver;  
  
import java.sql.*;  
  
public class testJdbc {  
    // 数据库连接URL  
    static final String DB_URL = "jdbc:mysql://localhost:3306/iwebsec?useSSL=false&Timezone=UTC";  
    // 数据库连接的用户名  
    static final String USER = "root";  
    // 数据库密码  
    static final String PASS = "root";  
  
    public static void main(String[] args) {  
        Connection conn = null;  
        Statement stemt = null;  
  
        try {  
            // 驱动注册  
            Class.forName("com.mysql.cj.jdbc.Driver");  
            // 创建连接  
            conn = DriverManager.getConnection(DB_URL, USER, PASS);  
            // 创建Statement对象  
            stemt = conn.createStatement();  
            // 执行SQL语句  
            String sql = "SELECT id, username, password FROM user";  
            ResultSet rs = stemt.executeQuery(sql);  
            // 处理ResultSet对象  
            while (rs.next()) {  
                int id = rs.getInt("id");  
                String username = rs.getString("username");  
                String password = rs.getString("password");  
                System.out.print("ID: " + id);  
                System.out.print(", username: " + username);  
                System.out.println(",password: " + password);  
            }  
            rs.close();  
        } catch (SQLException se) {  
            se.printStackTrace();  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            // 关闭连接  
            try {  
                if (stemt != null) {  
                    conn.close();  
                }  
            } catch (SQLException se) {  
  
            }            try {  
                if (conn != null) {  
                    conn.close();  
                }  
            } catch (SQLException se) {  
                se.printStackTrace();  
            }  
        }  
        System.out.println("Finish");  
    }  
  
}
```

执行结果：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240414231526.png)

JDBC连接MySQL数据库也是要注册驱动，连接数据库，创建`Statement`对象等多个步骤的，需要注意：下载的是 8.0版本以上的JDBC，驱动`com.mysql.jdbc.Driver`已经变成了`com.mysql.cj.jdbc.Driver`。

#### 3.5 代码详解

##### 3.5.1 注册驱动
JDBC在连接数据库之前，先要进行驱动的注册，通过`java.lang.Class`类的静态方法`forName(String className)`实现驱动加载；
```java
Class.forName("oracle.jdbc.driver.XXXDriver");
```

```java
Class.forName("com.mysql.cj.jdbc.Driver");  
```

##### 3.5.2 连接数据库
通过`java.sql.DriverManager`的`getConnectin(String url, String username, String password)`方法获取一个`Connection`对象，代表了一个数据库连接的创建；
```java
Connection conn = DriverManager.get(DBURL, username, password);
```

`DBURL`详解：url中包含了数据库的协议、子协议和数据源标识，用冒号`:`隔开，还包括了属性名和属性值，通用格式如下：
```java
jdbc:jdbc:<数据源标识>[<属性名>=<属性值>]
```
- 协议：JDBC连接就是`jdbc`协议，固定；
- 子协议：驱动程序名或数据库连接机制，例如MySQL就是`mysql`；
- 数据源标识：数据库主机地址+端口+数据库名称；
```java
localhost:3306/?iwebsec
```
- 属性名和属性值并不是必需的，例如以下所示，代表的是使用的是Unicode字符，GBK字符的编码方式；
```java
userUnicode=true&characterEncoding=gbk
```

完整示例：
```
jdbc:mysql://localhost:3306/any?useUnicode=true&characterEncoding=gbk, username,password
```
- 协议：JDBC连接，就是`jdbc`协议；
- 子协议：驱动程序名或者数据库连接机制就是mysql
- 数据源标识：`localhost:3306/any`，表示连接的是localhost主机的3306端口的名为`any`的数据库；
- 属性名和属性值：`uniUnicode=true&characterEncoding=gbk`，代表的是Unicode字符集和gbk的编码方式；
- `username`：代表连接数据库时使用的用户名信息；
- `password`：代表连接数据库时使用的用户密码；

##### 3.5.3 创建`Statement`对象

执行SQL语句需要创建`Statement`对象，`Statement`对象一般分为以下几种：
1. `Statement`对象执行不带参数的简单的SQL语句：
```java
Statement state = conn,createStatement();
```

2. `PreparedStatement`扩展`Statement`，实现了可能包含参数的预编译SQL语句：
```java
PrepareStatement preparementStatement = connection.prepareStatement(sql);
```

3. `CallableStatement`扩展了`preparedStatement`，用于执行可能包含输入和输出参数的存储过程
```java
CallableStatement callableStatement = conn.prepareCall("{CALL demoSq(?, ?)}");
```

##### 3.5.4 执行SQL语句

一般执行SQL语句的方法有3种：`execute`，`executeQuery`和`executeUpdate`，他们的区别在于使用场景不一样：
1. `execute`用来执行任意的SQL语句：
2. `executeQuery`主要进行查询的操作
3. `executeUpdate`执行`INSERT`，`DELETE`和`UPDATE`这三种操作，即增删改；

```java
ResultSet rs = stmt.execute(query);

ResultSet rs = stmt.executeQuery(query);

ResultSet rs = stmt.executeUpdate(query);
```

##### 3.5.5 处理`ResultSet`对象

`ResultSet`返回了数据查询的相关信息，要使用`ResultSet`对象获取数据，则需要通过`get`方法进行捕获信息：
```java
while(rs.next) {
	int id = res.getInt("id");
	String username = rs.getString("username");
}
```