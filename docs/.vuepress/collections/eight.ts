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
    {
      text: '计算机网络',
      prefix: 'network',
      items: [
        'network.md',
      ]
    },
  ]
})



  