import { defineNotesConfig } from 'vuepress-theme-plume'
import leetcode from './leetcode'
import cs61a from './cs61a'
import cs61b from './cs61b'
import photography from './photography'
import read from './read'

export default defineNotesConfig({
  // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
  dir: '/notes/',
  link: '/',
  // 在这里添加 note 配置
  notes: [ 
    leetcode,
    cs61a,
    cs61b,
    photography,
    read,
  ]
})