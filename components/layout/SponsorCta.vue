<script setup lang="ts">
withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})
</script>

<template>
  <div data-sponsor-cta :class="compact ? '' : 'mx-auto w-full max-w-7xl px-4 md:px-8'">
    <div
      class="border-border bg-card flex flex-col rounded-lg border"
      :class="compact ? 'gap-3 p-4' : 'gap-4 p-6 sm:flex-row sm:items-center sm:justify-between'"
    >
      <div class="flex items-start gap-3">
        <SmartIcon
          name="lucide:coffee"
          :size="compact ? 16 : 20"
          class="text-muted-foreground shrink-0"
          :class="compact ? 'mt-1' : 'mt-0.5'"
        />
        <div>
          <p class="font-semibold">
            成为赞助商
          </p>
          <p class="text-muted-foreground mt-1 text-sm">
            uni-helper 保持免费和开源，赞助支持项目持续维护。
          </p>
        </div>
      </div>
      <UButton
        to="https://github.com/ModyQyW/sponsors"
        target="_blank"
        icon="lucide:coffee"
        :size="compact ? 'sm' : 'md'"
        :class="compact ? 'w-full' : 'shrink-0 self-start sm:self-auto'"
      >
        赞助 uni-helper
      </UButton>
    </div>
  </div>
</template>
