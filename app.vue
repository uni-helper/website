<script setup lang="ts">
const navigation = useState<any[]>('navigation', () => [])

// _dir.yml 会生成 /xxx/_dir 文档，它只用于目录元数据，不能出现在侧栏。
// queryCollectionNavigation 用目录名拼出分组标题（vite-plugin-uni-pages → Vite Plugin Uni Pages），
// 这里换成 _dir.yml 里的 title，面包屑才会显示成 plugin-uni-pages；collapse 也一并带过去。
function clean(entries: any[], dirMeta: Map<string, any>): any[] {
  return entries
    .filter(entry => !entry.path?.endsWith('/_dir'))
    .map((entry) => {
      const meta = dirMeta.get(entry.path)
      return {
        ...entry,
        title: meta?.title ?? entry.title,
        collapse: meta?.collapse ?? entry.collapse,
        children: entry.children ? clean(entry.children, dirMeta) : undefined,
      }
    })
    // 目录下没有任何真实页面时（比如 uni-use API 文档没同步），
    // 不要留下一个指向空目录的链接，否则侧栏会出现必然 404 的入口。
    .filter(entry => entry.page !== false || !!entry.children?.length)
}

// 只在开发和预渲染阶段查询内容数据库。运行时（Cloudflare 没有 D1）不查，
// 静态页的侧栏已经在构建时写进 payload；/changelog 和 404 也不需要侧栏。
if (!navigation.value.length && (import.meta.dev || import.meta.prerender)) {
  const [entries, dirs] = await Promise.all([
    queryCollectionNavigation('content', ['icon', 'navBadges', 'navTruncate']),
    queryCollection('content').where('path', 'LIKE', '%/_dir').select('path', 'title', 'collapse').all(),
  ])
  const dirMeta = new Map(dirs.map(dir => [dir.path.slice(0, -5), dir]))
  navigation.value = clean(entries, dirMeta)
}

provide('navigation', navigation)

const config = useAppConfig()
const siteUrl = config.site.url

// 站点级结构化数据，页面级的面包屑在 Breadcrumb 里追加。
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: config.site.name,
          url: siteUrl,
          description: config.site.description,
          inLanguage: 'zh-CN',
        },
        {
          '@type': 'Organization',
          name: config.site.name,
          url: siteUrl,
          logo: `${siteUrl}/logo.svg`,
          sameAs: ['https://github.com/uni-helper'],
        },
      ],
    }),
  }],
})
</script>

<template>
  <UApp>
    <!-- Agent 靠这段隐藏说明找到索引和 Markdown 版本，删掉会失去 Agent 可发现性。 -->
    <div class="sr-only" role="region" aria-label="Agent resources">
      For AI agents: the documentation index is at <a href="/llms.txt">/llms.txt</a>, and every documentation page is available as Markdown by appending <code>.md</code> to its URL.
    </div>
    <NuxtLoadingIndicator :color="false" class="z-100 bg-primary/80" />
    <LayoutHeader />
    <div class="min-h-screen">
      <NuxtPage />
    </div>
    <LayoutFooter />
  </UApp>
</template>
