---
title: ACT 的环境配置
tags:
    - Deep Learning
    - Python
    - LNL
createTime: 2024/12/3 15:23:38
permalink: /article/z3du3x1x/
---

>记录 [ACT](https://github.com/shtdusb/ACT?tab=readme-ov-file) 的环境配置过程


## 一、下载数据集

[CIFAR-10 和 CIFAR-100 数据集网站](https://www.cs.toronto.edu/~kriz/cifar.html)（打不开使用美国节点）

在 ACT 目录下执行下面命令
```bash
wget -P ./data/cifar100 https://www.cs.toronto.edu/~kriz/cifar-100-python.tar.gz
```

如果服务器下载速度较慢，可以点击在本地下载[CIFAR-10 数据集](https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz)和[CIFAR-100 数据集](https://www.cs.toronto.edu/~kriz/cifar-100-python.tar.gz)压缩包，下载完成后，上传到 ACT/data/cifar100 目录下

无需解压，运行代码时会自动解压数据集

## 二、环境配置

查看当前 cuda 版本

```bash
nvcc --version
```

创建环境

```bash
conda env remove --name act
conda create --name act python=3.9 -y
```

激活

```bash
conda activate act
```

安装 Pytorch [参考Pytorch官网](https://pytorch.org/get-started/locally/)

```bash
conda install pytorch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0  pytorch-cuda=11.8 -c pytorch -c nvidia
```

~~漫长的等待后~~，检查 Pytorch 是否安装成功

```bash
python -c "import torch; print(torch.cuda.is_available())"
```
输出：`True`

安装 act 所需依赖

```bash
pip install -r requirements.txt
```
~~漫长的等待~~

（可选）可能会缺失以下库，可以先执行第三步看看是否缺失，按需安装

```bash
conda install tqdm
```

```bash
pip install randaugment
```

```bash
pip install opencv-python
```

```bash
pip install matplotlib
```



```bash
pip install kornia
```

```bash
pip install torchmetrics # 887MB + 317MB + 557MB警告
```

```bash
pip install easydict
```




## 三、运行程序

启动！
```bash
python main.py --gpu 0  --noise-type symmetric --closeset-ratio 0.2 --dataset cifar100nc
```
经历了数不清的失败后，小宝贝终于跑起来了！
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-04/202412041942237.png)

可以下载 nvitop 查看占用
```bash
pip install nvitop
nvitop
```

如果gpu占用低也不要谎，我的gpu占用只有24%，可能是模型的计算量不足，如果模型较小或计算量较少，GPU 可能并不会被充分利用。尤其是如果 batch size 很小，GPU 的并行计算能力可能无法得到完全发挥。


可以在模型训练前在 main.py 中加入下面代码查看运行设备
```py
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")
```

输出：
`Using device: cuda`

## 四、遇到的问题

### 4.1 version 'GLIBCXX_3.4.29' not found


::: caution version 'GLIBCXX_3.4.29' not found
```
ImportError: /lib/x86_64-linux-gnu/libstdc++.so.6: version GLIBCXX_3.4.29' not found (required by /home/wuye/anaconda3/envs/tf2/lib/python3.8/site-packages/google/protobuf/pyext/_message.cpython-38-x86_64-linux-gnu.so)
```
:::

这个是默认路径下的libstdc++.so.6缺少GLIBCXX_3.4.29

使用指令先看下系统目前都有哪些版本的

```bash
strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBCXX
```

我的只到3.4.28，所以确定是缺少GLIBCXX_3.4.29

使用指令来查看当前系统中其它的同类型文件，找到一个版本比较高的

```bash
sudo find / -name "libstdc++.so.6*"
```

我选择的是/home/ubuntu/.conda/envs/lcnl2/lib/libstdc++.so.6.0.29，使用指令看看其是否包含3.4.29

```bash
strings /home/ubuntu/.conda/envs/lcnl2/lib/libstdc++.so.6.0.29 | grep GLIBCXX
```

发现存在GLIBCXX_3.4.29，接下来就是建立新的链接到这个文件上

开始干活：

复制

```bash
sudo cp /home/ubuntu/.conda/envs/lcnl2/lib/libstdc++.so.6.0.29 /usr/lib/x86_64-linux-gnu/
```
删除之前链接
```bash
sudo rm /usr/lib/x86_64-linux-gnu/libstdc++.so.6
```

创建新的链接
```bash
sudo ln -s /home/ubuntu/.conda/envs/lcnl2/lib/libstdc++.so.6.0.29 /usr/lib/x86_64-linux-gnu/libstdc++.so.6
```

检查

```bash
ll /usr/lib/x86_64-linux-gnu/libstd*
```

```bash
strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBCXX
```

参考链接：[如何解决version `GLIBCXX_3.4.29‘ not found的问题](https://blog.csdn.net/weixin_39379635/article/details/129159713)

### 4.2 AttributeError: module 'numpy' has no attribute 'int'.

::: caution AttributeError: module 'numpy' has no attribute 'int'.
```
(act) ubuntu@ml-ubuntu20-04-desktop-v3-2-32gb-25m:~/ajohn-lab/ACT$ python main.py --gpu 0  --noise-type symmetric --closeset-ratio 0.2 --dataset cifar100nc
Namespace(log=None, gpu='0', seed=123, batch_size=128, lr=0.001, lr_decay='cosine:20,5e-4,100', weight_decay=0.0005, opt='sgd', warmup_epochs=20, warmup_lr=0.001, lr1=0.001, epochs=100, save_weights=False, dataset='cifar100nc', noise_type='symmetric', closeset_ratio=0.2, database='./dataset', model='CNN', ablation=False, method='ours', tau=0.025)
Available GPUs Index : 0
2024-12-04 18:35:20 - | MSG    | - Result Path: CNNResults/cifar100nc/symm_20/None-20241204_183520
2024-12-04 18:35:20 - | MSG    | - Namespace(log=None, gpu='0', seed=123, batch_size=128, lr=0.001, lr_decay='cosine:20,5e-4,100', weight_decay=0.0005, opt='sgd', warmup_epochs=20, warmup_lr=0.001, lr1=0.001, epochs=100, save_weights=False, dataset='cifar100nc', noise_type='symmetric', closeset_ratio=0.2, database='./dataset', model='CNN', ablation=False, method='ours', tau=0.025, openset_ratio=0.0)
Traceback (most recent call last):
  File "/home/ubuntu/ajohn-lab/ACT/main.py", line 429, in <module>
    loader_dict = build_loader(config)
  File "/home/ubuntu/ajohn-lab/ACT/main.py", line 287, in build_loader
    transform = build_transform(rescale_size=32, crop_size=32)
  File "/home/ubuntu/ajohn-lab/ACT/utils/builder.py", line 70, in build_transform
    CIFAR10Policy(),
  File "/home/ubuntu/.conda/envs/act/lib/python3.9/site-packages/randaugment/randaugment.py", line 264, in __init__
    SubPolicy(0.1, "invert", 7, 0.2, "contrast", 6, fillcolor),
  File "/home/ubuntu/.conda/envs/act/lib/python3.9/site-packages/randaugment/randaugment.py", line 372, in __init__
    "posterize": np.round(np.linspace(8, 4, 10), 0).astype(np.int),
  File "/home/ubuntu/.conda/envs/act/lib/python3.9/site-packages/numpy/__init__.py", line 305, in __getattr__
    raise AttributeError(__former_attrs__[attr])
AttributeError: module 'numpy' has no attribute 'int'.
`np.int` was a deprecated alias for the builtin `int`. To avoid this error in existing code, use `int` by itself. Doing this will not modify any behavior and is safe. When replacing `np.int`, you may wish to use e.g. `np.int64` or `np.int32` to specify the precision. If you wish to review your current use, check the release note link for additional information.
The aliases was originally deprecated in NumPy 1.20; for more details and guidance see the original release note at:
    https://numpy.org/devdocs/release/1.20.0-notes.html#deprecations
```
:::


这个错误是因为 numpy.int 已在 NumPy 1.20 版本中被弃用，并且在新的版本中已被移除。你需要修改代码中的 np.int，将其替换为 Python 内置的 int 或使用 np.int64 或 np.int32 来明确指定精度。

在 /home/ubuntu/.conda/envs/act/lib/python3.9/site-packages/randaugment/randaugment.py 找到 np.int 并修改 为 int

```py
ranges = {
            "shearx": np.linspace(0, 0.3, 10),
            "sheary": np.linspace(0, 0.3, 10),
            "translatex": np.linspace(0, 150 / 331, 10),
            "translatey": np.linspace(0, 150 / 331, 10),
            "rotate": np.linspace(0, 30, 10),
            "color": np.linspace(0.0, 0.9, 10),
            "posterize": np.round(np.linspace(8, 4, 10), 0).astype(np.int), # [!code --]
            "posterize": np.round(np.linspace(8, 4, 10), 0).astype(int), # [!code ++] 
            "solarize": np.linspace(256, 0, 10),
            "contrast": np.linspace(0.0, 0.9, 10),
            "sharpness": np.linspace(0.0, 0.9, 10),
            "brightness": np.linspace(0.0, 0.9, 10),
            "autocontrast": [0] * 10,
            "equalize": [0] * 10,
            "invert": [0] * 10,
            "cutout": np.round(np.linspace(0, 20, 10), 0).astype(np.int), # [!code --]
            "cutout": np.round(np.linspace(0, 20, 10), 0).astype(int), # [!code ++] 
        }
```

### 4.3 NameError: name 'DataLoader' is not defined

::: caution NameError: name 'DataLoader' is not defined
```
(act) ubuntu@ml-ubuntu20-04-desktop-v3-2-32gb-25m:~/ajohn-lab/ACT$ python main.py --gpu 0  --noise-type symmetric --closeset-ratio 0.2 --dataset cifar100nc
Namespace(log=None, gpu='0', seed=123, batch_size=128, lr=0.001, lr_decay='cosine:20,5e-4,100', weight_decay=0.0005, opt='sgd', warmup_epochs=20, warmup_lr=0.001, lr1=0.001, epochs=100, save_weights=False, dataset='cifar100nc', noise_type='symmetric', closeset_ratio=0.2, database='./dataset', model='CNN', ablation=False, method='ours', tau=0.025)
Available GPUs Index : 0
2024-12-04 19:18:14 - | MSG    | - Result Path: CNNResults/cifar100nc/symm_20/None-20241204_191814
2024-12-04 19:18:14 - | MSG    | - Namespace(log=None, gpu='0', seed=123, batch_size=128, lr=0.001, lr_decay='cosine:20,5e-4,100', weight_decay=0.0005, opt='sgd', warmup_epochs=20, warmup_lr=0.001, lr1=0.001, epochs=100, save_weights=False, dataset='cifar100nc', noise_type='symmetric', closeset_ratio=0.2, database='./dataset', model='CNN', ablation=False, method='ours', tau=0.025, openset_ratio=0.0)
Noise Transition Matrix: 
 [[0.8       0.0020202 0.0020202 ... 0.0020202 0.0020202 0.0020202]
 [0.0020202 0.8       0.0020202 ... 0.0020202 0.0020202 0.0020202]
 [0.0020202 0.0020202 0.8       ... 0.0020202 0.0020202 0.0020202]
 ...
 [0.0020202 0.0020202 0.0020202 ... 0.8       0.0020202 0.0020202]
 [0.0020202 0.0020202 0.0020202 ... 0.0020202 0.8       0.0020202]
 [0.0020202 0.0020202 0.0020202 ... 0.0020202 0.0020202 0.8      ]]
Noise Type: symmetric (close set: 0.2, open set: 0.0)
Actual Total Noise Ratio: 0.201
Traceback (most recent call last):
  File "/home/ubuntu/ajohn-lab/ACT/main.py", line 431, in <module>
    loader_dict = build_loader(config)
  File "/home/ubuntu/ajohn-lab/ACT/main.py", line 295, in build_loader
    trainloader = DataLoader(dataset['train'], batch_size=params.batch_size, shuffle=True, num_workers=4,
NameError: name 'DataLoader' is not defined
```
:::



在 main.py 加入一行即可解决
```
from torch.utils.data import DataLoader
```

