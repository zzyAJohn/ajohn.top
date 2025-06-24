import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'tv',
  link: '/tv/',
  sidebar: [
    'README.md',
    {
      text: '美剧',
      prefix: 'American TV Series', 
      items: [
        'Friends.md',
      ]
    },
    // {
    //   text: '电影',
    //   // prefix: 'literature', 
    //   items: [
    //     'weicheng.md',
    //   ]
    // },
  ]
})