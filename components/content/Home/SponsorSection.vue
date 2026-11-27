<script setup lang="ts">
</script>

<template>
  <div class="m-4 mt-20 text-md flex flex-col items-center">
    <UiSparklesText
      text="免费 &amp; 开源"
      :colors="{ first: '#8acb9b', second: '#2b9939' }"
      :sparkles-count="10"
      class="my-8 text-nowrap"
    />
    <div class="text-center text-muted-foreground">
      <div>
        Uni Helper 基于 MIT 许可发布，并将始终保持免费和开源。
      </div>
      <div>
        社区的赞助和贡献使其成为可能
      </div>
    </div>
  </div>
  <NuxtLink
    to="/about"
    class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
  >
    成为赞助商
  </NuxtLink>
</template>
