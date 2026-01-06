import type { NitroRouteConfig } from 'nitropack'
import { defineNuxtConfig } from 'nuxt/config'
import { generatePrerenderRoutes } from './scripts/generate-routes'

export default async () => {
  const prerenderRoutes = await generatePrerenderRoutes('./content')
  const swrRoutes = ['/api/_content/packages.json', '/api/_content/releases.json']

  return defineNuxtConfig({
    sourcemap: false,
    extends: ['shadcn-docs-nuxt'],
    modules: [
      '@nuxtjs/sitemap',
      'motion-v/nuxt',
      '@nuxt/eslint',
      'nuxt-gtag',
    ],
    devtools: { enabled: true },
    app: {
      head: {
        meta: [
          { name: 'google-site-verification', content: 'hqPb74AFcL3IXb7yqjOcOY9v6MJkevvVm-IUSFc9GOk' },
        ],
        script: [
          {
            innerHTML: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?32c126f9b300c6f3343505a50ca7a936";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `,
            type: 'text/javascript',
          },
        ],
      },
    },
    css: [
      '~/assets/css/tailwind.css',
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
      },
      routeRules: {
        ...prerenderRoutes.reduce((acc, route) => {
          acc[route] = { isr: true, prerender: true }
          return acc
        }, {} as Record<string, NitroRouteConfig>),
        ...swrRoutes.reduce((acc, route) => {
          acc[route] = { swr: true, prerender: true }
          return acc
        }, {} as Record<string, NitroRouteConfig>),
      },
      netlify: {
        images: {
          remote_images: [
            'https://github.com/.*',
            'https://img.shields.io/.*',
          ],
        },
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
    icon: {
      serverBundle: 'remote',
    },
    image: {
      domains: [
        'github.com',
      ],
    },
    vite: {
      optimizeDeps: {
        include: ['motion-v', 'clsx', 'tailwind-merge', 'class-variance-authority', 'reka-ui', 'scule'],
      },
    },
    gtag: {
      id: 'G-249B95M763',
    },
    ogImage: {
      fonts: [
        'Noto+Sans+SC:400',
      ],
    },
  })
}
