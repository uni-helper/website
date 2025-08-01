<script setup lang="ts">
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from './../../ui/PatternBackgroundFile'

defineProps<{ projects: Record<string, any[]> }>()
function slug(name: string) {
  return name.toLowerCase().replace(/[\s\\/]+/g, '-')
}

// TODO: 优化滚动效果
// 1. 希望使用浏览器锚点链接加css滚动来实现，这样的好处是可以通过链接直接跳转到目标位置，但是有个问题，就是滚动到目标位置后，会回到最上面，就先用js实现了
function handleAnchorClick(key: string) {
  const element = document.getElementById(slug(key))
  if (element) {
    const header = document.querySelector('header')
    const headerHeight = header?.offsetHeight || 0
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerHeight - 20 // 额外20px间距

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
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
          select-none relative h18 mt5 slide-enter
          :style="{
            '--enter-stage': cidx - 2,
            '--enter-step': '60ms',
          }"
        >
          <span text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>{{ key }}</span>
        </div>
        <div
          class="project-grid py-2 max-w-500 w-max mx-auto"
          grid="~ cols-1 md:cols-2 gap-4 lg:cols-3"
        >
          <a
            v-for="item, idx in projects[key]"
            :key="idx"
            class="item relative flex items-center"
            :href="`projects/${item.name}`"
            target="_blank"
            :title="item.name"
          >
            <div v-if="item.icon" class="pt-2 pr-5">
              <div class="text-3xl opacity-50" :class="item.icon" />
            </div>
            <div class="flex-auto">
              <div class="text-normal">{{ item.name }}</div>
              <div class="desc text-sm opacity-50 font-normal" v-html="item.desc" />
            </div>
          </a>
        </div>
      </div>
      <div class="pb5 mt10 text-center flex items-center justify-end">
        design by antfu.me
      </div>
    </div>
    <div>
      <div class="table-of-contents">
        <div class="table-of-contents-anchor">
          <div class="i-ri-menu-2-fill" />
        </div>
        <ul>
          <li v-for="key of Object.keys(projects)" :key="key">
            <a :href="`#${slug(key)}`" @click.prevent="handleAnchorClick(key)">{{ key }}</a>
          </li>
        </ul>
      </div>
    </div>
  </PatternBackground>
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
  --uno: hidden lg-flex flex-col w-100px lg-w-200px xl-w-300px;
}

.table-of-contents-anchor {
  --uno: 'mx2 w-7 h-7 text-lg flex items-center justify-center bg-base rounded text-hex-8887 border border-base shadow md:border-transparent md:shadow-none transition duration-400';
}

.table-of-contents > ul {
  text-overflow: ellipsis;
  height: 100%;
  overflow-y: auto;
  --uno: rounded op0 mt-1 pb-5 transition duration-700;
}

*:hover > .table-of-contents > .table-of-contents-anchor,
.toc-always-on .table-of-contents > .table-of-contents-anchor {
  --uno: text-inherit;
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
  --uno: op75 hover-op100 transition;
}
</style>
