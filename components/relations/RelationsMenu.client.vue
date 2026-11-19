<script lang="ts" setup>
const emits = defineEmits<{
  openUniHelper: [boolean]
  openNpm: [boolean]
}>()

const openAbout = defineModel<boolean>('about', { required: true })
const openMenu = defineModel<boolean>('menu', { required: true })
const openLegend = defineModel<boolean>('legend', { required: true })

const config = useAppConfig()
const { metaSymbol } = useShortcuts()

const { updateQuery } = useRelationsQuery()
const { settings } = useRelationsSettings()

const groups = computed(() => [[{
  label: settings.value.showDependencies ? '隐藏依赖' : '显示依赖',
  icon: 'ph:graph',
  click: () => updateQuery({ showDependencies: !settings.value.showDependencies }),
}, {
  label: settings.value.showDevDependencies ? '隐藏开发依赖' : '显示开发依赖',
  icon: 'ph:line-segments',
  click: () => updateQuery({ showDevDependencies: !settings.value.showDevDependencies }),
}], [{
  label: settings.value.showChildren ? '隐藏子节点' : '显示子节点',
  icon: 'ph:tree-structure',
  click: () => updateQuery({ showChildren: !settings.value.showChildren }),
}], [{
  label: openMenu.value ? '隐藏菜单' : '显示菜单',
  icon: 'ph:house',
  shortcuts: [metaSymbol.value, 'm'],
  click: () => {
    openMenu.value = !openMenu.value
  },
}, {
  label: openLegend.value ? '隐藏图例' : '显示图例',
  icon: 'ph:bookmark',
  shortcuts: [metaSymbol.value, 'l'],
  click: () => {
    openLegend.value = !openLegend.value
  },
}], [{
  label: '关于',
  icon: 'ph:info',
  shortcuts: [metaSymbol.value, 'i'],
  click: () => {
    openAbout.value = !openAbout.value
  },
}, {
  label: '帮助',
  icon: 'simple-icons:github',
  shortcuts: [metaSymbol.value, 'h'],
  to: 'https://github.com/uni-helper/website/issues',
  target: '_blank',
}, {
  label: '讨论',
  icon: 'simple-icons:github',
  to: 'https://github.com/orgs/uni-helper/discussions',
  target: '_blank',
}]])

const menuItems = computed(() => {
  const items: any[] = []
  groups.value.forEach((group, index) => {
    if (index > 0)
      items.push({ type: 'separator' })
    for (const item of group) {
      items.push({
        label: item.label,
        icon: item.icon,
        kbds: (item as any).shortcuts,
        onSelect: item.click,
        to: (item as any).to,
        target: (item as any).target,
      })
    }
  })
  return items
})
</script>

<template>
  <div class="select-none">
    <div class="bg-card text-card-foreground grow rounded-xl border p-4 shadow">
      <div class="mb-2 flex items-center justify-between gap-4">
        <div class="flex items-end gap-4">
          <h1 class="font-bold whitespace-nowrap">
            Uni-Helper 关系
          </h1>
        </div>

        <UDropdownMenu :items="menuItems">
          <UButton color="neutral" variant="ghost" square aria-label="设置">
            <SmartIcon name="ph:faders-horizontal" :size="18" />
          </UButton>
        </UDropdownMenu>
      </div>

      <div class="mt-2 flex flex-col gap-2">
        <UButton size="sm" color="neutral" variant="ghost" class="justify-start" @click="emits('openUniHelper', true)">
          <img :src="config.header.logo.light" alt="" class="size-6 dark:hidden">
          <img :src="config.header.logo.dark" alt="" class="hidden h-6 dark:block">
          Uni-Helper 包
        </UButton>
        <UButton size="sm" color="neutral" variant="ghost" class="justify-start" @click="emits('openNpm', true)">
          <SmartIcon name="simple-icons:npm" :size="20" />
          NPM 包
        </UButton>
      </div>
    </div>
  </div>
</template>
