---
title: C语言/C++ 远程监控系统
tags:
    - C++
createTime: 2025/05/25 19:31:43
permalink: /article/z9a6aau8/
---

## 1. 原理
原理：截取桌面图片进行发送到服务器

## 2. Windows 图形图像

### 2.1 安装 eazyx

[eazyx 官网](https://easyx.cn/)

EasyX Graphics Library 是针对 Visual C++ 的免费绘图库，支持 VC6.0 ~ VC2022，简单易用，学习成本极低，应用领域广泛。目前已有许多大学将 EasyX 应用在教学当中。


### 2.2 

得到 窗口的 HDC 就可以绘制

下面这段代码就可以不断获取当前桌面图片，并显示

```C++
#include <iostream>
#include <easyx.h>
using namespace std;

int main() {
	// 怎么获取桌面图片
	// GDI 绘图
	// HDC 绘图设备
	//cout << "hello" << endl;

	// 1. 获取到窗口的绘图设备
	HWND hDeskWnd = GetDesktopWindow(); // 0000000000010010
	// 2. 得到桌面窗口的HDC
	HDC hDeskDc = GetWindowDC(hDeskWnd); // 000000003B014929

	// 3. 获取桌面大小
	int nDeskWidth = GetDeviceCaps(hDeskDc, HORZRES); // 2560
	int nDeskHeight = GetDeviceCaps(hDeskDc, VERTRES); // 1440

	// 4. 创建一个空图片用来存储桌面图片
	IMAGE BackgroundImage(nDeskWidth, nDeskHeight);
	// 得到空图片的HDC
	HDC hImageDc = GetImageHDC(&BackgroundImage);
	// 初始一个画布
	initgraph(1280, 720);

	while (1) {
		

		// 把桌面丢进空图片
		BitBlt(hImageDc, 0, 0, nDeskWidth, nDeskHeight, hDeskDc, 0, 0, SRCCOPY);

		// 通过 保存-加载 来实现缩放
		saveimage(L"1.jpg", &BackgroundImage);
		loadimage(&BackgroundImage, L"1.jpg", 1280, 720);

		// 展示画布
		putimage(0, 0, 1280, 720, &BackgroundImage, 0, 0);

	}
	
}
```

## 界面优化

控制台项目 窗口项目 动态静态库项目

