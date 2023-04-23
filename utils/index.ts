import type { UseSeoMetaInput } from 'unhead'
import { repos, siteName } from '~/data/meta'
import type { Repo } from '~/types'

export function formatStarCount(num: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)
}

export function createSeoMetaInput(repo: Repo) {
  const hardCodeMeta = repos[repo.name] as any
  const repoMeta: UseSeoMetaInput = {
    title: repo.name,
    ogTitle: `${repo.name} - ${siteName}`,
    description: repo.description,
    ogDescription: repo.description,
  }
  if (hardCodeMeta) {
    if (hardCodeMeta.keywords)
      hardCodeMeta.keywords = hardCodeMeta.keywords.join(',')

    return {
      ...repoMeta,
      ...hardCodeMeta,
    } as UseSeoMetaInput
  }
  return repoMeta
}
