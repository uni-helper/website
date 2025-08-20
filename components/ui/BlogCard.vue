<script setup lang="ts">
const {
  showLinkIcon = true,
  horizontal = false,
  iconSize = 24,
  bg = 'liquid',
} = defineProps<{
  author?: string
  bg?: 'tetris' | 'liquid'
  title?: string
  description?: string
  footer?: string
  content?: string
  to?: string
  target?: string
  icon?: string
  iconSize?: number
  inStack?: boolean
  img?: string
  showLinkIcon?: boolean
  horizontal?: boolean
}>()

defineSlots()

const [UseTemplate, CardInner] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <UiCard
      class="relative h-full overflow-hidden transition-all"
      :class="[
        to && 'hover:bg-muted',
        inStack && 'mb-0 rounded-none border-none shadow-none',
      ]"
    >
      <div
        class="relative flex justify-center h-fit aspect-[16/9] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-black"
      >
        <UiLiquidBackground v-if="bg === 'liquid'" />
        <template v-if="bg === 'tetris'">
          <ClientOnly>
            <UiTetris
              class="h-full w-full [mask-image:radial-gradient(450px_circle_at_center,#00C16A,transparent)]"
              :base="15"
              square-color="#00C16A"
            />
          </ClientOnly>
        </template>
      </div>
      <UiCardHeader v-if="icon || title || $slots.title || description || $slots.description" :class="{ 'flex-row items-center gap-5': horizontal }">
        <SmartIcon v-if="icon" :name="icon" :size="iconSize" :class="{ 'mb-2': !horizontal }" />
        <div class="flex flex-col gap-1.5">
          <UiCardTitle v-if="title || $slots.title">
            <ContentSlot :use="$slots.title" unwrap="p" />
            {{ title }}
          </UiCardTitle>
          <UiCardDescription v-if="description || $slots.description" class="min-h-[40px]">
            <ContentSlot :use="$slots.description" unwrap="p" />
            {{ description }}
          </UiCardDescription>
        </div>
      </UiCardHeader>

      <div class="flex p-6 pt-0 justify-between items-center">
        <ContentSlot :use="$slots.footer" unwrap="p" />
        <div class="flex items-center gap-2">
          <NuxtImg
            :src="`https://github.com/${author}.png`"
            class="rounded-full"
            width="32"
            height="32"
            alt=""
          />
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ author }}</span>
            <span class="text-sm text-gray-500">{{ footer }}</span>
          </div>
        </div>
      </div>
      <SmartIcon v-if="to && showLinkIcon" name="lucide:arrow-up-right" class="absolute right-4 top-4" />
    </UiCard>
  </UseTemplate>

  <div class="group-has-[div]:!mt-0 [&:not(:first-child)]:mt-5">
    <NuxtLinkLocale v-if="to" :to :target>
      <CardInner />
    </NuxtLinkLocale>
    <CardInner v-else />
  </div>
</template>
