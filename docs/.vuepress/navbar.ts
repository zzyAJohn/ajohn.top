import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  { text: '友链', link: '/friends/' },
  { text: '工具', link: '/tools/' },
  { text: '作品', link: '/notes/works/README.md' },
  { text: '关于', link: '/about/' },
  {
    text: '笔记',
    items: [
            // { text: '示例', link: '/notes/demo/README.md' },
            { text: 'LeetCode', link: '/notes/leetcode/README.md' },
            { text: 'CS61A', link: '/notes/cs61a/README.md' },
            { text: 'C++', link: '/notes/cpp/README.md' },
            { text: 'CS61B', link: '/notes/cs61b/README.md' },
            { text: 'Photography', link: '/notes/photography/README.md' },
    ]
  },
  {
    text: '日常',
    items: [
            // { text: '示例', link: '/notes/demo/README.md' },
            { text: 'Read', link: '/notes/read/README.md' },
            { text: 'Record', link: '/notes/record/README.md' },
            { text: 'Music', link: '/notes/music/README.md' },
            { text: 'Plant', link: '/notes/plant/README.md' },
    ]
  },
])
