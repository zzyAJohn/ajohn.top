import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'cpp',
  link: '/cpp/',
  sidebar: [
    'README.md',
    {
      text: 'C++基础',
      prefix: 'base', 
      items: [
        '1-初识C++.md',
        '2-数据类型.md',
        '3-运算符.md',
        '4-程序流程结构.md',
        '5-数组.md',
        '6-函数.md',
        '7-指针.md',
      ]
    },
  ]
})