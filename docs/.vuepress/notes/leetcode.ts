import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'leetcode',
  link: '/leetcode/',
  sidebar: [
    'README.md',
    {
      text: '题单',
      items: [
        '1.sliding-window.md',
        '2.binary-algorithm.md',
        '3.monotonic-stack.md',
        '8.common-data-structures.md',
      ]
    },
  ]
})