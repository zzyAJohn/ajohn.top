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
      text: '文学小说',
      prefix: 'literature', 
      items: [
        // 'weicheng.md',
        'The Great Gatsby.md',
        'Ball Lightning.md',
        'For the Benefit of Mankind.md',
        'Selected Works of Mao Tse-tung.md',
        'Tunnel to Summer, Goodbye Exit.md',
      ]
    },
    {
      text: '人文社科',
      prefix: 'social-science', 
      items: [
        'How to Win Friends and Influence People.md',
        'Cognitive Awakening.md',
        'Intimate Relationships.md',
        'Why do we need to sleep',
      ]
    },
    {
      text: '科学与科普',
      prefix: 'sci', 
      items: [
        'Does God Play Dice.md',
        'Rich Dad Poor Dad.md',
      ]
    },
    {
      text: '艺术',
      prefix: 'art', 
      items: [
        'Picture Perfect Posing.md',
      ]
    },
  ]
})
