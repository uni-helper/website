<script setup lang="ts">
import type { Repo } from '~/types'

defineProps<{ repo: Repo }>()
</script>

<template>
  <NuxtLink
    :to="`/${repo.name}`" border="~ gray-200 dark:gray-700"
    hover="border-primary dark:border-primary bg-primary/10" group rounded-md p-5 transition-all dark:bg-dark
  >
    <div flex items-center justify-between group-hover:color-primary>
      <h2 text-xl>
        {{ repo.name }}
      </h2>
      <small flex items-center>
        <div i-carbon:star mr-1 />
        {{ formatStarCount(repo.stars) }}
      </small>
    </div>
    <p mt-2 color-neutral-500 dark-color-gray>
      {{ repo.description || "..." }}
    </p>
  </NuxtLink>
</template>
