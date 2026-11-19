<script setup lang="ts">
defineProps<{
  links: any[]
  level: number
}>()
</script>

<template>
  <ul class="flex flex-col gap-1 py-1" :class="[level > 0 && 'mx-3.5 border-l px-2.5']">
    <LayoutAsideTreeItem
      v-for="link in links"
      :key="link.path"
      :link="link"
      :level="level"
    />
  </ul>
</template>

