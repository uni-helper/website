<script lang="ts" setup>
import type { Package, RelationPackage } from '~/types/package'

const route = useRoute()

const { data: page, error } = await useAsyncData<any>(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

const config = useAppConfig().shadcnDocs

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  titleTemplate: `%s - ${config.header.title}`,
})

defineOgImageComponent('ShadcnDocs', {
  title: page.value?.title,
  description: page.value?.description,
})
const loading = ref(true)

const openUniHelper = ref(false)
const openNpm = ref(false)
const openAbout = ref(false)

const openMenu = useRelationsMenu()
const openLegend = useRelationsLegend()

const { uniHelperPackages, npmPackages, addNpmPackage } = useRelationsPackages()

const { data, error: errorPackages } = await useAsyncData('relations:packages:uni-helper', () => $fetch('/api/_content/packages.json'), {
  transform: (data: any) => {
    const packages = data.filter((pkg: Package) => pkg.npm)
    const names = packages.map((pkg: Package) => pkg.npm?.name)

    return packages.map((pkg: Package) => {
      return {
        name: pkg.title,
        npmName: pkg.npm?.name ?? 'unknown',
        icon: pkg.icon,
        description: pkg.description,
        dependencies: pkg.npm?.dependencies.filter((dep: string) => names.includes(dep)) ?? [],
        devDependencies: pkg.npm?.devDependencies.filter((dep: string) => names.includes(dep)) ?? [],
        source: 'uni-helper',
      } satisfies RelationPackage
    },
    ) as RelationPackage[]
  },
})

if (errorPackages.value) {
  throw createError({
    statusCode: errorPackages.value.statusCode,
    message: errorPackages.value.statusMessage,
    fatal: true,
  })
}

if (data.value)
  uniHelperPackages.value = data.value

const { uniHelperQuery, npmQuery, updateQuery, hasSelectionAndSettings, showDependenciesQuery, showDevDependenciesQuery, showChildrenQuery } = useRelationsQuery()
const { selection } = useRelationsSelection()
const { selectionStorage, settingsStorage } = useRelationsStorage()

/**
 * Keep storage up to date.
 */
watch(() => route.query, (value) => {
  /**
   * Settings
   */
  if (value.showDependencies)
    settingsStorage.value.showDependencies = value.showDependencies === 'true'
  if (value.showDevDependencies)
    settingsStorage.value.showDevDependencies = value.showDevDependencies === 'true'
  if (value.showChildren)
    settingsStorage.value.showChildren = value.showChildren === 'true'

  /**
   * Selection
   */
  if (value['u[]'])
    selectionStorage.value.uniHelper = toArray(value['u[]'] as string[])
  if (value['n[]'])
    selectionStorage.value.npm = toArray(value['n[]'] as string[])
})

/**
 * Preload npm packages before rendering the graph.
 * Lifecycle can't be async so we need to do it before.
 */
if (import.meta.client) {
  const package_ = npmQuery.value ?? selectionStorage.value.npm

  if (package_) {
    await Promise.all([
      ...package_.filter((p) => {
        return !uniHelperPackages.value.find(pkg => pkg.npmName === p) && !npmPackages.value.find(pkg => pkg.name === p)
      }).map(async (name) => {
        try {
          const pkg = await fetchNpmPackage(name)
          addNpmPackage(pkg)
        }
        catch (error) {
          /**
           * Silent error
           */
          console.error(error)
        }
      }),
    ])
  }
}

onBeforeMount(() => {
  const isSelectionEmpty = !uniHelperQuery.value?.length && !npmQuery.value?.length && !selectionStorage.value.uniHelper.length && !selectionStorage.value.npm.length

  /**
   * Update the query when the application load.
   * 1. If there is nothing in the query and in the storage, we use the default packages (all UniHelper and none npm).
   * 2. If there is something in the query, we use it.
   * 3. If there is something in the storage (restore previous state), we use it.
   */
  updateQuery({
    uniHelper: isSelectionEmpty ? uniHelperPackages.value.map(p => p.npmName) : uniHelperQuery.value ?? selectionStorage.value.uniHelper,
    npm: isSelectionEmpty ? [] : npmQuery.value ?? selectionStorage.value.npm,
    showDependencies: showDependenciesQuery.value ?? settingsStorage.value.showDependencies,
    showDevDependencies: showDevDependenciesQuery.value ?? settingsStorage.value.showDevDependencies,
    showChildren: showChildrenQuery.value ?? settingsStorage.value.showChildren,
  }, true)
})

const openSlideover = ref(false)
const selectedNode = ref<RelationPackage | null>(null)
function onSelectedNode(pkg: RelationPackage) {
  selectedNode.value = pkg
  openSlideover.value = true
}
function onViewRelations(name: string) {
  updateQuery({
    uniHelper: [name],
  })
  openSlideover.value = false
}

defineShortcuts({
  meta_i: {
    handler: () => {
      openAbout.value = !openAbout.value
    },
  },
  meta_h: {
    handler: () => {
      navigateTo({
        path: 'https://github.com/uni-helper/website/issues',
      }, { external: true, open: { target: '_blank' } })
    },
  },
})
</script>

<template>
  <div class="w-full h-screen fixed top-0 overflow-hidden">
    <RelationsMenu
      v-if="openMenu" v-model:about="openAbout" v-model:menu="openMenu" v-model:legend="openLegend"
      class="absolute left-4 top-20 z-10" @open-uni-helper="openUniHelper = $event" @open-npm="openNpm = $event"
    />
    <RelationsLegend v-if="openLegend" class="absolute z-30 bottom-4 left-4" />
    <RelationsModalUniHelper v-model:open="openUniHelper" />
    <RelationsModalNpm v-model:open="openNpm" />
    <RelationsModalAbout v-model:open="openAbout">
      <ContentRenderer :value="page" />
    </RelationsModalAbout>
    <RelationsSlideoverPackage v-model:open="openSlideover" :package="selectedNode" @view-relations="onViewRelations" />
    <RelationsGraph
      v-if="hasSelectionAndSettings" class="w-full h-full" @loading="loading = $event"
      @selected-node="onSelectedNode"
    />
    <div
      v-if="loading || !selection.length"
      class="absolute z-0 inset-0 flex items-center justify-center font-medium backdrop-blur-sm"
    >
      <span class="flex flex-row items-center">
        <template v-if="loading">
          <SmartIcon name="i-ph:circle-notch" class="animate-spin" />
          <span class="ml-2">
            加载中...
          </span>
        </template>
        <template v-else>
          <UiButton aria-label="打开关于面板" size="icon" variant="ghost" @click="openAbout = true">
            <SmartIcon name="i-ph:info" />
          </UiButton>
          <span class="ml-2">
            请选择一个包以开始
          </span>
        </template>
      </span>
    </div>

    <UiButton
      class="absolute z-20 bottom-4 right-4 rounded-full" size="icon" aria-label="打开关于面板" variant="outline"
      @click="openAbout = true"
    >
      <SmartIcon name="i-ph:info" />
    </UiButton>
  </div>
</template>
