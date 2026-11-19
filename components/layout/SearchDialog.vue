<script setup lang="ts">
const config = useAppConfig()
const navigation = inject<Ref<any[]>>('navigation', ref([]))
const { open } = useContentSearch()

const files = ref<any[]>([])

watch(open, async (value) => {
  if (value && !files.value.length)
    files.value = await $fetch('/api/search.json')
}, { immediate: true })
</script>

<template>
  <UContentSearch
    :files="files"
    :navigation="navigation"
    :placeholder="config.search.placeholderDetailed"
  />
</template>
