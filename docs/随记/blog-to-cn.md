---
title: 搭建国内博客
createTime: 2025/02/18 09:38:49
permalink: /article/l5qbaepk/
---

AJohn Blog 创建之初本是打算记录所学，同时给予来者之参考借鉴，主要面向程序员学习交流，故而白嫖了很久 Github 的服务器，使用起来也是非常丝滑，从未罢工。怎奈随着时光流逝，有时分享于其他行业之友人却是稍有不便，遂将博客同时部署于 Github 服务器与国内服务器。特别感谢[YOYO](https://www.yoake.cc/)的技术支持。
<!-- more -->
## 1. 购买服务器

本次使用的是华为云服务器
```	
ajohn-top
产品类型：弹性云服务器 ECS
区域：华东-上海一	
自定义计算型|x1.1u.1g|1vCPUs|1GB|linux × 1
通用型SSD|20GB × 1	
企业项目：default
计费模式：包年/包月 | 4个月
开始时间： 2025/02/18 16:28:14 GMT+08:00
结束时间： 2025/06/18 23:59:59 GMT+08:00
数量：1
金额(¥)：218.00
```

```
公网ip
产品类型：虚拟私有云 VPC
区域：华东-上海一
动态BGP|固定带宽|2Mbps × 1
公网IP × 1	
企业项目：default
计费模式：包年/包月 | 4个月
开始时间： 2025/02/18 16:28:14 GMT+08:00
结束时间： 2025/06/18 23:59:59 GMT+08:00
数量：1
金额(¥)：184.00
```


服务器购买完成后，登入服务器，给我们自己新建一个用户
```bash
sudo useradd -m -s /bin/bash zzy
```

给用户初始化密码
```bash
root@ajohn-top:~# sudo passwd zzy
New password: 
Retype new password: 
passwd: password updated successfully
```


给我们管理员权限
```bash
usermod -aG sudo zzy
```


切换到用户
```bash
root@ajohn-top:~# su - zzy
zzy@ajohn-top:~$
```





## 2. 安装宝塔

[宝塔官网](https://www.bt.cn/new/download.html)

我的操作系统是 ubuntu ，因此使用：
```bash
wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh && sudo bash install_panel.sh ed8484bec
```

经过漫长的等待，安装完成后，出现：
```bash
==================================================================
Congratulations! Installed successfully!
=============注意：首次打开面板浏览器将提示不安全=================

 请选择以下其中一种方式解决不安全提醒
 1、下载证书，地址：https://dg2.bt.cn/ssl/baota_root.pfx，双击安装,密码【www.bt.cn】
 2、点击【高级】-【继续访问】或【接受风险并继续】访问
 教程：https://www.bt.cn/bbs/thread-117246-1-1.html
 mac用户请下载使用此证书：https://dg2.bt.cn/ssl/mac.crt

========================面板账户登录信息==========================

 【云服务器】请在安全组放行 36426 端口
 外网面板地址: **************************
 内网面板地址: **************************
 username: *********
 password: *********

==================================================================
Time consumed: 5 Minute!
zzy@ajohn-top:~$ 
```

如果不小心丢失终端，可以使用
```bash
sudo bt
```
重新调出宝塔管理面板，并输入 `14` ，会重新显示你的宝塔外网面板地址。


去（华为云）服务器安全组放行宝塔的端口，我这里是 `36426` ，顺便放行 80 (http) 和 443 (https) 端口，然后打开外网面板地址。

第一次打开会提示**你的连接不是专用连接**，点击下面 `高级` 选项，点击 `继续访问 (不安全)` ，输入宝塔的账号和密码。


进入后点击左侧侧边栏的 `网站` ，选择 `安装Nginx`，默认 1.24.0 极速安装即可。


安装完成后，点击 `HTML项目` ，点击绿色的 `添加HTML项目` ，在域名处填写 `www.ajohn.top` ，点击添加。


tips：默认根目录是 `/www/wwwroot/www.ajohn.top` ，因此要把我们的网站下到这个文件夹。

## 3. 下载博客HTML代码

进入到目录
```bash
cd /www/wwwroot
```

克隆博客网页代码
```bash
sudo git clone -b blog_pages https://github.com/zzyAJohn/ajohn.top.git
```

出现：
```bash
zzy@ajohn-top:~$ sudo git clone -b blog_pages https://github.com/zzyAJohn/ajohn.top.git
Cloning into 'ajohn.top'...
remote: Enumerating objects: 1491, done.
remote: Counting objects: 100% (340/340), done.
remote: Compressing objects: 100% (130/130), done.
remote: Total 1491 (delta 176), reused 288 (delta 146), pack-reused 1151 (from 2)
Receiving objects: 100% (1491/1491), 2.85 MiB | 4.86 MiB/s, done.
Resolving deltas: 100% (842/842), done.
```
::: tip
如果因为网络问题失败，建议收藏 [GitHub 加速站 GitHub Proxy](https://ghfast.top/) ，并使用：
```bash
sudo git clone -b blog_pages https://ghfast.top/https://github.com/zzyAJohn/ajohn.top.git
```
:::

tips：记得把 `ajohn.top` 文件夹重命名为宝塔的 `www.ajohn.top` ，可以在宝塔可视化界面修改文件名。

## 4. 域名解析
前往域名商添加一条解析记录：
```
主机记录：www
记录类型：A
记录值：你的服务器ip
```

等待解析完成，在浏览器输入 `www.ajohn.top` ，已经可以访问了。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2025-02-18/202502181755901.png)
## 5. 备案

但再次点击后不可访问

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2025-02-18/202502181757755.png)

后面自行备案即可。

