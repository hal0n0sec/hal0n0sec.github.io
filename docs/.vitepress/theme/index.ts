// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
// 不蒜子
import { inBrowser, useData, useRoute } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import view from './components/view.vue'

import type { Theme } from "vitepress"
import './custom.css'
import HomeUnderline from "./components/HomeUnderline.vue"
import DataPanel from "./components/DataPanel.vue"
import confetti from "./components/confetti.vue"
import update from './components/update.vue'
import ArticleMetadata from './components/ArticleMetadata.vue'

// 评论相关的
import giscusTalk from 'vitepress-plugin-comment-with-giscus'

// @ts-ignore
// import comment from "../components/gitalk.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(view),   // 不蒜子layout-bottom插槽
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('HomeUnderline', HomeUnderline)
    app.component('DataPanel', DataPanel)
    // 注册：五彩纸屑
    app.component('confetti' , confetti)
    // 注册：标题下面添加时间
    app.component('update', update)
    // 注册：字数及阅读时间
    app.component('ArticleMetadata', ArticleMetadata)

    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
  setup() {
    const {frontmatter} = useData();
    const route = useRoute();

    giscusTalk({
      repo: 'hal0n0sec/hal0n0sec.github.io',// 仓库
      repoId: 'R_kgDOMrUP9w',
      category: 'Announcements', // 讨论分类
      categoryId: 'DIC_kwDOMrUP984CiJpq', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
    },
    {
      frontmatter, route
    },
    true
    );
  },

  
} satisfies Theme