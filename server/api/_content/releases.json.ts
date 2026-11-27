import type { MDCRoot } from '@nuxtjs/mdc'
import type { Project } from '~/types/package'
import type { Release } from '~/types/releases'

interface RawRelease {
  project: Project
  repo: string
  release: any
}

export default defineEventHandler(async (event) => {
  // 项目列表在 nuxt.config 里从 content/1.packages.yml 读入，避免运行时依赖内容数据库。
  const projects = useRuntimeConfig(event).projects as unknown as Project[]

  const results = await Promise.allSettled(
    projects.map(async (project) => {
      const repo = project.github
      if (!repo)
        return [] as RawRelease[]

      const repoReleases = await fetchReleasesFromGitHub(repo)
      return repoReleases
        .filter(release => release.draft === false)
        .map(release => ({ project, repo, release }))
    }),
  )

  const rawReleases = results
    .flatMap((result, index) => {
      if (result.status === 'fulfilled')
        return result.value

      console.warn(`Failed to fetch releases for ${projects[index]?.github ?? 'unknown'}:`, result.reason)
      return []
    })
    .sort((a, b) => new Date(b.release.publishedAt).getTime() - new Date(a.release.publishedAt).getTime())
    .slice(0, 20)

  // Parse only the 20 releases that are returned, not every release from every repo.
  return await Promise.all(rawReleases.map(async ({ project, repo, release }) => {
    let body: MDCRoot = {
      type: 'root',
      children: [],
    }

    try {
      const markdown = await parseMarkdown(release.markdown ?? '', { highlight: false })
      body = markdown.body
    }
    catch (error) {
      console.warn(`Failed to parse markdown for release ${release.tag} of repo ${repo}:`, error)
    }

    return {
      url: `https://github.com/${repo}/releases/tag/${release.tag}`,
      icon: project.icon ?? 'lucide:package',
      repo,
      tag: release.tag,
      title: release.name || release.tag,
      date: release.publishedAt,
      body,
    } satisfies Release
  }))
})
