import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'record',
  link: '/record/',
  sidebar: [
    'README.md',
    {
      text: '2025',
      prefix: '2025', 
      items: [
        '2025-02-24.md',
        '2025-02-17.md',
        '2025-02-10.md',
        '2025-02-03.md',
      ]
    },
  ]
})