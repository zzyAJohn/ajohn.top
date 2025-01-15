---
title: 通过 SSH 密钥登录服务器
tags:
    - ssh
createTime: 2025/01/15 11:28:00
permalink: /article/1y2edp62/
---

## 1 介绍

### 1.1 密钥是什么
密钥（`key`）是一个非常大的数字，通过加密算法得到。对称加密只需要一个密钥，非对称加密需要两个密钥成对使用，分为公钥（`public key`）和私钥（`private key`）。
<!-- more -->
`SSH` 密钥登录采用的是非对称加密，每个用户通过自己的密钥登录。其中，私钥必须私密保存，不能泄漏；公钥则是公开的，可以对外发送。它们的关系是，公钥和私钥是一一对应的，每一个私钥都有且仅有一个对应的公钥，反之亦然。

如果数据使用公钥加密，那么只有使用对应的私钥才能解密，其他密钥都不行；反过来，如果使用私钥加密（这个过程一般称为“签名”），也只有使用对应的公钥解密。

### 1.2 密钥登录的过程
`SSH` 密钥登录分为以下的步骤。

预备步骤，客户端通过 `ssh-keygen` 生成自己的公钥和私钥。

第一步，手动将客户端的公钥放入远程服务器的指定位置。

第二步，客户端向服务器发起 `SSH` 登录的请求。

第三步，服务器收到用户 `SSH` 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。

第四步，客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。

第五步，服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录。

## 2. 设置 SSH，打开密钥登录功能（管理员）

编辑 `/etc/ssh/sshd_config` 文件
```bash
user@user:~/.ssh$ sudo vim /etc/ssh/sshd_config
```
加入如下设置：
```bash
RSAAuthentication yes
PubkeyAuthentication yes
```

另外，请留意 root 用户能否通过 SSH 登录：
```bash
PermitRootLogin yes
```
当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录：
```bash
PasswordAuthentication no
```
最后，重启 SSH 服务：
```bash
user@user:~/.ssh$ sudo service sshd restart
```

## 3. 用户制作密钥对
### 3.1 制作密钥对
```bash
zzy@user:~$ ssh-keygen # <== 建立密钥对
Generating public/private rsa key pair.
Enter file in which to save the key (/home/zzy/.ssh/id_rsa): # <== 按 Enter
Created directory '/home/zzy/.ssh'.
Enter passphrase (empty for no passphrase): # <== 输入密钥锁码，或直接按 Enter 留空
Enter same passphrase again: # <== 再输入一遍密钥锁码
Your identification has been saved in /home/zzy/.ssh/id_rsa # <== 私钥
Your public key has been saved in /home/zzy/.ssh/id_rsa.pub # <== 公钥
The key fingerprint is:
SHA256:******************************************* zzy@user
The key's randomart image is:
+---[RSA 3072]----+
|   ..E++*.       |
|  . ++.o o       |
| . *.=o o        |
|. * @. o         |
|oo X *  S        |
|=.o O o          |
|+=o  +           |
|+*..             |
|B++              |
+----[SHA256]-----+
```

密钥锁码在使用私钥时必须输入，这样就可以保护私钥不被盗用。当然，也可以留空，实现无密码登录。

现在，在 `zzy` 用户的家目录中生成了一个 `.ssh` 的隐藏目录，内含两个密钥文件。`id_rsa` 为私钥，`id_rsa.pub` 为公钥。

### 3.2 在服务器上安装公钥
键入以下命令，在服务器上安装公钥：
```bash
zzy@user:~$ cd .ssh
zzy@user:~/.ssh$ cat id_rsa.pub >> authorized_keys
```

### 3.3 将私钥下载到客户端

使用 WinSCP、SFTP 等工具将私钥文件 `id_rsa` 下载到客户端机器上 `C:\Users\AJohn\.ssh\id_rsa`

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2025-01-15/202501151134510.png)

在 `VSCode` 中配置密钥登录路径 `IdentityFile C:\Users\AJohn\.ssh\id_rsa`
```
Host ************
  HostName ************
  User ***
  IdentityFile C:\Users\AJohn\.ssh\id_rsa
```
配置完成后，即可免密登录

## 参考资料：
- [设置 SSH 通过密钥登录](https://www.runoob.com/w3cnote/set-ssh-login-key.html)
- [SSH 密钥登录](https://wangdoc.com/ssh/key)
- [如何让 vscode 使用 ssh密钥 (key) 来连接到远程Linux上](https://blog.csdn.net/surfirst/article/details/114311394)