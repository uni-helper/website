<template>
  <div class="min-h-[600px] [&:not(:first-child)]:mt-6">
    <iframe
      v-if="url"
      :src="url"
      :title="props.title"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      loading="lazy"
      class="h-full min-h-[600px] w-full overflow-hidden rounded-md"
    />
    <div v-else class="bg-muted min-h-[600px] w-full animate-pulse rounded-md" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  provider: 'stackblitz' | 'codesandbox'
  id?: string
  repo?: string
  branch?: string
  dir?: string
  file: string
  title?: string
}>(), {
  id: '',
  repo: '',
  branch: 'main',
  dir: '',
  title: 'Playground',
})

const url = ref('')
const colorMode = useColorMode()

onMounted(() => {
  if (props.provider === 'stackblitz') {
    if (props.repo)
      url.value = `https://stackblitz.com/github/${props.repo}/tree/${props.branch}/${props.dir}?embed=1&file=${props.file}&theme=${colorMode.value}`
    else if (props.id)
      url.value = `https://stackblitz.com/edit/${props.id}?embed=1&file=${props.file}&theme=${colorMode.value}`
  }
  else if (props.provider === 'codesandbox') {
    if (props.repo)
      url.value = `https://codesandbox.io/p/sandbox/github/${props.repo}/tree/${props.branch}/${props.dir}?embed=1&file=${props.file}`
    else if (props.id)
      url.value = `https://codesandbox.io/embed/${props.id}?view=editor+%2B+preview&module=${props.file}`
  }
})
</script>
