import type { Package, Project } from '~/types/package'
import { fetchPackageJsonFromGitHub } from '~/server/utils/github'

export default defineEventHandler(async (event) => {
  // 项目列表在 nuxt.config 里从 content/1.packages.yml 读入，避免运行时依赖内容数据库。
  const projects = useRuntimeConfig(event).projects as unknown as Project[]

  return await Promise.all(
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
              dependencies: Object.keys(packageJson.dependencies || {}),
              devDependencies: Object.keys(packageJson.devDependencies || {}),
            }
          : undefined,
      } satisfies Package
    }),
  )
})
