<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll({ behavior: 'smooth' })
</script>

<template>
  <UButton color="neutral" variant="link" class="text-link hover:text-link-hover text-sm font-semibold" @click="y = 0">
    <span class="flex items-center gap-2">
      <SmartIcon name="lucide:arrow-up" :size="16" />
      <span>返回顶部</span>
    </span>
  </UButton>
</template>
