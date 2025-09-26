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
        'ps.md',
        'nikon-cloud.md',
        'time-lapse photography.md',
        'composition.md',
      ]
    },
    {
      text: '灯光教学',
      prefix: 'lamp', 
      items: [
        'lamp1.md',
        'lamp2.md',
        'lamp3.md',
        'lamp4.md',
        'lamp5.md',
        'lamp6.md',
        'lamp7.md',
        'lamp8.md',
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