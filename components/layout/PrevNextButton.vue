<script setup lang="ts">
const props = defineProps<{
  prevNext: any
  side: 'left' | 'right'
}>()

const { path } = useRoute()
const prevNextPath = computed(() => props.prevNext?._path)

// 优化：使用更简洁的路径匹配逻辑
const shouldShow = computed(() => {
  if (!prevNextPath.value)
    return false

  const current = path.split('/')[1] || ''
  const target = prevNextPath.value.split('/')[1] || ''

  return current === target
})
</script>

<template>
  <NuxtLinkLocale
    v-if="shouldShow"
    :to="prevNextPath"
    class="basis-1/3"
  >
    <div class="hover:bg-muted/50 mb-4 space-y-2 rounded-lg border p-4 transition-all">
      <div class="flex flex-row gap-3">
        <div v-if="side === 'left'" class="flex size-6 min-w-6">
          <SmartIcon name="lucide:arrow-left" :size="20" class="mx-auto self-center" />
        </div>
        <span class="w-full space-y-2 self-center" :class="[side === 'left' ? 'text-left' : 'text-right']">
          <div class="text-lg font-semibold">
            {{ prevNext.title }}
          </div>
          <div v-if="prevNext.description" class="text-muted-foreground text-sm">
            {{ prevNext.description }}
          </div>
        </span>
        <div v-if="side === 'right'" class="ml-auto flex size-6 min-w-6">
          <SmartIcon name="lucide:arrow-right" :size="20" class="mx-auto self-center" />
        </div>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
