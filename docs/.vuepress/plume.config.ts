import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import notes from './notes/index'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://oss.ajohn.top/blog/friends/ajohn.webp',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: 'https://oss.ajohn.top/blog/friends/ajohn.webp',
    name: 'AJohn',
    description: 'Never, ever, ever give up',
    circle: true,
    // location: '',
    location: "WuHan, China",
    // organization: '',
    organization: 'vai-lab',
  },

  // 注释 navbar 保存后 取消注释 再保存 可以更新笔记下拉栏状态
  navbar,
  // 注释 notes 保存后 取消注释 再保存 可以更新笔记内侧边栏状态
  notes,

  social: [
    { icon: 'github', link: 'https://github.com/zzyAJohn' },
    { icon: 'bilibili', link: 'https://space.bilibili.com/453246746' },
    { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"/></svg>' }, link: 'https://leetcode.cn/u/a-jiong-11/' },
    { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"/></svg>' }, link: 'mailto:zhiyong947@gmail.com' },
  ],

})
