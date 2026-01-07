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
    <div class="max-w-300 mx-auto">
      <div
        v-for="key, cidx in Object.keys(projects)" :key="key" slide-enter
        :style="{ '--enter-stage': cidx + 1 }"
      >
        <div
          :id="slug(key)"
          :style="{
            '--enter-stage': cidx - 2,
            '--enter-step': '60ms',
          }"
          class="scroll-mt-16 select-none relative h-18 mt-5 slide-enter"
        >
          <span class="text-[5em] text-transparent absolute -left-[1rem] top-0 font-bold leading-[1em] [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#aaa] opacity-35 dark:opacity-20">{{ key }}</span>
        </div>
        <div
          class="project-grid py-2 max-w-500 w-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="item, idx in projects[key]"
            :key="idx"
            class="item relative flex items-center"
            :to="slug(key) !== 'vs-code' ? `/${item.name}` : `/${slug(key)}/${item.name}`"

            target=""
            :title="item.name"
          >
            <div v-if="item.icon" class="pt-2 pr-5">
              <SmartIcon :name="item.icon" class="opacity-50" :size="32" />
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
    <div>
      <div class="table-of-contents">
        <div class="table-of-contents-anchor">
          <SmartIcon name="ri:menu-2-fill" />
        </div>
        <ul>
          <li v-for="key of Object.keys(projects)" :key="key">
            <NuxtLink :href="`#${slug(key)}`">
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

<style scoped>
.project-grid a.item {
  background: transparent;
  font-size: 1.1rem;
  width: 350px;
  max-width: 100%;
  padding: 0.5rem 0.875rem 0.875rem;
  border-radius: 6px;
}

.project-grid a.item:hover {
  background: #88888811;
}

.table-of-contents {
  position: fixed;
  top: 90px;
  bottom: 0;
  font-size: 0.8em;
  left: 20px;
  z-index: 200;
  overflow: hidden;
  display: none;
  width: 100px;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .table-of-contents {
    display: flex;
    width: 200px;
  }
}

@media (min-width: 1280px) {
  .table-of-contents {
    width: 300px;
  }
}

.table-of-contents-anchor {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1.125rem;
  line-height: 1.76rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: #8887;
  border-width: 1px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .4s;
}

@media (min-width: 768px) {
  .table-of-contents-anchor {
    border-color: transparent;
    box-shadow: none;
  }
}

.table-of-contents > ul {
  text-overflow: ellipsis;
  height: 100%;
  overflow-y: auto;
  border-radius: 0.25rem;
  opacity: 0;
  margin-top: 0.25rem;
  padding-bottom: 1.25rem;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .7s;
}

*:hover > .table-of-contents > .table-of-contents-anchor,
.toc-always-on .table-of-contents > .table-of-contents-anchor {
  color: inherit;
}

.toc-always-on .table-of-contents > ul {
  opacity: 0.6;
}

*:hover > .table-of-contents > ul {
  opacity: 0.75;
}

.table-of-contents ul > li::before {
  display: none;
}

.table-of-contents ul > li {
  padding-left: 0.8rem;
  line-height: 1.5em;
  margin-top: 0.5em;
}

.table-of-contents ul > li > a {
  opacity: 0.75;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;
}

.table-of-contents ul > li > a:hover {
  opacity: 1;
}
</style>
