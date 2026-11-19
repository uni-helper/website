<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  to: string
  target?: string
  icon?: string
}>(), {
  title: '',
  target: '',
  icon: 'lucide:bookmark',
})
</script>

<template>
  <ProseAlert :to="props.to" :target="props.target" :icon="props.icon">
    更多信息请参考 <span class="font-semibold">{{ props.title || props.to }}</span>
  </ProseAlert>
</template>
