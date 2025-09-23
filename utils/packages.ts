import type { PackageJson } from 'pkg-types'
import type { RelationPackage } from '~/types/package'

/**
 * Convert a package.json to a package for the relations section.
 */
export function toRelationsPackage(packageJson: PackageJson, uniHelperNames: string[]): RelationPackage {
  if (!packageJson.name)
    throw new Error('Package.json does not contain a name')

  return {
    name: packageJson.name,
    npmName: packageJson.name,
    description: packageJson.description,
    dependencies: Object.keys(packageJson.dependencies || {}).filter(dep => uniHelperNames.includes(dep)),
    devDependencies: Object.keys(packageJson.devDependencies || {}).filter(dep => uniHelperNames.includes(dep)),
    source: 'npm',
  }
}
