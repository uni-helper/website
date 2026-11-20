<script setup lang="ts">
type AlertType = 'default' | 'secondary' | 'info' | 'note' | 'warning' | 'success' | 'danger'

const props = withDefaults(defineProps<{
  title?: string
  icon?: string
  type?: AlertType
  to?: string
  target?: string
  inStack?: boolean
}>(), {
  title: '',
  icon: '',
  type: 'default',
  to: '',
  target: '',
  inStack: false,
})

// 旧主题的提示类型对应到 Nuxt UI 的颜色、边框和默认图标。default 和 secondary 只有描边，不带颜色和图标。
const THEMES: Record<AlertType, { color: 'neutral' | 'info' | 'warning' | 'success' | 'error', border: string, icon: string }> = {
  default: { color: 'neutral', border: '', icon: '' },
  secondary: { color: 'neutral', border: '', icon: '' },
  info: { color: 'info', border: 'border-info-500/50', icon: 'lucide:info' },
  note: { color: 'info', border: 'border-info-500/50', icon: 'lucide:pencil' },
  warning: { color: 'warning', border: 'border-warning-500/50', icon: 'lucide:triangle-alert' },
  success: { color: 'success', border: 'border-success-500/50', icon: 'lucide:lightbulb' },
  danger: { color: 'error', border: 'border-error-500/50', icon: 'lucide:triangle-alert' },
}

const theme = computed(() => THEMES[props.type])
const isOutline = computed(() => props.type === 'default' || props.type === 'secondary')
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component :is="to ? NuxtLink : 'div'" v-bind="to ? { to, target } : undefined">
    <!-- UAlert 没有默认插槽，正文（段落、列表、代码块）只能走 description -->
    <UAlert
      :title="title"
      :icon="icon || theme.icon"
      :color="theme.color"
      :variant="isOutline ? 'outline' : 'subtle'"
      class="border"
      :class="[theme.border, inStack && 'rounded-none border-0 shadow-none']"
      :ui="{ description: 'alert-body' }"
    >
      <template #description>
        <slot />
      </template>
    </UAlert>
  </component>
</template>
