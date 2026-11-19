<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
defineProps<{
  page: any
}>()

const navigation = inject<Ref<any[]>>('navigation', ref([]))
const route = useRoute()

function flatten(items: any[]): any[] {
  return items.flatMap(item => item.children?.length ? flatten(item.children) : [item])
}

const surround = computed(() => {
  const items = flatten(navigation.value)
  const section = route.path.split('/').filter(Boolean)[0]
  const scoped = items.filter(item => item.path?.split('/').filter(Boolean)[0] === section)
  const index = scoped.findIndex(item => item.path === route.path)
  return {
    prev: index > 0 ? scoped[index - 1] : undefined,
    next: index >= 0 && index < scoped.length - 1 ? scoped[index + 1] : undefined,
  }
})

const isDesktop = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <div class="mt-16">
    <div class="mb-6 flex w-full items-center justify-between">
      <LayoutEditLink v-if="page?.editLink !== false" :path="page?.stem" />
      <LayoutBackToTop />
    </div>

    <div v-if="page?.prevNext !== false && (surround.prev || surround.next)" class="border-t pt-6 lg:flex lg:flex-row">
      <LayoutPrevNextButton :prev-next="surround.prev" side="left" />
      <span class="flex-1" />
      <LayoutPrevNextButton :prev-next="surround.next" side="right" />
    </div>

    <div v-if="!isDesktop" class="mt-6 flex justify-center">
      <LayoutCarbonAds />
    </div>
  </div>
</template>
