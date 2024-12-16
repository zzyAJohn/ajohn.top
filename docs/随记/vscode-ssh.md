---
title: VSCode 连接不上远程服务器的解决方法
tags:
    - VSCode
createTime: 2024/12/16 10:24:05
permalink: /article/ayx5589t/
---

正常用了一段时间，突然 VSCode 连接不上远程服务器了，疯狂重连 + 重启服务器 + 重装服务器系统皆未解决，最后发现是本地存储密钥不一致导致的。<!-- more -->

使用 VSCode 连接远程服务器 ubuntu@36.103.199.74 出现下面报错：

```bash
[09:53:29.040] Install and start server if needed
[09:53:30.351] Checking ssh with "C:\Program Files\Common Files\Oracle\Java\javapath\ssh.exe -V"
[09:53:30.353] Got error from ssh: spawn C:\Program Files\Common Files\Oracle\Java\javapath\ssh.exe ENOENT
[09:53:30.354] Checking ssh with "D:\Software\VMware\VMware Workstation\bin\ssh.exe -V"
[09:53:30.356] Got error from ssh: spawn D:\Software\VMware\VMware Workstation\bin\ssh.exe ENOENT
[09:53:30.356] Checking ssh with "D:\Development Tool\NVIDIA CUDA\v10.1\NVIDIA GPU Computing Toolkit\CUDA\v10.1\bin\ssh.exe -V"
[09:53:30.358] Got error from ssh: spawn D:\Development Tool\NVIDIA CUDA\v10.1\NVIDIA GPU Computing Toolkit\CUDA\v10.1\bin\ssh.exe ENOENT
[09:53:30.358] Checking ssh with "D:\Development Tool\NVIDIA CUDA\v10.1\NVIDIA GPU Computing Toolkit\CUDA\v10.1\libnvvp\ssh.exe -V"
[09:53:30.359] Got error from ssh: spawn D:\Development Tool\NVIDIA CUDA\v10.1\NVIDIA GPU Computing Toolkit\CUDA\v10.1\libnvvp\ssh.exe ENOENT
[09:53:30.359] Checking ssh with "D:\Development Tool\Python\Python312\Scripts\ssh.exe -V"
[09:53:30.360] Got error from ssh: spawn D:\Development Tool\Python\Python312\Scripts\ssh.exe ENOENT
[09:53:30.361] Checking ssh with "D:\Development Tool\Python\Python312\ssh.exe -V"
[09:53:30.363] Got error from ssh: spawn D:\Development Tool\Python\Python312\ssh.exe ENOENT
[09:53:30.363] Checking ssh with "C:\Windows\system32\ssh.exe -V"
[09:53:30.365] Got error from ssh: spawn C:\Windows\system32\ssh.exe ENOENT
[09:53:30.365] Checking ssh with "C:\Windows\ssh.exe -V"
[09:53:30.366] Got error from ssh: spawn C:\Windows\ssh.exe ENOENT
[09:53:30.367] Checking ssh with "C:\Windows\System32\Wbem\ssh.exe -V"
[09:53:30.368] Got error from ssh: spawn C:\Windows\System32\Wbem\ssh.exe ENOENT
[09:53:30.368] Checking ssh with "C:\Windows\System32\WindowsPowerShell\v1.0\ssh.exe -V"
[09:53:30.370] Got error from ssh: spawn C:\Windows\System32\WindowsPowerShell\v1.0\ssh.exe ENOENT
[09:53:30.370] Checking ssh with "C:\Windows\System32\OpenSSH\ssh.exe -V"
[09:53:30.414] > OpenSSH_for_Windows_9.5p1, LibreSSL 3.8.2

[09:53:30.418] Running script with connection command: "C:\Windows\System32\OpenSSH\ssh.exe" -T -D 9847 "ubuntu@ 36.103.199.74" sh
[09:53:30.419] Generated SSH command: 'type "C:\Users\AJohn\AppData\Local\Temp\vscode-linux-multi-line-command--36.103.199.74-269877875.sh" | "C:\Windows\System32\OpenSSH\ssh.exe" -T -D 9847 "ubuntu@ 36.103.199.74" sh'
[09:53:30.420] Using connect timeout of 17 seconds
[09:53:30.420] Terminal shell path: C:\Windows\System32\cmd.exe
[09:53:30.663] > 
[09:53:30.664] Got some output, clearing connection timeout
[09:53:30.682] > ssh: Could not resolve hostname  36.103.199.74: \262\273\326\252\265\300\325\342
> \321\371\265\304\326\367\273\372\241\243
> 过程试图写入的管道不存在。
[09:53:32.077] "install" terminal command done
[09:53:32.077] Install terminal quit with output: 过程试图写入的管道不存在。
[09:53:32.078] Received install output: 过程试图写入的管道不存在。
[09:53:32.078] WARN: $PLATFORM is undefined in installation script output.  Errors may be dropped.
[09:53:32.078] Failed to parse remote port from server output
[09:53:32.080] Resolver error: Error: 
	at v.Create (c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:696303)
	at t.handleInstallOutput (c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:694384)
	at t.tryInstall (c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:812277)
	at async c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:771235
	at async t.withShowDetailsEvent (c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:774472)
	at async x (c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:767891)
	at async t.resolve (c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:771887)
	at async c:\Users\AJohn\.vscode\extensions\ms-vscode-remote.remote-ssh-0.116.0\out\extension.js:2:1054592
[09:53:32.086] ------
```

但是使用 xshell 可以连上远程服务器

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-16/202412161033950.png)

尝试在远程服务器上清除 VSCode 缓存

使用 `ls -a` 查看所有文件

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-16/202412161034742.png)

使用 `rm -r .vscode-server` 清除 VSCode 缓存文件 `.vscode-server`

但是没什么用，此路不通（

打开命令行终端，手动测试与远程服务器的连接：

```bash
ssh ubuntu@36.103.199.74
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Image/2024-12-16/202412161027479.png)


连接失败，报错提示目标主机的 SSH 主机密钥与之前存储在本地 known_hosts 文件中的密钥不一致。

因此，打开 `C:\Users\AJohn\.ssh\known_hosts` 文件，找到第 15 行并删除该行（也可以直接删除 `known_hosts` 文件）。

再次使用 VSCode 连接服务器，已经可以连上了。好耶ヾ(✿ﾟ▽ﾟ)ノ！

END.

---

参考链接：[vscode ssh remote 远程连接插件问题](https://cloud.tencent.com/developer/article/1951863)