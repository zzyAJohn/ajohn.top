import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://theme-plume.vuejs.press/plume.png',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: 'https://github.com/zzyAJohn.png',
    name: 'AJohn',
    description: 'Never, ever, ever give up',
    // circle: true,
    // location: '',
    // organization: '',
  },

  // 注释 navbar 保存后 取消注释 再保存 可以更新笔记下拉栏状态
  navbar,
  // 注释 notes 保存后 取消注释 再保存 可以更新笔记内侧边栏状态
  notes,

  social: [
    { icon: 'github', link: 'https://github.com/zzyAJohn' },
  ],

})
