import type { RelationPackage } from '~/types/package'

interface SelectionSettings {
  showDependencies: boolean
  showDevDependencies: boolean
}

/**
 * Packages that depend on the current selection, keeping only the selected
 * dependency names. A package qualifies only for a dependency type that is
 * currently visible.
 */
export function getSelectionChildren(
  packages: RelationPackage[],
  selectionNames: string[],
  settings: SelectionSettings,
): RelationPackage[] {
  return packages
    .filter((pkg) => {
      if (settings.showDependencies && pkg.dependencies.some(dep => selectionNames.includes(dep)))
        return true

      if (settings.showDevDependencies && pkg.devDependencies.some(dep => selectionNames.includes(dep)))
        return true

      return false
    })
    .map(pkg => ({
      ...pkg,
      dependencies: pkg.dependencies.filter(dep => selectionNames.includes(dep)),
      devDependencies: pkg.devDependencies.filter(dep => selectionNames.includes(dep)),
    }))
}
