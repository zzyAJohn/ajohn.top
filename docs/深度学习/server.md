---
title: 深度学习服务器配置（管理员篇）
tags:
    - Document
    - Linux
    - Deep Learning
createTime: 2024/12/21 16:38:48
permalink: /article/server/
cover: https://img1.baidu.com/it/u=751575883,1849556738&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500
---

本篇博客主要记录 Ubuntu 深度学习服务器配置 ~~以及从删库到跑路~~。

<!-- more -->

---
PS ：在昨天12月20日下午本来一切配置妥当，但是晚上输入 `nvidia-smi` 突然报错。

原因可能是没有把自动更新关掉，系统自动更新了 NVIDIA 库文件，和驱动不匹配。

我尝试更新驱动，失败了，导致服务器差点成砖了，后续重装了四次系统，终于在12月21日下午4点恢复正常使用。

特此记录，可为以后的服务器管理员重装作参考。

---
2025.1.4 更新：又重装了，这次把需要下载的东西都备份到机械硬盘 `/mnt/data/bak` 文件夹下了，万一下次需要重装，直接 cp 到 `/home/user/Downloads` 就可以了。
```bash
zzy@user:/mnt/data/bak$ ls
Anaconda3-2024.10-1-Linux-x86_64.sh  cudnn-linux-x86_64-8.9.7.29_cuda11-archive         NVIDIA-Linux-x86_64-550.142.run
cuda_11.8.0_520.61.05_linux.run      cudnn-linux-x86_64-8.9.7.29_cuda11-archive.tar.xz  rjsupplicant
```

---
2025.2.10更新：开学来不知怎的又黑屏了，重装！

---
2025.3.17 更新：驱动掉了，显示 `Driver Not Loaded`，解决方法跳转 [11. Driver Not Loaded](#11-driver-not-loaded)

---
2025.9.25 更新：没有程序运行但是cpu爆了，疑似有僵尸把cpu占满了，接到通知又要重装一次，所幸环境皆有备份，还算容易。其实很早我就在想要不要写个脚本，以后重装直接一行命令执行全部操作，一劳永逸，感觉有点搞头，怎奈最近空闲时间不多，遂搁置了（期待以后实验室哪位继承人发扬光大）。

## 1. 重装系统 Ubuntu20.04

准备：一个u盘，一台能联网的windows电脑。

### 1.1 下载 Ubuntu20.04 

下载地址：[Ubuntu 20.04.6 LTS (Focal Fossa)](https://releases.ubuntu.com/focal/)

往下拉，选择 `ubuntu-20.04.6-desktop-amd64.iso	2023-03-16 15:58	4.1G	Desktop image for 64-bit PC (AMD64) computers (standard download)` 下载到你的windows电脑


### 1.2 下载 软碟通软件
下载软碟通软件（UltralSO），这个百度即可。

下载安装之后，提示要注册，这个可以不必管它，直接试用即可。
::: iportant 重要
如果你的u盘有重要文件，请先备份！
:::
### 1.3 刻录到u盘

在左侧打开 Ubuntu 镜像：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221113181.png)

启动-写入硬盘镜像，磁盘启动器选择自己U盘，映像文件选择 Ubuntu 系统镜像，写入方式选择 USB-HDD+，点击写入即可。
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221113911.png)

刻录校验不选
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221121124.png)

等待十分钟左右，u盘变成：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221123252.jpg)

### 1.3 u盘启动

给服务器插上u盘，开机后疯狂按 `del`，直到左下角出现变化，好像是什么正在进入设置，反正左下角有变化就是成功了不用按了


进入主板：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221125254.jpg)

按小键盘的 `→` 移动到 `Boot`
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221126172.jpg)

按 `↓` 移动到 `Boot Option #1` 按 `-` 可以切换启动项，直到启动项是u盘即可：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221126366.jpg)

按 `f10` 保存，之后会自己启动 ubuntu，什么都不要按：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221129971.jpg)

### 1.4 安装 Ubuntu
选择 `Install Ubuntu`
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221129758.jpg)


默认英语，直接 `Continue`：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221129104.jpg)

默认 `Normal installation` 直接 `Continue`：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221130356.jpg)

选择 `Erase disk and install Ubuntu`
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221131358.jpg)

选择 2t 盘
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221131569.jpg)

`Continue`
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221132621.jpg)

随便点个国内点，默认上海就行，`Continue`
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221132013.jpg)

设置主机名和管理员，`Continue`
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221132952.jpg)

### 1.5 2t固态启动
之后会自动重启，出现：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221133079.jpg)

提示你弹出u盘，然后按回车，这时候又会重启，疯狂按 `del`，去修改启动项为2t盘（修改启动方式上面教过了，不再赘述）

启动成功：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221134189.jpg)


### 1.6 关闭自动更新

1. 把那该死的自动更新关掉！

- 修改配置文件/etc/apt/apt.conf.d/10periodic

  将“1”改为“0”，保存即可

- 修改配置文件/etc/apt/apt.conf.d/20auto-upgrades

  将“1”改为“0”，保存即可
- 系统设置-->软件和更新-->更新，将“自动检查更新”和“有新版本时通知我”设置为“从不“，关闭对话框完成设置。

2. 设置永不息屏

## 2. 配置网络

::: important 重要
我建议你做完 2.1 连上网之后，先去做 3 安装驱动，第三章最容易出问题导致重装系统，如果第三章没问题了，再配置 2.2 和 2.3 也是可以的
:::

### 2.1 联网

[下载锐捷linux版](https://its.wust.edu.cn/info.jsp?urltype=news.NewsContentUrl&wbtreeid=1241&wbnewsid=2351)

下载解压后，使用u盘拷到服务器上（2025.1.4 更新 现在可以直接使用机械硬盘中的存档文件夹 rjsupplicant ）

服务器网线接口应该使用：

此处有图！

查看当前ip
```bash
ip a
```

这是改名前的样子，没改名之前是叫 eno4，我试了其实也可以正常用（无所谓，改吧）
```bash
user@user:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eno3: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc mq state DOWN group default qlen 1000
    link/ether b4:2e:99:df:df:75 brd ff:ff:ff:ff:ff:ff
    altname enp66s0
3: eno4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether b4:2e:99:df:df:76 brd ff:ff:ff:ff:ff:ff
    altname enp68s0
    inet 10.162.32.65/21 brd 10.162.39.255 scope global dynamic noprefixroute eno4
       valid_lft 8882sec preferred_lft 8882sec
    inet6 fe80::9deb:a543:3b5f:f2b8/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
user@user:~$ 

```

现在来改名，修改配置文件
```bash
sudo nano /etc/default/grub # 我比较喜欢用vim, vi也可以
```

找到
```bash
GRUB_CMDLINE_LINUX=""
```

改成：
```bash
GRUB_CMDLINE_LINUX="net.ifnames=0 biosdevname=0"
```

保存配置：
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```
::: warning 注意
保存后重启服务器
:::
再次查看网卡
```bash
ip a
```

出现 eth0 和 eth1 表示成功，这里注意到 eth1 下有 ip 地址，我们使用 eth1
```bash
user@user:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc mq state DOWN group default qlen 1000
    link/ether b4:2e:99:df:df:75 brd ff:ff:ff:ff:ff:ff
    altname eno3
    altname enp66s0
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether b4:2e:99:df:df:76 brd ff:ff:ff:ff:ff:ff
    altname eno4
    altname enp68s0
    inet 10.162.32.65/21 brd 10.162.39.255 scope global noprefixroute eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::b62e:99ff:fedf:df76/64 scope link 
       valid_lft forever preferred_lft forever
user@user:~$ 
```

在 rjsupplicant 目录联网：
```bash
sudo bash ./rjsupplicant.sh -a 1 -n eth0 -d 1 -u 用户名 -p 密码 # 你的学号和教务密码
```

~~因为懒~~方便起见，我将上述命令写入到 `rj.sh` 文件了，你也可以直接运行 `rj.sh`
```bash
bash rj.sh
```



### 2.2 静态ip

服务器默认使用的是 dhcp，会导致连不上 ssh ，因此我们要使用静态 ip


修改 etc 里面的 netplan 文件夹，里面有一个很长前缀名的 yaml 文件


```bash
sudo vim /etc/netplan/01-network-manager-all.yaml
```

改成这个样子：
```bash
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
    eth1:
      dhcp4: false
      addresses: [10.162.32.65/21]
      gateway4: 10.162.32.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

保存配置：
```bash
sudo netplan apply
```

### 2.3 启用ssh

允许用户远程连接服务器

更新 apt 并下载 openssh-server
```bash
sudo apt-get update
sudo apt-get install openssh-server
```

查询SSH服务状态：
```bash
sudo systemctl status ssh
```

出现：
```bash
user@user:~$ sudo systemctl status ssh
● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2024-12-21 15:22:09 CST; 5h 25min ago
       Docs: man:sshd(8)
             man:sshd_config(5)
   Main PID: 4242 (sshd)
      Tasks: 1 (limit: 154319)
     Memory: 4.3M
     CGroup: /system.slice/ssh.service
             └─4242 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups

12月 21 15:57:29 user sshd[22259]: Accepted password for wmq from 10.162.32.196 port 4669 ssh2
12月 21 15:57:29 user sshd[22259]: pam_unix(sshd:session): session opened for user wmq by (uid=0)
12月 21 16:09:47 user sshd[28304]: Accepted password for wmq from 10.162.32.94 port 56211 ssh2
12月 21 16:09:47 user sshd[28304]: pam_unix(sshd:session): session opened for user wmq by (uid=0)
12月 21 16:10:12 user sshd[28680]: Accepted password for wmq from 10.162.32.94 port 56259 ssh2
12月 21 16:10:12 user sshd[28680]: pam_unix(sshd:session): session opened for user wmq by (uid=0)
12月 21 16:11:15 user sshd[29075]: Accepted password for user from 10.162.32.196 port 8286 ssh2
12月 21 16:11:15 user sshd[29075]: pam_unix(sshd:session): session opened for user user by (uid=0)
12月 21 16:18:20 user sshd[31481]: Accepted password for user from 10.162.32.196 port 10660 ssh2
12月 21 16:18:20 user sshd[31481]: pam_unix(sshd:session): session opened for user user by (uid=0)
user@user:~$ 
```


## 3. 安装 NVIDIA 显卡驱动

这一步最麻烦（

按照网上的教程来做，但是网上的教程有个坑点就是顺序存在一定问题，在下载了 `nvidia` 驱动后并没有直接安装，而是先禁用了本身的集显 `nouveau` 后就重启了，导致启动后黑屏无法进入图形化界面。我一开始不知道，试了好几次，因为这个重装了三次系统...

正确顺序应该是，将 `nouveau` 禁用加入到黑名单后，**不要**立即重启，下载并安装好对应的显卡驱动了再重启这样使用的就是显卡驱动而非自带的 `nouveau` 了，[这里](https://blog.csdn.net/weixin_44169087/article/details/137455044)介绍了在禁用nouveau但没安装显卡驱动直接重启时如何恢复。

安装前需要安装依赖
```bash
sudo apt-get update #更新软件列表
#安装编译依赖
sudo apt-get install g++
sudo apt-get install gcc
sudo apt-get install make
```
### 3.1 下载 NVIDIA 驱动


下载 NVIDIA 驱动，服务器使用的是 2080ti（2025.1.4 更新 现在可以直接使用机械硬盘 `/mnt/data/bak` 中的存档文件 `NVIDIA-Linux-x86_64-550.142.run` ）

[进入官网下载](https://www.nvidia.cn/drivers/lookup/)

选择如图所示：

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-21/202412212118150.png)

下好的文件应该是 `NVIDIA-Linux-x86_64-550.142.run`

### 3.2 删除 NVIDIA 相关
在安装驱动之前，先将之前已经安装过与Nvidia相关的内容删除
```bash
sudo apt-get remove --purge nvidia*
```

### 3.3 禁用 nouveau
首先明确：nouveau是通用的驱动程序，也就是集显，在安装NVIDIA驱动以前需要禁止系统自带显卡驱动nouveau：可以先通过指令
lsmod | grep nouveau
查看nouveau驱动的启用情况，如果有输出表示nouveau驱动正在工作，如果没有内容输出则表示已经禁用了nouveau。

```bash
sudo vim /etc/modprobe.d/blacklist.conf 
```

在打开的blacklist.conf末尾添加如下，保存文本关闭
```bash
blacklist nouveau
options nouveau modeset=0
```
在终端输入如下内容，进行更新，这一步一定要小心，千万不要重启服务器！！网上的教程是错误的！！启动后黑屏无法进入图形化界面，更别说安装NVIDIA驱动了！！
 
```bash
sudo update-initramfs -u
```

### 3.4 安装 lightdm（跳过）

```bash
sudo apt-get install lightdm
```
这一步也可以不安装lightdm，使用ubuntu20.04、22.04自带的gdm3显示管理器，直观的区别就是gdm3的登陆窗口在显示器正中间，而lightdm登录窗口在偏左边，正常使用没有区别。


### 3.5 停止当前的显示服务器

为了安装新的Nvidia驱动程序，需要停止当前的显示服务器。最简单的方法是使用 telinit 命令更改为运行级别3。在终端输入以下 linux 命令后，显示服务器将停止。
```bash
sudo telinit 3
```

这时候会结束图形界面，转到只有命令行的界面，先输入你的用户名和密码登录

禁用X-window服务
```bash
sudo /etc/init.d/gdm3 stop
```

赋予可执行权限：
```bash
sudo chmod 777 NVIDIA-Linux-x86_64-550.142.run
```

### 3.6 准备安装驱动
安装 NVIDIA 驱动：
```bash
sudo ./NVIDIA-Linux-x86_64-*.run –no-opengl-files
```

会弹出一些选择的窗口，一直选择 Continue ：
```bash
The distribution-provided pre-install script failed! Are you sure you want to continue? 选择 yes 继续
Would you like to register the kernel module souces with DKMS? This will allow DKMS to automatically build a new module, if you install a different kernel later? 选择 No 继续
Would you like to run the nvidia-xconfigutility to automatically update your x configuration so that the NVIDIA x driver will be used when you restart x? Any pre-existing x confile will be backed up. 选择 NO 继续
安装过程中会询问是否安装32位的，选择 NO 继续
The distribution-provided pre-install script failed! Are you sure you want to continue? 

选择 yes 继续。

Would you like to register the kernel module souces with DKMS? This will allow DKMS to automatically build a new module, if you install a different kernel later? 选择 No 继续。

问题大概是：Nvidia's 32-bit compatibility libraries?选择 No 继续。

Would you like to run the nvidia-xconfigutility to automatically update your x configuration so that the NVIDIA x driver will be used when you restart x? Any pre-existing x confile will be backed up.选择 Yes 继续
```

~~多试几次总能行的（~~

输入：
```bash
lsmod | grep nouveau
```
再次检查 nouveau 是否已经禁用，没有输出说明已经禁用了

输入：
```bash
sudo service gdm3 start
```
重启x-window服务
::: warning 注意
重启服务器
:::
输入：
```bash
nivdia-smi
```

出现：
```bash
user@user:~$ nvidia-smi
Sat Dec 21 17:02:48 2024       
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 550.142                Driver Version: 550.142        CUDA Version: 12.4     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 2080 Ti     Off |   00000000:01:00.0 Off |                  N/A |
| 22%   21C    P8             21W /  250W |       6MiB /  22528MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
|   1  NVIDIA GeForce RTX 2080 Ti     Off |   00000000:41:00.0 Off |                  N/A |
| 22%   23C    P8              3W /  250W |       6MiB /  22528MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
|   2  NVIDIA GeForce RTX 2080 Ti     Off |   00000000:81:00.0 Off |                  N/A |
| 22%   24C    P8              1W /  250W |       6MiB /  22528MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
|   3  NVIDIA GeForce RTX 2080 Ti     Off |   00000000:C1:00.0  On |                  N/A |
| 22%   23C    P8             23W /  250W |     144MiB /  22528MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
                                                                                         
+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A      1415      G   /usr/lib/xorg/Xorg                              4MiB |
|    1   N/A  N/A      1415      G   /usr/lib/xorg/Xorg                              4MiB |
|    2   N/A  N/A      1415      G   /usr/lib/xorg/Xorg                              4MiB |
|    3   N/A  N/A      1415      G   /usr/lib/xorg/Xorg                             72MiB |
|    3   N/A  N/A      2067      G   /usr/bin/gnome-shell                           68MiB |
+-----------------------------------------------------------------------------------------+
user@user:~$ 
```


## 4. 挂载机械硬盘

目的：把 8t 的机械盘挂到目录 `/mnt/data` 下，用于我们的用户存放数据集和代码，便于管理

还有一个好处就是重装系统的时候机械盘的数据不会丢失

我们使用的系统盘是 2t 的固态，已经默认配好了，还有 8t 的机械需要更改挂载路径

使用命令查看挂载情况：
```bash
lsblk
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-21/202412212131404.png)

可以看到，我们的 `sda1` 位于 `/media/user/afdb377b-dod3-48dc-8fe3-001c1370db65` 路径下

先取消挂载
```bash
sudo umount /media/user/afdb377b-dod3-48dc-8fe3-001c1370db65
```

创建目标路径：
```bash
sudo mkdir -p /mnt/data
```

挂载到 `/mnt/data`：
```bash
sudo mount /dev/sda1 /mnt/data
```


```bash
blkid
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-21/202412212134195.jpg)

查看挂载情况：
```bash
df -Th
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-21/202412212135880.png)

可以看到，已经切换成功了，设置开机自动挂载

写入 `/etc/fstab`，要先切换到 root 权限：
```bash
sudo -i
sudo echo "/dev/sda1 /mnt/data ext4 defaults  0 0" >> /etc/fstab
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-21/202412212138327.png)


输入命令验证一下，如果没有输出就是成功了
```bash
mount -a
```


下面来安装深度学习环境



## 5. Anaconda

### 5.1 下载 Anaconda
[Anaconda官网地址](https://repo.anaconda.com/archive/) （2025.1.4 更新 现在可以直接使用机械硬盘 `/mnt/data/bak` 中的存档文件 `Anaconda3-2024.10-1-Linux-x86_64.sh` ）
```bash
wget https://repo.anaconda.com/archive/Anaconda3-2024.10-1-Linux-x86_64.sh
```

慢的话可以去[清华源](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)下载


下载好后安装：
```bash
sh Anaconda3-2024.10-1-Linux-x86_64.sh
```

配置环境变量

修改
```bash
sudo vim ~/.bashrc
```
在最下面添加：
```bash
# Anaconda setup
export PATH=/home/user/anaconda3/bin:$PATH
```

更新环境变量
```bash
source ~/.bashrc
```

使用 conda 能找到命令就是成功了

### 5.2 配置全局 conda

<!-- 复制 Anaconda 目录到 /etc/skel/
```bash
sudo cp -r /home/user/anaconda3 /etc/skel/
``` -->

`/etc/skel/` 下的 `.bashrc` 可以在新建用户时为其加入默认环境变量
```bash
sudo vim /etc/skel/.bashrc
```

在文件末尾添加 Anaconda 环境变量设置：
```bash
# Anaconda setup
export PATH=/home/user/anaconda3/bin:$PATH
```


## 6. cuda

### 6.1 apt 换源

apt 换源，打开配置文件
```bash
sudo vim /etc/apt/sources.list
```

i进入编辑模式，将原有软件源开头全部用 # 注释掉，然后将以下代码复制进去，然后按esc推出编辑模式，输入:wq保存并退出，

```bash
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
```


更新软件包
```bash
sudo apt update
```


### 6.2 下载 cuda 11.8

下载 cuda 11.8，地址为 [Installer for Linux Ubuntu 20.04 x86_64](https://developer.nvidia.com/cuda-11-8-0-download-archive?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=20.04&target_type=runfile_local) （2025.1.4 更新 现在可以直接使用机械硬盘 `/mnt/data/bak` 中的存档文件 `cuda_11.8.0_520.61.05_linux.run` ）

下载
```bash
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_520.61.05_linux.run
```

安装

::: tip
```bash
sudo sh cuda_11.8.0_520.61.05_linux.run
```
这里会提示选择安装内容，选择 + 的三个cuda包即可，驱动我们已经下过了，记得取消驱动选项。
:::



编辑环境变量
```bash
sudo vim ~/.bashrc
```

按 `i` 进入编辑模式，在末尾将以下代码复制进去，然后按`esc`推出编辑模式，输入`:wq`保存并退出 
```bash
# CUDA setup
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-11.8/lib64
export PATH=$PATH:/usr/local/cuda-11.8/bin
export CUDA_HOME=$CUDA_HOME:/usr/local/cuda-11.8
```

刷新环境变量
```bash
source  ~/.bashrc
```

查看cuda是否已经安装成功
```bash
nvcc -V
```

出现：
```bash
user@user:~$ nvcc -V
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2022 NVIDIA Corporation
Built on Wed_Sep_21_10:33:58_PDT_2022
Cuda compilation tools, release 11.8, V11.8.89
Build cuda_11.8.r11.8/compiler.31833905_0
user@user:~$ 
```

### 6.3 不兼容(这步可以跳过，没有这个问题了)

如果执行 `sudo sh cuda_11.8.0_520.61.05_linux.run` 时提示 `gcc` 不兼容，可以使用 `gcc-9`
```bash
sudo apt install gcc-9 g++-9
```

设置为默认 gcc 版本
```bash
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 100
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-9 100
```

检查 gcc 版本是否成功切换
```bash
gcc --version
```

### 6.4 配置全局 cuda

修改 `/etc/profile` 文件，它是一个全局配置文件，所有用户登录时都会读取这个文件
```bash
sudo vim /etc/profile
```
在文件末尾添加CUDA环境变量配置：
```bash
# CUDA setup
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-11.8/lib64
export PATH=$PATH:/usr/local/cuda-11.8/bin
export CUDA_HOME=/usr/local/cuda-11.8
```

刷新环境变量
```bash
source  ~/.bashrc
```



## 7.安装 cudnn

[cuDNN 官网历史版本](https://developer.nvidia.cn/rdp/cudnn-archive) （2025.1.4 更新 现在可以直接使用机械硬盘 `/mnt/data/bak` 中的存档文件 `cudnn-linux-x86_64-8.9.7.29_cuda11-archive.tar.xz` ）


选择 `下载 cuDNN v8.9.7 (2023 年 12 月 5 日), 适用于 CUDA 11.x` 下面的 `Local Installers for Windows and Linux, Ubuntu(x86_64, armsbsa)` 中的 [Local Installer for Linux x86_64 (Tar)](https://developer.nvidia.com/downloads/compute/cudnn/secure/8.9.7/local_installers/11.x/cudnn-linux-x86_64-8.9.7.29_cuda11-archive.tar.xz/)

下载 cudnn 的时候 NVIDIA 会需要你使用邮箱验证

解压并复制文件
```bash
sudo tar -xvf cudnn-linux-x86_64-8.9.7.29_cuda11-archive.tar.xz
cd cudnn-linux-x86_64-8.9.7.29_cuda11-archive/
sudo cp -r lib/* /usr/local/cuda-11.8/lib64/
sudo cp -r include/* /usr/local/cuda-11.8/include/
sudo chmod a+r /usr/local/cuda-11.8/lib64/libcudnn*
sudo chmod a+r /usr/local/cuda-11.8/include/cudnn*
```

验证是否成功安装

```bash
cat /usr/local/cuda-11.8/include/cudnn_version.h | grep CUDNN_MAJOR -A 2
```

出现：
```bash
zzy@user:~$ cat /usr/local/cuda-11.8/include/cudnn_version.h | grep CUDNN_MAJOR -A 2
#define CUDNN_MAJOR 8
#define CUDNN_MINOR 9
#define CUDNN_PATCHLEVEL 7
--
#define CUDNN_VERSION (CUDNN_MAJOR * 1000 + CUDNN_MINOR * 100 + CUDNN_PATCHLEVEL)

/* cannot use constexpr here since this is a C-only file */
zzy@user:~$ 
```

因为 cudnn 是直接复制到 cuda 目录的，所以不需要进行配置

至此，你已经完成了环境配置，下面是一些创建用户的命令


<!-- ## 用户配置




确认权限
```bash
sudo chown -R root:root /etc/skel/anaconda3
sudo chown root:root /etc/skel/.bashrc
```

创建新用户
```bash
sudo useradd -m -s /bin/bash zzy
```

验证新用户的配置
```bash
su - newuser
conda --version
``` -->



<!-- ### 新建组
sudo groupadd test_group

sudo useradd -m -G test_group -s /bin/bash zzy

ls -ld /home/zzy

只有 zzy 本人能够访问他的 home 目录
```bash
sudo chmod 700 /home/zzy
# sudo chmod 750 /home/zzy 这个是同组也可以读和执行，不能写
```
zzy@user:/home/pg/anaconda3$ ls -ld /home/zzy
drwxr-xr-x 6 zzy zzy 4096 Dec 20 11:31 /home/zzy
zzy@user:/home/pg/anaconda3$ sudo chmod 700 /home/zzy
[sudo] password for zzy: 
zzy is not in the sudoers file.  This incident will be reported.
zzy@user:/home/pg/anaconda3$ ls -ld /home/zzy
drwx------ 6 zzy zzy 4096 Dec 20 11:31 /home/zzy

(base) pg@user:/home$ cd zzy
bash: cd: zzy: Permission denied -->




## 8. 管理员常用命令

### 8.1 新建用户
::: tip 提示
注意将 `zzy` 改成你要新建的用户名
:::

创建用户 
```bash
sudo useradd -m -s /bin/bash zzy
```

用户自己可以访问，其他人无法访问
```bash
sudo chmod 700 /home/zzy
```
在 /mnt/data 下创建用户对应的文件夹
```bash
sudo mkdir /mnt/data/zzy
```
确保用户只能访问自己的文件夹，用户 zzy 只能访问 /mnt/data/zzy 目录，其他用户无法访问。
```bash
sudo chown zzy:zzy /mnt/data/zzy
```
只有该目录的拥有者可以读取、写入和执行
```bash
sudo chmod 700 /mnt/data/zzy
```
给用户初始化密码
```bash
sudo passwd zzy
```
::: tip 提示
如果用户的文件夹已经存在，需要把这些文件重新赋予给用户：

文件所有权赋予zzy

```bash
sudo chown -R zzy:zzy /mnt/data/zzy/*
```
仅 zzy 可读取、写入和执行

```bash
sudo chmod -R 700 /mnt/data/zzy/*
```
:::
<!-- 新建zzy
```bash
sudo useradd -m -d /home/zzy zzy
```


切换用户
```bash
su - zzy
```

切换用户
```bash
su - user
``` -->
### 8.2 删除用户
查找并结束该用户的进程
```bash
ps -u zzy
```
出现：
```bash
user@user:~$ ps -u zzy
    PID TTY          TIME CMD
 132988 ?        00:00:00 sh
 133489 ?        00:00:00 sh
 139956 pts/6    00:00:00 sh
```
使用 kill -9 强制终止进程
```bash
sudo kill -9 132988
sudo kill -9 133489
sudo kill -9 139956
```
<!-- pkill -u pg -->
删除用户
```bash
sudo userdel -r zzy
```


<!-- source ~/.bashrc -->


## 9. 其他
### 9.1 为所有用户安装git
```bash
sudo apt update
sudo apt install git
```

出现：
```bash
user@user:~$ git --version
git version 2.34.1
user@user:~$ 
```
### 9.2 为所有用户配置 pip 清华源
```bash
sudo touch /etc/pip.conf
sudo vim /etc/pip.conf
```
加入
```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```
输入
```bash
pip config list
```
出现：
```bash
global.index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```


## 10. 总结

### 10.1 问题
在重启ubuntu的过程中发现2种情况的黑屏：

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221044073.jpg)

1. 在grub引导菜单选择ubuntu后进入黑屏后，左上角有 `-` 光标一直在闪烁，操作无反应且一直进不去系统。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221040405.jpg)

2. 在grub引导菜单选择 `Advanced options for Ubuntu`，以救援模式启动:

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221047821.jpg)

卡在这里操作无反应且一直进不去系统，如下图所示的报错

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221040576.jpg)

### 10.2 原因分析

这两种错误都是由于安装的NVIDIA显卡驱动与ubuntu自带的 nouveau 发生了冲突导致的


下面教你怎么进入单用户模式：

1. 我尝试了这个方法没用，你看一下就行：

在第二行按e进入编辑
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221047821.jpg)


出现：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221052287.jpg)

`ro` 后面改成 `rw single quiet splash nomodeset init=/bin/bash`
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221054139.jpg)

可以出现命令行，但是按什么键都没有反应

2. 你需要按照这个方法：

尝试在第一行按e进入编辑
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221047821.jpg)




出现：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221059286.jpg)


`ro` 后面改成 `rw single init=/bin/bash`：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221101863.jpg)

出现：
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-22/202412221100630.jpg)


这时候就可以敲命令了，~~不过最后还是没救回来~~。




## 11. Driver Not Loaded

### 11.1 关闭重启更新驱动

首先先把重启更新驱动这个设定关闭：
```bash
sudo vim /etc/apt/apt.conf.d/50unattended-upgrades
```

把下面这两行注释掉：
```bash
"${distro id}:${distro codename}"
"$fdistro id}:$fdistro codename}-security"
```

`sudo reboot` 重启一下试试，如果重启后可以正常用了那可太好了

### 11.2 重新安装驱动

但很显然不行，重新安装驱动

首先先卸载之前nvidia相关的驱动：
```bash
sudo apt-get purge nvidia*
sudo apt-get autoremove
```

添加nvidia源：
```bash
sudo add-apt-repository ppa:graphics-drivers/ppa
```


进入到 `/mnt/data/bak/` ，这里有我之前放的备份文件，

```bash
(base) user@ubuntu20:/mnt/data/bak$ ls
Anaconda3-2024.10-1-Linux-x86_64.sh  cudnn-linux-x86_64-8.9.7.29_cuda11-archive         NVIDIA-Linux-x86_64-550.142.run
cuda_11.8.0_520.61.05_linux.run      cudnn-linux-x86_64-8.9.7.29_cuda11-archive.tar.xz  rjsupplicant
(base) user@ubuntu20:/mnt/data/bak$ 
```

安装驱动：
```bash
sudo bash ./NVIDIA-Linux-x86_64-550.142.run
```


## 参考资料：
- [Linux下使用锐捷客户端连接网络，以及遇到的问题](https://blog.csdn.net/weixin_44012745/article/details/114787967)
- [ubuntu20.04禁用nouveau后黑屏的解决办法](https://blog.csdn.net/weixin_44169087/article/details/137455044)
- [ubuntu20.04安装nvidia显卡驱动](https://blog.csdn.net/qq_29750461/article/details/128348569?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171213425216800197082114%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171213425216800197082114&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-128348569-null-null.142%5Ev100%5Epc_search_result_base9&utm_term=ubuntu20.04%E6%98%BE%E5%8D%A1%E9%A9%B1%E5%8A%A8%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187) 注意这个博客的顺序是错误的！
- [揭秘Ubuntu深度学习服务器配置：新手如何成为专家？](https://blog.csdn.net/qq_30091945/article/details/124555932)
- [解决Ubuntu安装NVIDIA显卡驱动导致的黑屏问题](https://blog.csdn.net/Fengdf666/article/details/135888549?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-135888549-blog-132233930.235%5Ev43%5Epc_blog_bottom_relevance_base7&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-135888549-blog-132233930.235%5Ev43%5Epc_blog_bottom_relevance_base7&utm_relevant_index=13)
- [Ubuntu 20.04安装显卡驱动、CUDA、Miniconda和Pytorch（2024.09最新）-Ubuntu从零搭建深度学习环境](https://blog.csdn.net/sdbyp/article/details/139853774) 注意这个博客的顺序是错误的！
- [【Linux】服务器重启之后nvidia-smi报错 “Impossible to initialize nvidia nvml : Driver Not Loaded”](https://blog.csdn.net/double_ZZZ/article/details/124683618)