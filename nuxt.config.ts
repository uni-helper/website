import { generatePrerenderRoutes } from './scripts/generate-routes'

export default async () => {
  const prerenderRoutes = await generatePrerenderRoutes('./content')

  return defineNuxtConfig({
    extends: ['shadcn-docs-nuxt'],
    modules: [
      '@nuxtjs/sitemap',
      'motion-v/nuxt',
      '@nuxt/eslint',
      '@unocss/nuxt',
      'nuxt-gtag',
    ],
    devtools: { enabled: true },
    app: {
      head: {
        meta: [
          { name: 'google-site-verification', content: 'hqPb74AFcL3IXb7yqjOcOY9v6MJkevvVm-IUSFc9GOk' },
        ],
      },
    },
    css: [
      '@unocss/reset/tailwind.css',
    ],
    site: {
      url: 'https://uni-helper.js.org/',
      name: 'Uni Helper',
    },
    mdc: {
      highlight: {
        langs: ['jsonc', 'python'],
      },
    },
    compatibilityDate: '2024-07-06',
    nitro: {
      prerender: {
        crawlLinks: true,
        routes: prerenderRoutes,
      },
    },
    eslint: {
      config: {
        standalone: false,
        nuxt: {
          sortConfigKeys: true,
        },
      },
    },
    i18n: {
      defaultLocale: 'zh',
      locales: [
        {
          code: 'zh',
          name: '简体中文',
          language: 'zh-CN',
        },
      ],
    },
    image: {
      domains: [
        'github.com',
      ],
    },
    vite: {
      optimizeDeps: {
        include: ['motion-v', 'clsx', 'tailwind-merge', 'class-variance-authority'],
      },
    },
    gtag: {
      id: 'G-249B95M763',
    },
  })
}
