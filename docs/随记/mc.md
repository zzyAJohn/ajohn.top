---
title: Minecraft 服务器搭建
tags:
    - Game
    - Minecraft
createTime: 2024/12/28 11:16:38
permalink: /article/31au2d1x/
---

突然想和小伙伴玩一下 Minecraft，遂搭建了一个服务器<!-- more -->
## 1. 购买云服务器


配置可以参考如下我使用的：

### 1.1 服务器详情
```
实例: i-uf64asm5tq86xwge5oek

数量: 1

时长: 2 个月

配置
实例规格: 2核 4G ecs.e 系列 V

I/O 优化实例: I/O 优化实例

系统盘: ESSD Entry /dev/xvda 20GB 模块属性

带宽: 5Mbps 按流量计费

CPU: 2核

可用区: 随机分配

操作系统: Ubuntu 20.04 64位 Linux 64位

内存: 4GB

地域: 华东2（上海）

网络类型: 专有网络

体检服务: 是

管家服务: 是

价格
总应付金额: (￥0.00)
```
### 1.2 数据包详情
```
实例: flowpack-cn-lm342df4m026

数量: 1

时长: 6 个月

配置
流量包规格: 60GB

套餐: 亚太全时

价格
总应付金额: (￥0.00)
```
## 2. 配置服务器
### 2.1 安装 java

从1.12（17w13a）开始，运行Minecraft的最低要求是Java 8。

从1.17（21w19a）开始，运行Minecraft的最低要求是Java 16。

从1.18（1.18-pre2）开始，运行Minecraft的最低要求是Java 17。

从1.20.5（24w14a）开始，运行Minecraft的最低要求是Java 21，且操作系统要求为64位。


我使用的是 Java 21，mc 版本 1.21.4

```bash
apt update
```
```bash
apt install openjdk-21-jre
```

查看 java 版本
```bash
root@iZuf64asm5tq86xwge5oekZ:/# java -version
openjdk version "21.0.5" 2024-10-15
OpenJDK Runtime Environment (build 21.0.5+11-Ubuntu-1ubuntu120.04)
OpenJDK 64-Bit Server VM (build 21.0.5+11-Ubuntu-1ubuntu120.04, mixed mode, sharing)
root@iZuf64asm5tq86xwge5oekZ:/# 
```

### 2.2 安装 MCSManager
推荐使用 github 开源项目：[MCSManager](https://github.com/MCSManager/MCSManager)，使用下面命令下载：
```bash
sudo su -c "wget -qO- https://script.mcsmanager.com/setup.sh | bash"
```
等待一会，出现：
```bash
==================================================================
Installation is complete! Welcome to the MCSManager!!!
 
HTTP Web Service:        http://<Your IP>:23333  (Browser)
Daemon Address:          ws://<Your IP>:24444    (Cluster)
You must expose ports 
23333
 and 
24444
 to use the service properly on the Internet.
 
Usage:
systemctl start mcsm-{daemon,web}.service
systemctl stop mcsm-{daemon,web}.service
systemctl restart mcsm-{daemon,web}.service
 
Official Document: https://docs.mcsmanager.com/
==================================================================
```
设置开机自启动
```bash
systemctl enable mcsm-{daemon,web}.service
```
启动服务
```bash
systemctl start mcsm-{daemon,web}.service
```
查看服务状态
```bash
systemctl status mcsm-{daemon,web}.service
```
文字中出现：
```bash
active (running)
```
代表成功启动

### 2.3 开放端口

去阿里云开放 23333 和 24444（MCSManager端口），以及 25565（我的世界端口）

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-28/202412281627981.png)

## 3. 使用 MCSManager 创建实例

[下载 Minecraft：Java 版服务器网页](https://www.minecraft.net/zh-hans/download/server)，或者直接 [点击下载 minecraft_server.1.21.4.jar](https://piston-data.mojang.com/v1/objects/4707d00eb834b446575d89a61a11b5d548d8c001/server.jar)

在浏览器打开：`http://<Your IP>:23333`，中间换成你的 ip，即可进入 MCSManager Web 管理页面。

依次点击 `应用实例` - `新建应用-Minecraft Java版游戏服务器` - `localhost:24444()` - `上传单个服务端软件` 。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-28/202412281835129.png)

随便填写一个名称，点击 `选择文件`，上传我们刚才下好的 `server.jar`，即可创建实例


![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-28/202412281837222.png)

点击上图红色矩形 `服务端配置文件`，出现：

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-28/202412281838169.png)

编辑 `eula.txt` ，将选项改为是，即同意 Minecraft EULA 协议，如果您要启动 Minecraft 服务器，则此选项是必须开启。

编辑 `server.properties`，找到 `online-mode`，把值改为false，即关闭正版验证，还有一些其他选项可以按需配置。


## 4. 下载启动器

推荐使用 github 开源项目：[HMCL](https://github.com/HMCL-dev/HMCL) 作为启动器，点击下载 [HMCL-3.6.11.exe](https://github.com/HMCL-dev/HMCL/releases/download/release-3.6.11/HMCL-3.6.11.exe)

安装好启动器后，在启动器中下载对应版本的 mc（我的是 1.21.4），下载完成后，点击 `启动游戏`。

进入游戏主页面，选择 `多人游戏` - `添加服务器`，服务器名称随便取，服务器地址填写你的服务器ip，就可以进入游戏了

## 5. 命令

### 5.1 MCSManager 终端
将用户 `zzy` 设置为管理员

op zzy


### 5.2 游戏内

按 `/` 使用命令：

创造模式

gamemode creative

<!-- ## 6. 域名解析

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-28/202412281905534.png) -->

## 参考资料：
- [【MC】从零开始使用云服务器搭建Minecraft服务器](https://www.bilibili.com/video/BV1pa411G7zy?spm_id_from=333.788.videopod.episodes&vd_source=a12b120a91b36ce38ce8755fef7348d7)