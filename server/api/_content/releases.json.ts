import type { MDCRoot } from '@nuxtjs/mdc'
import type { Project } from '~/types/package'
import type { Release } from '~/types/releases'

export default defineEventHandler(async (event) => {
  // 项目列表在 nuxt.config 里从 content/1.packages.yml 读入，避免运行时依赖内容数据库。
  const projects = useRuntimeConfig(event).projects as unknown as Project[]

  const releases: Release[] = await Promise.all(
    projects.map(async (project) => {
      const repo = project.github
      if (!repo)
        return []

      const repoReleases = await fetchReleasesFromGitHub(repo)
      return Promise.all(
        repoReleases
          .filter(release => release.draft === false)
          .map(async (release) => {
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
            }
          }),
      )
    }),
  ).then(results => results.flat().filter(Boolean))

  return releases
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)
})
