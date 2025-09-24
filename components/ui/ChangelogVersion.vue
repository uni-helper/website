<script lang="ts" setup>
import type { BadgeVariants } from 'shadcn-docs-nuxt/components/ui/badge'
import { createReusableTemplate } from '@vueuse/core'
import { cva } from 'class-variance-authority'
import { Primitive, useDateFormatter } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// 定义 Props 类型
interface BadgeProps {
  variant?: BadgeVariants['variant']
  [key: string]: any
}

interface UserProps {
  src: string
  name: string
  [key: string]: any
}

interface ChangelogVersionProps {
  as?: any
  title?: string
  description?: string
  date?: string | Date
  badge?: string | BadgeProps
  authors?: UserProps[]
  image?: string | Partial<HTMLImageElement>
  indicator?: boolean
  to?: any
  target?: string
  onClick?: (event: MouseEvent) => void | Promise<void>
  class?: any
  ui?: any
}

// 定义 Slots 类型
interface ChangelogVersionSlots {
  header: (props?: object) => any
  badge: (props?: object) => any
  date: (props?: object) => any
  title: (props?: object) => any
  description: (props?: object) => any
  image: (props?: object) => any
  body: (props?: object) => any
  footer: (props?: object) => any
  authors: (props?: object) => any
  actions: (props?: object) => any
  indicator: (props?: object) => any
}

// 组件 Props 和 Slots
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChangelogVersionProps>(), {
  as: 'article',
  indicator: true,
})

const slots = defineSlots<ChangelogVersionSlots>()

// 使用 cva 定义样式变体
const rootVariants = cva('relative', {
  variants: {},
})

const containerVariants = cva('flex flex-col mx-auto max-w-2xl', {
  variants: {},
})

const metaVariants = cva('flex items-center gap-3 mb-2', {
  variants: {
    badge: {
      false: 'lg:hidden',
    },
  },
})

const dateVariants = cva('text-sm/6 text-accent-foreground truncate', {
  variants: {
    hidden: {
      true: 'lg:hidden',
    },
  },
})

const titleVariants = cva('relative text-xl text-pretty font-semibold text-foreground', {
  variants: {},
})

const descriptionVariants = cva('text-base text-pretty text-muted mt-1', {
  variants: {},
})

const imageWrapperVariants = cva('relative overflow-hidden rounded-lg aspect-[16/9] mt-5', {
  variants: {},
})

const authorsVariants = cva('flex flex-wrap gap-x-4 gap-y-1.5', {
  variants: {},
})

const footerVariants = cva('border-t border-border pt-5 flex items-center justify-between', {
  variants: {
    body: {
      false: 'mt-5',
    },
  },
})

const indicatorVariants = cva('absolute start-0 top-0 w-32 hidden lg:flex items-center justify-end gap-3 min-w-0', {
  variants: {},
})

const dotVariants = cva('size-4 rounded-full bg-background ring-1 ring-border flex items-center justify-center my-1', {
  variants: {},
})

const dotInnerVariants = cva('size-2 rounded-full bg-primary', {
  variants: {},
})

const formatter = useDateFormatter('zh-CN')

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate()
const [DefineDateTemplate, ReuseDateTemplate] = createReusableTemplate<{ hidden?: boolean }>({
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
})

const date = computed(() => {
  if (!props.date) {
    return
  }

  try {
    return formatter.custom(new Date(props.date), { dateStyle: 'medium' })
  }
  catch {
    return props.date
  }
})

const datetime = computed(() => {
  if (!props.date) {
    return
  }

  try {
    return new Date(props.date)?.toISOString()
  }
  catch {
    return undefined
  }
})
</script>

<template>
  <DefineLinkTemplate>
    <NuxtLink
      v-bind="{ to, target, ...$attrs }"
      :class="cn('focus:outline-none peer')"
      tabindex="-1"
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </NuxtLink>
  </DefineLinkTemplate>

  <DefineDateTemplate v-slot="{ hidden }">
    <time v-if="date" :datetime="datetime" :class="cn(dateVariants({ hidden }), props.ui?.date)">
      <slot name="date">
        {{ date }}
      </slot>
    </time>
  </DefineDateTemplate>

  <Primitive :as="as" :class="cn(rootVariants(), props.ui?.root, props.class)" @click="onClick">
    <div v-if="!!props.indicator || !!slots.indicator" :class="cn(indicatorVariants(), props.ui?.indicator)">
      <slot name="indicator">
        <ReuseDateTemplate />

        <div :class="cn(dotVariants(), props.ui?.dot)">
          <div :class="cn(dotInnerVariants(), props.ui?.dotInner)" />
        </div>
      </slot>
    </div>

    <div :class="cn(containerVariants(), props.ui?.container)">
      <div v-if="!!slots.header || (date || !!slots.date) || (badge || !!slots.badge) || (title || !!slots.title) || (description || !!slots.description) || (image || !!slots.image)" :class="props.ui?.header">
        <slot name="header">
          <div v-if="(date || !!slots.date) || (badge || !!slots.badge)" :class="cn(metaVariants({ badge: (!!badge || !!slots.badge) || !props.indicator }), props.ui?.meta)">
            <slot name="badge">
              <UiBadge v-if="badge" v-bind="typeof badge === 'string' ? {} : badge">
                {{ typeof badge === 'string' ? badge : badge?.label }}
              </UiBadge>
            </slot>

            <ReuseDateTemplate :hidden="!!props.indicator" />
          </div>

          <h2 v-if="title || !!slots.title" :class="cn(titleVariants(), props.ui?.title)">
            <ReuseLinkTemplate />

            <slot name="title">
              {{ title }}
            </slot>
          </h2>

          <div v-if="description || !!slots.description" :class="cn(descriptionVariants(), props.ui?.description)">
            <slot name="description">
              {{ description }}
            </slot>
          </div>

          <div v-if="image || !!slots.image" :class="cn(imageWrapperVariants(), props.ui?.imageWrapper)">
            <ReuseLinkTemplate />
          </div>
        </slot>
      </div>

      <slot name="body" />

      <div v-if="!!slots.footer || (authors?.length || !!slots.authors) || !!slots.actions" :class="cn(footerVariants({ body: !!slots.body }), props.ui?.footer)">
        <slot name="footer">
          <div v-if="authors?.length || !!slots.authors" :class="cn(authorsVariants(), props.ui?.authors)">
            <slot name="authors">
              <UiAvatar v-for="author in authors" :key="author.name" class="size-8">
                <UiAvatarImage :src="author.image" :alt="`@${author.name}`" />
                <UiAvatarFallback>{{ author.name[0] }}</UiAvatarFallback>
              </UiAvatar>
            </slot>
          </div>

          <slot name="actions" />
        </slot>
      </div>
    </div>
  </Primitive>
</template>
