---
date: 2024-04-15 09:24:37
---

# 「Java安全」SQL注入漏洞审计

## 1. SQL注入漏洞简介

SQL注入攻击是hacker利用SQL注入漏洞对数据库进行攻击的常用手段之一，hacker通过浏览器或者其他客户端将恶意SQL语句插入到网站参数中，网站应用程序未经过滤，就将恶意SQL语句带入数据库种执行。
SQL注入过程如图所示：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240415083932.png)

SQL注入漏洞可能会造成服务器的==数据库信息泄露==、==数据被窃取==、==网页被篡改==，==甚至可能会造成网站被挂马、服务器被远控、被安装后门等==；

SQL注入的分类较多，一般可以笼统的分为**数字型注入**和**字符型注入**两类，当然也可以更加详细的分为**联合查找型注入**、**报错注入**、**时间盲注**、**布尔盲注**等；

造成SQL注入一般需要满足以下两个条件：
- 输入用户可控；
- 直接或间接拼接SQL语句执行；

对于SQL注入的漏洞审计，常见的方法就是根据`SELECT`,`UPDATE`等SQL关键字或通过执行SQL语句定位到存在SQL语句的程序代码，随后通过查看SQL语句种是否存在变量的引用并跟踪变量查看是否可控。由于SQL注入漏洞特征性较强，在实际的代码审计过程中往往可以通过一些自动化审计工具快速的发现这些可能存在安全问题的代码段，例如Fortify等自动化工具；

Java语言本身是一种强类型的语言，因此在寻找SQL注入漏洞的过程中，可以首先找到所有包含SQL语句的点，随后观察传参类型是否是`String`类型，只有当传参类型是`String`类型的时候我们才可能进行SQL注入；

## 2. 执行SQL语句的几种方式

在Java种执行SQL语句一般有以下几种方式：
1. 使用JDBC的`java.sql.Statement`执行SQL语句；
2. 使用JDBC的`java.sql.PreparedStatement`执行SQL语句；
3. 使用`Hibernate`执行SQL语句；
4. 使用MyBatis执行SQL语句；

### 2.1 Statement 执行SQL语句

`java.sql.Statement`是Java JDBC下执行SQL语句的一种原生方式，执行SQL语句时需要通过拼接来执行，如果拼接的语句没有经过过滤，那么就有可能出现SQL注入漏洞；

使用方式：
```java
// 注册驱动
Class.forName("oracle.jdbc.driver.OracleDriver");
// 获取连接
Connection conn = DriverManger.getConnection(DBURL, username, password);
// 创建Statement对象
Statement state = conn.createStatement();
// 执行sql语句
String sql = "SELECT * FROM user WHERE id=" + id + '"" ；
state.executeQuery(sql);
```

示例代码：
```java
package sqlInjection;  
  
import java.sql.*;  
  
public class statementDemo {  
    static final String DBURL = "jdbc:mysql://localhost:3306/iwebsec?useSSL=false&Timezone=UTC";  
    static final String USERNAME = "root";  
    static final String PASS = "root";  
  
    public static void main(String[] args) {  
        Connection conn = null;  
        Statement state = null;  
  
        try {  
            Class.forName("com.mysql.cj.jdbc.Driver");  
            conn = DriverManager.getConnection(DBURL, USERNAME, PASS);  
            String id = "2";  
            String sql = "select * from user where id=" + id;  
            state = conn.createStatement();  
            ResultSet rs = state.executeQuery(sql);  
            while (rs.next()) {  
                System.out.println("id: " + rs.getInt("id") + " username: " + rs.getString("username") + " password: " + rs.getString("password"));  
            }  
            rs.close();  
        } catch (SQLException se) {  
            se.printStackTrace();  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            try {  
                if (state != null) {  
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
        System.out.println("finished!");  
    }  
}
```

驱动注册完成后，实例化`Statement`对象，SQL语句为`seect * from user where id=" + id`，然后通过拼接的方式传入了参数`id`的值，`id`的值在开始时通过了`String id = "2"`设置，最终运行后获取了user表中id值为2的数据信息；

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240415091652.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240415092230.png)

### 2.2 PreparedStatement 执行SQL语句

`PreparedStatement`时继承了`Statement`的子接口，包含已编译的SQL语句。
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240415111030.png)

`PreparedStatement`会预处理SQL语句，SQL语句可具有一个或多个IN参数，IN参数的值在SQL语句创建时未被指定，而是为每一个IN参数保留一个问号`?`作为占位符，每个问号的值，必须在该语句执行之前通过适当的`setXXX`方法来提供，如果是 int 类型则用`setInt`方法，如果是`String`则使用`setString`方法；

`PreparedStatement`预编译的特性使得其执行SQL语句要比`Statement`更快，SQL语句会编译在数据库系统中，执行计划会被缓存起来，使用预处理语句比普通语句更快，`PreparedStatement`预编译还有一个优势，可以有效的防止SQL注入，它是`Statement`的升级版。

使用方式：
```java
// 注册驱动
Class.forName("com.mysql.cj.jdbc.Driver");
// 获取连接
connection conn = DriverManager.getConnection(DBURL, USERNAME, PASS);
// 实例化PreparedStatement对象
String sql = "select * from user where id = ?";
PreparedStatement preparedStatement = connection.preparedStatement(sql);
// 设置占位符为id变量
preparedStatement.setInt(1, id);
// 执行SQL语句
ResultSet resultSet = preparedStatement.executeQuery();
```

示例：
```java
package sqlInjection.preparedStatement;  
  
  
import java.sql.*;  
  
public class preparedStatementDemo {  
  
    static final String DBURL = "jdbc:mysql://localhost:3306/iwebsec?useSSL=false&serverTimezone=UTC";  
    static final String USERNAME = "root";  
    static final String PASS = "root";  
  
    public static void main(String[] args) throws ClassNotFoundException, SQLException {  
  
        Connection conn = null;  
  
        String id = "3";  
        // 注册驱动  
        Class.forName("com.mysql.cj.jdbc.Driver");  
        // 获取连接  
        conn = DriverManager.getConnection(DBURL, USERNAME, PASS);  
        // 实例化PreparedStatement对象  
        String sql = "select * from user where id = ?";  
        PreparedStatement preparedStatement = conn.prepareStatement(sql);  
        // 设置占位符id的变量，前面1是指id所在的列，后面才是第几行的id的值  
        preparedStatement.setString(1, id);  
        // 执行sql语句  
        ResultSet rs = preparedStatement.executeQuery();  
        // 处理结果  
        while (rs.next()) {  
            System.out.println("id: " + rs.getInt("id") + " username: " + rs.getString("username") + " password: " + rs.getString("password"));  
        }  
    }  
}
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240415110902.png)


### 2.3 MyBatis 执行SQL语句

MyBatis 是一个Java持久化框架，它通过XML描述符或注解把对象与存储过程或SQL语句关联起来，它支持自定义SQL、存储过程以及高级映射。MyBatis 封装了几乎所有的JDBC代码，可以完成设置参数和获取结果集的工作；

MyBatis 可以通过简单的XML或注解将原始类型、接口和Java POJO（Plain Old Java Object, 普通老式Java对象）配置并映射为数据库中的记录，要使用MyBatis，只需将 mybatis-x.x.x.jar文件置于类路径`classpath`中即可。

#### 2.3.1 创建Maven项目，导入MyBatis依赖

项目文件目录结构：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240418110410.png)


1. 使用IDEA创建一个Maven项目，在`pom.xml`文件中导入依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>  
<project xmlns="http://maven.apache.org/POM/4.0.0"  
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
    <modelVersion>4.0.0</modelVersion>  
  
    <groupId>org.example</groupId>  
    <artifactId>mybatisDemo</artifactId>  
    <version>1.0-SNAPSHOT</version>  
  
    <properties>  
        <maven.compiler.source>8</maven.compiler.source>  
        <maven.compiler.target>8</maven.compiler.target>  
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
    </properties>  
  
    <dependencies>  
  
<!--        导入mybatis依赖-->  
        <dependency>  
            <groupId>org.mybatis</groupId>  
            <artifactId>mybatis</artifactId>  
            <version>3.5.5</version>  
        </dependency>  
<!--        mysql驱动-->  
        <dependency>  
            <groupId>mysql</groupId>  
            <artifactId>mysql-connector-java</artifactId>  
            <version>8.0.20</version>  
        </dependency>  
  
<!--        junit 单元测试-->  
        <dependency>  
            <groupId>junit</groupId>  
            <artifactId>junit</artifactId>  
            <version>4.12</version>  
            <scope>test</scope>  
        </dependency>  
  
<!--        添加slf4j日志api-->  
        <dependency>  
            <groupId>org.slf4j</groupId>  
            <artifactId>jul-to-slf4j</artifactId>  
            <version>1.7.36</version>  
        </dependency>  
  
<!--        添加logback-classic依赖-->  
        <dependency>  
            <groupId>ch.qos.logback</groupId>  
            <artifactId>logback-classic</artifactId>  
            <version>1.2.3</version>  
        </dependency>  
  
<!--        添加logback-core依赖-->  
        <dependency>  
            <groupId>ch.qos.logback</groupId>  
            <artifactId>logback-core</artifactId>  
            <version>1.2.3</version>  
        </dependency>  
    </dependencies>  
  
</project>
```

2. 命令行创建数据库
```sql
mysql -uroot -proot
create database test;
```

3. 配置`mybatis-config.xml`， 该文件是核心配置文件，主要用于配置mybatis的运行环境和行为，包括日志实现、数据库连接、事务控制方式、以及SQL映射文件的位置。
```xml
<?xml version="1.0" encoding="UTF-8" ?>  
<!DOCTYPE configuration  
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-config.dtd">  
<!--mybatis 配置文件的标准头部申明，包括XML声明和DOCTYPE声明，这里指定了MyBatis配置文件的DTD，用于验证配置文件的结构。-->  
  
<configuration>  
<!--    根元素为configuration，包含了所有mybatis的配置信息-->  
    <settings>  
<!--        settings元素用于配置一些全局性的设置-->  
        <setting name="logImpl" value="STDOUT_LOGGING"/>  
<!--        logImpl用于指定mybatis日志的实现方式，这里设置为STDOUT_LOGGING，表示日志将输出到标准输出流，即输出到控制台-->  
    </settings>  
  
    <environments default="development">  
<!--        environments元素定义了一系列的环境配置，可以配置多个环境，通过default属性指定默认环境-->  
        <environment id="development">  
<!--            每个environment元素表示一个配置环境，通过id属性进行标识-->  
  
            <transactionManager type="JDBC"/>  
<!--            transactionManager元素配置事务管理器，type=JDBC则表示使用JDBC的事务管理机制-->  
            <dataSource type="POOLED">  
<!--                dataSource元素配置数据源，type=POOLED表示使用池化的数据源-->  
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>  
<!--                配置数据库的驱动，后期需要注册驱动-->  
                <property name="url" value="jdbc:mysql://localhost:3306/test?serverTimezone=UTC"/>  
<!--                配置数据库的URL，包括数据库服务器地址、端口、数据库名、其他属性参数-->  
                <property name="username" value="root"/>  
<!--                配置数据库用户名-->  
                <property name="password" value="root"/>  
<!--                配置数据库密码-->  
            </dataSource>  
        </environment>  
    </environments>  
  
    <mappers>  
<!--        mappers元素用于配置SQL映射文件的位置-->  
        <mapper resource="Mapper/UserMapper.xml"/>  
<!--        mapper元素指定一个映射文件，resource属性表示映射文件的相对路径-->  
    </mappers>  
  
</configuration>
```

4. 接下来创建表，准备数据库的测试数据
```sql
use test;

create table Blog(
id int not null auto_increment primary key,
username varchar(100) not null,
password varchar(100) not null,
);

insert into test.blog(id, username, password) values(1,'takuya','p@ss');
insert into test.blog(id, username, password) values(2, 'tom', '123');
```

5. 创建POJO实体，即pojo目录下的`User`类，用于封装`User`对象的属性，在MyBatis中起到桥梁的作用，连接数据库和应用程序的业务逻辑。
```java
package com.mybatisdemo.pojo;  
  
public class User {  
  
    private int uid;  
    private String username;  
    private String password;  
  
    public int getUid() {  
        return uid;  
    }  
  
    public void setUid(int uid) {  
        this.uid = uid;  
    }  
  
    public String getUsername() {  
        return username;  
    }  
  
    public void setUsername(String username) {  
        this.username = username;  
    }  
  
    public String getPassword() {  
        return password;  
    }  
  
    public void setPassword(String password) {  
        this.password = password;  
    }  
}
```

6. 创建映射文件，即Mapper文件夹下的`UserMapper.xml`文件，用于定义与数据库表对应的实体类的SQL操作，允许将具体的SQL语句与Java代码解耦，可以在不触及Java代码的情况下修改SQL语句，从而简化了代码维护，并减少了潜在的错误
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.mybatisdemo.pojo.User">  
    <select id="findById" parameterType="int" resultType="com.mybatisdemo.pojo.User">  
        select * from Blog where id = #{id}  
    </select>  
</mapper>
```

7. 编写测试类`UserTest.java`
```java
package com.mybatisdemo.test;  
  
import com.mybatisdemo.pojo.User;  
import org.apache.ibatis.session.SqlSession;  
import org.apache.ibatis.session.SqlSessionFactory;  
import org.apache.ibatis.io.Resources;  
import org.apache.ibatis.session.SqlSessionFactoryBuilder;  
  
import java.io.IOException;  
import java.io.Reader;  
  
public class UserTest {  
    // 声明SqlSessionFactory和Sqlsession对象，这些是用来执行SQL语句的核心对象  
    SqlSessionFactory sessionFactory = null;  
    SqlSession sqlSession = null;  
  
    //    初始化块，负责配置mybatis和创建SqlsessionFactory和SqlSession对象  
    {  
        String resource = "mybatis-config.xml";     // 指定mybatis配置文件的位置  
  
        Reader reader = null;  
  
        try {  
            // 通过mybatis的Resources工具类加载配置文件  
            reader = Resources.getResourceAsReader(resource);  
  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        // 创建SqlSessionFactory对象，是mybatis的工厂类，用于创建SqlSession  
        sessionFactory = new SqlSessionFactoryBuilder().build(reader);  
        // 创建SqlSession对象，SqlSession代表和数据库的一次会话，true表示开启自动提交事务  
        sqlSession = sessionFactory.openSession(true);  
    }  
  
    // 测试查询方法  
    public void testSelectUser() {  
        // 调用mybatis的selectOne方法执行sql查询，返回单个查询结果，方法findById与UserMapper.xml中id值需要保持一致  
        User user = sqlSession.selectOne("findById", 1);  
        System.out.println(user);  
    }  
  
    // 主方法，运行测试  
    public static void main(String[] args) {  
        new UserTest().testSelectUser();  
    }  
}
```

执行后运行结果：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240418113741.png)


## 3. 常见Java SQL注入

### 3.1 SQL语句参数直接动态拼接

在常见的场景下，SQL注入是由SQL语句参数直接动态拼接的，典型漏洞的示例代码如下所示：
```java
package com.testSqlInjection;  
  
import com.mysql.cj.jdbc.Driver;  
  
import javax.swing.plaf.nimbus.State;  
import java.sql.*;  
  
public class LinkDatabaseInjection {  
    static final String DBURL = "jdbc:mysql://localhost:3306/test?serverTimezone=UTC";  
    static final String DBUSER = "root";  
    static final String DBPASS = "root";  
  
    public static void main(String[] args) {  
        Connection conn = null;  
        Statement state = null;  
  
        try {  
            Class.forName("com.mysql.cj.jdbc.Driver");  
  
            conn = DriverManager.getConnection(DBURL, DBUSER, DBPASS);  
  
            state = conn.createStatement();  
  
            String username = "'a' or '1'='1' -- "; // 注意这里已经包含了外层的单引号  
  
            String sql = "select * from Blog where username=" + username;  
            ResultSet res = state.executeQuery(sql);  
            while (res.next()) {  
                int id = res.getInt("id");  
                String uname = res.getString("username");  
                String password = res.getString("password");  
                System.out.println("id=" + id);  
                System.out.println("username=" + uname);  
                System.out.println("password=" + password);  
            }  
        } catch (SQLException e) {  
            e.printStackTrace();  
        } catch (ClassNotFoundException e) {  
            e.printStackTrace();  
        }  
  
    }  
}
```

上述代码首先加载数据库驱动，然后进行了数据库的连接，通过`ResultSet res = state.executeQuery(sql)`传入了`username`的值，并通过`"select * from Blog where username=" + username`直接进行了SQL语句的拼接，那么最终传入到数据库的SQL语句如下所示:
```sql
select * from Blog where username = 'a' or '1'='1' --+
```
由于`'1'='1'`恒成立，所以这里就会讲所有的数据返回；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240418235132.png)

为了做个对比，以下是正常值传入后的结果：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240418235227.png)

### 3.2 预编译有误

上面讲了使用`Statement`来执行SQL语句，那么还有一种方法之一就是使用`PrepareStatement`来执行SQL语句，使用`PrepareStatement`执行SQL语句是因为预编译参数化查询能够有效的防止SQL注入，那么是否能将使用`Statement`执行SQL语句的方式丢弃掉，使用`PrepareStatement`执行SQL语句防止SQL注入呢？

这也是不一定的，有些开发人员因为个人的开发习惯，没有按照`PrepareStatement`正确的方式进行数据库连接查询，在预编译语句中使用错误的编程方式，那么即使使用了SQL语句拼接的方式，同样也会产生SQL注入；

典型代码如下：
```java
package com.javacodeaudit.demo01;  
  
import com.mysql.cj.jdbc.Driver;  
  
import java.sql.*;  
  
public class preparestatementDemo {  
    static final String DBURL = "jdbc:mysql://localhost:3306/test?serverTimezone=UTC";  
    static final String DBUSER = "root";  
    static final String DBPASS = "hack1sfunny";  
  
    public static void main(String[] args) throws ClassNotFoundException, SQLException {  
        Connection conn = null;  
        PreparedStatement preparedStatement = null;  
        ResultSet rs = null;  
  
        Class.forName("com.mysql.cj.jdbc.Driver");  
        conn = DriverManager.getConnection(DBURL, DBUSER, DBPASS);  
        String username = "user%' or '1'='1'#";  
        String id = "2";  
        String sql = "select * from user where id = ?";  
        if (!CommonUtils.isEmptyStr(username))  
            sql += "and username like '%" + username + "%'";  
        System.out.println(sql);  
        preparedStatement = conn.prepareStatement(sql);  
        preparedStatement.setString(1, id);  
        rs = preparedStatement.executeQuery();  
        while (rs.next()){  
            int uid = rs.getInt("id");  
            String uname = rs.getString("username");  
            String password = rs.getString("password");  
            System.out.println("id=" + id);  
            System.out.println("username=" + username);  
            System.out.println("password=" + password);  
        }  
    }  
}
```

上述代码就是典型的预编译错误编程方式，虽然`id`参数使用了`PrepareStatement`进行了SQL查询，但是后面的`username`使用了SQL语句拼接的方式，`sql += "and username like '%" + username + "%'"`将`username`参数进行了拼接，所以导致了SQL注入漏洞的产生。传入的`username`值为`"user% or '1'='1'#"`，传入后执行此代码便造成了SQL注入，将`user`表中所有的数据都输出了，如下图所示：
![CleanShot 2024-04-19 at 19.22.44@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-04-19%20at%2019.22.44@2x.png)

### 3.3 order by 注入

那么接下来，是否在预编译语句中，如果按照正确的编程方式就可以完全防止SQL注入了吗？答案并不是，因为在有些特殊的情况下，是不能使用`PreparStatement`的，比较典型的就是使用`order by`子句进行排序，**`order by`子句后面需要添加字段名或者字段位置，而字段名是不能带引号的，否则就会被认为是一个字符串而不是字段名**。
`PrepareStatement`是使用占位符传入参数的，传递的字符都会有单引号进行包裹，`ps.setString(1,id)`会自动给值加上引号，这样就会导致`order by`子句失败。

当我们使用正确的`order by`句子来进行联合查询的时候，如下所示，首先看下这个数据库`test2`表的数据：
![CleanShot 2024-04-19 at 19.51.53@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-04-19%20at%2019.51.53@2x.png)

执行`order by`后的SQL语句没有问题，返回了正确的结果：
![CleanShot 2024-04-19 at 19.53.14@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-04-19%20at%2019.53.14@2x.png)

`PrepareStatement`预编译后的子句`select * from test2 order by 'id';`带入到数据库中执行后的结果可以看到，由于`id`被单引号包裹，导致了`order by`失效，执行完之后并没有按照`id`列进行排序。
![CleanShot 2024-04-19 at 19.56.19@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-04-19%20at%2019.56.19@2x.png)

综上所述，当使用`order by`句子进行查询的时候，需要使用字符串拼接的方式，在这种情况下就有可能存在SQL注入，要防御SQL注入，就要对关键字符串进行过滤，以下是一个典型的漏洞案例代码：
```java
package com.javacodeaudit.demo02;  
  
import java.sql.*;  
  
public class orderbyInjection {  
    static final String DBURL = "jdbc:mysql://localhost:3306/test?serverTimezone=UTC";  
    static final String DBUSER = "root";  
    static final String DBPASS = "hack1sfunny";  
  
    public static void main(String[] args) throws ClassNotFoundException, SQLException {  
        Connection conn = null;  
        PreparedStatement preparedStatement = null;  
        ResultSet rs = null;  
  
        Class.forName("com.mysql.cj.jdbc.Driver");  
        conn = DriverManager.getConnection(DBURL, DBUSER, DBPASS);  
  
        String id = "2 or 1=1";  
        String sql = "select * from user" + " order by " + id;  
        System.out.println(sql);  
  
        preparedStatement = conn.prepareStatement(sql);  
        rs = preparedStatement.executeQuery();  
        while (rs.next()) {  
            int uid = rs.getInt("id");  
            String uname = rs.getString("username");  
            String password = rs.getString("password");  
            System.out.println("id=" + uid);  
            System.out.println("username=" + uname);  
            System.out.println("password=" + password);  
        }  
    }  
}
```

![CleanShot 2024-04-19 at 20.11.35@2x.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-04-19%20at%2020.11.35@2x.png)

> 由于`order by`只能使用字符串拼接的方式，当使用`String sql = "select * from user" + "order by" + id`进行`id`参数拼接的时候，就出现了SQL注入漏洞，`id`传入的值为`2 or 1=1"`，由于`1=1`恒成立，所以就会将所有表中的数据都输出。

### 3.4 `%`和`_`模糊查询

在Java预编译查询中不会对`%`和`_`进行转义处理，而`%`和`_`刚好是`like`查询的通配符，如果没有做好相关的过滤，就有可能导致恶意模糊查询，占用服务器的性能，甚至可能耗尽资源，造成服务器宕机。
案例代码如下：
```java
package com.testSqlInjectionDemo03;  
  
import java.sql.*;  
  
public class LinkDatabaseInjectionDemo03 {  
    static final String DBURL = "jdbc:mysql://localhost:3306/test?serverTimezone=UTC";  
    static final String DBUSER = "root";  
    static final String DBPASS = "root";  
  
    public static void main(String[] args) throws ClassNotFoundException, SQLException {  
        Connection conn = null;  
        ResultSet rs = null;  
        PreparedStatement preparedStatement = null;  
  
        Class.forName("com.mysql.cj.jdbc.Driver");  
        conn = DriverManager.getConnection(DBURL, DBUSER, DBPASS);  
  
        String username = "%takuya%";  
        String sql = "select * from blog where username like ?";  
        System.out.println(sql);  
        preparedStatement = conn.prepareStatement(sql);  
        preparedStatement.setString(1,username);  
        rs = preparedStatement.executeQuery();  
        while (rs.next()){  
            int id = rs.getInt("id");  
            String uname = rs.getString("username");  
            String password = rs.getString("password");  
            System.out.println("id=" + id);  
            System.out.println("username=" + uname);  
            System.out.println("password=" + password);  
        }  
    }  
}
```

如图所示，当传入的`username`为`%takuya%`时，通过debug发现数据库在执行时并没有将`%`进行转义处理，而是作为通配符进行查询了。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420001703.png)

对于这种攻击方式，最好的防范措施就是进行过滤，此类攻击场景大多都出现在查询的功能点，直接将`%`进行过滤是最简单和最有效的方式；

### 3.5 MyBatis 中`#{}`和`${}`的区别

1. `#{}`在底层实现上使用`?`作为占位符来生成`PrepareStatement`，也是参数化查询预编译的机制，这样即快速又安全。这意味着参数值发送到数据库之前会被适当转义，可以有效防止SQL注入。
2. `${}`将传入的数据直接显示生成在SQL语句中，而不会进行任何转义或预处理，类似于字符串拼接，可能会出现SQL注入的风险；


例如以下：

```sql
select * from user where id = #{id}     # 这是安全的写法
select * from user where id = ${id}     # 这是不安全的写法
```

- 使用的是`#{}`：如果`id`是由用户提供的输入，`#{}`将确保这个值被当作一个单一的参数处理，而不是SQL语句的一部分，即使是潜在的恶意数据，他也只被视为参数的值，而不会影响SQL命令的结构。

#### 3.5.1 安全代码示例
以下分别是安全的示例代码和非安全的示例代码，首先我们看下安全的示例代码：

- maven pom.xml文件配置：
```xml
<dependencies>  
    <dependency>  
        <groupId>mysql</groupId>  
        <artifactId>mysql-connector-java</artifactId>  
        <version>8.0.20</version>  
    </dependency>  
  
    <dependency>  
        <groupId>org.mybatis</groupId>  
        <artifactId>mybatis</artifactId>  
        <version>3.5.5</version>  
    </dependency>  
  
    <dependency>  
        <groupId>junit</groupId>  
        <artifactId>junit</artifactId>  
        <version>4.12</version>  
        <scope>test</scope>  
    </dependency>  
  
    <dependency>  
        <groupId>org.slf4j</groupId>  
        <artifactId>jul-to-slf4j</artifactId>  
        <version>1.7.36</version>  
    </dependency>  
  
    <dependency>  
        <groupId>ch.qos.logback</groupId>  
        <artifactId>logback-core</artifactId>  
        <version>1.2.3</version>  
    </dependency>  
</dependencies>
```

- Resources目录下mybatis-config.xml文件配置：
```xml
<?xml version="1.0" encoding="UTF-8" ?>  
<!DOCTYPE configuration  
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-config.dtd">  
<configuration>  
    <settings>  
        <setting name="logImpl" value="STDOUT_LOGGING"/>  
    </settings>  
  
    <environments default="development">  
        <environment id="development">  
            <transactionManager type="JDBC"/>  
            <dataSource type="POOLED">  
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>  
                <property name="url" value="jdbc:mysql://localhost:3306/test?serverTimezone=UTC"/>  
                <property name="username" value="root"/>  
                <property name="password" value="root"/>  
            </dataSource>  
        </environment>  
    </environments>  
  
  
    <mappers>  
        <mapper resource="Mapper/UserMapper.xml"/>  
    </mappers>  
</configuration>
```

- Resources-->Mapper目录下UserMapper.xml文件配置：
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.InjectionMybatisDemo01.pojo.User">  
    <select id="getUser" parameterType="int" resultType="com.InjectionMybatisDemo01.pojo.User">  
        select * from Blog where id = #{id}  
    </select>  
</mapper>
```

- User.java文件配置：
```java
package com.InjectionMybatisDemo01.pojo;  
  
public class User {  
    private int uid;  
    private String username;  
    private String password;  
  
    public int getUid() {  
        return uid;  
    }  
  
    public void setUid(int uid) {  
        this.uid = uid;  
    }  
  
    public String getUsername() {  
        return username;  
    }  
  
    public void setUsername(String username) {  
        this.username = username;  
    }  
  
    public String getPassword() {  
        return password;  
    }  
  
    public void setPassword(String password) {  
        this.password = password;  
    }  
  
    public String toString(){  // 这里重写了toString方法，不进行配置的话，就输出了类的全名和该对象实例的哈希值，为了更直观的看到结果，这里将该方法进行重写。
        return "User{" +  
                "id=" + uid +  
                ", username='" + username + '\'' +  
                ", password='" + password + '\'' +  
                '}';  
    }  
}
```

- UserTest.java文件配置：
```java
package com.InjectionMybatisDemo01.test;  
  
import com.InjectionMybatisDemo01.pojo.User;  
import org.apache.ibatis.io.Resources;  
import org.apache.ibatis.session.SqlSession;  
import org.apache.ibatis.session.SqlSessionFactory;  
import org.apache.ibatis.session.SqlSessionFactoryBuilder;  
  
import java.io.IOException;  
import java.io.Reader;  
  
public class UserTest {  
    SqlSessionFactory sqlSessionFactory = null;  
    SqlSession sqlSession = null;  
  
    {  
        String resource = "mybatis-config.xml";  
        Reader reader = null;  
  
        try {  
            reader = Resources.getResourceAsReader(resource);  
        }catch (IOException e){  
            e.printStackTrace();  
        }  
  
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);  
        sqlSession = sqlSessionFactory.openSession(true);  
    }  
  
    public void testSelectUser(){  
        User user = sqlSession.selectOne("getUser", 1);  
        System.out.println(user);  
    }  
  
    public static void main(String[] args) {  
        new UserTest().testSelectUser();  
    }  
}
```

定义了主体测试代码文件`UserTest.java`，设置传入的`id`的值为`1 and 1=2 union select 1,database(),3`

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420075047.png)

运行完成后，由于使用的是`#{id}`的安全的写法，所以进行参数化查询，并不会造成注入，运行完成后只输出了`id`为1的数据信息；

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420075233.png)

此时在传入到数据库中执行的语句是：
```sql
select * from user where id = '1 and 1=2 union select 1,database(),3';
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420080458.png)


#### 3.5.2 不安全代码示例

与之前的代码大致相同，区别在于，将`UserMapper.xml`定义SQL映射文件中配置的是`${id}`，不安全的代码写法如下所示：
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.InjectionMybatisDemo01.pojo.User">  
    <select id="getUser" resultType="com.InjectionMybatisDemo01.pojo.User">  
        select * from Blog where id = ${id}  
    </select>  
</mapper>
```

开头的部分提到，`${id}`不会进行SQL参数化查询，如果传入的数据没有经过过滤就有可能出现SQL注入漏洞，运行完成后，因为主体测试代码文件`UserTest.java`设置传入的`id`的值为`1 and 1=2 union select 1, database(),3`，所以结果是输出了SQL注入后数据库的数据信息，如下所示为输出结果：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420174629.png)

此时，带入到数据库中执行的SQL语句为：
```sql
select * from Blog where id=1 and 1=2 union select 1,database(),3;
```

### 3.6 MyBatis 常见SQL注入漏洞

#### 3.6.1 `order by`查询

`order by`子句中不能使用参数化查询的方式，用字符拼接的方式，而在mybatis中`#{}`是进行参数化查询的，如果在mybatis的`order by`子句中使用`#{}`，则`order by`子句就会失效，例如：`select * from user order by #{id}`。如果业务确实需要进行参数化查询的话，那么就只能使用`${}`，例如：`select * from user order by ${id};`，但是矛盾点在于`${}`可能会存在SQL注入漏洞，要避免SQL注入漏洞就需要进行过滤，mybatis框架中`order by`子句使用`#{}`

这里对源代码进行了部分的修改，修改后各个代码文件内容如下：
- 映射文件`UserMapper.xml`文件 内容如下：
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.InjectionMybatisDemo01.pojo.User">  
    <select id="getUser" resultType="com.InjectionMybatisDemo01.pojo.User">  
        select * from Blog order by #{age}  
    </select>  
</mapper>
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420182435.png)

- 数据库内容`User.java`代码文件内容如下：
```java
package com.InjectionMybatisDemo01.pojo;  
  
public class User {  
    private int id;  
    private String username;  
    private String password;  
    private int age;  
  
    public int getId() {  
        return id;  
    }  
  
    public void setId(int id) {  
        this.id = id;  
    }  
  
    public String getUsername() {  
        return username;  
    }  
  
    public void setUsername(String username) {  
        this.username = username;  
    }  
  
    public String getPassword() {  
        return password;  
    }  
  
    public void setPassword(String password) {  
        this.password = password;  
    }  
  
    public int getAge() {  
        return age;  
    }  
  
    public void setAge(int age) {  
        this.age = age;  
    }  
  
    public String toString(){  
        return "User{" +  
                "id=" + id +  
                ", username='" + username + '\'' +  
                ", password='" + password + '\'' +  
                ", age='" + age + '\'' +  
                '}';  
    }  
}
```

- 主体测试类代码如下：
```java
package com.InjectionMybatisDemo01.test;  
  
import com.InjectionMybatisDemo01.pojo.User;  
import org.apache.ibatis.io.Resources;  
import org.apache.ibatis.session.SqlSession;  
import org.apache.ibatis.session.SqlSessionFactory;  
import org.apache.ibatis.session.SqlSessionFactoryBuilder;  
  
import java.io.IOException;  
import java.io.Reader;  
import java.util.List;  
  
public class UserTest {  
    SqlSessionFactory sqlSessionFactory = null;  
    SqlSession sqlSession = null;  
  
    {  
        String resource = "mybatis-config.xml";  
        Reader reader = null;  
  
        try {  
            reader = Resources.getResourceAsReader(resource);  
        }catch (IOException e){  
            e.printStackTrace();  
        }  
  
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);  
        sqlSession = sqlSessionFactory.openSession(true);  
    }  
  
    public void testSelectUser(){  
        List<User> users = sqlSession.selectList("getUser", "age");  
        for (User user : users){  
            System.out.println(user);  
        }  
    }  
  
    public static void main(String[] args) {  
        new UserTest().testSelectUser();  
    }  
}
```

运行后，输出的结果显示，结果并没有按照age进行排序，这是因为使用了`#{}`参数化查询了，所以导致了`order by`子句的内容并没有被执行。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420182647.png)

> 补充：可以通过使用`MyBatis Log plugin`来查看运行的SQL语句；

在菜单栏的工具中选择`MyBatis Log Plugin`就可以查看SQL语句了，如下图所示：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240420235905.png)

那么接下来在MyBatis框架中order by子句使用`${}`，那么与上面示例的区别在于需要修改`UserMapper.xml`，修改后内容如下：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421000214.png)

运行后，输出的结果是：结果根据`age`参数的值进行了排序，说明使用了`${}`查询后`order by`子句正常，如下图所示：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421000532.png)

通过mybatis的日志插件MyBatis Log Plugin查看运行的SQL语句是`select * from blog order by age`，这样就可以正常的执行了，但是`${}`使用的是字符串拼接的方式，那么就很有可能存在SQL注入的漏洞。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421000613.png)

#### 3.6.2 `like`查询

mybatis的`like`子句中使用`#{}`时，程序就会出现报错，例如`select * from users where name like '%#{user}%'`，示例代码执行后，出现了如下报错：
- 配置SQL映射文件`UserMapperDemo02.xml`内容：
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.injectionMybatisDemo02.pojo.User">  
    <select id="getUserDemo02" parameterType="String" resultType="com.injectionMybatisDemo02.pojo.User">  
        select * from testDemo where name like '%#{user}%'  
    </select>  
</mapper>
```
- 程序运行后，出现如下报错：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421195145.png)

为了避免报错就只能使用`${}`，例如：`select * from users where name like '%${user}%;`，但是使用了`${}`就有可能会存在SQL注入漏洞，要避免SQL注入漏洞，那么就需要进行过滤。

- 首先，我们将SQL映射文件`UserMapperDemo02.xml`进行修改，修改后内容如下所示：
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.injectionMybatisDemo02.pojo.User">  
    <select id="getUserDemo02" parameterType="String" resultType="com.injectionMybatisDemo02.pojo.User">  
        select * from testDemo where name like '%${user}%'  
    </select>  
</mapper>
```

- 然后执行程序，程序正常运行，输出查询后的结果信息，如下：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421195600.png)

但是要注意的是，`${}`使用的是字符串拼接的方式，那么这就很有可能会造成SQL注入漏洞，当我们的`user`传入的是`xx' union select 1,database(),3,4 #`时，注入就产生了！如下图所示：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421201629.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421201658.png)

#### 3.6.3 `in`参数

mybatis框架的`in`子句中使用`#{}`与`${}`，参数类似于`'user1', 'user2','user3','user4'`，多个参数时结果也会不一样，在mybatis的`in`子句中使用`#{}`会将多个参数当作一个整体；

在本示例中，SQL的映射文件`UserMapperDemo03.xml`配置如下所示：
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.InjectionMybatisDemo03.pojo.User">  
    <select id="getUser03" parameterType="String" resultType="com.InjectionMybatisDemo03.pojo.User">  
        select * from testdemo where name in (#{user})  
    </select>  
</mapper>
```

mybatis的`in`子句中使用的是`#{}`参数化查询，转换后所执行的sql语句为：
```sql
select * from testdemo where name in (''user1','user2','user3','user4'')
```

在这当中，`'user1','user2','user3','user4'`被当作了一个整体，所以无法查询到数据；
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421234647.png)

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421234714.png)

为了避免上述问题，所以就只能使用`${}`。
接下来将SQL映射文件`UserMapperDemo03.xml`修改，修改后配置如下所示：
```xml
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.InjectionMybatisDemo03.pojo.User">  
    <select id="getUser03" parameterType="String" resultType="com.InjectionMybatisDemo03.pojo.User">  
        select * from testdemo where name in (${user})  
    </select>  
</mapper>
```

接下来执行代码，带入到数据库中执行的SQL语句以及执行结果如下所示：
![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421235645.png)


![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240421235708.png)

可以看到，mybatis的`in`子句中使用`${}`参数化查询，会将`select * from users where name in ((${user}))`转换为`select * from users where name in ('user1','user2','user3','user4');`，这是正常的程序设计逻辑，输出查询结果。但是还是老问题，使用`${}`就有可能存在SQL注入漏洞。

> PS：篇幅太大，后部分下一篇见🤔