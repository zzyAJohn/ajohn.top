import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'cpp',
  link: '/cpp/',
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
        '1-C++编程简介.md',
        '2-头文件与类的声明.md',
        '3-构造函数.md',
        '4-参数传递与返回值.md',
        '5-操作符重载与临时对象.md',
        '6-复习Complex类的实现过程.md',
        '7-三大函数：拷贝构造，拷贝赋值，析构.md',
        '8-堆，栈与内存管理.md',
        '9-复习String类的实现过程.md',
        '10-扩展补充：类模板，函数模板，及其他.md',
      ]
    },
  ]
})