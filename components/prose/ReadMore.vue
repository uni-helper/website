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
  <!-- 链接放在正文文字上，再用 ::after 铺满整块提示框，整块可点又不会出现嵌套 anchor。 -->
  <ProseAlert :icon="props.icon" class="relative">
    更多信息请参考
    <NuxtLink
      :to="props.to"
      :target="props.target"
      class="font-semibold after:absolute after:inset-0"
    >
      {{ props.title || props.to }}
    </NuxtLink>
  </ProseAlert>
</template>
