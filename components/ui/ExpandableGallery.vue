<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  images: string[]
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})
</script>

<template>
  <div :class="cn('flex h-96 w-full gap-2', props.class)">
    <div
      v-for="image in images"
      :key="image"
      class="relative flex h-full flex-1 overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:flex-3"
    >
      <img
        class="relative h-full object-cover"
        :src="image"
        :alt="image"
        loading="lazy"
        decoding="async"
      >
    </div>
  </div>
</template>
