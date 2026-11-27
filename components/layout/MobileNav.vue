<script setup lang="ts">
const config = useAppConfig()
const open = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  open.value = false
})
</script>

<template>
  <USlideover v-model:open="open" side="left" title="导航">
    <UButton color="neutral" variant="ghost" square class="md:hidden" aria-label="打开导航">
      <SmartIcon name="lucide:menu" :size="18" />
    </UButton>

    <template #body>
      <div class="flex flex-col gap-4">
        <NuxtLink to="/" class="flex items-center">
          <img :src="config.header.logo.light" alt="" class="h-7 dark:hidden">
          <img :src="config.header.logo.dark" alt="" class="hidden h-7 dark:block">
          <span class="ml-3 self-center font-bold">{{ config.header.title }}</span>
        </NuxtLink>

        <nav class="flex flex-col gap-1 border-b pb-4">
          <NuxtLink
            v-for="item in config.header.nav"
            :key="item.to"
            :to="item.to"
            class="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-2 text-sm font-semibold"
            active-class="bg-accent text-accent-foreground"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>

        <LayoutAside />
      </div>
    </template>
  </USlideover>
</template>

