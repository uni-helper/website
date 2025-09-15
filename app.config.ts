export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'uni-helper',
      url: 'https://uni-helper.js.org',
      description: '旨在增强 uni-app 系列产品的开发流程',
    },
    theme: {
      customizable: false,
      color: 'zinc',
      radius: 0.5,
    },
    header: {
      title: 'uni-helper',
      showTitle: true,
      darkModeToggle: true,
      languageSwitcher: {
        enable: false,
      },
      logo: {
        light: '/logo.svg',
        dark: '/logo-dark.svg',
      },
      nav: [
        {
          title: '项目',
          to: '/packages',
          target: '_self',
          showLinkIcon: false,
        },
        {
          title: '关于我们',
          to: '/about',
          target: '_self',
          showLinkIcon: false,
        },
        {
          title: '博客',
          to: '/blog',
          target: '_self',
          showLinkIcon: false,
        },
      ],
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/uni-helper',
        target: '_blank',
      }, {
        icon: 'tabler:brand-wechat',
        to: 'https://h5.hlcode.com.cn/?id=NE0myp6&f=wx',
        target: '_blank',
      }],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
      editLink: {
        enable: true,
        text: '在 GitHub 上编辑此页',
        pattern: 'https://github.com/uni-helper/website/edit/main/content/:path',
      },
      codeIcon: {
        'vite.config.ts': 'vscode-icons:file-type-vite',
        'vite.config.js': 'vscode-icons:file-type-vite',
        'uno.config.ts': 'vscode-icons:file-type-unocss',
      },
    },
    footer: {
      credits: 'This site is powered by [**Netlify**](https://www.netlify.com)',
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/uni-helper',
        target: '_blank',
      }, {
        icon: 'lucide:coffee',
        to: 'https://github.com/ModyQyW/sponsors',
        target: '_blank',
      }, {
        icon: 'tabler:brand-wechat',
        to: 'https://h5.hlcode.com.cn/?id=NE0myp6&f=wx',
        target: '_blank',
      }, {
        icon: 'ri:qq-line',
        to: 'https://qm.qq.com/q/5nPFSqa8Eg',
        target: '_blank',
      }],
    },
    toc: {
      title: '本页目录',
      iconLinks: [
        {
          icon: 'lucide:coffee',
          to: 'https://github.com/ModyQyW/sponsors',
          target: '_blank',
        },
        {
          icon: 'tabler:brand-wechat',
          to: 'https://h5.hlcode.com.cn/?id=NE0myp6&f=wx',
          target: '_blank',
        },
        {
          icon: 'ri:qq-line',
          to: 'https://qm.qq.com/q/5nPFSqa8Eg',
          target: '_blank',
        },
      ],
      carbonAds: {
        enable: true,
      },
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
})
