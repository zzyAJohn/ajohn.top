---
title: 'Lab 1: IntelliJ, Java, git'
createTime: 2024/12/11 19:07:52
permalink: /cs61b/m9ov5uds/
---

安装 JDK、git、IntelliJ 和 CS61B 插件，网上有很多教程，故不在此赘述，[参考教程](https://sp21.datastructur.es/materials/lab/lab1setup/lab1setup)。

本文重点介绍如何获取 CS61B 的作业文件，以及上传到 github 仓库从而进行检查作业的相关操作。

你也可以通过我的 github 仓库 [CS61B_SP21](https://github.com/zzyAJohn/CS61B_SP21)来获取我的代码。

## A. 获取起始文件

1. 在 github 新建 CS61B_SP21 仓库


2. 在本地克隆github仓库

```bash
git clone https://github.com/zzyAJohn/CS61B_SP21.git
```

3. 在本地 CS61B_SP21 目录添加远程存储库 skeleton，以获取作业的起始代码

```bash
git remote add skeleton https://github.com/Berkeley-CS61B/skeleton-sp21.git
```

查看是否添加成功
```bash
git remote -v
```
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-11/202412111918757.png)


4. 从远程 “pull” 获取起始代码，它的作用是从名为 skeleton 的存储库中获取所有远程文件，并将其复制到当前文件夹中。
```bash
git pull skeleton master
```

如果您收到类似于 “fatal： refusing to merge unrelated histories” 的错误，您可能运行了 GitHub 在您创建仓库时建议的命令。要解决此问题，您可以改为运行：
```bash
git pull --rebase --allow-unrelated-histories skeleton master
```



## B. 在 IntelliJ 中运行代码

打开 IntelliJ，==进入 lab1 目录==，运行您的 HelloNumbers.java，您应该会看到一些漂亮的数字打印出来！

你好 Numbers！

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-11/202412111924795.png)


## C. 设置 Snaps(可选)

Berkeley用来收集信息改善教学的，我选择跳过。

Snaps 存储库将作为您工作的安全备份，以防您忘记实际使用 git 进行手动提交。您将在每个项目后推送您的 Snaps 存储库，这将允许我们发布统计数据，例如学生完成每个项目（或每个项目的每个部分）所花费的平均时间。它还将使我们能够识别项目中比我们预期的更令人困惑或更耗时的部分。它还将使我们能够了解我们分配的工作量是否过高，这样如果我们给您带来了超负荷，我们可以降低课程难度。


## D. 把初始化作业推送到云端仓库
现在，我们要把本地从 skeleton 拉取的作业等资源同步到云端，因为我新建 github 仓库时增加了一个 reademe，导致本地和云端冲突，我的解决如下：

1. 使用下面命令检查状态
```bash
git status
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-11/202412111937483.png)

可以看到，我有 45 个未上传的文件和 1 个冲突的文件

2. 使用下面命令，允许合并历史不相关的提交
```bash
git pull origin main --allow-unrelated-histories
```

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-11/202412111939639.png)


3. Git 会提示你解决冲突，本地提交合并
```bash
git commit -m "Merge branch 'main' of https://github.com/zzyAJohn/CS61B_SP21"
```

4. 将本地的更改推送到远程仓库
```bash
git push origin main
```
![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-11/202412111940776.png)

现在，你的远端应该有所有作业的初始版本


## E. 编程练习
::: important 重要
在做编程练习前，请确保你已经把初始作业推送到你的远程仓库了，如果没有，请先推送完再来做这个练习。
:::
Open the file called `Collatz.java`. Try running it and you’ll see the number 5 get printed.

This program is supposed to print the Collatz sequence starting from a given number. The Collatz sequence is defined as follows:

If n is even, the next number is n/2. If n is odd, the next number is 3n + 1. If n is 1, the sequence is over.

For example, suppose we start with 5. Since 5 is odd, the next number is 3x5 + 1 = 16. Since 16 is even, the next number is 8. Since 8 is even, the next number is 4. Since 4 is even the next number is 2. Since 2 is even, the next number is 1. At that point we’re done. The sequence was 5, 16, 8, 4, 2, 1.

Your first task is to write a method as follows: public static int nextNumber(int n) that returns the next number. For example nextNumber(5) should return 16. This method will be tested by the Gradescope autograder. Make sure to provide a description of the method as a comment. Your description should be contained by /** and */. Comments contained by /** and */ are also called “Javadoc comments” or just “Javadocs”. These comments can span multiple lines if they need the extra space, e.g. the nextNumber Javadocs.

Javadocs may contain optional tags, e.g. @param. We do not require you to use any tags like this in 61B except the @source tag. Use the @source tag any time you receive significant help on a project. The @source tag is not required for HW or lab, though we recommend it anyway, since it’s a good scholarly and professional habit to cite your sources.

Some Java tips:

- The % operator implements remainder. For example, the value of x % 4 will be 0, 1, 2, or 3.
- The == operator compares two values for inequality. The code fragment if (n % 4 == 1) reads as “if the remainder when dividing n by 4 is equal to 1.”
After writing nextNumber, fill in the main method so that it prints out the Collatz sequence starting from n = 5. For example, if n = 5, your program should print 5 16 8 4 2 1. It’s fine if there’s an extra space after the 1.

Fun fact: For all numbers, the Collatz sequence appears to terminate at 1. So far, however, nobody has been able to prove that this is true for all possible starting values, but all values up to approximately 2^68 have been checked. As noted in the wikipedia article, mathematician Jeffrey Lagarias noted that the Collatz conjecture “is an extraordinarily difficult problem, completely out of reach of present day mathematics.”


::: details 点击查看答案
```java
/** Class that prints the Collatz sequence starting from a given number.
 *  @author YOUR NAME HERE
 */
public class Collatz {

    /** Buggy implementation of nextNumber! */
    public static int nextNumber(int n) {
          if (n % 2 == 0) {
              n = n / 2;
          } else {
              n = n * 3 + 1;
          }
          return n;
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.print(n + " ");
        while (n != 1) {
            n = nextNumber(n);
            System.out.print(n + " ");
        }
        System.out.println();
    }
}
```
:::


## F. 将您的工作推送到 GitHub

1. 进入本地 CS61B_SP21 目录，输入以下命令以确认您位于正确的目录中。

```bash
git status
```

如果一切正常，您应该会看到如下内容：

```bash
PS D:\Github\CS61B_SP21> git status
On branch main

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   lab1/Collatz.java

no changes added to commit (use "git add" and/or "git commit -a")
```

Git 告诉你的是，你更改了 lab1/Collatz.java 文件的某些内容，而 GitHub 尚未记录。

确保它显示 `modified:   lab1/Collatz.java`，而不仅仅是 `Collatz.java`。

如果它显示 `Collatz.java`，您应该使用 `cd` 到上一级目录。


2. 暂存lab1下改动的文件
```bash
git add lab1/*
```

3. 在本地提交并记录描述
```bash
git commit -m "done with Collatz"
```

如果一切正常，您应该会看到如下内容
```bash
PS D:\Github\CS61B_SP21> git commit -m "done with Collatz.java"
[main 060fe39] done with Collatz.java
 1 file changed, 7 insertions(+), 9 deletions(-)
```

4. 推送到 github 仓库
```bash
git push
```

如果一切正常，您应该会看到如下内容
```bash
PS D:\Github\CS61B_SP21> git push
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 16 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 423 bytes | 423.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/zzyAJohn/CS61B_SP21.git
   51ff170..060fe39  main -> main
```

## G. 提交 lab1

使用 [Gradescope](https://www.gradescope.com/) 提交您的作业。

如果你的 Gradescope 中没有 CS61B 课程，请使用 [README](README.md) 中的邀请码激活。

选择通过 github 提交。

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-11/202412111958747.png)

通过了！congratulation！