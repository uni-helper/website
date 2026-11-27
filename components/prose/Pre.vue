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
const attrs = useAttrs()

// Shiki's generated styles target `pre.shiki`, so its classes must stay on the
// pre. The tab-panel id/role still belong on the single root element.
const shikiClass = computed(() => {
  const value = attrs.class
  const raw = Array.isArray(value) ? value.join(' ') : typeof value === 'string' ? value : ''
  return raw.split(/\s+/).filter(name => name === 'shiki' || name === 'shiki-themes' || name.startsWith('language-') || name.startsWith('github-')).join(' ')
})

function copyCode() {
  copyToClipboard(props.code ?? preRef.value?.textContent ?? '')
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="relative group my-5"
    :class="filename && !hideHeader ? '[&>pre]:rounded-t-none [&>pre]:my-0' : ''"
  >
    <div
      v-if="filename && !hideHeader"
      class="flex items-center gap-1.5 rounded-t-md border border-b-0 border-border bg-code-bg px-4 py-3"
    >
      <span class="text-sm/6 text-code-fg">{{ filename }}</span>
    </div>

    <pre
      ref="preRef"
      class="group font-mono text-sm/6 border border-border bg-code-bg text-code-fg px-4 py-3 whitespace-pre-wrap wrap-break-word overflow-x-auto"
      :class="[filename && !hideHeader ? 'rounded-t-none' : 'rounded-md', shikiClass]"
    ><slot /></pre>

    <UButton
      v-if="copy"
      color="neutral"
      variant="outline"
      size="sm"
      :icon="copied ? 'lucide:check' : 'lucide:copy'"
      aria-label="复制代码"
      class="absolute top-[11px] end-[11px] lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100 transition"
      @click="copyCode"
    />
  </div>
</template>
