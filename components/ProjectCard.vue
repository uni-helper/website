<script setup lang="ts">
import type { Repo } from '~/types'

defineProps<{
  repo: Repo
}>()
</script>

<template>
  <NuxtLink
    :to="`/${repo.name}`"

    class="group transition-all"

    border p-5 dark:border-dark-200 dark:bg-dark hover:bg-primary hover:bg-opacity-10
  >
    <div flex items-center justify-between group-hover:color-primary>
      <h2 text-xl>
        {{ repo.name }}
      </h2>
      <small flex>
        <div i-carbon:star mr-1 />
        {{ formatStarCount(repo.stars) }}
      </small>
    </div>
    <p mt-2 color-neutral-500 dark-color-gray>
      {{ repo.description || "..." }}
    </p>
  </NuxtLink>
</template>
