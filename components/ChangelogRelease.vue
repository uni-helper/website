<script setup lang="ts">
import type { Release } from '~/types/releases'
import { formatTimeAgo } from '@vueuse/core'

defineProps<{
  release: Release
}>()

const expanded = ref(false)
</script>

<template>
  <UiChangelogVersion
    :to="release.url"
    target="_blank"
    :title="release.title"
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
    <template #badge>
      <NuxtLink
        :to="`https://github.com/${release.repo}`"
        target="_blank"
        class="flex items-center"
      >
        <UBadge variant="outline" color="neutral" class="gap-1 rounded-md">
          <SmartIcon :name="release.icon" class="mr-1" :size="12" />
          {{ release.repo }}
        </UBadge>
      </NuxtLink>
    </template>

    <template #body>
      <div
        class="relative"
        :class="{
          'h-auto min-h-[200px]': expanded,
          'h-[200px] overflow-y-hidden': !expanded && (release.body?.children?.length ?? 0) > 4,
        }"
      >
        <div
          v-if="release.body?.children?.length"
          class="docs-content changelog-body mt-6"
          style="zoom: 0.85"
        >
          <MDCRenderer :body="release.body" />
        </div>
        <p v-else class="mt-6 leading-7" style="zoom: 0.85">
          <em>No significant changes</em>
        </p>

        <div
          v-if="!expanded && (release.body?.children?.length ?? 0) > 4"
          class="absolute inset-x-0 bottom-0 flex h-16 items-end justify-center"
          :class="{ 'bg-linear-to-t from-background to-background/50': !expanded }"
        >
          <UButton
            size="sm"
            color="neutral"
            variant="outline"
            :icon="expanded ? 'lucide:chevron-up' : 'lucide:chevron-down'"
            @click="expanded = !expanded"
          >
            {{ expanded ? '收起版本' : '展开版本' }}
          </UButton>
        </div>
      </div>
    </template>
  </UiChangelogVersion>
</template>
