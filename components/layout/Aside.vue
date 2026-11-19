<script setup lang="ts">
const navigation = inject<Ref<any[]>>('navigation', ref([]))
const route = useRoute()

defineProps<{
  isMobile?: boolean
}>()

const tree = computed(() => {
  const segment = route.path.split('/').filter(Boolean)[0]
  if (!segment)
    return []
  const item = navigation.value.find(entry => entry.path === `/${segment}`)
  return item?.children ?? []
})
</script>

<template>
  <div class="relative h-full overflow-y-auto py-6 pr-6 text-sm md:pr-4">
    <ul class="flex flex-col gap-1 border-b pb-4">
      <li>
        <NuxtLink
          to="/packages"
          class="text-foreground/80 hover:bg-muted hover:text-primary flex h-8 items-center gap-2 rounded-md p-2 text-sm"
        >
          <SmartIcon name="ri:menu-2-fill" :size="16" class="self-center" />
          全部项目
        </NuxtLink>
      </li>
    </ul>
    <LayoutAsideTree :links="tree" :level="0" class="pt-4" />
  </div>
</template>

