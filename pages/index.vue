<script setup lang="ts">
import type { Repo } from '~/types'

const searchVal = ref('')

const hiddenRepos = new Set([
  '.github',
  'uni-helper.github.io',
  'discussions',
  'website',
  'renovate-config',
  'stater-ts',
])

const { data: repos } = await useFetch<Repo[]>('https://ungh.cc/orgs/uni-helper/repos', {
  transform: (res: any) => {
    return res.repos.filter((repo: any) => !hiddenRepos.has(repo.name))
      .sort((a: any, b: any) => b.stars - a.stars)
  },
})

function filterSearch(repos: any) {
  return repos?.filter((repo: any) => repo.name.toLowerCase().includes(searchVal.value.toLowerCase()))
}
</script>

<template>
  <div>
    <input
      v-model="searchVal" type="text" placeholder="搜索" dark="bg-dark" border="~ gray-200 dark:gray-700" mb-4 w-full
      rounded-md bg-light-100 px-5 py-2 text-xl hover:border-primary outline="none active:none"
    >
    <div grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4>
      <ProjectCard v-for="repo of filterSearch(repos)" :key="repo.id" :repo="repo" />
    </div>
    <ClientOnly>
      <TeamMember />
    </ClientOnly>
  </div>
</template>
