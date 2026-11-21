/**
 * 页面级 SEO 与社交卡片元数据。所有页面共用同一套 title 模板、canonical 和 og 字段，
 * 避免每处 useSeoMeta 各写一份、漏掉 canonical 或 og:title。
 */
export function usePageSeo(options: {
  title: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  /** 文档页用 article，站点级页面用 website。 */
  type?: 'website' | 'article'
  /** 标题本身已完整（首页），不再拼 “ - uni-helper”。 */
  bareTitle?: boolean
}) {
  const config = useAppConfig()
  const route = useRoute()

  const title = computed(() => toValue(options.title))
  const description = computed(() => toValue(options.description))
  // 静态输出不带末尾斜杠，canonical 要和 sitemap 里的 URL 完全一致。
  const canonical = computed(() => `${config.site.url}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`)

  useSeoMeta({
    title,
    description,
    titleTemplate: options.bareTitle ? '%s' : `%s - ${config.site.name}`,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogType: options.type ?? 'website',
    ogSiteName: config.site.name,
    ogLocale: 'zh_CN',
    ogImage: config.site.ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: config.site.ogImage,
  })

  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}
