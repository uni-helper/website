<script setup lang="ts">
const props = withDefaults(defineProps<{
  inStack?: boolean
  command: string
}>(), {
  inStack: false,
})

const commands = computed(() => usePm().packageManagers.value.map(pm => ({
  name: pm.name,
  code: `${pm.x}${props.command}`,
})))
</script>

<template>
  <ProsePmCommands :commands="commands" :in-stack="props.inStack" />
</template>
