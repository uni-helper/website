<script setup lang="ts">
const {
  inStack = false,
  name,
  sync = '_pm',
  noSync,
} = defineProps<{
  inStack?: boolean
  name: string
  sync?: string
  noSync?: boolean
}>()

const md = `
::code-group{${inStack ? 'in-stack' : ''} ${noSync ? '' : `sync="${sync}"`}}
${
  usePm().packageManagers.value.map((pm) => {
    const code = `${pm.name} create ${name}`
    return `\`\`\`bash [${pm.name}]\n${code}\n\`\`\`\n`
  }).join('\n')
}
::
`
</script>

<template>
  <MDC :value="md" class="[&:not(:first-child)]:mt-5" />
</template>
