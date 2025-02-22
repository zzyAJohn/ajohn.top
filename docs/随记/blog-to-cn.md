---
title: 搭建国内博客
tags:
    - Linux
createTime: 2025/02/18 09:38:49
permalink: /article/l5qbaepk/
---

AJohn Blog 创建之初本是打算记录所学，同时给予来者之参考借鉴，主要面向程序员学习交流，故而白嫖了很久 Github 的服务器，使用起来也是非常丝滑，从未罢工。怎奈随着时光流逝，有时分享于其他行业之友人却是稍有不便，遂将博客同时部署于 Github 服务器与国内服务器。特别感谢 [YOAKE](https://github.com/YOYOYOAKE.png) 的技术支持。
<!-- more -->

::: tip
本文使用 ajohn.top 二级域名演示， [Github 仓库](https://github.com/zzyAJohn/ajohn.top)同名，网站则是部署 `www.ajohn.top` ，如需参考请自行更换。
:::

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


## 2. 下载博客HTML代码

创建目录：
```bash
mkdir /www/wwwroot
```

进入到目录：
```bash
cd /www/wwwroot
```

克隆博客网页代码
```bash
sudo git clone -b blog_pages https://github.com/zzyAJohn/ajohn.top.git
```
虽说已经赋予了管理员权限，但有时总会遇到奇怪的问题，如果提示没权限可以切换到 root：
```bash
sudo -i
```

或者用ssh密钥下载：
```bash
git clone -b blog_pages git@github.com:zzyAJohn/ajohn.top.git
```

::: tip
如果因为网络问题失败，建议收藏 [GitHub 加速站 GitHub Proxy](https://ghfast.top/) ，并使用：
```bash
sudo git clone -b blog_pages https://ghfast.top/https://github.com/zzyAJohn/ajohn.top.git
```
:::



## 3. 安装宝塔

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

 【云服务器】请在安全组放行 ***** 端口
 外网面板地址: **************************
 内网面板地址: **************************
 username: *********
 password: *********

==================================================================
Time consumed: 5 Minute!
zzy@ajohn-top:~$ 
```

如果不小心丢失终端，可以使用：
```bash
sudo bt
```
重新调出宝塔管理面板，并输入 `14` ，会重新显示你的宝塔外网面板地址。


去（华为云）服务器安全组放行宝塔的端口，顺便放行 80 (http) 和 443 (https) 端口，然后打开宝塔外网面板地址。

第一次打开会提示**你的连接不是专用连接**，点击下面 `高级` 选项，点击 `继续访问 (不安全)` ，输入宝塔的账号和密码。


进入后点击左侧侧边栏的 `网站` ，选择 `安装Nginx`，默认 `1.24.0` 极速安装即可。


安装完成后，点击 `HTML项目` ，点击绿色的 `添加HTML项目` ，在域名处填写 `www.ajohn.top` ，其余项目会自动填写。

::: tip
默认根目录是 `/www/wwwroot/www.ajohn.top` ，可以点击右侧小文件夹图标选择目标文件夹。
:::

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221231465.png)

点击 `确定` ，即可创建成功。


![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221234205.png)

## 4. 域名解析
前往域名商添加一条解析记录：
```
主机记录：www
记录类型：A
记录值：你的服务器ip
```
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221238755.png)

等待解析完成，在浏览器输入 `www.ajohn.top` ，已经可以访问了。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-18/202502181755901.png)

左上角提示不安全是因为没有安装 SSL 证书，安装证书请看第六节。

## 5. 备案

但过一会发现不可访问。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-18/202502181757755.png)

后面自行去服务器供应商处备案即可。

自此， `ajohn.top` 使用 Github 服务器， `www.ajohn.top` 使用华为云服务器，国际与国内用户体验大大提升。

后续：备案很人性化，一天就通过了，记得在一个月内去公安备案。

## 6. SSL 证书

此时网站只能通过 http 访问，想要通过 https 安全访问需要部署 SSL 证书。


打开宝塔页面，点击 `网站` - `HTML项目` ，在SSL证书栏会显示一个黄色的 `未部署` 。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221234205.png)

点击 `未部署` ，选择 `Let's Encrypt` ，此时页面上会有两个 `申请证书` ，选择靠下面的，

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221242227.png)

选择 `DNS验证（支持通配符）` ，下面四个框框全选，点击 `申请证书`。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221242745.png)

申请后，会弹出一个包含解析域名和记录值的窗口。



前往域名解析，添加两个记录，

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221246365.png)


等待解析生效，即可在宝塔页面将证书部署到服务器，并打开 `强制HTTPS`。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221248380.png)

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221249315.png)

此时再次打开网页，可以看到，已经是 https 开头了。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221250856.png)


## 7. 自动脚本

### 7.1 续签证书脚本

证书的有效期是90天，为了方便我们可以使用脚本自动续签。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221257048.png)

在宝塔面板点击左侧侧边栏的 `计划任务`，

点击 `添加任务` ，参考图中填写。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221255075.png)

脚本内容放在这里诸君自取。

```bash
/www/server/panel/pyenv/bin/python3 -u /www/server/panel/class/acme_v2.py --renew_v2=1
```

### 7.2 拉取仓库脚本

点击 `添加任务` ，参考图中填写。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2025-02-22/202502221259851.png)

脚本内容放在这里诸君自取。

```bash
#!/bin/bash

echo "正在更新ajohn.top……"
cd "/www/wwwroot/ajohn.top"
git fetch
git reset --hard origin/blog_pages
```

::: tip 
请自行更换网址与分支名
:::
## 8. 其它

如果删除项目时遇到：
```bash
root@ajohn-top:/www/wwwroot# sudo rm -rf ajohn.top/
rm: cannot remove 'ajohn.top/.user.ini': Operation not permitted
```

可以先移除文件的不可变属性，
```bash
chattr -i /www/wwwroot/ajohn.top/.user.ini
```
然后再删除即可。

## 参考资料：
- [YOAKE](https://github.com/YOYOYOAKE.png) 的脑子
