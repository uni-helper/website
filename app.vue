<script setup lang="ts">
useHead({
  titleTemplate: title =>
    title
      ? `${title} - Uni Helper`
      : 'Uni Helper - 旨在增强 uni-app 系列产品的开发体验',
  htmlAttrs: {
    lang: 'zh-CN',
    dir: 'ltr',
  },
  meta: [
    {
      name: 'google-site-verification',
      content: 'hqPb74AFcL3IXb7yqjOcOY9v6MJkevvVm-IUSFc9GOk',
    },
    {
      name: 'baidu-site-verification',
      content: 'codeva-VK6wM2Jf0b',
    },
  ],
})
</script>

<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<style>
body {
  @apply text-gray-800 dark:text-gray-100 bg-light-100 dark:bg-dark-800;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.uni-helper-scrollbars ::-webkit-scrollbar {
  width: 0.6em;
  height: 0.6em;
  background: transparent;
}

.uni-helper-scrollbars ::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

.uni-helper-scrollbars ::-webkit-scrollbar-thumb {
  border-radius: 0.6em;
  @apply bg-gray-300;
}

.uni-helper-scrollbars ::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

.uni-helper-scrollbars ::-webkit-scrollbar-thumb:active {
  @apply bg-gray-500;
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-thumb {
  @apply bg-gray-700;
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-600;
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-thumb:active {
  @apply bg-gray-500;
}
</style>
