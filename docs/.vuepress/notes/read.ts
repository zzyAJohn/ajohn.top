import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'read',
  link: '/read/',
  sidebar: [
    'README.md',
    {
      text: '文学',
      prefix: 'literature', 
      items: [
        'weicheng.md',
      ]
    },
    {
      text: '心理学',
      prefix: 'psychology', 
      items: [
        'How to Win Friends & Influence People.md',
      ]
    },
  ]
})