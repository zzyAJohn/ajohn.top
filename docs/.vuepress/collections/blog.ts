import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
    type: 'post', // 替代原博客功能
    dir: 'blog', // 指向 docs/blog 目录
    title: '博客', // 集合显示名称
    // 原博客配置继续保留
    // 配置 封面图 布局位置
    // postCover: 'left', // 'left' | 'right' | 'odd-left' | 'odd-right' | 'top'
    postCover: {
        layout: 'left',
        ratio: '16:9',
        width: 300,
        compact: true
    },
})


  