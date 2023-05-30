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

const repoList = computed(() => repos.value?.filter((repo: any) => repo.name.toLowerCase().includes(searchVal.value.toLowerCase())) || [])
</script>

<template>
  <div>
    <div
      class="mb-4 flex items-center gap-2 rounded-md pl-4 text-xl" border="~ gray-200 dark:gray-700/60"
      hover="border-primary dark:border-primary/60 transition-all"
    >
      <div class="i-carbon-search op-60" />
      <input
        v-model="searchVal" type="text" placeholder="快速搜索～" dark="bg-dark" w-full bg-light-100 py-2
        outline="none active:none"
      >
    </div>
    <div grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4>
      <ProjectCard v-for="repo of repoList" :key="repo.id" :repo="repo" />
    </div>
    <NuxtLink href="https://github.com/uni-helper" target="_blank" aria-label="Contribution">
      <div v-if="!repoList.length" my-30 text-center text-xl color="gray hover:primary">
        还没有哦，等待你来添加~
      </div>
    </NuxtLink>
    <ClientOnly>
      <TeamMember />
    </ClientOnly>
  </div>
</template>
