<script setup lang="ts">
defineProps<{
  name: string
  size?: number | string
}>()
</script>

<template>
  <UIcon :name="name" :size="size" />
</template>
