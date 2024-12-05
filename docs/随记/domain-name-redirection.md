---
title: 域名重定向
createTime: 2024/11/18 17:10:13
permalink: /article/bytzx028/
---

通过域名重定向，把博客地址重定向到 `https://ajohn.top/`<!-- more -->

1. 首先去域名服务商添加解析记录。创建 A 记录，将顶点域指向 GitHub Pages 的 IP 地址，这四个 IP 是由 GitHub 提供的，[点击查看详情](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。创建 CNAME 记录，将 `www.ajohn.top` 指向 `zzyajohn.github.io` 。

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-11-18/202411181828371.png)

2. 回到仓库点击 Settings ，点击 Pages ，在右下角箭头处输入你的域名 `ajohn.top` ，等待一会刷新出现橙色方框就代表成功了

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-11-18/202411181828445.png)

3. 记得修改 `config` 文件，之前访问博客地址是 `https://zzyajohn.github.io/ajohn.top/ ` ，所以需要将 `base` 设置为 `/ajohn.top/` ，现在重定向到 `https://ajohn.top/` 后将base改回 `/` 即可


![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-11-18/202411181723160.png)

遇到一个bug：推送文件后 Pages 页面的自定义域会被清空，导致博客 404 ，现在通过在 `blog_pages` 分支手动上传一个 `CNAME` 文件来尝试解决。

好景不长， `blog_pages` 分支在更新博客推送到仓库后会重新编译部署页面，将手动上传的 `CNAME` 文件给清理掉。好在翻看别人的配置后发现**在`.github\workflows\deploy.yml`中加入一行 `fqdn: ajohn.top`** 似乎可以自动生成 `CNAME` ，经过验证猜想正确，~~终于弄好了，又是被自己菜哭的一天~~。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-11-18/202411181859527.png)