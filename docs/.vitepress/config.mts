import { createContentLoader, defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons';
// import{ Feed } from 'feed'

// https://vitepress.dev/reference/site-config
// @ts-ignore
// @ts-ignore
export default defineConfig({
  title: "takuya's blog",
  description: "Welcome to takuya's blog",
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    config: (md) => {
      md.use(groupIconMdPlugin)
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      }
    },
    image: {
      lazyLoading: true
    },
    lineNumbers: true,
  },
// 关于代码图标的相关引入
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          bash: localIconLoader(import.meta.url, '../public/bash.svg'),
          python: localIconLoader(import.meta.url, '../public/python.svg'),
          powershell: localIconLoader(import.meta.url, '../public/powershell.svg'),
        },
      })
    ],
  },

  head: [
    ["link", {rel: "icon", href: "/logo.ico"}],
  ],
  // 主题设置
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/aboutme' }
    ],
    // 返回顶部文字修改
    returnToTopLabel: '返回顶部',
    
    // 文章左侧导航栏
    sidebar: [
      { text: 'AboutMe', link: '/aboutme'},
      {
        text: '📦 技术本无罪',
        collapsed: false,
        items: [
          {text: '「远控」BRC4安装与简单上线',link: '/blog/knowledge/「远控」BRC4安装与简单上线'},
          {text: '「中间件」 Nginx安装与基本配置',link: '/blog/knowledge/「中间件」 Nginx安装与基本配置'},
          {text: '「Docker」笔记【1】', link: '/blog/knowledge/「Docker」笔记【1】'},
          {text: '「Docker」笔记【2】', link: '/blog/knowledge/「Docker」笔记【2】'},
          {text: '「Java安全」JavaWeb环境搭建与连接数据库', link: '/blog/knowledge/「Java安全」JavaWeb环境搭建与连接数据库'},
          {text: '「Java安全」Shiro反序列化漏洞笔记（一）', link: '/blog/knowledge/「Java安全」Shiro反序列化漏洞笔记（一）'},
          {text: '「操作系统」AIX系统基线核查', link: '/blog/knowledge/「操作系统」AIX系统基线核查'},
          {text: '「Script」livp转png脚本', link: '/blog/knowledge/「Script」livp转png脚本'}
          
        ]
      },
      { text: '🔍 利器本有道',
        collapsed: false,
        items: [
          {text: '「终端shell」Oh My Zsh终端美化', link: '/blog/software/「终端shell」Oh My Zsh终端美化'},
        ]
      },
      { text: '🌈 生活本无味',
        collapsed: false,
        items: [
          {text: '「感悟」 🍵 你我皆凡人', link:'/blog/diary/「感悟」 🍵 你我皆凡人'},
          {text: '「感悟」🍩 人生怎样才有福报', link: '/blog/diary/「感悟」🍩 人生怎样才有福报'}
          {text: '「旅行」🏖️ Sanya Day1', link:'/blog/diary/「旅行」🏖️ Sanya Day1'},
          {text: '「旅行」🏖️ Sanya Day2', link:'/blog/diary/「旅行」🏖️ Sanya Day2'},
          {text: '「旅行」💨 Sanya Day3&4', link:'/blog/diary/「旅行」💨 Sanya Day3&4'},
          {text: '「旅行」👋Sanya Day5', link:'/blog/diary/「旅行」👋Sanya Day5'},
          
        ]
      },
      
    ],

    // 文章地步导航栏的自定义配置，默认是英语
    docFooter: {
          prev: '上一篇',
          next: '下一篇',
    },
    // 文章右侧目录展示级别和标题
    outline: {
      level: [2,6],
      label: '文章目录'
    },

    // 文章更新时间的前缀文本
    lastUpdatedText: '最后更新时间',
    //开启本地搜索（左上角）
    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hal0n0sec' }
    ],
    // 页脚
    footer: {
      copyright: 'Copyright © 2023-present takuya',
    }
  },

  // 构建完成后处理逻辑
  async buildEnd(siteConfig) {
    const hostname = 'https://blog.takuyasec.cn'
    // 初始化feed
    // const feed = new Feed({
    //   id: hostname,
    //   title: siteConfig.site.description,
    //   language: siteConfig.site.lang,
    //   favicon: hostname + "/logo.ico",
    //   // 处理更新时间
    //   updated: new Date(),
    //   link: hostname,
    //   copyright: siteConfig.site.themeConfig.footer.copyright,
    //   author: {
    //     name: "takuya",
    //     email: "takuyasec@163.com",
    //     link: hostname
    //   }
    // })

    // 过滤出所有的markdown
    const posts = await createContentLoader('./blog/*.md', {
      excerpt: true,
      render: true,
    }).load()

    // 按照时间排序
    posts.sort(
      (a,b) =>
        +new Date(b.frontmatter.Date as string) -
        +new Date(a.frontmatter.Date as string),
    )

    // 处理图片和内容
    

  },
})
