---
title: EdgeOne Pages 系列（一）：博客部署初体验
createTime: 2025/06/10 17:48:17
permalink: /article/fekx940x/
cover: https://img0.baidu.com/it/u=3505072417,867264446&fm=253&fmt=auto&app=120&f=JPEG?w=1600&h=800
---

## 1. 介绍

8 年前，大家搭建个人网站都是买一台服务器，买一个域名，服务器装上 nginx 或者 Apache ，当时流行 wordpress 等 cms 框架，不过文章一多，就卡死了，而且服务器还不便宜，一个月动辄上百块，导致很多个人站长还没开够一年的网站就已经无法访问了。
<!-- more -->
但是，现在是 2025 ，大家的需求都能看到，各种纯静态框架，纯静态托管还有 serverless 、容器等等技术已经屡见不鲜，在今天如果有人问你“我想搭建一个网站，难不难”这个问题时，正在用 EdgeOne 的你，我相信你的答案是：“Easy”。


EdgeOne Pages 是基于 Tencent EdgeOne 基础设施打造的前端开发和部署平台，专为现代 Web 开发设计，帮助开发者快速构建、部署静态站点和无服务器应用。通过集成边缘函数能力，实现高效的内容交付和动态功能扩展，支持全球用户的快速访问。

Edgeone 推出了 Pages 功能，可以把 React、Vue、Hexo 和纯静态 html 等一系列静态网站框架部署在上面，实现自动部署，用过 Github pages、vercel、netlify 等平台的对这些功能应该不陌生，EdgeOne pages 目前除了不支持动态函数（也就是服务端函数）之外，静态的功能已经完善了。

## 2. 登录

来到 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)，进行登录。

## 3. 导入仓库

Pages 目前支持 Github，Coding，Gitee 等 Git 提供商的接入，下面以 Github 的接入方式为例：

导入 Git 仓库，选择 Github，并进行授权登录。

## 4. 部署项目

配置项目，我这里配置的是我的 vuepress 项目，因此注意生产分支要从 `main` 更换为 `blog_pages` ，其他不需要填写，直接点击 `开始部署` 。

大概半分钟就可以看到部署成功：

![](https://oss.ajohn.top/blog/EdgeOne/1.webp)

这时候我们可以点击右上角的 `预览` ，它会弹出一个临时链接让我们查看网页是否成功部署，一般是没问题的。

![](https://oss.ajohn.top/blog/EdgeOne/2.webp)

如果临时链接可以正常访问的话，我们就可以点击 `自定义域名` 去配置我们自己的域名了。

在 `域名管理` 下，点击 `添加自定义域名` ，输入自己的域名：

![](https://oss.ajohn.top/blog/EdgeOne/3.webp)

## 5. 配置 DNS

接下来去域名服务商配置 DNS ，添加一条（或更改之前的） CNAME 记录即可，配置完毕后回到 EdgeOne 进行验证，接下来 EdgeOne 会自动部署证书，然后就可以正常访问了。



## 6. 其他

经过测试，新的提交推送到 Github 后， EdgeOne 的自动拉取并部署的时间大概是 1~2 分钟，还是很不错的。

不得不说，相比于繁琐的服务器配置， EdgeOne 开箱即食，确实方便。