import type { PackageJson } from 'pkg-types'
import zod from 'zod'

export async function fetchNpmPackage(name: string) {
  const data = await $fetch(`https://registry.npmjs.com/${name}/latest`)

  const validatedData = zod.object({
    name: zod.string().or(zod.undefined()),
    description: zod.string().or(zod.undefined()),
    dependencies: zod.any().or(zod.undefined()),
    devDependencies: zod.any().or(zod.undefined()),
  }).parse(data)

  return validatedData satisfies PackageJson
}
