import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'cs61a',
  link: '/cs61a/',
  sidebar: [
    'README.md',
    {
      text: '课程笔记',
      items: [
        '2024-10-29-lab00.md',
        '2024-11-01-doctest.md',
        '2024-11-04-control.md',
        '2024-11-12-recursion.md',
      ]
    },
    {
      text: 'Lab',
      items: [
        'lab05.md',
      ]
    },
    {
      text: 'Homework',
      items: [
        'hw05.md',
      ]
    },
  ]
})