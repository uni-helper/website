<script setup lang="ts">
interface RepoProp {
  name: string;
  description: string;
  stars: number;
}

defineProps<{
  repo: RepoProp;
}>();
</script>

<template>
  <NuxtLink
    :to="`/${repo.name}`"
    p-5
    border
    class="group transition-all"
    hover:bg-primary
    hover:bg-opacity-10
    dark:bg-dark
    dark:border-dark-200
  >
    <div flex items-center justify-between group-hover:color-primary>
      <h2 text-xl>{{ repo.name }}</h2>
      <small flex>
        <div i-carbon:star mr-1></div>
        {{ formatStarCount(repo.stars) }}
      </small>
    </div>
    <p mt-2 color-neutral>{{ repo.description || "..." }}</p>
  </NuxtLink>
</template>
