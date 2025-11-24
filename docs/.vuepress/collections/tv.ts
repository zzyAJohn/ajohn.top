import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'tv',
  title: 'tv 笔记',
  sidebar: [
    'README.md',
    {
      text: '美剧',
      prefix: 'American TV Series', 
      items: [
        'Friends.md',
      ]
    },
    {
      text: '国产剧',
      prefix: 'Chinese domestic TV series', 
      items: [
        'Ming Dynasty 1566.md',
      ]
    },
    {
      text: '电影',
      prefix: 'movie', 
      items: [
        'Interstellar.md',
        'the-shadows-edge.md',
        'Nobody.md',
        'Demon Slayer Blade Gao.md',
      ]
    },
    // {
    //   text: '电影',
    //   // prefix: 'literature', 
    //   items: [
    //     'weicheng.md',
    //   ]
    // },
  ]
})



  