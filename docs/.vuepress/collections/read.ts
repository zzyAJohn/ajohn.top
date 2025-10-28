import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'read',
  title: '阅读笔记',
  sidebar: [
    'README.md',
    {
      text: 'CS',
      prefix: 'cs', 
      items: [
        'How Networks Are Connected.md',
        'C++ Primer.md',
        'Effective C++.md',
        'Effective STL.md',
      ]
    },
    {
      text: '文学',
      prefix: 'literature', 
      items: [
        // 'weicheng.md',
        'The Great Gatsby.md',
        'Selected Works of Mao Tse-tung.md',
      ]
    },
    {
      text: '心理学',
      prefix: 'psychology', 
      items: [
        'How to Win Friends and Influence People.md',
        'Cognitive Awakening.md',
        'Intimate Relationships.md',
      ]
    },
    {
      text: '科幻/科普',
      prefix: 'sci-fi', 
      items: [
        'Ball Lightning.md',
        'For the Benefit of Mankind.md',
        'Does God Play Dice.md',
      ]
    },
    {
      text: '摄影',
      prefix: 'photography', 
      items: [
        'Picture Perfect Posing.md',
      ]
    },
  ]
})
