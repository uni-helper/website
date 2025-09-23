<script lang="ts" setup>
import { cva } from 'class-variance-authority'
import { defu } from 'defu'
import { Motion, useScroll, useSpring, useTransform } from 'motion-v'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import UChangelogVersion from './ChangelogVersion.vue'

// 定义 Props 类型
interface ChangelogVersionProps {
  [key: string]: any
}

interface SpringOptions {
  damping?: number
  restDelta?: number
  [key: string]: any
}

interface ChangelogVersionsProps<T extends ChangelogVersionProps = ChangelogVersionProps> {
  as?: any
  versions?: T[]
  indicator?: boolean
  indicatorMotion?: boolean | SpringOptions
  class?: any
  ui?: {
    root?: string
    container?: string
    indicator?: string
    beam?: string
  }
}

// 定义 Slots 类型
interface ChangelogVersionsSlots<T extends ChangelogVersionProps = ChangelogVersionProps> {
  default: (props?: object) => any
  header: (props: { version: T }) => any
  badge: (props: { version: T }) => any
  date: (props: { version: T }) => any
  title: (props: { version: T }) => any
  description: (props: { version: T }) => any
  image: (props: { version: T }) => any
  body: (props: { version: T }) => any
  footer: (props: { version: T }) => any
  authors: (props: { version: T }) => any
  actions: (props: { version: T }) => any
  indicator: ((props?: object) => any) & ((props: { version: T }) => any)
}

// 组件 Props 和 Slots
const props = withDefaults(defineProps<ChangelogVersionsProps>(), {
  as: 'div',
  indicator: true,
  indicatorMotion: true,
})

const slots = defineSlots<ChangelogVersionsSlots>()

// 使用 cva 定义样式变体
const rootVariants = cva('relative', {
  variants: {},
})

const containerVariants = cva('flex flex-col gap-y-8 sm:gap-y-12 lg:gap-y-16', {
  variants: {},
})

const indicatorVariants = cva('absolute hidden lg:block overflow-hidden inset-y-3 start-32 h-full w-px bg-border -ms-[8.5px]', {
  variants: {},
})

const beamVariants = cva('absolute start-0 top-0 w-full bg-primary will-change-[height]', {
  variants: {},
})

// 工具函数
const getProxySlots = () => (slots)

// 动画配置
const springOptions = computed(() => defu(
  typeof props.indicatorMotion === 'object' ? props.indicatorMotion : {},
  { damping: 30, restDelta: 0.001 },
))

// 滚动动画
const { scrollYProgress } = useScroll()
const y = useSpring(scrollYProgress, springOptions)
const height = useTransform(() => `${y.get() * 100}%`)
</script>

<template>
  <Primitive :as="as" :class="cn(rootVariants(), props.ui?.root)">
    <div v-if="!!props.indicator || !!slots.indicator" :class="cn(indicatorVariants(), props.ui?.indicator)">
      <slot name="indicator">
        <Motion v-if="!!props.indicatorMotion" :class="cn(beamVariants(), props.ui?.beam)" :style="{ height }" />
      </slot>
    </div>

    <div v-if="versions?.length || !!slots.default" :class="cn(containerVariants(), props.ui?.container)">
      <slot>
        <UChangelogVersion
          v-for="(version, index) in versions"
          :key="index"
          :indicator="!!props.indicator"
          v-bind="(version as ChangelogVersionProps)"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]>
            <slot :name="name" v-bind="{ version }" />
          </template>
        </UChangelogVersion>
      </slot>
    </div>
  </Primitive>
</template>
