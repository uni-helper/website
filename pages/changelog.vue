<script setup lang="ts">
import type { Release } from '~/types/releases'

// 页面元数据直接写死，避免 /changelog 在 Cloudflare 上运行时查询内容数据库。
const page = {
  title: '更新日志',
  description: '查看 uni-helper 生态系统中所有项目的最新更新日志，了解每个版本的改进和新功能。',
}

usePageSeo({ title: page.title, description: page.description })

const { data: releases, error: releasesError } = await useFetch<Release[]>('/api/_content/releases.json', {
  default: () => [],
})
</script>

<template>
  <main class="size-full xl:grid xl:grid-cols-2">
    <section
      class="relative isolate overflow-hidden border-b border-border xl:sticky xl:inset-y-0 xl:h-screen xl:border-b-0"
    >
      <UiSkyBg />
      <div class="absolute -right-1/2 top-1/2 z-[-1] size-60 -translate-y-1/2 rounded-full bg-primary blur-[300px] sm:size-100" />
      <div
        class="mx-auto flex h-full w-full max-w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
      >
        <div class="flex flex-col">
          <NuxtLink to="/" class="mb-6 flex items-center">
            <img src="/logo-green.svg" alt="" class="h-7 dark:hidden">
            <img src="/logo-dark.svg" alt="" class="hidden h-7 dark:block">
            <span class="ml-3 self-center font-bold">uni-helper</span>
          </NuxtLink>
          <h1 class="uh-type-display text-left">
            {{ page.title }}
          </h1>
          <p class="text-muted-foreground mt-6 max-w-lg text-left uh-type-body text-balance">
            {{ page.description }}
          </p>
        </div>
      </div>
    </section>

    <div class="px-4 sm:px-6 xl:-ms-30 xl:flex-1 xl:px-0">
      <div v-if="releasesError" class="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
        <UAlert
          color="warning"
          icon="lucide:triangle-alert"
          title="更新日志暂时不可用"
          description="读取 GitHub Releases 失败，请稍后刷新重试。"
        />
      </div>
      <UiChangelogVersions
        v-else
        :indicator-motion="false"
        :ui="{
          root: 'py-16 sm:py-24 lg:py-32',
          indicator: 'inset-y-0',
        }"
      >
        <ChangelogRelease v-for="release in releases" :key="release.tag" :release="release" />
      </UiChangelogVersions>
    </div>
  </main>
</template>
