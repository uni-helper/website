<script lang="ts" setup>
import type { Data, Edge, Options } from 'vis-network'
import type { RelationPackage } from '~/types/package'
import { useMediaQuery } from '@vueuse/core'
import colors from 'tailwindcss/colors'
import { getColors } from 'theme-colors'
import { Network } from 'vis-network'
import { getSelectionChildren } from '~/utils/relations'

const emits = defineEmits<{
  loading: [boolean]
  selectedNode: [RelationPackage]
}>()
const _black = colors.black
const _white = colors.white
const _cyan = colors.cyan
const _pink = colors.pink
const _violet = colors.violet
const _brand = getColors('#2b9939')

const colorMode = useColorMode()
const isMobile = useMediaQuery('(max-width: 767px)')
const { packages } = useRelationsPackages()
const { selection } = useRelationsSelection()
const { settings } = useRelationsSettings()

const container = ref<HTMLElement | null>(null)

const selectionNames = computed<string[]>(() => {
  return selection.value.map(select => select.npmName)
})

function getIconifyIcon(icon?: string) {
  if (icon) {
    const regex = /i-([\w-]+?)[:-]([\w-]+)$/
    const match = icon.match(regex)
    if (match) {
      const prefix = match[1]
      const name = match[2]
      return `https://api.iconify.design/${prefix}:${name}.svg`
    }
  }
  return `https://api.iconify.design/simple-icons/npm.svg`
}

const data = computed<Data>(() => {
  /** Selection */
  const selectionNodes: Data['nodes'] = selection.value.map((select) => {
    return {
      id: select.npmName,
      label: select.name,
      image: getIconifyIcon(select.icon),
      group: 'selection',
    }
  })

  // Use a condition to avoid unnecessary computation
  const selectionChildrenPackages: RelationPackage[] = []
  if (settings.value.showChildren)
    selectionChildrenPackages.push(...getSelectionChildren(packages.value, selectionNames.value, settings.value))

  /** Dependencies and Dev Dependencies */
  const allDependencies = [...selection.value, ...selectionChildrenPackages].flatMap((pkg) => {
    const deps = []

    // Add current package for selection children packages
    deps.push(pkg.npmName)

    if (settings.value.showDependencies)
      deps.push(...pkg.dependencies)

    if (settings.value.showDevDependencies)
      deps.push(...pkg.devDependencies)

    return deps
  })

  // Remove duplicates in all dependencies
  const dedupedAllDependencies = [...new Set(allDependencies)]

  // Remove selected packages from all dependencies since they are already in selection
  const dedupedWithoutSelectionAllDependencies = dedupedAllDependencies.filter((dep) => {
    return !selectionNames.value.includes(dep)
  })

  const allDependenciesNodes: Data['nodes'] = dedupedWithoutSelectionAllDependencies.flatMap((dep) => {
    const package_ = packages.value.find((pkg) => {
      return pkg.npmName === dep
    }) as RelationPackage

    return {
      id: package_.npmName,
      label: package_.name,
      image: getIconifyIcon(package_.icon),
      group: 'dependencies',
    }
  })

  const nodes: Data['nodes'] = [
    ...selectionNodes,
    ...allDependenciesNodes,
  ]

  // Order matters since we want to show the dependencies and devDependencies of the selected packages first (otherwise, some packages will not have all their dependencies shown)
  const dedupePackages = [...selection.value, ...selectionChildrenPackages].reduce((acc, pkg) => {
    const index = acc.findIndex((p) => {
      return p.npmName === pkg.npmName
    })

    if (index === -1)
      acc.push(pkg)

    return acc
  }, [] as RelationPackage[])

  const edges: Data['edges'] = [
    ...dedupePackages.flatMap((pkg) => {
      const data: Edge[] = []

      if (settings.value.showDependencies) {
        const color = colorMode.preference === 'light' ? _pink[300] : _pink[900]
        const highlight = colorMode.preference === 'light' ? _pink[500] : _pink[800]
        data.push(...pkg.dependencies.map((dep) => {
          return {
            from: pkg.npmName,
            to: dep,
            color: {
              color,
              highlight,
            },
            relation: 'dependencies',
            arrows: 'to',
            dashes: false,
          }
        }))
      }

      if (settings.value.showDevDependencies) {
        const color = colorMode.preference === 'light' ? _violet[300] : _violet[900]
        const highlight = colorMode.preference === 'light' ? _violet[500] : _violet[800]
        data.push(...pkg.devDependencies.map((dep) => {
          return {
            from: pkg.npmName,
            to: dep,
            color: {
              color,
              highlight,
            },
            relation: 'devDependencies',
            arrows: 'to',
            dashes: true,
          }
        }))
      }

      return data
    }),
  ]

  return {
    nodes,
    edges,
  }
})

let network: Network | null = null
let stopDataWatch: (() => void) | undefined
let stopColorWatch: (() => void) | undefined

onMounted(() => {
  const generalOptions: Options = {
    nodes: {
      shape: 'circularImage',
      imagePadding: 6,
      size: 16,
    },
    edges: {
      arrows: {
        to: {
          scaleFactor: 0.2,
        },
      },
    },
    physics: {
      repulsion: {
        centralGravity: 0.7,
        springLength: 100,
        springConstant: 0.01,
      },
      maxVelocity: 146,
      solver: 'forceAtlas2Based',
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 200,
      },
    },
  }
  const lightOptions: Options = {
    groups: {
      selection: {
        font: {
          color: _black,
          face: 'Nunito',
        },
        color: {
          background: _brand[300],
          border: _brand[500],
          highlight: {
            background: _brand[400],
            border: _brand[600],
          },
        },
      },
      dependencies: {
        font: {
          color: _black,
          face: 'Nunito',
        },
        color: {
          background: _cyan[50],
          border: _cyan[300],
          highlight: {
            background: _cyan[100],
            border: _cyan[500],
          },
        },
      },
    },
  }
  const darkOptions: Options = {
    groups: {
      selection: {
        font: {
          color: _white,
          face: 'Nunito',
        },
        color: {
          background: _brand[900],
          border: _brand[600],
          highlight: {
            background: _brand[700],
            border: _brand[500],
          },
        },
      },
      dependencies: {
        font: {
          color: _white,
          face: 'Nunito',
        },
        color: {
          background: _cyan[900],
          border: _cyan[600],
          highlight: {
            background: _cyan[700],
            border: _cyan[500],
          },
        },
      },
    },
  }

  const graph = new Network(container.value!, data.value, {
    ...generalOptions,
    ...colorMode.value === 'light' ? lightOptions : darkOptions,
  })
  network = graph

  // Does not emit the event if there is no data
  graph.on('stabilizationIterationsDone', () => {
    // At 390px the default fit overlaps most labels. Start closer on mobile;
    // pan and pinch-zoom remain available for the rest of the graph.
    if (isMobile.value)
      graph.moveTo({ scale: 1.4 })
    emits('loading', false)
  })

  // So if the selection is empty, we do not show the loading
  if (selection.value.length === 0)
    emits('loading', false)

  graph.on('doubleClick', ({ nodes }) => {
    const clickedNode = nodes[0]

    if (!clickedNode)
      return

    const _package = packages.value.find((pkg) => {
      return pkg.npmName === nodes[0]
    }) as RelationPackage

    emits('selectedNode', _package)
  })

  stopDataWatch = watch(data, () => {
    if (data.value.nodes?.length)
      emits('loading', true)
    graph.setData(data.value)
  })

  stopColorWatch = watch(colorMode, (newMode) => {
    graph.setOptions({
      ...generalOptions,
      ...(newMode === 'light' ? lightOptions : darkOptions),
    })
  })
})

onBeforeUnmount(() => {
  stopDataWatch?.()
  stopColorWatch?.()
  network?.destroy()
  network = null
})
</script>

<template>
  <div ref="container" />
</template>
