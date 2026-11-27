<script setup lang="ts">
const config = useAppConfig()
const { open } = useContentSearch()
const { metaSymbol } = useShortcuts()
const shortcut = computed(() => metaSymbol.value === '⌘' ? '⌘K' : 'Ctrl K')
</script>

<template>
  <div class="min-w-0 flex-1 self-center md:flex-none">
    <UButton
      color="neutral"
      variant="outline"
      class="text-muted-foreground hover:text-accent-foreground h-8 w-full justify-start rounded-md pr-1.5 font-normal md:w-40 lg:w-60"
      @click="open = true"
    >
      <SmartIcon name="lucide:search" :size="14" />
      <span class="mr-auto overflow-hidden">{{ config.search.placeholder }}</span>
      <kbd class="ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-foreground md:inline-flex">{{ shortcut }}</kbd>
    </UButton>
  </div>

  <LayoutSearchDialog />
</template>
