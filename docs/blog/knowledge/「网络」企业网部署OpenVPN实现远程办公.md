---
date: 2024-09-21 23:54:00
---

# 「网络」企业网部署OpenVPN实现远程办公

## 0x01 网络规划

整体网络规划如下：
```text
1. 企业内部局域网：192.168.100.0/24
2. 企业内部无线网：192.168.200.0/24
3. OpenVPN网段： 10.6.0.0/24
4. OpenVPN服务端：192.168.100.1/24
5. OpenVPN端口：UDP 9999
6. DDNS域名：takuya.example.com
```

## 0x02 OpenVPN服务器前期准备

1. 更新国内镜像源
修改`/etc/apt/source.list`文件，将原来的官方镜像源地址注释，添加阿里云镜像。
```bash
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multivers
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.co/ubuntu/ jammy-security main restricted universe muiltiverse
deb-src http://mirrors.aliyun.com/ubuntu jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu jammy-update main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.ccom/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirros.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
```

2. 更新系统
```bash
sudo apt update
sudo apt upgrade -y
```

3. 安装OpenVPN和Easy-RSA
```bash
sudo apt install openvpn easy-rsa -y
```
## 0x03 配置Easy-RSA并生成证书

1. 设置Easy-RSA
```bash
mkdir ~/easy-rsa
ln -s /usr/share/easy-rsa/* ~/easy-rsa/
cd ~/easy-rsa
./easyrsa init-pki
```
2. 生成CA证书
```bash
./easyrsa build-ca nopass
```

3. 生成服务器证书和密钥
```bash
./easyrsa gen-req server nopass
./easyrsa sign-req server server
```

4. 生成Diffe-Hellman参数和TLS-Auth密钥
```bash
./easyrsa gen-dh
./easyrsa --genkey --secret takuya.key
```
## 0x04 配置OpenVPN服务器

1. 复制证书和密钥
```bash
sudo cp ~/easy-rsa/pki/{ca.crt issued/server.crt,private/server.key,dh.pem} /etc/openvpn/
sudo cp ~/easy-rsa/takuya.key /etc/openvpn/
```

2. 创建服务端配置文件
```bash
sudo vim /etc/openvpn/server.conf
```
添加以下内容：
```bash
port 9999
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
server 10.6.0.0 255.255.255.0
push "route 192.168.100.0 255.255.255.0"
push "route 192.168.200.0 255.255.255.0"
push "dhcp-option DNS 114.114.114.114"
push "dhcp-option DNS 223.5.5.5"
keepalive 10 120
tls-auth takuya.key 0
cipher AES-256-GCM
auth SHA256
user nobody
group nogroup
persist-key
persist-tun
status /var/log/openvpn/openvpn-status.log
verb 3
client-config-dir /etc/openvpn/ccd
client-cert-not-required
username-as-common-name
plugin /usr/lib/openvpn/openvpn-plugin-auth-pam.so login
```
## 0x05 配置系统以允许IP转发

在系统终端输入：
```bash
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## 0x06 配置系统服务器策略

在系统终端输入以下命令：
```bash
sudo iptables -t nat -A POSTROUTING -s 10.6.0.0/24 -o eth0 -j MASQUERADE
sudo iptables -A INPUT -p udp --dport 9999 -j ACCEPT
sudo iptables -A INPUT -i tun0 -j ACCEPT
sudo iptables -A FORWARD -i tun0 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i eth0 -o tun0 -m state --state RELATED,ESTABLISHED -j ACCEPT
```

保存防火墙策略：
```bash
sudo apt install iptables-persistent -y
sudo netfilter-persistent save
```

## 0x07 设置用户认证

1. 修改配置文件
```bash
sudo vim /etc/pam.d/openvpn

# 添加以下行
auth required pam_unix.so
```

2. 创建系统用户账户
```bash
sudo adduser xiaoming
sudo adduser xiaozhang
sudo adduser xiaowang
```

## 0x08 生成客户端配置

1. 创建基础客户端配置
```bash
cat > ~/client-base.conf <<EOF
client
dev tun
proto udp
remote takuya.example.com 9999
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tis server
cipher AES-256-GCM
auth SHA256
key-direction 1
verb 3
auth-user-pass
EOF
```

2. 编写一个脚本，为每个用户生成证书和配置
```bash
for USER in xiaoming xiaozhang xiaowang; do
# 生成客户端证书和密钥
  cd ~/easy-rsa
  ./easyrsa gen-req $USER nopass
  ./easyrsa sign-req client $USER

  # 创建用户配置文件
  mkdir -p ~/client-configs
  cp ~/client-base.conf ~/client-configs/$USER.ovpn
  echo "<ca>" >> ~/client-configs/$USER.ovpn
  cat ~/easy-rsa/pki/ca.crt >> ~/client-configs/$USER.ovpn
  echo "</ca>" >> ~/client-configs/$USER.ovpn
  echo "<cert>" >> ~/client-configs/$USER.ovpn
  cat ~/easy-rsa/pki/issued/$USER.crt >> ~/client-configs/$USER.ovpn
  echo "</cert>" >> ~/client-configs/$USER.ovpn
  echo "<key>" >> ~/client-configs/$USER.ovpn
  cat ~/easy-rsa/pki/private/$USER.key >> ~/client-configs/$USER.ovpn
  echo "</key>" >> ~/client-configs/$USER.ovpn
  echo "<tls-auth>" >> ~/client-configs/$USER.ovpn
  cat ~/easy-rsa/takuya.key >> ~/client-configs/$USER.ovpn
  echo "</tls-auth>" >> ~/client-configs/$USER.ovpn
done
```

## 0x09 启动OpenVPN服务

在终端输入以下命令：
```bash
sudo systemctl start openvpn@server
sudo systemctl enable openvpn@server
```



