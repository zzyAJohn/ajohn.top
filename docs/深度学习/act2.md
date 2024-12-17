---
title: 'Enhancing Robustness in Learning with Noisy Labels: An Asymmetric Co-Training Approach 2'
tags:
    - Deep Learning
    - LNL
    - Python
createTime: 2024/12/16 12:23:09
permalink: /article/r0g0ypv4/
---


一种非对称协同训练（ACT）方法，可用于减轻标签噪声的有害影响。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-06/202412061241982.png)
<!-- more -->
---

>本文用于记录复现 [ACT](https://openreview.net/forum?id=bRYbhQLYx3) 的 web 数据集 实验过程和结果，代码见 [github仓库](https://github.com/shtdusb/ACT)。

前置配置请查阅上一篇博客：

[Enhancing Robustness in Learning with Noisy Labels: An Asymmetric Co-Training Approach](./act.md)

## 一、下载数据集

[数据集来源](https://github.com/NUST-Machine-Intelligence-Laboratory/weblyFG-dataset)

WebFG-496 包含 200 个“鸟”（Web-bird） 子类别、100 个“飞机”（Web-aircraft）子类别和“汽车”（Web-car）的 196 个子类别。它总共有 53339 张 Web 训练图像。

在 `ACT/data` 目录下执行下面命令
```bash
wget https://web-fgvc-496-5089-sh.oss-cn-shanghai.aliyuncs.com/web-aircraft.tar.gz # 6.748 GB
wget https://web-fgvc-496-5089-sh.oss-cn-shanghai.aliyuncs.com/web-bird.tar.gz # 2.666 GB
wget https://web-fgvc-496-5089-sh.oss-cn-shanghai.aliyuncs.com/web-car.tar.gz # 6.715 GB
```

如果服务器下载速度较慢，可以点击在本地下载 [web-aircraft 数据集](https://web-fgvc-496-5089-sh.oss-cn-shanghai.aliyuncs.com/web-aircraft.tar.gz)、[web-bird 数据集](https://web-fgvc-496-5089-sh.oss-cn-shanghai.aliyuncs.com/web-bird.tar.gz)和 [web-car 数据集](https://web-fgvc-496-5089-sh.oss-cn-shanghai.aliyuncs.com/web-car.tar.gz) 压缩包，下载完成后，上传到 `ACT/data` 目录下

::: important 重要
将数据集上传到 `ACT/data` 目录，是因为我修改了 `main_web.py` 中的数据集路径
```py
def build_loader(params):
    dataset_name = params.dataset

    if dataset_name.startswith('cif'):
        num_classes = int(100 * (1 - config.openset_ratio))
        transform = build_transform(rescale_size=32, crop_size=32)
        dataset = build_cifar100n_dataset("./data/cifar100",
                                          CLDataTransform(transform['cifar_train'],
                                                          transform['cifar_train_strong_aug']),
                                          transform['cifar_test'], noise_type=params.noise_type,
                                          openset_ratio=params.openset_ratio, closeset_ratio=params.closeset_ratio)
        trainloader = DataLoader(dataset['train'], batch_size=params.batch_size, shuffle=True, num_workers=4,
                                 pin_memory=True)
        test_loader = DataLoader(dataset['test'], batch_size=16, shuffle=False, num_workers=4, pin_memory=False)

        num_samples = len(trainloader.dataset)
        return_dict = {'trainloader': trainloader, 'num_classes': num_classes, 'num_samples': num_samples,
                       'dataset': dataset_name}
        return_dict['test_loader'] = test_loader
    if dataset_name.startswith('web-'):
        class_ = {"web-aircraft": 100, "web-bird": 200, "web-car": 196}
        num_classes = class_[dataset_name]
        transform = build_transform(rescale_size=448, crop_size=448)
        dataset = build_webfg_dataset(os.path.join('Datasets', dataset_name), # [!code --]
        dataset = build_webfg_dataset(os.path.join('./data', dataset_name), # [!code ++]
                                      CLDataTransform(transform['train'], transform["train_strong_aug"]),
                                      transform['test'])
        trainloader = DataLoader(dataset["train"], batch_size=params.batch_size, shuffle=True, num_workers=4,
                                 pin_memory=True)
        test_loader = DataLoader(dataset['test'], batch_size=16, shuffle=False, num_workers=4,
                                 pin_memory=False)
        num_samples = len(trainloader.dataset)
        return_dict = {'trainloader': trainloader, 'num_classes': num_classes, 'num_samples': num_samples,
                       'dataset': dataset_name}
        return_dict['test_loader'] = test_loader

    return return_dict
```
:::

解压数据集
```bash
cd ./data
tar -xzvf web-aircraft.tar.gz
```

解压后如图所示

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-16/202412161404021.png)

## 二、环境配置

前置配置请查阅上一篇博客：

[Enhancing Robustness in Learning with Noisy Labels: An Asymmetric Co-Training Approach](./act.md)

激活

```bash
conda activate act
```

## 三、运行程序

启动！1 个 epoch 需要 4 分钟，100 个 epoch 接近 7h，~~一训一个不吱声~~。
```bash
python main_web.py --gpu 0 --dataset web-aircraft --model Resnet50 --batch-size 16 --closeset-ratio 0
```
