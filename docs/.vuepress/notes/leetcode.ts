import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'leetcode',
  link: '/leetcode/',
  sidebar: [
    'README.md',
    {
      text: '题单',
      items: [
        '2024-10-26-1.md',
      ]
    },
  ]
})