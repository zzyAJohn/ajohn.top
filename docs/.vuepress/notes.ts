import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

const leetcodeNote = defineNoteConfig({
  dir: 'leetcode',
  link: '/leetcode',
  sidebar: ['', '1'],
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote, leetcodeNote],
})
