import type { MDCRoot } from '@nuxtjs/mdc'
import type { PackageContent, Project } from '~/types/package'
import type { Release } from '~/types/releases'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const { projects: _projects } = await serverQueryContent<PackageContent>(event).where({ _path: /^\/packages$/ }).findOne()
  const projects = Object.values(_projects || {}).flat() as Project[]
  const releases: Release[] = await Promise.all(
    projects.map(async (preject) => {
      const repo = preject.github
      if (!repo)
        return []
      const releases = await fetchReleasesFromGitHub(repo)
      return Promise.all(
        releases
          .filter(r => r.draft === false)
          .map(async (release) => {
            let body: MDCRoot = {
              type: 'root',
              children: [],
            }
            try {
              const markdown = await parseMarkdown(release.markdown ?? '')
              body = markdown.body
            }
            catch (e) {
              console.warn(`Failed to parse markdown for release ${release.tag} of repo ${repo}:`, e)
              console.warn('Markdown content:', release.markdown)
            }
            return {
              url: `https://github.com/${repo}/releases/tag/${release.tag}`,
              icon: preject.icon,
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

  return releases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 20)
})
