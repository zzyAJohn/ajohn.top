import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'read',
  link: '/read/',
  sidebar: [
    'README.md',
    {
      text: 'CS',
      prefix: 'cs', 
      items: [
        'How is the network connected.md',
        'C++ Primer.md',
        'Effective C++.md',
      ]
    },
    {
      text: '文学',
      prefix: 'literature', 
      items: [
        // 'weicheng.md',
        'The Great Gatsby.md',
      ]
    },
    {
      text: '心理学',
      prefix: 'psychology', 
      items: [
        'How to Win Friends & Influence People.md',
        'Cognitive Awakening.md',
      ]
    },
    {
      text: '科幻/科普',
      prefix: 'sci-fi', 
      items: [
        'Ball Lightning.md',
        'Supporting humanity.md',
        'Does God roll dice.md',
      ]
    },
    {
      text: '摄影',
      prefix: 'photography', 
      items: [
        'Take stunning photos.md',
      ]
    },
  ]
})