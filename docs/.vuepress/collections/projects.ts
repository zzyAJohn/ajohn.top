import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'projects',
  title: '项目',
  sidebar: [
    'README.md',
    {
      text: '博客',
      prefix: 'blog',
      items: [
        'blog.md',
      ]
    },
  ]
})


  