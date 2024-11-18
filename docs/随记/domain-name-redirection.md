---
title: 域名重定向
createTime: 2024/11/18 17:10:13
permalink: /article/bytzx028/
---

通过域名重定向，把博客地址重定向到 `https://ajohn.top/`

1. 首先去域名服务商添加解析记录，创建 A 记录，将顶点域指向 GitHub Pages 的 IP 地址，这四个 IP 是由 GitHub 提供的，[点击查看详情](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-11-18/202411181718310.png)

1. 回到仓库点击 Settings ，点击 Pages ，在右下角箭头处输入你的域名 `ajohn.top` ，等待一会刷新出现橙色方框就代表成功了

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-11-18/202411181720881.png)

3. 记得修改 `config` 文件，之前访问博客地址是 `https://zzyajohn.github.io/ajohn.top/ ` ，所以需要将 `base` 设置为 `/ajohn.top/` ，现在重定向到 `https://ajohn.top/` 后将base改回 `/` 即可


![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-11-18/202411181723160.png)