---
title: Markdown 语法笔记
tags:
  - Document
createTime: 2024/11/17 11:10:09
permalink: /article/gbcv4bye/
cover: https://img1.baidu.com/it/u=2371330868,1470046592&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500
---

记录一些 Markdown 语法笔记<!-- more -->

<center><font face="仿宋" color=orange size = 20>阿囧的markdown语法笔记</font></center>

# 一、 常见语法操作
1. 标题
   
    # 一级标题

    `# 一级标题`

    ## 二级标题

    `## 二级标题`

    ### 三级标题

    `### 三级标题`

    #### 四级标题

    `#### 四级标题`

    ##### 五级标题

    `##### 五级标题`

    ###### 六级标题

    `###### 六级标题`

2. 引用
   
    >引用

    `>引用`

3. 无序列表:
   
   - 你好1
   `- 你好1`
   + 你好2
   `+ 你好2`
   * 你好3
   `* 你好3`

4. 有序列表:
   
   1. 你好
      1. 嵌套列表
         1. 嵌套列表
   2. 你好
   3. 你好

    ```
    4. 你好
    5. 嵌套列表
        1. 嵌套列表
    6. 你好
    7. 你好
    ```

5. to do list:
   
   - [x] 你好
   `- [x] 你好`
   - [ ] 你好
   `- [ ] 你好`

6. 表格:

    | 列1 | 列2 | 列3 |
    | :--- | :---: | ---: |
    | 左对齐 | 居中 | 右对齐 |
    | 1 | 2 | 3 |
    | 4 | 5 | 6 |
    | 7 | 8 | 9 |

    ```
    | 列1 | 列2 | 列3 |
    | :- | :-: | -: |
    | 左对齐 |居中|右对齐
    | 1 | 2 | 3 |
    | 4 | 5 | 6 |
    | 7 | 8 | 9 |
    ```
    
7. 分割线:
   
    ***

    `***`

8. 字体:

    |字体|代码|
    |:---|:---|
    |*斜体*|`* *`|
    |==高亮==|`== ==`|
    |**粗体**|`** **`|
    |***斜粗体***|`*** ***`|
    |~~删除~~|`~~ ~~`|
    |<u>下划线</u>|`<u> </u>`|

9.  脚注:
    
    请一键三连[^1]呀

    [^1]:点赞、投币、收藏

    ```
    请一键三连[^1]呀

    [^1]:点赞、投币、收藏
    ```

10. 代码:
    
    ```c
    #include "stdio.h"

    int main(){
            print("Hello World!");
    }  
    ```

    单句代码:

    `print("Hello World!");`


11. 超链接:
    [百度](www.baidu.com)

    `[百度](www.baidu.com)`

# 二、 其他操作

>下述操作在VScode可以正常显示，但好像与浏览器不兼容。

1. 插入latex公式:
   
    |公式|代码|
    |:-:|:-:|
    | $f(x) = ax + b$ |`$ $`|


    $$
    \begin{Bmatrix}
        a&b\\
        c&d
    \end{Bmatrix}
    $$


    ```
    $$
    \begin{Bmatrix}
        a&b\\
        c&d
    \end{Bmatrix}
    $$
    ```

2. 可以使用html:
   
    <center><font face="仿宋" color=orange>这是仿宋字体</font></center>

    `<center><font face="仿宋" color=orange>这是仿宋字体</font></center>`


## 标题 2

### 标题 3

#### 标题 4

##### 标题 5

###### 标题 6

加粗：**加粗文字**

斜体： _斜体文字_

~~删除文字~~

内容 ==标记==

数学表达式： $-(2^{n-1})$ ~ $2^{n-1} -1$

$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}$

19^th^

H~2~O

::: center
内容居中
:::

::: right
内容右对齐
:::

- 无序列表1
- 无序列表2
- 无序列表3

1. 有序列表1
2. 有序列表2
3. 有序列表3

- [ ] 任务列表1
- [ ] 任务列表2
- [x] 任务列表3
- [x] 任务列表4

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

> 引用内容
>
> 引用内容

[链接](/)

[外部链接](https://github.com/pengzhanbo)

**Badge：**

- <Badge type="info" text="info badge" />
- <Badge type="tip" text="tip badge" />
- <Badge type="warning" text="warning badge" />
- <Badge type="danger" text="danger badge" />

**图标：**

- home - <Icon name="material-symbols:home" color="currentColor" size="1em" />
- vscode - <Icon name="skill-icons:vscode-dark" size="2em" />
- twitter - <Icon name="skill-icons:twitter" size="2em" />

**demo wrapper：**

::: demo-wrapper title="示例" no-padding height="200px"
<style scoped>
.open-door {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.open-door .main {
  background: #ccc;
}
</style>

<div class="open-door">
  <div class="main">main</div>
  <div class="aside">aside</div>
</div>

:::

**代码：**

```js whitespace
const a = 1
const b = 2
const c = a + b

// [!code word:obj]
const obj = {
  toLong: {
    deep: {
      deep: {
        deep: {
          value: 'this is to long text. this is to long text. this is to long text. this is to long text.', // [!code highlight]
        }
      }
    }
  }
}
```

**代码分组：**

::: code-tabs
@tab tab1

```js
const a = 1
const b = 2
const c = a + b
```

@tab tab2

```ts
const a: number = 1
const b: number = 2
const c: number = a + b
```

:::

**代码块高亮：**

```ts
function foo() {
  const a = 1 // [!code highlight]

  console.log(a)

  const b = 2 // [!code ++]
  const c = 3 // [!code --]

  console.log(a + b + c) // [!code error]
  console.log(a + b) // [!code warning]
}
```

**代码块聚焦：**

```ts
function foo() {
  const a = 1 // [!code focus]
}
```

::: note 注释
注释内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: info 信息
信息内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: tip 提示
提示内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: warning 警告
警告内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: caution 错误
错误内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: important 重要
重要内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

**GFM alert：**

> [!note]
> note

> [!info]
> info

> [!tip]
> tip

> [!warning]
> warning

> [!caution]
> caution

> [!important]
> important

**代码演示：**

::: normal-demo Demo 演示

```html
<h1>Hello Word!</h1>
<p><span id="very">非常</span>强大!</p>
```

```js
document.querySelector('#very').addEventListener('click', () => {
  alert('非常强大')
})
```

```css
span {
  color: red;
}
```

:::

**选项卡：**

::: tabs
@tab 标题1
内容区块

@tab 标题2
内容区块
:::

:::: warning
::: tabs
@tab 标题1
内容区块

@tab 标题2
内容区块
:::
::::

**脚注：**

脚注 1 链接[^first]。

脚注 2 链接[^second]。

行内的脚注^[行内脚注文本] 定义。

重复的页脚定义[^second]。

[^first]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^second]: 脚注文字。
