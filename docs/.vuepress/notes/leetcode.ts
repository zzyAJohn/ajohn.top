import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'leetcode',
  link: '/leetcode/',
  sidebar: [
    'README.md',
    {
      text: '一、滑动窗口与双指针',
      prefix: '1.sliding-window', 
      items: [
        '1.fixed-length-sliding-window.md',
        '2.variable-length-sliding-window.md',
        '3.single-sequence-double-pointer.md',
        '4.double-sequence-double-pointer.md',
        '5.three-pointers.md',
      ]
    },
    {
      text: '二、二分算法',
      prefix: '2.binary-algorithm', 
      items: [
        '1.binary-search.md',
        '2.binary-answer.md',
        '3.binary-indirect-value.md',
        '4.minimize-the-maximum-value.md',
      ]
    },
    {
      text: '三、单调栈',
      prefix: '3.monotonic-stack', 
      items: [
        '1.monotonic-stack',
        '2.rectangular-area',
      ]
    },
    {
      text: '四、网格图',
      prefix: '4.grid-chart', 
      items: [
        '1.DFS',
        '2.BFS',
      ]
    },
    {
      text: '八、常用数据结构',
      prefix: '8.common-data-structures', 
      items: [
        '0.common-enumeration-techniques.md',
        '1.prefix-sum.md',
      ]
    },
    {
      text: '十、贪心与思维',
      prefix: '10.greedy', 
      items: [
        '1.greedy-algorithm.md',
      ]
    },
  ]
})