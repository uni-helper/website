<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  code?: string
  language?: string
  filename?: string
  icon?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  copy?: boolean | Record<string, any>
}>(), {
  code: '',
  language: '',
  filename: '',
  icon: '',
  highlights: () => [],
  hideHeader: false,
  meta: '',
  copy: true,
})

const preRef = ref<HTMLElement | null>(null)
const { copy: copyToClipboard, copied } = useClipboard()
const copyLabel = computed(() => copied.value ? '已复制' : '复制代码')
const attrs = useAttrs()

// Shiki's generated styles target `pre.shiki`, so its classes must stay on the
// pre. The root still gets the other attributes, such as the tab-panel id/role.
function isShikiClass(name: string) {
  return name === 'shiki' || name === 'shiki-themes' || name.startsWith('language-') || name.startsWith('github-')
}

const classNames = computed(() => {
  const value = attrs.class
  const raw = Array.isArray(value) ? value.join(' ') : typeof value === 'string' ? value : ''
  return raw.split(/\s+/).filter(Boolean)
})
const shikiClass = computed(() => classNames.value.filter(isShikiClass).join(' '))
const rootClass = computed(() => classNames.value.filter(name => !isShikiClass(name)).join(' '))
const rootAttrs = computed(() => {
  const rest = { ...attrs } as Record<string, unknown>
  delete rest.class
  return rest
})

function copyCode() {
  copyToClipboard(props.code || preRef.value?.textContent || '')
}
</script>

<template>
  <div
    v-bind="rootAttrs"
    class="relative my-5"
    :class="[rootClass, filename && !hideHeader ? '[&>pre]:rounded-t-none [&>pre]:my-0' : '']"
  >
    <div
      v-if="filename && !hideHeader"
      class="flex items-center gap-1.5 rounded-t-md border border-b-0 border-border bg-code-bg pl-4 pr-12 py-3"
    >
      <span class="text-sm/6 text-code-fg">{{ filename }}</span>
    </div>

    <pre
      ref="preRef"
      class="font-mono text-sm/6 border border-border bg-code-bg text-code-fg pl-4 pr-12 py-3 whitespace-pre-wrap wrap-break-word overflow-x-auto"
      :class="[filename && !hideHeader ? 'rounded-t-none' : 'rounded-md', shikiClass]"
    ><slot /></pre>

    <UTooltip :text="copyLabel">
      <UButton
        v-if="copy"
        color="neutral"
        variant="outline"
        size="sm"
        square
        aria-label="复制代码"
        class="absolute top-[11px] end-[11px] z-10"
        @click="copyCode"
      >
        <UIcon v-if="copied" name="lucide:check" class="size-4" />
        <UIcon v-else name="lucide:clipboard" class="size-4" />
      </UButton>
    </UTooltip>
  </div>
</template>
