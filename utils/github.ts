import type { PackageJson } from 'pkg-types'
import zod from 'zod'

/**
 * Fetch a single repo from GitHub.
 */
export async function fetchGitHubRepo(name: string) {
  const data = await $fetch(`https://ungh.cc/repos/${name}`)

  const validatedData = zod.object({
    repo: zod.object({
      id: zod.number(),
      name: zod.string(),
      repo: zod.string(),
      description: zod.string(),
      createdAt: zod.string(),
      updatedAt: zod.string(),
      pushedAt: zod.string(),
      stars: zod.number(),
      watchers: zod.number(),
      forks: zod.number(),
      defaultBranch: zod.string(),
    }),
  }).parse(data)

  return validatedData
}

/**
 * Fetch every repo from an organization from GitHub.
 */
export async function fetchGitHubRepos(organization: string) {
  const data = await $fetch(`https://ungh.cc/orgs/${organization}/repos`)

  const validatedData = zod.object({
    repos: zod.array(zod.object({
      id: zod.number(),
      name: zod.string(),
      repo: zod.string(),
      description: zod.string().or(zod.null()),
      createdAt: zod.string(),
      updatedAt: zod.string(),
      pushedAt: zod.string(),
      stars: zod.number(),
      watchers: zod.number(),
      forks: zod.number(),
      defaultBranch: zod.string(),
    })),
  }).parse(data)

  return validatedData
}

/**
 * Fetch every files path from a repo from GitHub.
 */
export async function fetchGitHubFiles(name: string, branch: string) {
  const data = await $fetch(`https://ungh.cc/repos/${name}/files/${branch}`)

  const validatedData = zod.object({
    meta: zod.object({
      sha: zod.string(),
    }),
    files: zod.array(zod.object({
      path: zod.string(),
      mode: zod.string(),
      sha: zod.string(),
      size: zod.number(),
    })),
  }).parse(data)

  return validatedData
}

/**
 * Fetch content from a file from a repo from GitHub.
 */
export async function fetchGitHubFile(name: string, branch: string, path: string) {
  const data = await $fetch(`https://ungh.cc/repos/${name}/files/${branch}/${path}`)
  return JSON.parse(data as any) as PackageJson
}

/**
 * Search for content for every `package.json` in a GitHub repo
 */
export async function fetchPackagesFromGitHubRepo(repo: string, defaultBranch: string) {
  const { files } = await fetchGitHubFiles(repo, defaultBranch)

  const unwantedPaths = [
    'playground',
    'examples',
    'tests',
    'test',
  ]
  const packageJsonPaths = files.filter(file => file.path.includes('package.json') && !unwantedPaths.some(path => file.path.includes(path)))

  const packageJsonContents = await Promise.all(
    packageJsonPaths.map(async (path) => {
      const contents = await fetchGitHubFile(repo, defaultBranch, path.path)
      return contents as PackageJson
    }),
  ).then(contents => contents.filter(content => content.name))

  return packageJsonContents
}
