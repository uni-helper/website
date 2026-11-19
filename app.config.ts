export default defineAppConfig({
  ui: {
    colors: {
      primary: 'zinc',
      neutral: 'zinc',
    },
  },
  site: {
    name: 'uni-helper',
    url: 'https://uni-helper.js.org',
    description: '旨在增强 uni-app 系列产品的开发流程',
    ogImage: 'https://uni-helper.js.org/og.png',
  },
  header: {
    title: 'uni-helper',
    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
    },
    nav: [
      { title: '项目', to: '/packages' },
      { title: '关系', to: '/relations' },
      { title: '博客', to: '/blog' },
      { title: '更新日志', to: '/changelog' },
      { title: '关于我们', to: '/about' },
    ],
    links: [
      { icon: 'lucide:github', to: 'https://github.com/uni-helper', target: '_blank' },
      { icon: 'tabler:brand-wechat', to: 'https://h5.hlcode.com.cn/?id=NE0myp6&f=wx', target: '_blank' },
    ],
  },
  footer: {
    credits: 'This site is powered by Nuxt',
    creditsLink: 'https://nuxt.com/',
    links: [
      { icon: 'lucide:github', to: 'https://github.com/uni-helper', target: '_blank' },
      { icon: 'lucide:coffee', to: 'https://github.com/ModyQyW/sponsors', target: '_blank' },
      { icon: 'tabler:brand-wechat', to: 'https://h5.hlcode.com.cn/?id=NE0myp6&f=wx', target: '_blank' },
      { icon: 'ri:qq-line', to: 'https://qm.qq.com/q/5nPFSqa8Eg', target: '_blank' },
    ],
  },
  toc: {
    title: '本页目录',
    iconLinks: [
      { icon: 'lucide:coffee', to: 'https://github.com/ModyQyW/sponsors', target: '_blank' },
      { icon: 'tabler:brand-wechat', to: 'https://h5.hlcode.com.cn/?id=NE0myp6&f=wx', target: '_blank' },
      { icon: 'ri:qq-line', to: 'https://qm.qq.com/q/5nPFSqa8Eg', target: '_blank' },
    ],
  },
  search: {
    placeholder: 'Search...',
    placeholderDetailed: '搜索文档...',
  },
})
