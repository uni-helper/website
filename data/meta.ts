import type { UseSeoMetaInput } from '@unhead/schema'

export const siteName = 'Uni Helper'
export const siteSlogan = '旨在增强 uni-app 系列产品的开发体验'
export const siteLang = 'zh-CN'
export const siteDir = 'ltr'
export const siteKeywords = ['uni-app', 'vscode', 'vite', 'vue3', 'vue', 'typescript'].join(',')
export const siteDescription = '借助 Uni Helper 提供的 Vite 插件、VS Code 插件、工具库等，你可以优雅地构建你的 uni-app 应用。这些工具不仅让 uni-app 的开发变得更加直观高效，还能带来卓越的开发体验。'

export const siteOgImage = 'https://github.com/uni-helper/website/raw/main/.github/assets/uni-helper-banner.png'
export const siteOgType = 'website'

export const baiduSiteVerification = 'codeva-VK6wM2Jf0b'
export const googleSiteVerification = 'hqPb74AFcL3IXb7yqjOcOY9v6MJkevvVm-IUSFc9GOk'

interface SeoMeta extends Omit<UseSeoMetaInput, 'keywords'> {
  keywords?: string[]
}

export const repos: Record<string, SeoMeta> = {
  'uni-app-types': {
    keywords: ['uni-app', '内置组件类型', 'typescript', '类型', 'volar'],
  },
  'uni-create-view': {
    keywords: ['uni-app', 'vscode', 'pages.json', '自动'],
    ogImage: 'https://raw.githubusercontent.com/uni-helper/uni-create-view/main/public/logo.png',
    ogImageAlt: 'logo for uni-create-view',
  },
  'vite-plugin-uni-pages': {
    keywords: ['uni-app', 'vite', '文件路由系统', 'pages.json', '自动', 'volar-plugin-uni-pages', 'pages-json-schema', 'vue3', 'vue2'],
  },
  'awesome-uni-app': {
    keywords: ['uni-app', 'awesome', '资源汇总', 'vue2', 'vue3', '模板', '插件', '库', 'vite', 'css', 'ui'],
    ogImage: 'https://raw.githubusercontent.com/uni-helper/awesome-uni-app/main/assets/logo.svg',
    ogImageAlt: 'logo for awesome-uni-app',
  },
  'vitesse-uni-app': {
    keywords: ['uni-app', 'vitesse', 'vite', 'vue3', 'layouts', 'unocss', 'iconify', 'eslint'],
    ogImage: 'https://raw.githubusercontent.com/uni-helper/vitesse-uni-app/main/.github/images/preview.png',
    ogImageAlt: 'preview for vitesse-uni-app',
  },
  'vite-plugin-uni-components': {
    keywords: ['uni-app', 'components', 'auto-import', 'vue3', 'vite'],
  },
  'axios-adapter': {
    keywords: ['uni-app', 'axios', 'adapter', '拦截器'],
    ogImage: 'https://raw.githubusercontent.com/uni-helper/axios-adapter/main/assets/logo.svg',
    ogImageAlt: 'logo for uni-app axios-adapter',
  },
  'uni-helper-vscode': {
    keywords: ['uni-app', 'vscode', 'schemas', 'snippets'],
  },
}
