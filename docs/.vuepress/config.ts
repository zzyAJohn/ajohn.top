import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import notes from './notes/index'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'AJohn Blog',
  description: '',
  head: [
    ['link', { rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/blog-favicon.png' }]
  ],
 
  bundler: viteBundler(),

  theme: plumeTheme({
    notes,
    // 添加您的部署域名
    hostname: 'https://ajohn.top',
    // footer: { message: "<a href='https://beian.miit.gov.cn/'>鄂ICP备2025095120号-1</a>   <a href='https://beian.mps.gov.cn/#/query/webSearch?code=42011102005705'>鄂公网安备42011102005705号</a>" , copyright: "Copyright © 2024-2025 AJohn"},
    // footer: { message: '<a href="https://beian.miit.gov.cn/ ">鄂ICP备2025095120号-1</a> <a href="https://beian.mps.gov.cn/#/query/webSearch?code=42011102005705" target="_blank" style="display: inline-flex; align-items: center;"><img src="https://oss.ajohn.top/blog/beian.png" style="height: 20px; margin-right: 5px;" />鄂公网安备42011102005705号</a>' , copyright: "Copyright © 2024-2025 AJohn"},
    footer: { 
      message: "<span style='display: inline-flex; align-items: center; gap: 10px;'><a href='https://beian.miit.gov.cn/'>鄂ICP备2025095120号-1</a> <a href='https://beian.mps.gov.cn/#/query/webSearch?code=42011102005705' target='_blank' style='display: inline-flex; align-items: center;'><img src='https://oss.ajohn.top/blog/beian.png' style='height: 20px; margin-right: 5px;' />鄂公网安备42011102005705号</a></span>", 
      copyright: "Copyright © 2024-2025 AJohn"
    },

    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
          //  强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        languages: ["bash","py","json","python","c","js","ts","html","css","java","shell"],
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },
  }),
})
