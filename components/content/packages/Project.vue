<script setup lang="ts">
/**
 * 项列表组件
 * 灵感来自antfu.me项目列表
 * MIT
 * @source https://antfu.me/projects
 */
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from './../../ui/PatternBackgroundFile/index'
import PatternBackground from './../../ui/PatternBackgroundFile/PatternBackground.vue'

defineProps<{ projects: Record<string, any[]> }>()
function slug(name: string) {
  return name.toLowerCase().replace(/[\s\\&/]+/g, '-')
}
</script>

<template>
  <PatternBackground
    :animate="true"
    :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
    :variant="PATTERN_BACKGROUND_VARIANT.Dot"
    class="flex w-full items-center justify-center"
    :speed="PATTERN_BACKGROUND_SPEED.Slow"
  >
    <div class="max-w-[1200px] mx-auto">
      <div
        v-for="key, cidx in Object.keys(projects)" :key="key"
        class="slide-enter"
        :style="{ '--enter-stage': cidx + 1 }"
      >
        <div
          :id="slug(key)"
          class="scroll-mt-16 select-none relative h-[72px] mt-5 slide-enter"
          :style="{
            '--enter-stage': cidx - 2,
            '--enter-step': '60ms',
          }"
        >
          <span class="text-[5em] text-transparent absolute left-[-1rem] top-0 font-bold leading-[1em] [-webkit-text-stroke:1.5px_#aaa] opacity-35 dark:opacity-20">{{ key }}</span>
        </div>
        <div
          class="py-2 max-w-[2000px] w-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="item, idx in projects[key]"
            :key="idx"
            class="relative flex items-center bg-transparent text-[1.1rem] w-[350px] max-w-full pt-2 px-3.5 pb-3.5 rounded-md hover:bg-[#88888811]"
            :to="slug(key) !== 'vs-code' ? `/${item.name}` : `/${slug(key)}/${item.name}`"
            target=""
            :title="item.name"
          >
            <div v-if="item.icon" class="pt-2 pr-5">
              <SmartIcon :name="item.icon" class="size-8 opacity-50" />
            </div>
            <div class="flex-auto">
              <div class="text-normal">
                {{ item.name }}
              </div>
              <div class="desc text-sm opacity-50 font-normal" v-html="item.desc" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="group">
      <div class="fixed top-[90px] bottom-0 text-[0.8em] left-5 z-[200] overflow-hidden hidden lg:flex flex-col w-[100px] lg:w-[200px] xl:w-[300px]">
        <div class="mx-2 w-7 h-7 text-lg flex items-center justify-center bg-background rounded text-[#8887] border border-border shadow md:border-transparent md:shadow-none transition duration-[400ms] group-hover:text-inherit">
          <SmartIcon name="ri-menu-2-fill" />
        </div>
        <ul class="text-ellipsis h-full overflow-y-auto rounded opacity-0 mt-1 pb-5 transition duration-700 group-hover:opacity-75 list-none">
          <li v-for="key of Object.keys(projects)" :key="key" class="pl-[0.8rem] leading-[1.5em] mt-[0.5em] before:hidden">
            <NuxtLink :href="`#${slug(key)}`" class="opacity-75 hover:opacity-100 transition">
              {{ key }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </PatternBackground>
  <div class="text-xs text-gray-500/40 dark:text-gray-400/40 ml-auto text-right pt-0.5">
    Design by
    <a href="https://antfu.me/projects">antfu.me</a>
  </div>
</template>
