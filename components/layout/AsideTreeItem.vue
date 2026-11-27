<script setup lang="ts">
const props = defineProps<{
  link: any
  level: number
}>()

const route = useRoute()
// _dir.yml 的 collapse 表示分组默认是否折叠；没配置时沿用“一级分组展开、更深层折叠”。
const open = ref(props.link.collapse === undefined ? props.level < 1 : !props.link.collapse)

watch(() => route.path, () => {
  if (route.path.startsWith(props.link.path))
    open.value = true
}, { immediate: true })

function normalize(path: string) {
  const value = path.replace(/\/+$/, '')
  return value === '' ? '/' : value
}

const isActive = computed(() => normalize(props.link.path) === normalize(route.path))
const titleClass = computed(() => props.link.navTruncate === false ? '' : 'truncate')
</script>

<template>
  <li>
    <div v-if="link.children?.length">
      <button
        class="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-8 w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm"
        @click="open = !open"
      >
        <SmartIcon v-if="link.icon" :name="link.icon" class="min-w-4" :size="16" />
        <span :class="titleClass">{{ link.title }}</span>
        <span
          v-for="badge in link.navBadges ?? []"
          :key="badge.value"
          class="mx-0.5 rounded-sm bg-brand-soft px-1.5 py-0.5 text-xs leading-none font-semibold text-brand-deep"
        >{{ badge.value }}</span>
        <SmartIcon
          name="lucide:chevron-down"
          class="ml-auto transition-transform"
          :class="[!open && '-rotate-90']"
          :size="16"
        />
      </button>

      <div v-show="open">
        <LayoutAsideTree :links="link.children" :level="level + 1" />
      </div>
    </div>

    <NuxtLink
      v-else
      :to="link.path"
      class="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex min-h-9 items-center gap-2 rounded-md p-2 text-sm"
      :class="[isActive && 'bg-accent text-accent-foreground font-semibold']"
    >
      <SmartIcon v-if="link.icon" :name="link.icon" class="min-w-4" :size="16" />
      <span :class="titleClass">{{ link.title }}</span>
      <span
        v-for="badge in link.navBadges ?? []"
        :key="badge.value"
        class="mx-0.5 rounded-md bg-brand-soft px-1.5 py-0.5 text-xs leading-none font-normal text-brand-deep"
      >{{ badge.value }}</span>
    </NuxtLink>
  </li>
</template>

