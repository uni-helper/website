<script setup lang="ts">
const props = defineProps<{
  path: string
}>()

// 内容页都在构建时预渲染。运行时（Cloudflare 没有 D1）只可能走到 404，
// 不能在这里查内容数据库，否则未知 URL 会变成 500。
if (import.meta.server && !import.meta.dev && !import.meta.prerender) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const { data: page } = await useAsyncData(`content:${props.path}`, () => queryCollection('content').path(props.path).first())

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const isHome = computed(() => props.path === '/')
const isFullpage = computed(() => page.value?.fullpage === true)
const hasToc = computed(() => page.value?.toc !== false && !!page.value?.body?.toc?.links?.length)

// 只有渲染目录时才需要 _dir.yml 里的附加链接。
const section = computed(() => props.path.split('/').filter(Boolean)[0])
const { data: sectionMeta } = await useAsyncData(`section:${section.value}`, () =>
  hasToc.value && section.value ? queryCollection('content').path(`/${section.value}/_dir`).first() : Promise.resolve(null))

usePageSeo({
  title: page.value?.title,
  description: page.value?.description,
  type: isHome.value ? 'website' : 'article',
  // 首页标题来自 content/index.md，已经是完整标题，不再拼站点名。
  bareTitle: isHome.value,
})
</script>

<template>
  <div v-if="page">
    <main v-if="isFullpage || isHome" class="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <ContentRenderer :value="page" />
    </main>

    <div v-else class="min-h-screen border-b">
      <div
        class="mx-auto flex-1 items-start px-4 md:grid md:gap-6 md:px-8 lg:gap-10 max-w-7xl"
        :class="page.aside !== false
          ? 'md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]'
          : ''"
      >
        <main
          class="relative py-6 lg:py-8"
          :class="hasToc ? 'lg:grid lg:grid-cols-[1fr_220px] lg:gap-14' : ''"
        >
          <div class="mx-auto w-full min-w-0">
            <LayoutBreadcrumb v-if="page.breadcrumb !== false" class="mb-4" />

            <div class="mb-8">
              <h1 class="uh-type-display scroll-m-20 wrap-break-word">
                {{ page.title }}
              </h1>
              <p v-if="page.description" class="text-muted-foreground pt-1 text-lg">
                {{ page.description }}
              </p>

              <div v-if="page.badges?.length" class="flex gap-2 pt-4">
                <NuxtLink
                  v-for="(badge, index) in page.badges"
                  :key="index"
                  :to="badge.to"
                  :target="badge.target"
                >
                  <UBadge variant="soft" color="neutral" class="gap-1 rounded-md">
                    {{ badge.value }}
                    <SmartIcon v-if="badge.to || badge.icon" :name="badge.icon || 'lucide:external-link'" :size="12" />
                  </UBadge>
                </NuxtLink>
              </div>

              <div v-if="page.authors?.length" class="-mx-4 flex divide-x pt-4">
                <NuxtLink
                  v-for="author in page.authors"
                  :key="author.name"
                  :to="author.to"
                  :target="author.target"
                  class="flex items-center gap-2 px-4"
                >
                  <UAvatar v-if="author.avatar" :src="author.avatar" :alt="author.name" size="sm" />
                  <div>
                    <div class="text-sm font-semibold">{{ author.name }}</div>
                    <div v-if="author.username" class="text-muted-foreground text-xs font-medium leading-4">@{{ author.username }}</div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <ContentRenderer :value="page" class="docs-content" />
            <LayoutDocsFooter :page="page" />
          </div>

          <div v-if="hasToc" class="hidden text-sm lg:block">
            <div class="sticky md:top-[91px]">
              <LayoutToc :links="page.body?.toc?.links ?? []" :extra-links="(sectionMeta as any)?.toc?.links ?? []" />
            </div>
          </div>
        </main>

        <!-- 侧栏放在正文之后，Agent 拿到的 HTML 才不会被上百条导航链接埋住；md:order-first 保持左侧显示。 -->
        <aside
          v-if="page.aside !== false"
          class="fixed top-[102px] z-30 -ml-2 hidden h-[calc(100vh-6rem)] w-full shrink-0 overflow-y-auto md:sticky md:top-[101px] md:order-first md:block"
        >
          <LayoutAside />
        </aside>
      </div>
    </div>
  </div>
</template>
