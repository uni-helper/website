<script lang="ts" setup>
import type { RelationPackage } from '~/types/package'

const props = defineProps<{
  packages: RelationPackage[]
  logo?: string
}>()

const selection = defineModel<RelationPackage[]>('selection', {
  default: () => [],
})
</script>

<template>
  <UiCommand>
    <UiCommandInput placeholder="搜索包" />
    <UiCommandList>
      <UiCommandEmpty>No results found.</UiCommandEmpty>
      <UiCommandGroup class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <UiCommandItem
          v-for="item in packages" :key="item.name" :value="item.name" @select="() => {
            selection = selection.includes(item)
              ? selection.filter(i => i.name !== item.name)
              : [...selection, item]
          }"
        >
          <SmartIcon v-if="item.icon" :name="item.icon" />
          {{ item.name }}
          <SmartIcon v-if="selection.includes(item)" name="ph:check" class="ml-auto" :size="16" />
        </UiCommandItem>
      </UiCommandGroup>
    </UiCommandList>
  </UiCommand>
</template>
