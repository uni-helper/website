<script setup lang="ts">
const props = defineProps<{
  links: any[]
  extraLinks?: any[]
}>()

const config = useAppConfig()

const flatLinks = computed(() => {
  const flatten = (links: any[]): any[] => links.flatMap(link => [link, ...(link.children ? flatten(link.children) : [])])
  return flatten(props.links ?? [])
})

const activeId = ref('')
let ticking = false

// 取最后一个已经滚到吸顶 header 下面的标题作为当前章节，滚到页底时高亮最后一个。
function updateActive() {
  const headings = flatLinks.value
    .map(link => document.getElementById(link.id))
    .filter((heading): heading is HTMLElement => !!heading)

  if (!headings.length) {
    activeId.value = ''
    return
  }

  let current = headings[0]?.id ?? ''
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > 120)
      break
    current = heading.id
  }

  const last = headings[headings.length - 1]
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
  activeId.value = atBottom && last ? last.id : current
}

function onScroll() {
  if (ticking)
    return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    updateActive()
  })
}

onMounted(() => {
  updateActive()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(() => props.links, () => nextTick(updateActive))
</script>

<template>
  <div class="flex flex-col gap-5 lg:h-[calc(100vh-6.5rem)] lg:overflow-y-auto">
    <div v-if="links?.length" class="border-b pb-5 text-sm">
      <p class="mb-2 text-base font-semibold">{{ config.toc.title }}</p>
      <LayoutTocList :links="links" :active-id="activeId" />
    </div>

    <div v-if="extraLinks?.length" class="text-muted-foreground border-b pb-5">
      <NuxtLink
        v-for="(link, index) in extraLinks"
        :key="index"
        :to="link.to"
        :target="link.target"
        class="flex w-full gap-1 underline-offset-4 hover:underline [&:not(:first-child)]:pt-3"
      >
        <SmartIcon v-if="link.icon" :name="link.icon" class="mr-1 self-center" :size="16" />
        {{ link.title }}
        <SmartIcon v-if="link.target === '_blank'" name="lucide:arrow-up-right" class="ml-auto self-center" :size="13" />
      </NuxtLink>
    </div>

    <div v-if="config.toc.iconLinks?.length" class="text-muted-foreground flex gap-1">
      <UButton
        v-for="link in config.toc.iconLinks"
        :key="link.to"
        :to="link.to"
        :target="link.target"
        color="neutral"
        variant="ghost"
        square
        size="sm"
        :aria-label="link.icon"
      >
        <SmartIcon :name="link.icon" :size="18" />
      </UButton>
    </div>

    <div class="flex-grow" />
    <LayoutCarbonAds />
  </div>
</template>
