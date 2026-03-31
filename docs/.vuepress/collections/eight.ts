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
        'cpp.md',
      ]
    },
    // {
    //   text: '操作系统',
    //   prefix: 'os',
    //   items: [
    //     '1.preface.md',
    //     '2.hardware.md',
    //     '3.os-structure.md',
    //     '4.memory.md',
    //   ]
    // },
    {
      text: '计算机网络',
      prefix: 'network',
      items: [
        '1.preface.md',
        '2.base.md',
        // '3.http.md',
        // '4.tcp.md',
        // '5.ip.md',
        // '6.all.md',
      ]
    },
  ]
})



  