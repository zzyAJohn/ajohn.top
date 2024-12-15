import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'cs61b',
  link: '/cs61b/',
  sidebar: [
    'README.md',
    {
      text: '课程笔记',
      items: [
        '1.Intro, Hello World Java.md',
        '2.Defining and Using Classes.md',
      ]
    },
    {
      text: 'Lab',
      items: [
        'lab1.md',
      ]
    },
    {
      text: 'Project',
      items: [
        '2048.md',
      ]
    },
  ]
})