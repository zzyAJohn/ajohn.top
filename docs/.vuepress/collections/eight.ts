import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'eight',
  title: '八股文笔记',
  sidebar: [
    'README.md',
    {
      text: 'C++',
      prefix: 'cpp',
      items: [
        '1.preface.md',
        '2.base.md',
        '3.oop.md',
        '4.stl.md',
        '5.memory.md',
        '6.cpp11.md',
        '7.smart-pointer.md',
        '8.io.md',
      ]
    },
    {
      text: '操作系统',
      prefix: 'os',
      items: [
        // '1.preface.md',
        // '2.hardware.md',
        // '3.os-structure.md',
        // '4.memory.md',
        '9.network-system.md',
      ]
    },
    {
      text: '计算机网络',
      prefix: 'network',
      items: [
        '1.preface.md',
        '2.base.md',
        '3.http.md',
        '4.tcp.md',
        // '5.ip.md',
        // '6.all.md',
      ]
    },
    {
      text: '大模型',
      prefix: 'LLM',
      items: [
        '1.agent.md',
      ]
    },
  ]
})



  