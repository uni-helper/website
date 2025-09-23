import type { Package, PackageContent, Project } from '~/types/package'
import { serverQueryContent } from '#content/server'
import { fetchPackageJsonFromGitHub } from '~/server/utils/github'

export default defineEventHandler(async (event) => {
  const { projects: _projects } = await serverQueryContent<PackageContent>(event).where({ _path: /^\/packages$/ }).findOne()
  const projects = Object.values(_projects || {}).flat() as Project[]

  const populatedPackages = await Promise.all(
    projects.map(async (pkg) => {
      const [npmPackageJson, githubPackageJson] = await Promise.all([
        pkg.npm ? fetchPackageJson(pkg.npm) : null,
        pkg.github ? fetchPackageJsonFromGitHub(pkg.github) : null,
      ])
      const packageJson = npmPackageJson || githubPackageJson
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
