<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)
const message = computed(() => isNotFound.value
  ? '页面不存在，可能已经被移动或删除。'
  : '页面出错了，刷新或稍后再试。')

useHead({
  title: `${props.error.statusCode} - uni-helper`,
})

function backHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="bg-background text-foreground flex min-h-screen items-center justify-center px-6">
    <main class="w-full max-w-[720px]">
      <a href="/" class="mb-16 flex items-center gap-2.5 text-xl font-bold">
        <img src="/logo.svg" alt="" class="h-7 dark:hidden">
        <img src="/logo-dark.svg" alt="" class="hidden h-7 dark:block">
        uni-helper
      </a>
      <h1 class="text-8xl leading-none font-extrabold tracking-[-0.04em]">
        {{ error.statusCode }}
      </h1>
      <p class="text-muted-foreground mt-4 text-lg">
        {{ message }}
      </p>
      <button
        type="button"
        class="bg-primary text-primary-foreground mt-8 inline-flex rounded-lg px-5 py-2.5 text-sm font-semibold"
        @click="backHome"
      >
        回到首页
      </button>
    </main>
  </div>
</template>
