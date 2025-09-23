<script lang="ts" setup>
const route = useRoute()
const { data: page, error } = await useAsyncData<any>(route.path, () => queryContent(route.path).findOne())
if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})
</script>

<template>
  <div>
    <Project :projects="page.projects" />
  </div>
</template>
