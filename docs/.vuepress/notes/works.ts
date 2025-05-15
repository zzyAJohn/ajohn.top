import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'works',
  link: '/works/',
  sidebar: [
    'README.md',
    {
      text: '2025-05',
      prefix: '2025-05', 
      items: [
        '2025-05-15.md',
        '2025-05-04.md',
        '2025-05-03.md',
        '2025-05-02.md',
        '2025-05-01.md',
      ]
    },
    {
      text: '2025-04',
      prefix: '2025-04', 
      items: [
        '2025-04-26.md',
        '2025-04-25.md',
        '2025-04-23.md',
        '2025-04-19.md',
        '2025-04-13.md',
        '2025-04-05.md',
        '2025-04-04.md',
        '2025-04-03.md',
      ]
    },
    {
      text: '2025-03',
      prefix: '2025-03', 
      items: [
        '2025-03-25.md',
        '2025-03-22.md',
        '2025-03-21.md',
        '2025-03-16.md',
        '2025-03-15.md',
        '2025-03-09.md',
        '2025-03-08.md',
        '2025-03-07.md',
      ]
    },
    {
      text: '2025-02',
      prefix: '2025-02', 
      items: [
        '2025-02-08.md',
        '2025-02-07.md',
      ]
    },
    {
      text: '2025-01',
      prefix: '2025-01', 
      items: [
        '2025-01-19.md',
        '2025-01-16.md',
        '2025-01-10.md',
      ]
    },
  ]
})