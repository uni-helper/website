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

const config = useAppConfig().shadcnDocs

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  titleTemplate: `%s - ${config.header.title}`,
})

defineOgImageComponent('ShadcnDocs', {
  title: page.value?.title,
  description: page.value?.description,
})
</script>

<template>
  <div>
    <Project :projects="page.projects" />
  </div>
</template>
