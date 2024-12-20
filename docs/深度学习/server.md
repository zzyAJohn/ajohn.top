---
title: Ubuntu深度学习服务器配置
tags:
    - Deep Learning
createTime: 2024/12/19 13:38:48
permalink: /article/bbaesj4i/
---

本篇博客主要记录Ubuntu深度学习服务器配置部分过程<!-- more -->
## 网络
运行rj.sh
```bash
bash rj.sh
```

## 硬盘
查看已挂载文件系统的磁盘使用情况
```bash
df -h
```
`/` 下是2t固态

`/mnt/data` 路径下是8t机械硬盘


## 为所有用户配置 conda

<!-- 复制 Anaconda 目录到 /etc/skel/
```bash
sudo cp -r /home/user/anaconda3 /etc/skel/
``` -->

环境变量
```bash
sudo vim /etc/skel/.bashrc
```

在文件末尾添加 Anaconda 环境变量设置：
```bash
# Anaconda setup
export PATH=/home/user/anaconda3/bin:$PATH

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/user/anaconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/user/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/user/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/user/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
```



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
```

## 把cuda放进全局变量

修改 /etc/profile 文件，它是一个全局配置文件，所有用户登录时都会读取这个文件
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



## 新建用户
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
## 删除用户
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


参考资料：
- [揭秘Ubuntu深度学习服务器配置：新手如何成为专家？](https://blog.csdn.net/qq_30091945/article/details/124555932)