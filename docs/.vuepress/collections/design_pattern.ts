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
        '3.Simple Responsibility.md',
        '4.Open-Closed.md',
        '5.Dependence Inversion.md',
        '6.Decorator.md',
        '7.Proxy.md',
        '8.Factory Method.md',
        '9.Prototype.md',
        '10.Template Method.md',
        '11.LoD.md',
        '12.Facade.md',
        '13.Bulider.md',
        '14.Observer.md',
        '15.Abstract Factory.md',
        '16.State.md',
      ]
    },
  ]
})
