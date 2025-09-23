import type { Package, PackageContent, Project } from '~/types/package'
import { serverQueryContent } from '#content/server'
import { fetchPackageJsonFromGitHub } from '~/server/utils/github'

export default defineEventHandler(async (event) => {
  const { projects: _projects } = await serverQueryContent<PackageContent>(event).where({ _path: /^\/packages$/ }).findOne()
  const projects = Object.values(_projects || {}).flat() as Project[]

  const populatedPackages = await Promise.all(
    projects.map(async (pkg) => {
      const packageJson = pkg.npm
        ? await fetchPackageJson(pkg.npm)
        : pkg.github
          ? await fetchPackageJsonFromGitHub(pkg.github)
          : null
      return {
        id: pkg.name.toLowerCase(),
        title: pkg.name,
        icon: pkg.icon,
        description: pkg.desc,
        npm: packageJson
          ? {
              name: packageJson.name || pkg.npm || pkg.github || pkg.name,
              dependencies: Object.keys(packageJson?.dependencies || {}),
              devDependencies: Object.keys(packageJson?.devDependencies || {}),
            }
          : undefined,
      } satisfies Package
    },
    ),
  )

  return populatedPackages
})
