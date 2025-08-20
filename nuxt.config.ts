import { generatePrerenderRoutes } from './scripts/generate-routes'

export default async () => {
  const prerenderRoutes = await generatePrerenderRoutes('./content')

  return defineNuxtConfig({
    extends: ['shadcn-docs-nuxt'],
    modules: [
      'motion-v/nuxt',
      '@nuxt/eslint',
      '@unocss/nuxt',
    ],
    devtools: { enabled: true },
    css: [
      '@unocss/reset/tailwind.css',
    ],
    site: {
      url: 'https://uni-helper.js.org/',
    },
    mdc: {
      highlight: {
        langs: ['jsonc'],
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
  })
}
