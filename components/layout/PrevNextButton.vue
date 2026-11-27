<script setup lang="ts">
defineProps<{
  prevNext?: any
  side: 'left' | 'right'
}>()
</script>

<template>
  <NuxtLink
    v-if="prevNext"
    :to="prevNext.path"
    class="basis-1/3"
  >
    <div class="hover:bg-card-hover mb-4 space-y-2 rounded-lg border p-4 transition-all">
      <div class="flex flex-row gap-3">
        <div v-if="side === 'left'" class="flex size-6 min-w-6">
          <SmartIcon name="lucide:arrow-left" :size="20" class="mx-auto self-center" />
        </div>
        <span class="w-full space-y-2 self-center" :class="[side === 'left' ? 'text-left' : 'text-right']">
          <div class="uh-type-heading-4">
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
  </NuxtLink>
</template>
