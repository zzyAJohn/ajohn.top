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
        'lab01.md',
        'lab02.md',
        'lab03.md',
        'lab04.md',
        'lab05.md',
        'lab06.md',
        'lab07.md',
        'lab08.md',
      ]
    },
    {
      text: 'Homework',
      prefix: 'homework', 
      items: [
        'hw01.md',
        'hw02.md',
        'hw03.md',
        'hw04.md',
        'hw05.md',
        'hw06.md',
      ]
    },
    {
      text: 'Project',
      prefix: 'project', 
      items: [
        'hog.md',
        'cats.md',
        'ants.md',
      ]
    },
  ]
})