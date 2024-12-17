---
title: 使用 wsl2 安装深度学习环境
tags:
    - Deep Learning
    - WSL
createTime: 2024/12/16 20:50:52
permalink: /article/lo7fbj1s/
---

## 0.前置配置

### 0.1 开启CPU虚拟化

打开任务管理器，点击CPU

如果显示 `虚拟化：已启用` 就是默认开启了，如果显示未启用则需要通过 `bios` 设置开启<!-- more -->

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-17/202412170920562.png)

### 0.2 开启两个windows功能

在任务栏搜索 `点击启用或关闭windows功能`

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-17/202412170924010.png)


勾选如图所示两个框框

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-17/202412170925452.png)

配置完可以重启一下电脑

## 1.安装 linux 子系统
先更新 WSL 内核
```bash
wsl --update
```

使用以下命令安装 Ubuntu
```bash
wsl --install -d Ubuntu
```

查看当前 linux 子系统列表
```bash
wsl --list -v
```

设置默认分发版为 Ubuntu（可选）
```bash
wsl --set-default Ubuntu
```

启动
```bash
wsl
```

## 2.位置迁移（默认在c盘，建议迁移）

显示目前已安装的子系统
```bash
wsl -l
```

在D盘新建wsl文件夹，并输入以下代码将 ubuntu 备份
```bash
wsl --export Ubuntu D:\wsl\Ubuntu.tar
```

删除子系统
```bash
wsl --unregister Ubuntu
```

恢复子系统
```bash
wsl --import Ubuntu D:\wsl D:\wsl\Ubuntu.tar
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-16/202412162116458.png)


## 3.下载 Anaconda


建议下载最新版，我下载 2024.02-1 出现了不知名错误，[Anaconda地址](https://repo.anaconda.com/archive/)
```bash
wget https://repo.anaconda.com/archive/Anaconda3-2024.10-1-Linux-x86_64.sh
```

```bash
sh Anaconda3-2024.10-1-Linux-x86_64.sh
```

## 4.下载 cuda11.8

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

安装 gcc
```bash
sudo apt install build-essential
```

[cuda 地址](https://developer.nvidia.com/cuda-11-8-0-download-archive?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=runfile_local)

下载cuda11.8

```bash
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_520.61.05_linux.run
sudo sh cuda_11.8.0_520.61.05_linux.run
```

执行上面第二条命令时提示 gcc 不兼容，可以使用 gcc-9
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

编辑环境变量
```bash
sudo vim ~/.bashrc
```

按 `i` 进入编辑模式，在末尾将以下代码复制进去，然后按`esc`推出编辑模式，输入`:wq`保存并退出 
```bash
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
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-16/202412162237115.png)

## 5.安装 cudnn

在wins下载适合的cudnn版本，我使用的是 `Download cuDNN v8.9.7 (December 5th, 2023), for CUDA 11.x` 中的 [Local Installer for Linux x86_64 (Tar)](https://developer.nvidia.com/downloads/compute/cudnn/secure/8.9.7/local_installers/11.x/cudnn-linux-x86_64-8.9.7.29_cuda11-archive.tar.xz/)

下好后拖到 wsl 系统即可，进入文件所在目录

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

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-16/202412162256646.png)

## 6.torch 安装

这部分可参考特定本博客中特定博文创建 conda 虚拟环境

## 7.在 VSCode 中连接 WSL

与在 VSCode 中连接远程服务器的方法相同，点击左下角 `打开远程窗口`，选择 `连接到 WSL`即可。


参考链接：[如何解决version `GLIBCXX_3.4.29‘ not found的问题](https://blog.csdn.net/imok1234567/article/details/136820228)