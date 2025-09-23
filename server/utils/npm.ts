import type { PackageJson } from 'pkg-types'

const cachedNpmPackages = defineCachedFunction(async (name: string) => {
  const packageJson = await $fetch<PackageJson>(`https://registry.npmjs.org/${name}/latest`)

  return packageJson
}, {
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  group: 'npm',
  name: 'npmPackages',
  getKey: (name: string) => `npmPackages:${name}`,
})

export async function fetchPackageJson(name: string): Promise<PackageJson> {
  const packageJson = await cachedNpmPackages(name)

  return packageJson
}
