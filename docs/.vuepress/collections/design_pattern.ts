import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'design_pattern',
  title: '设计模式笔记',
  sidebar: [
    'README.md',
    {
      text: '设计模式',
      // prefix: 'design_pattern', 
      items: [
        '0.PlantUML.md',
        '1.Factory.md',
        '2.Strategy.md',
        '3.SRP.md',
        '4.Open-Closed.md',
      ]
    },
  ]
})
