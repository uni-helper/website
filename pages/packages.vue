<script setup lang="ts">
const { data: page } = await useAsyncData('packages', () => queryCollection('packages').first())

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

usePageSeo({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <main>
    <Project v-if="page" :projects="page.projects" />
  </main>
</template>
