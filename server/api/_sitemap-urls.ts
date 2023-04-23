export default cachedEventHandler(async () => {
  const repos = await $fetch('/api/repos')
  return repos.map((repo) => {
    return { loc: repo.name, lastmod: repo.updatedAt }
  })
}, {
  name: 'sitemap-dynamic-urls',
  maxAge: 60 * 10,
})
