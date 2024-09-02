// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from "vitepress"
import './custom.css'
import HomeUnderline from "./components/HomeUnderline.vue"
import DataPanel from "./components/DataPanel.vue"
import confetti from "./components/confetti.vue"

// @ts-ignore
// import comment from "../components/gitalk.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('HomeUnderline', HomeUnderline)
    app.component('DataPanel', DataPanel)
    app.component('confetti' , confetti)
  }
} satisfies Theme
