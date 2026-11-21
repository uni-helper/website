<script setup lang="ts">
const navigation = inject<Ref<any[]>>('navigation', ref([]))
const route = useRoute()

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const items: { title: string, to: string }[] = []
  let path = ''
  let level = navigation.value

  for (const segment of segments) {
    path += `/${segment}`
    const item = level?.find(entry => entry.path === path)
    level = item?.children
    items.push({ title: item?.title ?? segment, to: item?.children?.[0]?.path ?? path })
  }

  return items
})

// 面包屑结构化数据，搜索引擎用它生成路径式的搜索结果。
const siteUrl = useAppConfig().site.url
useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.value.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        item: `${siteUrl}${item.to}`,
      })),
    }),
  }],
}))
</script>

<template>
  <nav v-if="breadcrumbs.length" aria-label="面包屑">
    <ol class="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
      <li v-for="(item, index) in breadcrumbs" :key="item.to" class="flex items-center gap-1.5">
        <NuxtLink
          v-if="index !== breadcrumbs.length - 1"
          :to="item.to"
          class="transition-colors hover:text-foreground"
        >
          {{ item.title }}
        </NuxtLink>
        <span v-else class="text-foreground">{{ item.title }}</span>
        <SmartIcon
          v-if="index !== breadcrumbs.length - 1"
          name="lucide:chevron-right"
          :size="14"
        />
      </li>
    </ol>
  </nav>
</template>
