<script setup lang="ts">
import type { Repo } from '~/types'

const searchVal = ref('')

const { data: repos } = await useFetch<Repo[]>('/api/repos')

function filterSearch(repos: any) {
  return repos?.filter((repo: any) => repo.name.toLowerCase().includes(searchVal.value.toLowerCase()))
}
</script>

<template>
  <div>
    <div>
      <input
        v-model="searchVal" type="text" placeholder="搜索" mb-4 w-full border bg-light-100 p-5 text-xl
        dark:border-dark-200 dark-bg-dark
      >
    </div>
    <div grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4>
      <ProjectCard v-for="repo in filterSearch(repos)" :key="repo.id" :repo="repo" />
    </div>
    <ClientOnly>
      <TeamMember />
    </ClientOnly>
  </div>
</template>
