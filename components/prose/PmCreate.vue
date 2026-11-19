<script setup lang="ts">
const props = withDefaults(defineProps<{
  inStack?: boolean
  name: string
  sync?: string
  noSync?: boolean
}>(), {
  inStack: false,
  sync: '',
  noSync: false,
})

const commands = computed(() => usePm().packageManagers.value.map(pm => ({
  name: pm.name,
  code: `${pm.name} create ${props.name}`,
})))
</script>

<template>
  <ProsePmCommands :commands="commands" :in-stack="props.inStack" />
</template>
