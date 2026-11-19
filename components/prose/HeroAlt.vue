<template>
  <div
    class="gap-8 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10"
    :class="{ 'grid md:grid-cols-3': $slots.right }"
  >
    <section
      class="flex flex-col items-start gap-2"
      :class="{ 'md:col-span-2': $slots.right }"
    >
      <NuxtLink
        v-if="announcement"
        :to="announcement.to"
        :target="announcement.target"
        class="inline-flex items-center px-0.5 text-sm font-medium"
      >
        <template v-if="announcement.icon">
          <SmartIcon :name="announcement.icon" :size="16" />
          <span class="mx-2 h-4 w-px bg-border" />
        </template>
        <span class="underline-offset-4 hover:underline">{{ announcement.title }}</span>
        <SmartIcon name="lucide:arrow-right" class="ml-1" :size="16" />
      </NuxtLink>

      <h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        <MDCSlot name="title" unwrap="p" />
      </h1>
      <p class="text-foreground max-w-2xl text-lg font-light">
        <MDCSlot name="description" unwrap="p" />
      </p>

      <div class="flex w-full items-center justify-start gap-2 py-2">
        <NuxtLink
          v-for="(action, i) in actions"
          :key="i"
          :to="action.to"
          :target="action.target"
        >
          <UButton
            size="sm"
            :color="action.variant === 'outline' ? 'neutral' : 'neutral'"
            :variant="action.variant === 'outline' ? 'outline' : 'solid'"
          >
            <SmartIcon v-if="action.leftIcon" :name="action.leftIcon" class="mr-1" :size="16" />
            {{ action.name }}
            <SmartIcon v-if="action.rightIcon" :name="action.rightIcon" class="ml-1" :size="16" />
          </UButton>
        </NuxtLink>
      </div>
    </section>

    <div class="mx-auto" :class="{ 'order-first md:order-last': mobileRight === 'top' }">
      <MDCSlot name="right" unwrap="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  announcement?: {
    to?: string
    target?: string
    icon?: string
    title: string
  }
  actions?: [{
    name: string
    leftIcon?: string
    rightIcon?: string
    variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost'
    to: string
    target?: string
  }]
  mobileRight?: 'top' | 'bottom'
}>()
defineSlots()
</script>
