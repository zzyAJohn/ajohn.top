import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'cs61a',
  link: '/cs61a/',
  sidebar: [
    'README.md',
    {
      text: '课程笔记',
      prefix: 'course', 
      items: [
        'doctest.md',
        'control.md',
        'recursion.md',
      ]
    },
    {
      text: 'Lab',
      prefix: 'lab', 
      items: [
        'lab00.md',
        'lab05.md',
        'lab06.md',
      ]
    },
    {
      text: 'Homework',
      prefix: 'homework', 
      items: [
        'hw05.md',
        'hw06.md',
      ]
    },
    {
      text: 'Project',
      prefix: 'project', 
      items: [
        'ants.md',
      ]
    },
  ]
})