import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'plant',
  link: '/plant/',
  sidebar: [
    'README.md',
    {
      text: '在种',
      prefix: 'planting', 
      items: [
        'turnip.md',
      ]
    },
  ]
})