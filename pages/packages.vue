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
    <header v-if="page" class="mx-auto max-w-7xl px-4 pt-10 md:px-8">
      <h1 class="uh-type-display">{{ page.title }}</h1>
      <p v-if="page.description" class="text-muted-foreground mt-3 max-w-2xl uh-type-body">{{ page.description }}</p>
    </header>
    <Project v-if="page" :projects="page.projects" />
  </main>
</template>
