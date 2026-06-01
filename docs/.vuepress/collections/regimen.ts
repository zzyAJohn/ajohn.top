import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'regimen',
  title: '救赎之道，就在其中',
  sidebar: [
    'README.md',
    {
      text: '开始',
      items: [
        'skin.md',
      ]
    },
  ]
})



  