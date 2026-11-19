import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Project } from './types/package'
import { parse } from 'yaml'
import { defineNuxtConfig } from 'nuxt/config'
import { generatePrerenderRoutes } from './scripts/generate-routes'

// 运行时路由需要一份不依赖内容数据库的项目列表（Cloudflare 上没有 D1 绑定）。
const packageData = parse(readFileSync('./content/1.packages.yml', 'utf8'))
const projects = Object.values(packageData.projects || {}).flat() as Project[]

function routeSegment(name: string) {
  return name.replace(/^\d+\./, '').replace(/\.md$/, '').toLowerCase()
}

// 没有 index.md 的目录没有页面，找到它的第一个子页面作为重定向目标。
function findFirstPage(dir: string, base: string): string | undefined {
  if (existsSync(join(dir, 'index.md')))
    return base

  const entries = readdirSync(dir, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('_'))
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const found = findFirstPage(join(dir, entry.name), `${base}/${routeSegment(entry.name)}`)
      if (found)
        return found
    }
    else if (entry.name.endsWith('.md')) {
      return `${base}/${routeSegment(entry.name)}`
    }
  }
}

function collectDirRedirects(dir: string, base = ''): Record<string, { redirect: string }> {
  const redirects: Record<string, { redirect: string }> = {}
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('_'))
      continue
    const full = join(dir, entry.name)
    const route = `${base}/${routeSegment(entry.name)}`
    const first = findFirstPage(full, route)
    if (first && first !== route)
      redirects[route] = { redirect: first }
    Object.assign(redirects, collectDirRedirects(full, route))
  }
  return redirects
}

// _dir.yml 里的 navigation.redirect 原来是 shadcn-docs 主题处理的，这里生成 Nitro 重定向。
const dirRedirects = collectDirRedirects('./content')
for (const file of readdirSync('./content', { recursive: true }) as string[]) {
  if (!file.endsWith('_dir.yml'))
    continue
  const dir = file.replace(/\/_dir\.yml$/, '')
  const data = parse(readFileSync(`./content/${file}`, 'utf8'))
  const target = data?.navigation?.redirect
  if (typeof target === 'string')
    dirRedirects[`/${dir}`] = { redirect: target }
}

// /changelog 必须走运行时（见下方 routeRules），否则 release 数据会在构建时写死。
const runtimeRoutes = new Set(['/changelog'])

export default async () => {
  const prerenderRoutes = (await generatePrerenderRoutes('./content'))
    .filter(route => !runtimeRoutes.has(route))

  return defineNuxtConfig({
    sourcemap: false,
    modules: [
      '@vueuse/nuxt',
      '@nuxt/ui',
      '@nuxt/content',
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
      '~/assets/css/main.css',
    ],
    runtimeConfig: {
      projects,
    },
    site: {
      url: 'https://uni-helper.js.org/',
      name: 'Uni Helper',
    },
    content: {
      experimental: {
        sqliteConnector: 'native',
      },
      build: {
        markdown: {
          highlight: {
            langs: ['jsonc', 'python'],
          },
        },
      },
      // 内容里保留 shadcn-docs 的标签名，映射到本项目自己的兼容组件。
      renderer: {
        alias: {
          'alert': 'ProseAlert',
          'home-page': 'ProseHomePage',
          'hero-alt': 'ProseHeroAlt',
          'playground': 'ProsePlayground',
          'pm-create': 'ProsePmCreate',
          'pm-install': 'ProsePmInstall',
          'pm-x': 'ProsePmX',
          'read-more': 'ProseReadMore',
          'stack': 'ProseStack',
        },
      },
    },
    compatibilityDate: '2026-11-18',
    nitro: {
      // Cloudflare Pages 的 _routes.json 只有 100 条规则，不能把 269 个静态路由全部列进 exclude。
      // 反过来只让 Worker 处理运行时路由，其余路径全部由 Pages 直接当静态资源返回。
      cloudflare: {
        pages: {
          routes: {
            include: ['/changelog', '/changelog/*', '/api/_content/*'],
            exclude: [],
          },
        },
      },
      prerender: {
        crawlLinks: true,
        routes: [...prerenderRoutes, '/api/search.json'],
      },
      routeRules: {
        ...dirRedirects,
        // SWR 在缓存未命中时会先返回空响应，页面首屏会拿不到 release 列表。
        // 这里直接运行时 SSR，数据层交给 server/utils 里的 defineCachedFunction（10 分钟）。
        '/changelog': { prerender: false },
        '/api/_content/releases.json': { prerender: false },
        '/api/_content/packages.json': { prerender: false },
      },
    },
    eslint: {
      config: {
        standalone: true,
        nuxt: {
          sortConfigKeys: true,
        },
      },
    },
    fonts: {
      priority: ['bunny', 'fontsource', 'google'],
    },
    icon: {
      provider: 'iconify',
      serverBundle: 'remote',
    },
    gtag: {
      id: 'G-249B95M763',
    },
    sitemap: {
      zeroRuntime: true,
      exclude: ['/**/_dir'],
    },
    vite: {
      optimizeDeps: {
        include: ['motion-v', 'clsx', 'tailwind-merge', 'class-variance-authority', 'vis-network', 'gsap', 'gsap/InertiaPlugin', 'ogl', 'zod', 'theme-colors'],
        exclude: ['@tailwindcss/oxide', 'lightningcss'],
      },
      ssr: {
        external: ['@tailwindcss/oxide', 'lightningcss'],
      },
    },
  })
}
