import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'qt',
  title: 'qt笔记',
  sidebar: [
    'README.md',
    {
      text: '第一部分',
      prefix: 'base',
      items: [
        '1.md',
      ]
    },
  ]
})



  