const hiddenRepos = new Set([
  '.github',
  'uni-helper.github.io',
  'discussions',
  'website',
  'renovate-config',
])

export default defineEventHandler(async () => {
  const { repos } = await $fetch('https://ungh.cc/orgs/uni-helper/repos') as any
  return repos
    .filter((repo: any) => !hiddenRepos.has(repo.name))
    .sort((a: any, b: any) => b.stars - a.stars)
})
