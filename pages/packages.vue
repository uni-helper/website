<script setup lang="ts">
const config = useAppConfig()
const { data: page } = await useAsyncData('packages', () => queryCollection('packages').first())

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  titleTemplate: '%s - uni-helper',
  ogImage: config.site.ogImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <Project v-if="page" :projects="page.projects" />
  </div>
</template>
