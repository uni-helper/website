<script setup lang="ts">
import type { Release } from '~/types/releases'
import { formatTimeAgo } from '@vueuse/core'
import Logo from 'shadcn-docs-nuxt/components/layout/Header/Logo.vue'

const route = useRoute()
const { data: page, error } = await useAsyncData<any>(route.path, () => queryContent(route.path).findOne())
if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})

const { data: releases } = await useFetch(`/api/_content/releases.json`, {
  transform: releases => releases.map((release: Release) => ({
    ...release,
    open: false,
  })),
  deep: true,
})
</script>

<template>
  <div v-if="page" class="size-full xl:grid xl:grid-cols-2">
    <section
      class="relative isolate border-b border-border xl:border-b-0 xl:sticky xl:inset-y-0 xl:h-screen overflow-hidden"
    >
      <UiSkyBg />
      <div class="absolute -right-1/2 z-[-1] rounded-full bg-primary blur-[300px] size-60 sm:size-100 transform -translate-y-1/2 top-1/2" />
      <div
        class="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 h-full items-center justify-center"
      >
        <div class="flex flex-col">
          <Logo class="justify-center mb-6" />
          <h2 class="sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-left text-4xl">
            {{page.title}}
          </h2>
          <p class="text-base sm:text-lg text-muted-foreground text-balance mt-6 text-left max-w-lg">
            {{page.description}}
          </p>
        </div>
      </div>
    </section>
    <div class="px-4 sm:px-6 xl:px-0 xl:-ms-30 xl:flex-1">
      <UiChangelogVersions
        :indicator-motion="false" :ui="{
          root: 'py-16 sm:py-24 lg:py-32',
          indicator: 'inset-y-0',
        }"
      >
        <UiChangelogVersion
          v-for="release in releases" :key="release.tag" :to="release.url" target="_blank"
          :title="release.title" 
          :badge="{
            label: release.repo,
            variant: 'outline',
          }"
          :date="formatTimeAgo(new Date(release.date))"
          :ui="{
            root: 'flex items-start',
            container: 'max-w-xl 2xl:mx-12 w-full',
            header: 'border-b border-border pb-4',
            title: 'text-3xl',
            date: 'text-xs/9 font-mono',
            indicator: 'sticky top-0 pt-16 -mt-16 sm:pt-24 sm:-mt-24 lg:pt-32 lg:-mt-32',
          }"
        >
          <template #body>
            <div
              class="relative"
              :class="{
                'h-auto min-h-[200px]': release.open,
                'h-[200px] overflow-y-hidden': !release.open && release.body.children.length > 4,
              }"
            >
              <MDCRenderer v-if="release.body" :body="release.body" style="zoom: 0.85" class="mt-2" />
              <div
                v-if="!release.open && release.body.children.length > 4"
                class="h-16 absolute inset-x-0 bottom-0 flex items-end justify-center"
                :class="{ 'bg-gradient-to-t from-default to-default/50': !release.open }"
              >
                <ButtonLink
                  size="sm" left-icon="i-lucide-chevron-down" variant="outline"
                  :data-state="release.open ? 'open' : 'closed'" class="group"
                  :ui="{ leadingIcon: 'group-data-[state=open]:rotate-180' }" @click="release.open = !release.open"
                >
                  {{ release.open ? '收起版本' : '展开版本' }}
                </ButtonLink>
              </div>
            </div>
          </template>
        </UiChangelogVersion>
      </UiChangelogVersions>
    </div>
  </div>
</template>
