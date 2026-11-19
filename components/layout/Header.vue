<script setup lang="ts">
const config = useAppConfig()
const { nav, links, logo, title } = config.header
</script>

<template>
  <header class="bg-background/80 sticky top-0 z-40 backdrop-blur-lg">
    <div class="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between gap-2 px-4 md:px-8">
      <NuxtLink to="/" class="hidden flex-1 items-center md:flex">
        <img :src="logo.light" alt="" class="h-7 dark:hidden">
        <img :src="logo.dark" alt="" class="hidden h-7 dark:block">
        <span class="ml-3 self-center font-bold">{{ title }}</span>
      </NuxtLink>

      <LayoutMobileNav />

      <nav class="hidden flex-1 items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="hover:bg-muted hover:text-primary inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>

      <div class="flex flex-1 items-center justify-end gap-2">
        <LayoutSearchButton />
        <DarkModeToggle />
        <UButton
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :target="link.target"
          color="neutral"
          variant="ghost"
          square
          :aria-label="link.icon"
        >
          <SmartIcon :name="link.icon" :size="18" />
        </UButton>
      </div>
    </div>
  </header>
</template>
