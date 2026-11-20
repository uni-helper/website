<script setup lang="ts">
const props = withDefaults(defineProps<{
  inStack?: boolean
  name: string
}>(), {
  inStack: false,
})

const commands = computed(() => usePm().packageManagers.value.map(pm => ({
  name: pm.name,
  code: `${pm.name} create ${props.name}`,
})))
</script>

<template>
  <ProsePmCommands :commands="commands" :in-stack="props.inStack" />
</template>
