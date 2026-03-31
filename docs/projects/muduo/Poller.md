---
title: Poller
createTime: 2026/03/31 20:23:53
permalink: /projects/ejv9fh7b/
---

## Poller 简介

Poller 类可以理解为 **IO 多路复用器的抽象层**，它是 muduo 中负责“盯着哪些 fd 发生了什么事件”的核心模块。

在 Reactor 模型里，`EventLoop` 负责调度，`Channel` 负责封装某个文件描述符及其感兴趣事件，而 `Poller` 则负责把这些 `Channel` 注册到具体的 IO 复用机制上（例如 `epoll`），并在事件发生后把“有事件的 Channel”收集出来交给 `EventLoop` 处理。

换句话说：

- **Channel**：我关心什么事件，以及事件发生后该做什么。
- **Poller**：帮我把这些事件挂到内核上，并等待事件发生。
- **EventLoop**：拿到事件后，驱动对应的 Channel 执行回调。

负责监听文件描述符事件是否触发以及返回发生事件的文件描述符以及具体事件的模块就是 Poller。所以一个 Poller 对象对应一个事件监听器(这里我不确定要不要把 Poller 就当作事件监听器)。在 multi-reactor 模型中，有多少 reactor 就有多少 Poller。

muduo提供了 epoll 和 poll 两种 IO 多路复用方法来实现事件监听。不过默认是使用 epoll 来实现，也可以通过选项选择 poll。但是这个项目重构的 muduo 库只支持 epoll。

这个 Poller 是个抽象虚类，由 EpolIPoller 和 PolIPoller 继承实现，与监听文件描述符和返回监听结果的具体方法也基本上是在这两个派生类中实现。EpolIPoller 就是封装了用epoll方法实现的与事件监听有关的各种方法，PolIPoller 就是封装了 poll 方法实现的与事件监听有关的各种方法。本文后面谈到的 Poller 说的其实都是 EpollPoller。

## Poller 和 Channel 的关系

Channel 和 Poller 的关系可以概括成一句话：

Channel 负责“描述事件”，Poller 负责“监听事件”。

更具体一点：

Channel 维护：
- fd
- 感兴趣的事件 events_
- 实际发生的事件 revents_
- 各种回调函数

Poller 维护：
- 所有已注册的 Channel
- 将 Channel 注册到内核事件监听机制
- 等待事件发生
- 把活跃的 Channel 找出来




## Poller 类重要的成员变量

### 1. 重要成员

- `EventLoop *ownerLoop_`：表示这个 `Poller` 属于哪个 `EventLoop`。  
  一个 `Poller` 只服务于一个事件循环，用来保证线程模型和对象归属关系清晰。

- `ChannelMap channels_`：保存当前 `Poller` 已经管理的所有 `Channel`。  
  其中：
  - `key` 是文件描述符 `fd`
  - `value` 是对应的 `Channel *`

  这个映射表的作用非常重要：当 `epoll_wait()` 返回某个 `fd` 发生事件后，`Poller` 可以通过 `channels_` 快速找到这个 `fd` 对应的 `Channel`，再把事件信息填进去。

::: code-tabs
@tab Poller.h
```C++
// map的key:sockfd value:sockfd所属的channel通道类型
using ChannelMap = std::unordered_map<int, Channel *>;
ChannelMap channels_;
:::

### 2. ChannelList
::: code-tabs
@tab Poller.h
```C++
using ChannelList = std::vector<Channel *>;
```
:::

ChannelList 表示“当前发生了事件的 Channel 列表”。

`Poller::poll()` 的任务不是直接处理事件，而是把这些活跃的 Channel 收集起来放进 activeChannels，交给 EventLoop 进一步处理。

## Poller 类重要的成员方法

### 1. 构造 / 析构

::: code-tabs
@tab Poller.h
```C++
Poller(EventLoop *loop);
virtual ~Poller() = default;
```

@tab Poller.cpp
```C++
Poller::Poller(EventLoop *loop)
    : ownerLoop_(loop)
{
}
```
:::

构造函数把所属的 EventLoop 记录下来。

Poller 本身是一个抽象基类，所以析构函数设为虚函数，方便通过基类指针销毁派生类对象。

### 2. poll()

::: code-tabs
@tab Poller.h
```C++
virtual Timestamp poll(int timeoutMs, ChannelList *activeChannels) = 0;
```
:::

poll() 是 Poller 最核心的接口。

它的作用是：

1. 调用底层 IO 复用机制（例如 epoll_wait()）。
2. 阻塞等待，直到有事件发生或者超时。
3. 把发生了事件的 Channel 收集到 activeChannels 中。
4. 返回本次 poll 开始等待的时间或事件发生时间（具体取决于实现）。

这个接口的本质：

`poll()` 做的是 “等事件” + “找出哪些 Channel 活跃”，
它不负责执行回调，真正执行回调的是 `Channel::handleEvent()`。


### 3. updateChannel()
::: code-tabs
@tab Poller.h
```C++
virtual void updateChannel(Channel *channel) = 0;
```
:::

updateChannel() 用来把某个 Channel 的状态更新到 IO 复用器中。

当 Channel 调用：

- enableReading()
- enableWriting()
- disableReading()
- disableWriting()
- disableAll()

时，最终都会走到 `Channel::update()`，再交给 EventLoop 和 Poller 去处理。
`Poller::updateChannel()` 的工作就是把 Channel 的 events_ 同步到内核里。

通常它对应的底层操作是：

- 新增监听：EPOLL_CTL_ADD
- 修改监听：EPOLL_CTL_MOD


### 4. removeChannel()

::: code-tabs
@tab Poller.h
```C++
virtual void removeChannel(Channel *channel) = 0;
```
:::

removeChannel() 用来把某个 Channel 从 Poller 中移除。

这个接口一般在以下场景调用：

- 连接关闭
- fd 不再需要监听
- Channel 生命周期结束前主动注销

底层通常对应：

- epoll_ctl(EPOLL_CTL_DEL)

同时还会把该 fd 从 channels_ 中移除，避免后续再次查到这个无效 Channel。

### 5. hasChannel()

::: code-tabs
@tab Poller.h
```C++
bool hasChannel(Channel *channel) const;
```

@tab Poller.cpp
```C++
// bool Poller::hasChannel(Channel *channel) const
// {
//     auto it = channels_.find(channel->fd());
//     return it != channels_.end() && it->second == channel;
// }
```
:::

hasChannel() 用来判断某个 Channel 是否已经被当前 Poller 管理。

它通常会做两层判断：

1. 这个 fd 是否在 channels_ 里。
2. map 里保存的 Channel * 是否就是传进来的这个对象。

第二层判断非常重要，因为 fd 可能被复用。
比如一个旧连接关闭后，操作系统可能很快把相同的 fd 分配给一个新连接。
如果只看 fd，不看 Channel*，就可能把新旧对象搞混。

标准实现一般如下：
```C++
auto it = channels_.find(channel->fd());
return it != channels_.end() && it->second == channel;
```
### 6. newDefaultPoller()

::: code-tabs
@tab Poller.h
```C++
static Poller *newDefaultPoller(EventLoop *loop);
```
:::

这是一个工厂函数，用来创建默认的 IO 复用实现。

因为 Poller 只是抽象基类，真正干活的是它的具体派生类，比如：

- Linux 下通常是 EpollPoller
- 其他平台可能是 PollPoller 或 SelectPoller

EventLoop 通过这个接口可以不关心底层到底用的是哪种复用机制，只需要拿到一个 Poller* 就能统一使用。


## Poller 源码

::: code-tabs
@tab Poller.h
```C++
#pragma once

#include <vector>
#include <unordered_map>

#include "noncopyable.h"
#include "Timestamp.h"

class Channel;
class EventLoop;

// muduo库中多路事件分发器的核心IO复用模块
class Poller
{
public:
    using ChannelList = std::vector<Channel *>;

    Poller(EventLoop *loop);
    virtual ~Poller() = default;

    // 给所有IO复用保留统一的接口
    virtual Timestamp poll(int timeoutMs, ChannelList *activeChannels) = 0;
    virtual void updateChannel(Channel *channel) = 0;
    virtual void removeChannel(Channel *channel) = 0;

    // 判断参数channel是否在当前的Poller当中
    bool hasChannel(Channel *channel) const;

    // EventLoop可以通过该接口获取默认的IO复用的具体实现
    static Poller *newDefaultPoller(EventLoop *loop);

protected:
    // map的key:sockfd value:sockfd所属的channel通道类型
    using ChannelMap = std::unordered_map<int, Channel *>;
    ChannelMap channels_;

private:
    EventLoop *ownerLoop_; // 定义Poller所属的事件循环EventLoop
};
```

@tab Poller.cpp
```C++
#include "Poller.h"
#include "Channel.h"

Poller::Poller(EventLoop *loop)
    : ownerLoop_(loop)
{
}

// bool Poller::hasChannel(Channel *channel) const
// {
//     auto it = channels_.find(channel->fd());
//     return it != channels_.end() && it->second == channel;
// }
```
:::