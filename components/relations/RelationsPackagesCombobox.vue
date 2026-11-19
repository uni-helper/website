<script lang="ts" setup>
import type { RelationPackage } from '~/types/package'

const props = defineProps<{
  packages: RelationPackage[]
  logo?: string
}>()

const selection = defineModel<RelationPackage[]>('selection', {
  default: () => [],
})

const groups = computed(() => [{
  id: 'packages',
  label: '包',
  items: props.packages.map(pkg => ({
    id: pkg.name,
    label: pkg.name,
    icon: pkg.icon,
  })),
}])

const model = computed({
  get: () => selection.value.map(pkg => pkg.name),
  set: (names: string[]) => {
    selection.value = props.packages.filter(pkg => names.includes(pkg.name))
  },
})
</script>

<template>
  <UCommandPalette
    v-model="model"
    :groups="groups"
    multiple
    placeholder="搜索包"
    class="h-80"
  />
</template>
