---
title: 'Collaborative Refining for Person Re-Identification With Label Noise'
tags:
    - Deep Learning
    - Re-id
    - Python
createTime: 2024/12/17 13:47:32
permalink: /article/dagep2xy/
---

一种具有动态相互学习功能的在线协同精炼（CORE）框架，其中网络和标签预测通过从其他对等网络中提取知识来在线协作优化。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-19/202412191341410.png)
<!-- more -->
---

>本文用于记录复现 [CORE]() 的实验过程和结果，代码见 [github仓库](https://github.com/mangye16/ReID-Label-Noise)。

<!-- ## 零、资源
操作系统配置
- 操作系统：Ubuntu20.04-桌面版
- 基础架构：GPU驱动 510.73.05、cuda 11.5
- 基础软件：miniconda 4.12.0、cudnn 8.3.0
- 基础环境：opencv、torch-1.10、tensorflow-2.6.0
- 开发工具：pycharm-community-2022.1
- 3D可视化：TurboVNC

资源配置
- 类型：RTX3090
- GPU信息：1卡 * 24GB显存
- 规格：10核 32GB内存

存储/带宽配置
- 系统存储：高效云盘 80GB
- 数据存储：高效云盘 20GB
- 网络带宽：100Mbps -->

## 一、下载代码和数据集
### 1.1 代码
找一个目录，这里我使用的是我 fork 的仓库（私密的，你也可以自建一个，方便查看修改记录）
```bash
git clone https://gitee.com/zzyAJohn/ajohn-core.git
```

使用下面命令可以输入一次账号密码后无需再次输入
```bash
git config --global credential.helper store
```

<!-- 新建分支
```bash
git switch -c zzy
``` -->


### 1.2 数据集
克隆 [Person_reID_baseline_pytorch](https://github.com/layumi/Person_reID_baseline_pytorch.git)，要用到里面的 `prepare.py` 来重命名数据集
```bash
git clone https://github.com/layumi/Person_reID_baseline_pytorch.git
```

下载 Market1501 数据集，是一个 `Market-1501-v15.09.15.zip` 文件，145MB
```bash
pip install gdown 
pip install --upgrade gdown #!!important!!
gdown 0B8-rUzbwVRk0c054eEozWG9COHM
```

wsl访问不了谷歌可以wins下[下载](https://drive.google.com/file/d/0B8-rUzbwVRk0c054eEozWG9COHM/view?resourcekey=0-8nyl7K9_x37HlQm34MmrYQ)

使用unzip解压
```bash
apt install unzip
unzip Market-1501-v15.09.15.zip -d Market-1501-v15.09.15
```


修改 `prepare.py` 中的 download_path2，不要修改 download_path，也不要创建download_path下的文件，下面函数会检查，download_path 是数据集的目标路径。如果该路径不存在，代码会尝试将另一个路径 download_path2 重命名为 download_path，以确保数据集存放在正确的位置。
```py
download_path = '../Market' # Please not change.
download_path2 = '../Market-1501-v15.09.15' # You only need to change this line to your dataset download path # [!code --]
download_path2 = '../Market-1501-v15.09.15/Market-1501-v15.09.15' # You only need to change this line to your dataset download path # [!code ++]
```

重命名数据集，会把所有图片移动到 Market\pytorch 下
```bash
python prepare.py
```

把 pytorch 重命名为 market

每个文件按照类别编号

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-17/202412171543711.png)



PS：我已经处理好的数据集，可以使用以下命令直接解压，等以后有空上传（

使用7zip解压
```bash
sudo apt update
sudo apt install p7zip-full
7z x re-id-market.7z
```

## 二、环境配置

查看当前 cuda 版本

```bash
nvcc --version
```

创建已有环境（可选）
```bash
conda env remove --name core
```

创建环境
```bash
conda create --name core python=3.9 -y
```

激活

```bash
conda activate core
```

安装 Pytorch [参考Pytorch官网](https://pytorch.org/get-started/locally/)

```bash
conda install pytorch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0  pytorch-cuda=11.8 -c pytorch -c nvidia
```

检查 Pytorch 是否安装成功

```bash
python -c "import torch; print(torch.cuda.is_available())"
```
输出：`True`

安装 core 所需依赖

```bash
pip install tensorboardX -i https://pypi.tuna.tsinghua.edu.cn/simple
```

```bash
pip install scipy -i https://pypi.tuna.tsinghua.edu.cn/simple
```

```bash
pip install matplotlib -i https://pypi.tuna.tsinghua.edu.cn/simple
```

```bash
sudo apt-get install libpython2.7
```

如果遇到报错请参考 [四、遇到的问题](#四遇到的问题)


## 三、运行程序

启动！1 个 epoch 需要 40 秒，150 个 epoch 接近 100 分钟。

注意后面路径是你 `train` 文件夹所在目录

```bash
python train_core_zzy.py --dataset market --batchsize 32 --noise_ratio 0.2 --lr 0.01 --data_dir ../
```


## 四、遇到的问题

### 4.1 Cython 扩展模块的编译与导入不匹配

::: caution ImportError: dynamic module does not define module export function (PyInit_cython_eval)
```bash
(core) root@DESKTOP-5UQUCK2:/ajohn-lab-github/ReID-Label-Noise# python train_core.py --dataset market --batchsize 32 --noise_ratio 0.2 --lr 0.01 --pattern
Traceback (most recent call last):
  File "/ajohn-lab-github/ReID-Label-Noise/train_core.py", line 28, in <module>
    from eval_utils import get_test_acc, extract_train_second_label
  File "/ajohn-lab-github/ReID-Label-Noise/eval_utils.py", line 8, in <module>
    from eval_lib.cython_eval import eval_market1501_wrap
ImportError: dynamic module does not define module export function (PyInit_cython_eval)
```
:::

因为我们使用的是 python3.9，而 eval_lib 目录下只有 3.6 和 3.7 的编译的共享库。

进入 `eval_lib` 目录：
```bash
cd /ajohn-lab-github/ReID-Label-Noise/eval_lib
```

使用 deadsnakes PPA，这个仓库提供了多个版本的 Python。

添加 deadsnakes PPA
```bash
sudo apt update
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
```

安装 Python 3.9 的开发包
```bash
sudo apt-get install python3.9 python3.9-dev
```

安装 cython 和必要的编译工具
```bash
pip install cython
sudo apt-get update
sudo apt-get install build-essential python3.9-dev
``` 

执行 `setup.py` 重新编译扩展模块
```bash
python3.9 setup.py build_ext --inplace
```

在成功编译后，应该能看到生成了 eval.c 文件和 cython_eval.cpython-39-x86_64-linux-gnu.so 文件。


## 五、参数

核心思想：在早期阶段使用较大的学习率，逐步细化错误注释的样本

### SELF：渐进式自我标签精炼
在本小节中，我们介绍了具有渐进式自标签细化策略的序言模型学习，该策略共同细化带注释的标签并优化网络。 我们的基本想法源于观察，如第 IV-B 节中所讨论的，在早期阶段使用大学习率的深度 Re-ID 模型学习可以防止拟合错误标记的样本 [64]。 基于这一观察，我们假设以大学习率学习的序言模型具有预测输入样本的真实标签的能力。 因此，可以在后期使用学习到的序言模型执行标签细化，解决错误注释。 基于上述讨论，我们的渐进自标签精炼（SELF）方法使用大学习率联合优化被识别为模型的带注释标签和预测标签的概率。


### CORE：在线标签协同精炼


为了进一步增强针对错误预测标签的鲁棒性，我们提出了一种在线协同精炼（CORE）框架，通过学习两组网络，如图 2 所示。我们通过从对等网络中提取模型输出来协作更新一个网络的标签，并同时匹配两个网络之间的估计概率。 以动态更新的方式，同时在线改进行人Re-ID模型和估计标签。

通过这种方式，每个网络通过使用来自其对等网络的细化标签优化自身来协作学习，同时将其概率分布与其他对等网络相匹配。 以协作学习的方式，网络和预测标签都在逐步改进。 该策略重新使用错误标记的样本，而不是过滤掉它们[12]、[13]。 所提出的 CORE 的另一个好处是它独立于基线方法，当配置强大的基线骨干时，性能可以进一步提高



我们采用 ResNet50 作为我们的主干网络结构，因为它是最近 Re-ID 模型中使用最广泛的。 我们使用预先训练的 ImageNet 权重进行初始化。 我们在 pool5 层之后添加一个全连接层（维度为 512），后面是带有 ReLU 激活函数的批量归一化层，如[36]中所示。 采用随机裁剪和水平翻转进行数据增强。 首先将图像大小调整为288×144，然后随机裁剪为256×128，被馈送到网络中。 所有数据集上的训练批量大小均设置为 32。 我们采用SGD作为默认优化器，动量参数为0.9。 我们为前 20 个 epoch 设置了较大的学习率 0.1，用于带有自标签精炼的预模型学习，并为最后 40 个 epoch 将其衰减 0.1，以进行进一步的自精炼 (SELF) 或共同精炼 (CORE)。