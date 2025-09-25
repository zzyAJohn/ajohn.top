import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home-rounded' },
  { text: '博客', link: '/blog/', icon: 'material-symbols:article-rounded' },
  { text: '标签', link: '/blog/tags/', icon: 'material-symbols:label-rounded' },
  { text: '归档', link: '/blog/archives/', icon: 'material-symbols:folder-rounded' },
  { text: '友链', link: '/friends/', icon: 'material-symbols:linked-services' },
  { text: '工具', link: '/tools/', icon: 'material-symbols:build-rounded' },
  { text: '作品', link: '/notes/works/README.md', icon: 'material-symbols:photo-camera-rounded' },
  { text: '关于', link: '/about/', icon: 'material-symbols:emoji-people-rounded' },
  {
    text: '笔记',
    items: [
            // { text: '示例', link: '/notes/demo/README.md' },
            { text: 'LeetCode', link: '/notes/leetcode/README.md' },
            { text: 'CS61A', link: '/notes/cs61a/README.md' },
            { text: 'C++', link: '/notes/cpp/README.md' },
            // { text: 'CS61B', link: '/notes/cs61b/README.md' },
            { text: 'Photography', link: '/notes/photography/README.md' },
    ]
  },
  {
    text: '日常',
    items: [
            // { text: '示例', link: '/notes/demo/README.md' },
            { text: 'Read', link: '/notes/read/README.md', icon: 'material-symbols:menu-book-rounded' },
            { text: 'Record', link: '/notes/record/README.md', icon: 'material-symbols:ink-pen-rounded' },
            { text: 'Music', link: '/notes/music/README.md', icon: 'material-symbols:music-note-rounded' },
            { text: 'TV', link: '/notes/tv/README.md', icon: 'material-symbols:live-tv-rounded' },
            // { text: 'Plant', link: '/notes/plant/README.md' },
    ]
  },
])
