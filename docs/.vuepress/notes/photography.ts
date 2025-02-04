import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'photography',
  link: '/photography/',
  sidebar: [
    'README.md',
    {
      text: '摄影技巧',
      items: [
        'buy.md',
        'tittle-tattle.md',
      ]
    },
    {
      text: '插件安装',
      items: [
        'dr5.md',
      ]
    },
  ]
})