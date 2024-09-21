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


