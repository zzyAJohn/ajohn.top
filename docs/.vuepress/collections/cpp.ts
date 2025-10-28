import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'cpp',
  title: 'cpp 笔记',
  sidebar: [
    'README.md',
    {
      text: '一、C++基础语法',
      prefix: 'base', 
      items: [
        '1-初识C++.md',
        '2-数据类型.md',
        '3-运算符.md',
        '4-程序流程结构.md',
        '5-数组.md',
        '6-函数.md',
        '7-指针.md',
        '8-结构体.md',
      ]
    },
    {
      text: '二、C++核心编程',
      prefix: 'core', 
      items: [
        '1-内存分区模型.md',
        '2-引用.md',
        '3-函数提高.md',
        '4-类和对象.md',
        '5-文件操作.md',
      ]
    },
    {
      text: '三、C++提高编程',
      prefix: 'improve', 
      items: [
        '1-模板.md',
        '2-STL初识.md',
        '3-STL常用容器.md',
        '4-STL函数对象.md',
        '5-STL常用算法.md',
      ]
    },
    {
      text: '四、C++面向对象高级开发',
      prefix: 'senior', 
      items: [
        'oop1.md',
        'oop2.md',
      ]
    },
    {
      text: '五、STL标准库和泛型编程',
      prefix: 'STL', 
      items: [
        'stl.md',
      ]
    },
  ]
})
