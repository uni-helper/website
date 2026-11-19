<script setup lang="ts">
defineProps<{
  path?: string
  text?: string
}>()
</script>

<template>
  <div v-if="path" class="w-fit">
    <a
      :href="`https://github.com/uni-helper/website/edit/main/content/${path}.md`"
      target="_blank"
      rel="noreferrer"
      class="text-primary text-sm font-semibold"
    >
      <span class="flex items-center gap-2">
        <SmartIcon name="lucide:square-pen" :size="16" />
        <span>{{ text ?? '在 GitHub 上编辑此页' }}</span>
      </span>
    </a>
  </div>
</template>
