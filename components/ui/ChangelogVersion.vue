<script lang="ts" setup>
import { createReusableTemplate } from '@vueuse/core'
import { cva } from 'class-variance-authority'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: string
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

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChangelogVersionProps>(), {
  as: 'article',
  title: '',
  description: '',
  date: '',
  badge: '',
  authors: () => [],
  image: '',
  indicator: true,
  to: '',
  target: '',
  onClick: undefined,
  class: '',
  ui: () => ({}),
})

const slots = defineSlots<ChangelogVersionSlots>()

const rootVariants = cva('relative')
const containerVariants = cva('flex flex-col mx-auto max-w-2xl')
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
const titleVariants = cva('relative text-xl text-pretty font-semibold text-foreground')
const descriptionVariants = cva('text-base text-pretty text-muted mt-1')
const imageWrapperVariants = cva('relative overflow-hidden rounded-lg aspect-[16/9] mt-5')
const authorsVariants = cva('flex flex-wrap gap-x-4 gap-y-1.5')
const footerVariants = cva('border-t border-border pt-5 flex items-center justify-between', {
  variants: {
    body: {
      false: 'mt-5',
    },
  },
})
const indicatorVariants = cva('absolute start-0 top-0 w-32 hidden lg:flex items-center justify-end gap-3 min-w-0')
const dotVariants = cva('size-4 rounded-full bg-background ring-1 ring-border flex items-center justify-center my-1')
const dotInnerVariants = cva('size-2 rounded-full bg-primary')

const formatter = new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium' })

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
  if (!props.date)
    return

  try {
    return formatter.format(new Date(props.date))
  }
  catch {
    return props.date
  }
})

const datetime = computed(() => {
  if (!props.date)
    return

  try {
    return new Date(props.date).toISOString()
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
    <time v-if="date" :datetime="datetime" :class="cn(dateVariants({ hidden }), ui?.date)">
      <slot name="date">
        {{ date }}
      </slot>
    </time>
  </DefineDateTemplate>

  <component :is="as" :class="cn(rootVariants(), ui?.root, props.class)" @click="onClick">
    <div v-if="!!props.indicator || !!slots.indicator" :class="cn(indicatorVariants(), ui?.indicator)">
      <slot name="indicator">
        <ReuseDateTemplate />

        <div :class="cn(dotVariants(), ui?.dot)">
          <div :class="cn(dotInnerVariants(), ui?.dotInner)" />
        </div>
      </slot>
    </div>

    <div :class="cn(containerVariants(), ui?.container)">
      <div v-if="!!slots.header || (date || !!slots.date) || (badge || !!slots.badge) || (title || !!slots.title) || (description || !!slots.description) || (image || !!slots.image)" :class="ui?.header">
        <slot name="header">
          <div v-if="(date || !!slots.date) || (badge || !!slots.badge)" :class="cn(metaVariants({ badge: (!!badge || !!slots.badge) || !props.indicator }), ui?.meta)">
            <slot name="badge">
              <UBadge v-if="badge" v-bind="typeof badge === 'string' ? {} : { variant: badge.variant as any, label: badge.label }">
                {{ typeof badge === 'string' ? badge : badge?.label }}
              </UBadge>
            </slot>

            <ReuseDateTemplate :hidden="!!props.indicator" />
          </div>

          <h2 v-if="title || !!slots.title" :class="cn(titleVariants(), ui?.title)">
            <ReuseLinkTemplate />

            <slot name="title">
              {{ title }}
            </slot>
          </h2>

          <div v-if="description || !!slots.description" :class="cn(descriptionVariants(), ui?.description)">
            <slot name="description">
              {{ description }}
            </slot>
          </div>

          <div v-if="image || !!slots.image" :class="cn(imageWrapperVariants(), ui?.imageWrapper)">
            <ReuseLinkTemplate />
          </div>
        </slot>
      </div>

      <slot name="body" />

      <div v-if="!!slots.footer || (authors?.length || !!slots.authors) || !!slots.actions" :class="cn(footerVariants({ body: !!slots.body }), ui?.footer)">
        <slot name="footer">
          <div v-if="authors?.length || !!slots.authors" :class="cn(authorsVariants(), ui?.authors)">
            <slot name="authors">
              <UAvatar
                v-for="author in authors"
                :key="author.name"
                :src="author.src"
                :alt="author.name"
                size="sm"
              />
            </slot>
          </div>

          <slot name="actions" />
        </slot>
      </div>
    </div>
  </component>
</template>
