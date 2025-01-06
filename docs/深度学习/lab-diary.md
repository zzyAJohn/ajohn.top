---
title: 科研碎碎念
createTime: 2025/01/04 16:09:40
permalink: /article/4svrfjec/
sticky: 1
---

虽说“[周记还是别人写的好看](https://yoyoyoake.github.io/article/xaklzim6/)”，但总归也是要稍微记录一下的，好记性不如烂键盘嘛，嗯...就从科研开始吧
<!-- more -->

## 2025.1.5

- 尝试在core中加入minp

结果：失败，cython看不懂，python作者给的源码就报错，暂时放弃

doing：正在研究core和act的weight

初步结论：core没用过，所有样本一直是1；act在预热每轮+1

鲁棒训练日志中有：
```bash
选择了什么？
tensor([3], device='cuda:0', dtype=torch.int32)
ROBUST TRAINING:  61%|> | 248/405 [00:47<00:32,  4.80it/s, TrainAcc_net_0: 0.58%; TrainAcc_nROBUST TRAINING:  61%|> | 249/405 [00:47<00:31,  5.01it/s, TrainAcc_net_0: 0.58%; TrainAcc_net_1: 97.10%; TrainLoss_net_0: nan; TrainLoss_net_1: 3.30]-----------权重是什么-------
tensor([2, 4], device='cuda:0', dtype=torch.int32)
选择了什么？
tensor([3, 5], device='cuda:0', dtype=torch.int32)
```
说明act在鲁棒训练的时候只选择特定的样本进行加权

## 2025.1.4

- 测试不同gpu性能差距：有差距！
- 测试相同gpu不同时间有无差距：有差距！

结论：那我就随便跑了，反正结果有误差

- 复现self结果

结果：done，还不错
