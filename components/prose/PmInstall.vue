<script setup lang="ts">
const props = withDefaults(defineProps<{
  inStack?: boolean
  name?: string
  sync?: string
  saveDev?: boolean
  noSync?: boolean
}>(), {
  inStack: false,
  name: '',
  sync: '',
  saveDev: false,
  noSync: false,
})

const commands = computed(() => usePm().packageManagers.value.map(pm => ({
  name: pm.name,
  code: props.name
    ? `${pm.command}${pm.install}${props.saveDev ? pm.saveDev : ''}${props.name}`
    : `${pm.command}${pm.installEmpty}`,
})))
</script>

<template>
  <ProsePmCommands :commands="commands" :in-stack="props.inStack" />
</template>
