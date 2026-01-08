<script lang="ts" setup>
const emits = defineEmits<{
  openUniHelper: [boolean]
  openNpm: [boolean]
}>()

const openAbout = defineModel<boolean>('about', { required: true })
const openMenu = defineModel<boolean>('menu', { required: true })
const openLegend = defineModel<boolean>('legend', { required: true })

const { metaSymbol } = useShortcuts()

const { updateQuery } = useRelationsQuery()
const { settings } = useRelationsSettings()
const { logo } = useConfig().value.header

const settingsItems = computed(() => [[{
  label: settings.value.showDependencies ? '隐藏依赖' : '显示依赖',
  icon: 'ph:graph',
  click: () => {
    updateQuery({ showDependencies: !settings.value.showDependencies })
  },

}, {
  label: settings.value.showDevDependencies ? '隐藏开发依赖' : '显示开发依赖',
  icon: 'ph:line-segments',
  click: () => {
    updateQuery({ showDevDependencies: !settings.value.showDevDependencies })
  },

}], [{
  // Children can be dependencies or devDependencies. It's not standalone but related to the previous
  label: settings.value.showChildren ? '隐藏子节点' : '显示子节点',
  icon: 'ph:tree-structure',
  click: () => {
    updateQuery({ showChildren: !settings.value.showChildren })
  },
}], [
  {
    label: openMenu.value ? '隐藏菜单' : '显示菜单',
    icon: 'ph:house',
    shortcuts: [metaSymbol.value, 'm'],
    click: () => {
      openMenu.value = !openMenu.value
    },
  },
  {
    label: openLegend.value ? '隐藏图例' : '显示图例',
    icon: 'ph:bookmark',
    shortcuts: [metaSymbol.value, 'l'],
    click: () => {
      openLegend.value = !openLegend.value
    },
  },
], [
  {
    label: '关于',
    icon: 'ph:info',
    shortcuts: [metaSymbol.value, 'i'],
    click: () => {
      openAbout.value = !openAbout.value
    },
  },
  {
    label: '帮助',
    icon: 'simple-icons:github',
    shortcuts: [metaSymbol.value, 'h'],
    to: 'https://github.com/uni-helper/website/issues',
    target: '_blank',
  },
  {
    label: '讨论',
    icon: 'simple-icons:github',
    to: 'https://github.com/orgs/uni-helper/discussions',
    target: '_blank',
  },
]])
</script>

<template>
  <div class="select-none">
    <UiCard class="grow p-4 sm:p-4">
      <div class="mb-2 flex justify-between items-center gap-4">
        <div class="flex items-end gap-4">
          <h1 class="font-bold whitespace-nowrap">
            Uni-Helper 关系
          </h1>
        </div>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton size="icon" variant="ghost">
              <SmartIcon name="ph:faders-horizontal" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="w-56">
            <UiDropdownMenuGroup v-for="group in settingsItems" :key="group[0].label">
              <UiDropdownMenuSeparator v-if="group !== settingsItems[0]" class="my-1" />
              <UiDropdownMenuItem v-for="item in group" :key="item.label" class="relative" @click="item.click">
                <SmartIcon :name="item.icon" />
                <span>{{ item.label }}</span>
                <UiDropdownMenuShortcut v-if="(item as any).shortcuts" class="flex gap-1">
                  <span v-for="(shortcut, index) in (item as any).shortcuts" :key="index" class="uppercase">
                    {{ shortcut }}
                  </span>
                </UiDropdownMenuShortcut>
                <!-- @vue-expect-error ignore -->
                <NuxtLink v-if="item.to" :to="item.to" :target="item.target" class="absolute inset-0" />
              </UiDropdownMenuItem>
            </UiDropdownMenuGroup>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>

      <div class="mt-2 flex flex-col gap-2">
        <UiButton size="sm" variant="ghost" @click="emits('openUniHelper', true)">
          <NuxtImg :src="logo.light" class="size-6 dark:hidden" />
          <NuxtImg :src="logo.dark" class="hidden h-6 dark:block" />
          Uni-Helper 包
        </UiButton>
        <UiButton size="sm" variant="ghost" @click="emits('openNpm', true)">
          <SmartIcon name="simple-icons:npm" :size="20" />
          NPM 包
        </UiButton>
      </div>
    </UiCard>
  </div>
</template>
