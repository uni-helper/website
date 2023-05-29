<script setup lang="ts">
import {
  baiduSiteVerification,
  googleSiteVerification,
  siteDescription,
  siteDir,
  siteKeywords,
  siteLang,
  siteName,
  siteOgImage,
  siteOgType,
  siteSlogan,
} from '@/data/meta'

useHead({
  titleTemplate: title =>
    title
      ? `${title} | ${siteName}`
      : `${siteName} | ${siteSlogan}`,
  htmlAttrs: {
    lang: siteLang,
    dir: siteDir,
  },
  meta: [
    {
      name: 'baidu-site-verification',
      content: baiduSiteVerification,
    },
    {
      name: 'keywords',
      content: siteKeywords,
    },
  ],
})

useSeoMeta({
  ogSiteName: siteName,
  ogTitle: siteName,
  description: siteDescription,
  ogDescription: siteDescription,
  ogImage: siteOgImage,
  ogImageAlt: siteSlogan,
  ogType: siteOgType,
  ogLocale: siteLang,
  creator: siteName,
  googleSiteVerification,
})
</script>

<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<style>
body {
  --at-apply: 'text-gray-800 dark:text-gray-100 bg-light-100 dark:bg-dark-800'
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
  --at-apply: 'bg-gray-100'
}

.uni-helper-scrollbars ::-webkit-scrollbar-thumb {
  border-radius: 0.6em;
  --at-apply: 'bg-gray-300'
}

.uni-helper-scrollbars ::-webkit-scrollbar-thumb:hover {
  --at-apply: 'bg-gray-400'
}

.uni-helper-scrollbars ::-webkit-scrollbar-thumb:active {
  --at-apply: 'bg-gray-500'
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-track {
  --at-apply: 'bg-gray-800'
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-thumb {
  --at-apply: 'bg-gray-700'
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-thumb:hover {
  --at-apply: 'bg-gray-600'
}

.uni-helper-scrollbars.dark ::-webkit-scrollbar-thumb:active {
  --at-apply: 'bg-gray-500'
}
</style>
