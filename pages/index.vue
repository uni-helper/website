<script setup lang="ts">
import type { Repo } from '~/types'

const searchVal = ref('')
const hiddenRepos = new Set([
  '.github',
  'uni-helper.github.io',
  'discussions',
  'website',
  'renovate-config',
])

const { data: repos } = await useFetch<Repo[]>(
  'https://ungh.cc/orgs/uni-helper/repos',
  {
    transform: (res: any) => {
      return res.repos
        .filter((repo: any) => !hiddenRepos.has(repo.name))
        .sort((a: any, b: any) => b.stars - a.stars)
    },
  },
)

function filterSearch(repos: Repo[] | null) {
  if (!repos)
    return []
  return repos.filter((repo: any) =>
    repo.name.toLowerCase().includes(searchVal.value.toLowerCase()),
  )
}

useSeoMeta({
  description: '探索 Uni Helper 工具列表',
})
</script>

<template>
  <div>
    <div>
      <input
        v-model="searchVal"
        type="text"
        placeholder="搜索"
        mb-4 w-full border bg-light-100 p-5 text-xl dark:border-dark-200 dark-bg-dark
      >
    </div>
    <div grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4>
      <ProjectCard
        v-for="repo in filterSearch(repos)"
        :key="repo.id"
        :repo="repo"
      />
    </div>
  </div>
</template>
