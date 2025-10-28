---
title: 古早的云崽备忘录
createTime: 2025/09/04 20:46:40
permalink: /article/eodsdqxt/
---

```
1.服务器
2.宝塔
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
（防火墙放行8888端口）

去github下载nvm
https://blog.csdn.net/weixin_49085046/article/details/125925353

3.node npm
curl --silent --location https://rpm.nodesource.com/setup_lts.x | bash -
sudo yum install -y nodejs
//sudo yum install -y node
4.pnpm
npm install -g pnpm
npm install -g npm@8.19.2
5.安装git
yum -y install git
6.安装并运行redis
yum -y install redis && redis-server --daemonize yes

进入Yunzai
//到这了
7.安装cnpm
npm install cnpm -g --registry=https://registry.npm.taobao.org

8.用cnpm安装，主要安装Puppeteer，下载chrome浏览器
cnpm install

9.安装chrome依赖库
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y && yum install libdrm libgbm libxshmfence -y && yum install nss -y && yum update nss -y;
安装中文字体
yum groupinstall fonts -y
```