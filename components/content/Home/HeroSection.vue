<script setup lang="ts">
const isDark = computed(() => useColorMode().value === 'dark')

const packagesName = [
  'awesome',
  'pages',
  'use',
  'create',
  'network',
  'typed',
  'unocss',
  'axios',
  'layout',
  'components',
  'manifest',
  'vscode',
  'promise',
  'platform',
  'devtools',
  'modifier',
  'env',
  'eslint',
]

const shuffledPackagesName = ref(packagesName)

onMounted(() => {
  shuffledPackagesName.value = [...packagesName].sort(() => Math.random() - 0.5)
})
</script>

<template>
  <section
    class="relative mx-auto flex min-h-[52rem] max-w-[800px] flex-col items-center justify-center gap-2 py-8 max-sm:min-h-[28rem] lg:py-24 lg:pb-20 md:py-12 md:pb-8"
  >
    <UiParticlesBg
      class="fixed inset-0 z-[-3]"
      :quantity="250"
      :ease="100"
      :color="isDark ? '#FFF' : '#000'"
      :staticity="10"
    />
    <span
      class="fixed top-0 z-[-1] h-screen w-full bg-white opacity-40 dark:bg-black dark:opacity-50"
    />
    <NuxtLink
      to="/packages"
      target=""
      class="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-medium hover:cursor-pointer"
    >
      <SmartIcon
        name="lucide:rocket"
        :size="16"
      />
      <span class="mx-2 h-4 w-px bg-border dark:bg-gray-600" />
      <span class="underline-offset-4 hover:underline">Get Started</span>
      <SmartIcon
        name="lucide:arrow-right"
        class="ml-1"
        :size="16"
      />
    </NuxtLink>
    <h1
      class="transition-all duration-300 text-center text-3xl font-bold leading-tight tracking-tighter lg:leading-[1.1] md:text-6xl"
    >
      uni -
      <UiFlipWords
        :words="shuffledPackagesName"
        :duration="3000"
      />
    </h1>

    <span class="mt-4 text-center text-lg text-gray-600 sm:text-xl dark:text-gray-200">
      旨在增强 uni-app 系列产品的开发体验
    </span>

    <div class="mt-4 flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
      <NuxtLink to="/packages">
        <UButton color="neutral" variant="solid">探索世界</UButton>
      </NuxtLink>
      <NuxtLink
        to="https://github.com/uni-helper"
        target="_blank"
      >
        <UButton color="neutral" variant="outline">
          <SmartIcon
            name="lucide:github"
            class="mr-1"
          />
          Github
        </UButton>
      </NuxtLink>
    </div>
  </section>
</template>
