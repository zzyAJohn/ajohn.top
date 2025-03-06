---
title: MinIO + Docker 搭建属于自己的 OSS 存储服务
tags:
    - OSS
    - Docker
    - Linux
createTime: 2025/03/03 09:30:21
permalink: /article/oss/
---

[MinIO](https://min.io/) 是一个高性能的轻量级对象存储服务器。它具有分布式，高可用性和水平扩展的特点，它非常适合用于大规模数据存储和分析。其优点包括低延迟、高吞吐量、易于部署和管理。
<!-- more -->

## 1. 使用 Docker 启动 MinIO

登录服务器，安装 `Docker` ：
```bash
sudo snap install docker
```

创建 MinIO 的目录：
```bash
mkdir minio
```

进入 MinIO 目录：

```bash
cd minio
```

新建文件并打开：
```bash
vim docker-compose.yaml
```
`docker-compose.yaml` 是 Docker Compose 使用的配置文件，通常用于定义和管理多容器 `Docker` 应用程序。


在 `docker-compose.yaml` 中粘贴配置文件：
```bash
services:
  minio:
    container_name: minio
    image: quay.io/minio/minio
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - ./data:/data
    environment:
      - MINIO_ROOT_USER=zzy
      - MINIO_ROOT_PASSWORD=***
```

`MINIO_ROOT_USER=` 后填入服务器当前用户名

`MINIO_ROOT_PASSWORD=` 后填入服务器当前用户名的密码

其中 9000 端口用于访问，9001 端口用于控制台

保存退出

启动！
```bash
sudo docker compose up
```


```bash
zzy@ajohn-top:~/minio$ sudo docker compose up
[+] Running 11/11
 ✔ minio 10 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                          51.8s 
   ✔ f85b91ff2bfd Pull complete                                                                  7.3s 
   ✔ e3a2c2426f91 Pull complete                                                                  3.7s 
   ✔ 2c2d0fc1bc01 Pull complete                                                                  5.2s 
   ✔ dceacb66a9de Pull complete                                                                  5.8s 
   ✔ 72729072f786 Pull complete                                                                 45.4s 
   ✔ ad57128305dd Pull complete                                                                 26.0s 
   ✔ f634493814a0 Pull complete                                                                 13.5s 
   ✔ bca14f032577 Pull complete                                                                 20.6s 
   ✔ 2390426de7ed Pull complete                                                                 22.3s 
   ✔ d8d02ca4ca98 Pull complete                                                                 24.1s 
[+] Running 2/2
 ✔ Network minio_default  Created                                                                0.3s 
 ✔ Container minio        Created                                                                0.1s 
Attaching to minio
minio  | INFO: Formatting 1st pool, 1 set(s), 1 drives per set.
minio  | INFO: WARNING: Host local has more than 0 drives of set. A host failure will result in data becoming unavailable.
minio  | MinIO Object Storage Server
minio  | Copyright: 2015-2025 MinIO, Inc.
minio  | License: GNU AGPLv3 - https://www.gnu.org/licenses/agpl-3.0.html
minio  | Version: RELEASE.2025-02-28T09-55-16Z (go1.23.6 linux/amd64)
minio  | 
minio  | 
minio  | API: http://172.18.0.2:9000  http://127.0.0.1:9000 
minio  | WebUI: http://172.18.0.2:9001 http://127.0.0.1:9001  
minio  | 
minio  | Docs: https://docs.min.io
minio  | 
```

`sudo docker compose up` 命令用于启动 `docker-compose.yaml` 中定义的所有容器，并自动管理它们的依赖关系。

它会根据 `docker-compose.yaml` 的配置创建、启动容器，并在需要时构建镜像、挂载卷、映射端口等。

::: tip
```bash
sudo docker compose up -d
```
`-d`（detach）：以后台模式运行，不会阻塞终端。
```bash
zzy@ajohn-top:~/minio$ sudo docker compose up -d
[+] Running 1/1
 ✔ Container minio  Started                                                                                                                                                     0.0s 
zzy@ajohn-top:~/minio$ 
```
:::

## 2. 域名解析

前往域名商，添加两条 A 记录：

```
主机记录：oss
记录类型：A
记录值：你的服务器ip
```

```
主机记录：oss-m
记录类型：A
记录值：你的服务器ip
```


## 3. 添加反向代理


前往宝塔面板，添加反向代理。

在左侧点击网站，点击反向代理，点击添加反代
```
域名：oss.ajohn.top
代理地址：http://127.0.0.1:9000

域名：oss-m.ajohn.top
代理地址：http://127.0.0.1:9001
```

添加完成后，可以顺带部署一下 `SSL` 证书，使用 [上次的证书夹](./blog-to-cn.md) 即可，非常快捷。

部署完证书记得打开强制 `https` 。


## 4. MinIO

打开你的 MinIO 管理页面：https://oss-m.ajohn.top/，账号和密码是之前 Docker 配置的。

点击左侧 `BUckets` ，点击 `Create Buckets` ，创建一个桶。

MinIO 使用 bucket 来组织对象。bucket 类似于文件系统中的文件夹或目录，其中每个 bucket 可以容纳任意数量的对象。

- `Versioning` 允许在同一密钥下保存同一对象的多个版本。

- `Object Locking` 可防止删除对象。需要支持保留和法律封存。只能在创建bucket时启用。

- `Quota` 限制了存储桶中的数据量。

- `Retention` 规定了在一段时间内防止对象删除的规则。必须启用版本控制才能设置存储桶保留策略。

## 5. 使用 Picgo 上传


阿囧阿囧，手动上传好麻烦，有没有简单一点的方法呢？有的兄弟有的。

尽管 `Picgo` 没有 `MinIO` 图床，但我们可以通过 [picgo-plugin-minio](https://github.com/Herbertzz/picgo-plugin-minio) 这个插件来实现。

<RepoCard repo="Herbertzz/picgo-plugin-minio" />

## 6. 使用 Onedrive 备份

数据无价，为了以防万一，我们可以使用 `Onedrive` 来备份我们的图片。

在宝塔面板的软件商店中搜索 `OneDirve` 并下载，接下来可查阅宝塔教程：[OneDirve 备份插件使用向导](https://www.bt.cn/bbs/thread-54124-1-1.html)

创建计划任务时，如下图，任务类型选择 `备份目录` ，备份目录点击右侧小文件夹，定位到你要备份的目录，备份到选择 `微软OneDirve` 。

![](https://oss.ajohn.top/blog/oss/1.webp)

## 参考资料：
- [YOAKE](https://github.com/YOYOYOAKE.png) 的脑子