import { fetchGitHubFile, fetchGitHubRepo } from '@/utils/github'

const cachedGitHubPackageJsons = defineCachedFunction(async (repo: string) => {
  const { repo: repository } = await fetchGitHubRepo(repo)
  const packageJsonPath = 'package.json'
  if (!packageJsonPath)
    return null
  try {
    return await fetchGitHubFile(repo, repository.defaultBranch, packageJsonPath)
  }
  catch (_error) {
    return null
  }
}, {
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  group: 'github',
  name: 'githubPackages',
  getKey: (name: string) => `githubPackages:${name}`,
})

export async function fetchPackageJsonFromGitHub(repo: string) {
  return await cachedGitHubPackageJsons(repo)
}
