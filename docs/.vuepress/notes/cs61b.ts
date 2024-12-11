import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'cs61b',
  link: '/cs61b/',
  sidebar: [
    'README.md',
    // {
    //   text: '课程笔记',
    //   items: [

    //   ]
    // },
    {
      text: 'Lab',
      items: [
        'lab1.md',
      ]
    },
    // {
    //   text: 'Homework',
    //   items: [
    //   ]
    // },
  ]
})