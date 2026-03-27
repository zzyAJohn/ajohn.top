import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'projects',
  title: '项目',
  sidebar: [
    'README.md',
    {
      text: '深度学习项目',
      prefix: 'deep-learning',
      items: [
        'care.md',
      ]
    },
    {
      text: 'muduo项目',
      prefix: 'muduo',
      items: [
        'muduo.md',
        'Channel.md',
      ]
    },
    // {
    //   text: '高性能服务器项目',
    //   prefix: 'webserver',
    //   items: [
    //     'webserver.md',
    //   ]
    // },
  ]
})


  