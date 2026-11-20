<script setup lang="ts">
const props = withDefaults(defineProps<{
  inStack?: boolean
  script: string
}>(), {
  inStack: false,
})

const commands = computed(() => usePm().packageManagers.value.map(pm => ({
  name: pm.name,
  code: `${pm.command}${pm.run}${props.script}`,
})))
</script>

<template>
  <ProsePmCommands :commands="commands" :in-stack="props.inStack" />
</template>
