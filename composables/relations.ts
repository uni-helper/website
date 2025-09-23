import type { PackageJson } from 'pkg-types'
import type { RelationPackage } from '~/types/package'
import { useStorage } from '@vueuse/core'

/**
 * Manage the menu state.
 */
export function useRelationsMenu() {
  const open = ref(false)

  const storage = useStorage('uni-helper-relations-menu', true)

  watch(open, (value) => {
    storage.value = value
  })

  onMounted(() => {
    open.value = storage.value
  })

  defineShortcuts({
    meta_m: {
      handler: () => {
        open.value = !open.value
      },
    },
  })

  return open
}

/**
 * Manage the legend state.
 */
export function useRelationsLegend() {
  const open = ref(false)

  const storage = useStorage('uni-helper-relations-legend', true)

  watch(open, (value) => {
    storage.value = value
  })

  onMounted(() => {
    open.value = storage.value
  })

  defineShortcuts({
    meta_l: {
      handler: () => {
        open.value = !open.value
      },
    },
  })

  return open
}

/**
 * Packages
 */
export const useUniHelperPackages = () => useState<RelationPackage[]>('relations:packages:uni-helper', () => [])
export const useNpmPackages = () => useState<RelationPackage[]>('relations:packages:npm', () => [])
export function useRelationsPackages() {
  const uniHelperPackages = useUniHelperPackages()
  const npmPackages = useNpmPackages()

  const packages = computed(() => [...uniHelperPackages.value, ...npmPackages.value])

  function addNpmPackages(packages: PackageJson[]) {
    const uniHelperPackageNames = uniHelperPackages.value.map(pkg => pkg.npmName)
    const relationsPackages = packages.map(pkg => toRelationsPackage(pkg, uniHelperPackageNames))

    const newPackages = relationsPackages.filter(pkg => !npmPackages.value.find(p => p.name === pkg.name) && !uniHelperPackages.value.find(p => p.name === pkg.name))

    npmPackages.value.push(...newPackages)
  }
  function addNpmPackage(pkg: PackageJson) {
    const relationsPackage = toRelationsPackage(pkg, uniHelperPackages.value.map(pkg => pkg.npmName))

    if (npmPackages.value.find(pkg => pkg.name === relationsPackage.name)) {
      throw createError({
        message: `Package ${relationsPackage.name} already exists in the list of npm packages`,
      })
    }

    if (uniHelperPackages.value.find(pkg => pkg.name === relationsPackage.name)) {
      throw createError({
        message: `Package ${relationsPackage.name} already exists in the list of UniHelper packages`,
      })
    }

    npmPackages.value.push(relationsPackage)
  }
  function removeNpmPackage(name: string) {
    const index = npmPackages.value.findIndex(pkg => pkg.name === name)

    if (index !== -1)
      npmPackages.value.splice(index, 1)
  }
  function removeAllNpmPackages() {
    npmPackages.value = []
  }

  return {
    uniHelperPackages,
    npmPackages,
    packages,

    addNpmPackages,
    addNpmPackage,
    removeNpmPackage,
    removeAllNpmPackages,
  }
}

/**
 * Selection
 */
export function useRelationsSelection() {
  const { uniHelperQuery, npmQuery } = useRelationsQuery()

  const uniHelperPackages = useUniHelperPackages()
  const uniHelperSelection = computed(() => {
    return uniHelperQuery.value?.map((name) => {
      return uniHelperPackages.value.find(pkg => pkg.npmName === name)
    }).filter(Boolean) as RelationPackage[] ?? []
  })

  const npmPackages = useNpmPackages()
  const npmSelection = computed(() => {
    return npmQuery.value?.map((name) => {
      return npmPackages.value.find(pkg => pkg.name === name)
    }).filter(Boolean) as RelationPackage[] ?? []
  })
  const selection = computed(() => {
    return uniHelperSelection.value.concat(npmSelection.value)
  })

  return {
    uniHelperSelection,
    npmSelection,
    selection,
  }
}

/**
 * Query
 */
export function useRelationsQuery() {
  const route = useRoute()

  /**
   * Packages
   */
  const hasPackagesQuery = computed(() => {
    return route.query['u[]'] || route.query['n[]']
  })

  const uniHelperQuery = computed(() => {
    if (hasPackagesQuery.value && route.query['u[]'])
      return toArray(route.query['u[]']) as string[]

    if (hasPackagesQuery.value && !route.query['u[]'])
      return [] as string[]

    return null
  })
  const npmQuery = computed(() => {
    if (hasPackagesQuery.value && route.query['n[]'])
      return toArray(route.query['n[]']) as string[]

    if (hasPackagesQuery.value && !route.query['n[]'])
      return [] as string[]

    return null
  })

  /**
   * Settings
   */
  const hasSettingsQuery = computed(() => {
    return route.query.showDependencies || route.query.showDevDependencies || route.query.showChildren
  })

  const showDependenciesQuery = computed(() => {
    if (hasSettingsQuery.value && route.query.showDependencies)
      return route.query.showDependencies === 'true'

    if (hasSettingsQuery.value && !route.query.showDependencies)
      return false

    return null
  })
  const showDevDependenciesQuery = computed(() => {
    if (hasSettingsQuery.value && route.query.showDevDependencies)
      return route.query.showDevDependencies === 'true'

    if (hasSettingsQuery.value && !route.query.showDevDependencies)
      return false

    return null
  })
  const showChildrenQuery = computed(() => {
    if (hasSettingsQuery.value && route.query.showChildren)
      return route.query.showChildren === 'true'

    if (hasSettingsQuery.value && !route.query.showChildren)
      return false

    return null
  })

  /**
   * Setter
   */
  function updateQuery(query: { uniHelper?: string[] | null, npm?: string[] | null, showDependencies?: boolean, showDevDependencies?: boolean, showChildren?: boolean }, replace: boolean = false) {
    /**
     * Get the query as default value to keep the current value if not provided.
     */
    navigateTo({
      query: {
        'u[]': query.uniHelper ?? uniHelperQuery.value,
        'n[]': query.npm ?? npmQuery.value,
        'showDependencies': String(query.showDependencies ?? showDependenciesQuery.value ?? true),
        'showDevDependencies': String(query.showDevDependencies ?? showDevDependenciesQuery.value ?? false),
        'showChildren': String(query.showChildren ?? showChildrenQuery.value ?? false),
      },
    }, { replace })
  }

  const hasSelectionAndSettings = computed(() => {
    return (route.query['u[]'] || route.query['n[]']) && route.query.showDependencies && route.query.showDevDependencies && route.query.showChildren
  })

  return {
    hasPackagesQuery,
    uniHelperQuery,
    npmQuery,

    hasSettingsQuery,
    showDependenciesQuery,
    showDevDependenciesQuery,
    showChildrenQuery,

    updateQuery,

    hasSelectionAndSettings,
  }
}

/**
 * Settings
 */
export function useRelationsSettings() {
  const { showDependenciesQuery, showDevDependenciesQuery, showChildrenQuery } = useRelationsQuery()

  const settings = computed(() => {
    return {
      showDependencies: showDependenciesQuery.value ?? true,
      showDevDependencies: showDevDependenciesQuery.value ?? false,
      showChildren: showChildrenQuery.value ?? false,
    }
  })

  return {
    settings,
  }
}

/**
 * Storage
 */
export function useRelationsStorage() {
  const selectionStorage = useLocalStorage('uni-helper-relations-selection', {
    uniHelper: [] as string[],
    npm: [] as string[],
  })

  const settingsStorage = useLocalStorage('uni-helper-relations-settings', {
    showDependencies: true,
    showDevDependencies: true,
    showChildren: true,
  })

  return {
    selectionStorage,
    settingsStorage,
  }
}
