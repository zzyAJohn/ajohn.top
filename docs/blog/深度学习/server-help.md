---
title: 实验室服务器使用教程（用户篇）
tags:
    - Document
    - Linux
    - Deep Learning
createTime: 2024/12/20 14:10:48
permalink: /article/bes1sa4i/
cover: https://img2.baidu.com/it/u=1640780831,735657335&fm=253&fmt=auto&app=120&f=JPEG?w=714&h=500
---

**实验室的小伙伴，请先填写在线表格，申请一个用户**

**预祝大家的深度学习之旅一切顺利！**<!-- more -->

## 1.连接远程服务器
::: tip 提示
我们使用用户名 `zzy` 来做演示，请在下文中修改成你的用户名！用户名是你的名字缩写
:::

打开 `VSCode`
![](https://oss.ajohn.top/blog/article/server-help/1.webp)

点击左下角的 `打开远程窗口` （蓝色矩形区域）

::: tip
实验室最近更换了网络连接方式，ip 可能会变化。连接不上可能是ip变化了，可以向我询问最新 ip。
:::
选择连接到主机，输入：
```bash
ssh zzy@10.16.3.171
```

选择 `linux`-`继续`-输入你的初始密码，完成登录。

如果使用 `cmd` 可以连接，但是 `VScode` 无法建立连接，请查看这篇博客 [VSCode 连接不上远程服务器的解决方法](../随记/vscode-ssh.md)

使用快捷键 `Ctrl` + `~` 打开一个终端。

## 2.修改初始密码

请先修改你的密码，使用：
```bash
passwd
```

出现：
```bash
zzy@user:~$ passwd
Changing password for zzy.
Current password: # 输入当前密码，回车确认
New password: # 输入新密码，回车确认
Retype new password: # 确认新密码，回车确认
passwd: password updated successfully
zzy@user:~$ 
```
修改成功


## 3.测试工作环境 
::: important 重要
conda, cuda, cudnn 我已经为所有用户安装好了，你只需要测试一下能否正常使用即可
:::

### 3.1 测试conda

使用 `conda` 命令查看能否正常使用

运行
```bash
conda
```

出现下面就是正常的
```bash
zzy@user:~$ conda
usage: conda [-h] [-v] [--no-plugins] [-V] COMMAND ...

conda is a tool for managing and deploying applications, environments and packages.

options:
  -h, --help            Show this help message and exit.
  -v, --verbose         Can be used multiple times. Once for detailed output, twice for INFO logging, thrice for DEBUG logging, four times for TRACE logging.
  --no-plugins          Disable all plugins that are not built into conda.
  -V, --version         Show the conda version number and exit.

commands:
  The following built-in and plugins subcommands are available.

  COMMAND
    activate            Activate a conda environment.
    build               Build conda packages from a conda recipe.
    clean               Remove unused packages and caches.
    commands            List all available conda subcommands (including those from plugins). Generally only used by tab-completion.
    compare             Compare packages between conda environments.
    config              Modify configuration values in .condarc.
    content-trust       Signing and verification tools for Conda
    convert             Convert pure Python packages to other platforms (a.k.a., subdirs).
    create              Create a new conda environment from a list of specified packages.
    deactivate          Deactivate the current active conda environment.
    debug               Debug the build or test phases of conda recipes.
    develop             Install a Python package in 'development mode'. Similar to `pip install --editable`.
    doctor              Display a health report for your environment.
    export              Export a given environment
    index               Update package index metadata files.
    info                Display information about current conda install.
    init                Initialize conda for shell interaction.
    inspect             Tools for inspecting conda packages.
    install             Install a list of packages into a specified conda environment.
    list                List installed packages in a conda environment.
    metapackage         Specialty tool for generating conda metapackage.
    notices             Retrieve latest channel notifications.
    pack                See `conda pack --help`.
    package             Create low-level conda packages. (EXPERIMENTAL)
    remove (uninstall)  Remove a list of packages from a specified conda environment.
    rename              Rename an existing environment.
    render              Expand a conda recipe into a platform-specific recipe.
    repo                See `conda repo --help`.
    repoquery           Advanced search for repodata.
    run                 Run an executable in a conda environment.
    search              Search for packages and display associated information using the MatchSpec format.
    server              See `conda server --help`.
    skeleton            Generate boilerplate conda recipes.
    token               See `conda token --help`.
    update (upgrade)    Update conda packages to the latest compatible version.
zzy@user:~$ 
```

使用下面命令查看你的conda环境
```bash
conda env list
```

出现：
```bash
zzy@user:~$ conda env list
# conda environments:
#
base                     /home/user/anaconda3

zzy@user:~$ 
```
::: important 重要
请不要使用 `base` 环境
:::
创建环境请使用下面命令，`zzy_env` 是你的环境名，后面可以指定你需要的 `python` 版本
```bash
conda create -n zzy_env python=3.9 -y
```
出现：
```bash
zzy@user:~$ conda create -n zzy_env python=3.9 -y
Channels:
 - defaults
Platform: linux-64
Collecting package metadata (repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/zzy/.conda/envs/zzy_env

  added / updated specs:
    - python=3.9


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    ca-certificates-2024.11.26 |       h06a4308_0         131 KB
    pip-24.2                   |   py39h06a4308_0         2.2 MB
    python-3.9.21              |       he870216_1        25.1 MB
    setuptools-75.1.0          |   py39h06a4308_0         1.7 MB
    wheel-0.44.0               |   py39h06a4308_0         108 KB
    ------------------------------------------------------------
                                           Total:        29.2 MB

The following NEW packages will be INSTALLED:

  _libgcc_mutex      pkgs/main/linux-64::_libgcc_mutex-0.1-main 
  _openmp_mutex      pkgs/main/linux-64::_openmp_mutex-5.1-1_gnu 
  ca-certificates    pkgs/main/linux-64::ca-certificates-2024.11.26-h06a4308_0 
  ld_impl_linux-64   pkgs/main/linux-64::ld_impl_linux-64-2.40-h12ee557_0 
  libffi             pkgs/main/linux-64::libffi-3.4.4-h6a678d5_1 
  libgcc-ng          pkgs/main/linux-64::libgcc-ng-11.2.0-h1234567_1 
  libgomp            pkgs/main/linux-64::libgomp-11.2.0-h1234567_1 
  libstdcxx-ng       pkgs/main/linux-64::libstdcxx-ng-11.2.0-h1234567_1 
  ncurses            pkgs/main/linux-64::ncurses-6.4-h6a678d5_0 
  openssl            pkgs/main/linux-64::openssl-3.0.15-h5eee18b_0 
  pip                pkgs/main/linux-64::pip-24.2-py39h06a4308_0 
  python             pkgs/main/linux-64::python-3.9.21-he870216_1 
  readline           pkgs/main/linux-64::readline-8.2-h5eee18b_0 
  setuptools         pkgs/main/linux-64::setuptools-75.1.0-py39h06a4308_0 
  sqlite             pkgs/main/linux-64::sqlite-3.45.3-h5eee18b_0 
  tk                 pkgs/main/linux-64::tk-8.6.14-h39e8969_0 
  tzdata             pkgs/main/noarch::tzdata-2024b-h04d1e81_0 
  wheel              pkgs/main/linux-64::wheel-0.44.0-py39h06a4308_0 
  xz                 pkgs/main/linux-64::xz-5.4.6-h5eee18b_1 
  zlib               pkgs/main/linux-64::zlib-1.2.13-h5eee18b_1 



Downloading and Extracting Packages:
                                                                                                                                                                                       
Preparing transaction: done                                                                                                                                                            
Verifying transaction: done                                                                                                                                                            
Executing transaction: done                                                                                                                                                            
#                                                                                                                                                                                      
# To activate this environment, use
#
#     $ conda activate zzy_env
#
# To deactivate an active environment, use
#
#     $ conda deactivate

zzy@user:~$ 
```

查看当前环境
```bash
conda env list
```
出现下面所示，说明我们已经有一个自己的环境 `zzy_env`，它位于 `/home/zzy/.conda/envs/zzy_env` 下
```bash
zzy@user:~$ conda env list
# conda environments:
#
base                     /home/user/anaconda3
zzy_env                  /home/zzy/.conda/envs/zzy_env
```
::: tip 提示
你可以创建多个不同名称的环境，这些环境只有你可以使用
:::
<!-- 启动你的 `conda` 环境： -->

<!-- ```bash
conda activate zzy_env
``` -->
<!-- 出现错误：
```bash
zzy@user:~$ conda activate zzy_env

CondaError: Run 'conda init' before 'conda activate'
``` -->

<!-- 我们使用下面的命令来初始化 `conda` 环境
```bash
conda init
```

出现
```bash
zzy@user:~$ conda init
no change     /home/user/anaconda3/condabin/conda
no change     /home/user/anaconda3/bin/conda
no change     /home/user/anaconda3/bin/conda-env
no change     /home/user/anaconda3/bin/activate
no change     /home/user/anaconda3/bin/deactivate
no change     /home/user/anaconda3/etc/profile.d/conda.sh
no change     /home/user/anaconda3/etc/fish/conf.d/conda.fish
no change     /home/user/anaconda3/shell/condabin/Conda.psm1
no change     /home/user/anaconda3/shell/condabin/conda-hook.ps1
no change     /home/user/anaconda3/lib/python3.12/site-packages/xontrib/conda.xsh
no change     /home/user/anaconda3/etc/profile.d/conda.csh
modified      /home/zzy/.bashrc

==> For changes to take effect, close and re-open your current shell. <==
``` -->

激活我们的 `zzy_env` 环境
```bash
conda activate zzy_env
```
出现 `(zzy_env)` 即进入成功
```bash
zzy@user:~$ conda activate zzy_env
(zzy_env) zzy@user:~$ 
```
可以使用下面的命令查看你当前环境都安装了什么
```bash
conda list
```
出现：
```bash
(zzy_env) zzy@user:~$ conda list
# packages in environment at /home/zzy/.conda/envs/zzy_env:
#
# Name                    Version                   Build  Channel
_libgcc_mutex             0.1                        main  
_openmp_mutex             5.1                       1_gnu  
ca-certificates           2024.11.26           h06a4308_0  
ld_impl_linux-64          2.40                 h12ee557_0  
libffi                    3.4.4                h6a678d5_1  
libgcc-ng                 11.2.0               h1234567_1  
libgomp                   11.2.0               h1234567_1  
libstdcxx-ng              11.2.0               h1234567_1  
ncurses                   6.4                  h6a678d5_0  
openssl                   3.0.15               h5eee18b_0  
pip                       24.2             py39h06a4308_0  
python                    3.9.21               he870216_1  
readline                  8.2                  h5eee18b_0  
setuptools                75.1.0           py39h06a4308_0  
sqlite                    3.45.3               h5eee18b_0  
tk                        8.6.14               h39e8969_0  
tzdata                    2024b                h04d1e81_0  
wheel                     0.44.0           py39h06a4308_0  
xz                        5.4.6                h5eee18b_1  
zlib                      1.2.13               h5eee18b_1  
(zzy_env) zzy@user:~$ 
```

### 3.2 测试 cuda

使用下面命令查看cuda版本，下载pytorch时请注意对应下载命令（可以低于11.8）
```bash
nvcc -V
```
可以看到，我们是cuda_11.8
```bash
(zzy_env) zzy@user:~$ nvcc -V
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2022 NVIDIA Corporation
Built on Wed_Sep_21_10:33:58_PDT_2022
Cuda compilation tools, release 11.8, V11.8.89
Build cuda_11.8.r11.8/compiler.31833905_0
(zzy_env) zzy@user:~$ 
```
::: tip 提示
下面只是举个例子，你可以不操作
:::
比如，安装 Pytorch 命令可以[参考Pytorch官网](https://pytorch.org/get-started/locally/)

```bash
pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

~~漫长的等待后~~，检查使用 cuda 的 Pytorch 是否安装成功

```bash
python -c "import torch; print(torch.cuda.is_available())"
```
输出：`True`


### 3.3 测试cudnn
输入下面命令：
```bash
cat /usr/local/cuda-11.8/include/cudnn_version.h | grep CUDNN_MAJOR -A 2
```

出现：
```bash
(zzy_env) zzy@user:~$ cat /usr/local/cuda-11.8/include/cudnn_version.h | grep CUDNN_MAJOR -A 2
#define CUDNN_MAJOR 8
#define CUDNN_MINOR 9
#define CUDNN_PATCHLEVEL 7
--
#define CUDNN_VERSION (CUDNN_MAJOR * 1000 + CUDNN_MINOR * 100 + CUDNN_PATCHLEVEL)

/* cannot use constexpr here since this is a C-only file */
(zzy_env) zzy@user:~$ 
```


## 4.存储路径

每个新用户都有两个文件夹可以使用，分别是 `/home/zzy` 和 `/mnt/data/zzy`。

在日常使用中，你不需要打开 `/home/zzy` 文件夹，因为你的所有东西应该存放在 `/mnt/data/zzy` 路径下。

- 你的用户路径是 `/home/zzy` （其他人无法访问你的文件夹，你也无法访问其他用户的文件夹）。
::: tip 提示
`/home` 目录挂载在2t的固态硬盘下，为了避免占用系统盘，以及重装系统时这里的文件会丢失，请不要在这里存放重要文件！
:::

- 你应该把你的代码和数据集放在 `/mnt/data/zzy`（其他人无法访问你的文件夹，你也无法访问其他用户的文件夹），该路径是一个独属于你的空文件夹，你可以在这里放任何你想放的东西，~~泰裤辣~~！
::: tip 提示
`/mnt/data` 目录挂载在8t的机械硬盘下。请把代码和数据集放在机械硬盘中！
:::


我们只需要用到这两个文件夹，其他的文件夹你都没有权限的（~~不信你可以试试~~）。

### 4.1 `/home/zzy` 文件夹

这是系统给每个用户生成的默认用户目录

你可以使用下面两条命令的任何一条进入你的用户目录
```bash
cd /home/zzy
```
```bash
cd ~
```

使用ls查看你的文件夹
```bash
ls
```

出现：
```bash
zzy@user:~$ ls
zzy@user:~$ ls
```
什么也没有

### 4.2 `/mnt/data/zzy` 文件夹
::: tip 提示
你的代码和数据集请放在对应的 `/mnt/data/zzy` 下
:::


使用下面命令进入你的文件夹，并使用 `ls` 命令查看有什么
```bash
cd /mnt/data/zzy
```
这里什么都没有：
```bash
zzy@user:~$ cd /mnt/data/zzy
zzy@user:/mnt/data/zzy$ ls
zzy@user:/mnt/data/zzy$ 
```

## 5. 使用GPU

请按照申请的型号使用 gpu，一共有 0, 1, 2, 3 四张卡，显卡为 2080ti ，每张卡22G 显存。

::: important 重要
在跑程序前，请查看当前有哪些卡处于空闲状态，可以使用 `nvitop` 命令来查看：
:::
```bash
(base) zzy@ubuntu20:/mnt/data/zzy/ajohn-core$ nvitop
```

按下回车，出现：

![](https://oss.ajohn.top/blog/article/server-help/2.webp)


## 6.其他命令

下面介绍一些常用的命令，知道可以跳过

<!-- pip默认源更换为清华镜像
```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
``` -->

退出当前conda环境
```bash
conda deactivate
```
```bash
(zzy_env) zzy@user:~$ conda deactivate
(base) zzy@user:~$ conda deactivate
zzy@user:~$ 
```

删除conda环境
```bash
conda env remove -n zzy_env
```

创建目录命令
```bash
mkdir test
```

```bash
zzy@user:/mnt/data/zzy$ mkdir test
zzy@user:/mnt/data/zzy$ ls
test
zzy@user:/mnt/data/zzy$ 
```

删除目录命令
```bash
rm -r test
```

```bash
zzy@user:/mnt/data/zzy$ rm -r test
zzy@user:/mnt/data/zzy$ ls
zzy@user:/mnt/data/zzy$ 
```

## 7.git的使用
查看git版本
```bash
git --version
```
出现：
```bash
user@user:~$ 
git version 2.34.1
user@user:~$ 
```
推送文件时出现：
```bash
*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: no email was given and auto-detection is disabled
2024-12-20 18:22:56.874 [info] > git config --get-all user.name [1ms]
2024-12-20 18:22:56.883 [info] > git config --get commit.template [3ms]
2024-12-20 18:22:56.883 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/master refs/remotes/master [1ms]
2024-12-20 18:22:56.887 [warning] [Git][revParse] Unable to read file: ENOENT: no such file or directory, open '/mnt/data/zzy/ajohn-act/.git/refs/remotes/origin/master'
2024-12-20 18:22:56.888 [info] > git rev-parse refs/remotes/origin/master [1ms]
2024-12-20 18:22:56.895 [info] > git status -z -uall [4ms]
2024-12-20 18:22:56.896 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [2ms]
```

使用以下命令可以存储 git 信息，避免每次推送都要输入密码
```bash
git config --global credential.helper store
```

git config --global user.name "zzyAJohn"
git config --global user.email "1833302139@qq.com"

<!-- 设置全局用户名和电子邮件：
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
只为当前仓库设置用户名和电子邮件：
```bash
git config user.name "Your Name"
git config user.email "you@example.com"
``` -->

## 8.pip换源（可跳过，已经全局加入）
创建 pip 配置文件
```bash
mkdir -p ~/.pip
```
编辑
```bash
vim ~/.pip/pip.conf
```
加入以下内容
```bash
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