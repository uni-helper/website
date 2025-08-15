export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'uni-helper',
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
      // logo: {
      //   light: '/logo.svg',
      //   dark: '/logo-dark.svg',
      // },
      nav: [],
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/uni-helper',
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
    },
    footer: {
      credits: 'Copyright © 2024',
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/uni-helper',
        target: '_blank',
      }],
    },
    toc: {
      title: '本页目录',
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
})
