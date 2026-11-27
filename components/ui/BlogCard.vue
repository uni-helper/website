<script setup lang="ts">
const props = withDefaults(defineProps<{
  author?: string
  bg?: 'tetris' | 'liquid' | 'aurora' | 'dither' | 'dotGrid'
  title?: string
  description?: string
  footer?: string
  to?: string
  target?: string
  icon?: string
  iconSize?: number
  inStack?: boolean
  showLinkIcon?: boolean
  horizontal?: boolean
}>(), {
  author: '',
  bg: 'liquid',
  title: '',
  description: '',
  footer: '',
  to: '',
  target: '',
  icon: '',
  iconSize: 24,
  inStack: false,
  showLinkIcon: true,
  horizontal: false,
})

const [UseTemplate, CardInner] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <div
      class="bg-card text-card-foreground relative h-full overflow-hidden rounded-xl border shadow-sm transition-all"
      :class="[
        props.to && 'hover:bg-card-hover',
        props.inStack && 'mb-0 rounded-none border-none shadow-none',
      ]"
    >
      <div
        class="relative flex justify-center h-fit aspect-video w-full flex-col items-center overflow-hidden rounded-md bg-background"
      >
        <UiBlogCardBackground :bg="props.bg" />
      </div>
      <div v-if="props.icon || props.title || $slots.title || props.description || $slots.description" class="flex flex-col gap-y-1.5 p-6" :class="{ 'flex-row items-center gap-5': props.horizontal }">
        <SmartIcon v-if="props.icon" :name="props.icon" :size="props.iconSize" :class="{ 'mb-2': !props.horizontal }" />
        <div class="flex flex-col gap-1.5">
          <h2 v-if="props.title || $slots.title" class="uh-type-heading-2">
            <MDCSlot name="title" unwrap="p" />
            {{ props.title }}
          </h2>
          <p v-if="props.description || $slots.description" class="text-muted-foreground min-h-[40px] text-sm">
            <MDCSlot name="description" unwrap="p" />
            {{ props.description }}
          </p>
        </div>
      </div>

      <div class="flex p-6 pt-0 justify-between items-center">
        <MDCSlot name="footer" unwrap="p" />
        <div v-if="props.author" class="flex items-center gap-2">
          <img
            :src="`https://github.com/${props.author}.png`"
            class="size-8 rounded-full"
            width="32"
            height="32"
            loading="lazy"
            decoding="async"
            alt=""
          >
          <div class="flex flex-col">
            <span class="text-sm font-medium text-foreground">{{ props.author }}</span>
            <span class="text-sm text-muted-foreground">{{ props.footer }}</span>
          </div>
        </div>
      </div>
      <SmartIcon v-if="props.to && props.showLinkIcon" name="lucide:arrow-up-right" class="absolute right-4 top-4" />
    </div>
  </UseTemplate>

  <div class="group-has-[div]:mt-0! not-first:mt-5">
    <NuxtLink v-if="props.to" :to="props.to" :target="props.target">
      <CardInner />
    </NuxtLink>
    <CardInner v-else />
  </div>
</template>
