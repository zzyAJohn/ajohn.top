import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'record',
  link: '/record/',
  sidebar: [
    'README.md',
    {
      text: '2025-07',
      prefix: '2025-07', 
      items: [
        '2025-07-21.md',
        '2025-07-14.md',
        '2025-07-07.md',
      ]
    },
    {
      text: '2025-06',
      prefix: '2025-06', 
      items: [
        '2025-06-30.md',
        '2025-06-23.md',
        '2025-06-16.md',
        '2025-06-09.md',
        '2025-06-02.md',
      ]
    },
    {
      text: '2025-05',
      prefix: '2025-05', 
      items: [
        '2025-05-26.md',
        '2025-05-19.md',
        '2025-05-12.md',
        '2025-05-05.md',
      ]
    },
    {
      text: '2025-04',
      prefix: '2025-04', 
      items: [
        '2025-04-28.md',
        '2025-04-21.md',
        '2025-04-14.md',
        '2025-04-07.md',
      ]
    },
    {
      text: '2025-03',
      prefix: '2025-03', 
      items: [
        '2025-03-31.md',
        '2025-03-24.md',
        '2025-03-17.md',
        '2025-03-10.md',
        '2025-03-03.md',
      ]
    },
    {
      text: '2025-02',
      prefix: '2025-02', 
      items: [
        '2025-02-24.md',
        '2025-02-17.md',
        '2025-02-10.md',
        '2025-02-03.md',
      ]
    },
  ]
})