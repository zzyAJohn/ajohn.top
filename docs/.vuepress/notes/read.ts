import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'read',
  link: '/read/',
  sidebar: [
    'README.md',
    {
      text: '在读',
      items: [
        'weicheng.md',
        'How to Win Friends & Influence People.md',
      ]
    },
  ]
})