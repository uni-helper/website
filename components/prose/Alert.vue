<script setup lang="ts">
type AlertType = 'default' | 'secondary' | 'info' | 'note' | 'warning' | 'success' | 'danger'

const props = withDefaults(defineProps<{
  title?: string
  icon?: string
  type?: AlertType
  inStack?: boolean
}>(), {
  title: '',
  icon: '',
  type: 'default',
  inStack: false,
})

// 设计系统的提示框：默认卡片底色，状态类型只给边框、图标和淡色底，正文保持前景色。
const THEMES: Record<AlertType, { root: string, icon: string, iconClass: string }> = {
  default: { root: 'border-border bg-card', icon: '', iconClass: 'text-muted-foreground' },
  secondary: { root: 'border-border bg-card', icon: '', iconClass: 'text-muted-foreground' },
  info: { root: 'border-info/40 bg-info/8', icon: 'lucide:info', iconClass: 'text-info' },
  note: { root: 'border-info/40 bg-info/8', icon: 'lucide:pencil', iconClass: 'text-info' },
  warning: { root: 'border-warning/40 bg-warning/8', icon: 'lucide:triangle-alert', iconClass: 'text-warning' },
  success: { root: 'border-success/40 bg-success/8', icon: 'lucide:lightbulb', iconClass: 'text-success' },
  danger: { root: 'border-error/40 bg-error/8', icon: 'lucide:triangle-alert', iconClass: 'text-error' },
}

const theme = computed(() => THEMES[props.type])
const ui = computed(() => ({
  root: 'items-start gap-3 p-4 ring-0',
  title: 'text-sm font-semibold',
  description: 'alert-body text-sm',
  icon: `size-6 shrink-0 ${theme.value.iconClass}`,
}))
</script>

<template>
  <!-- 提示框本身不是链接：正文可能是任意 Markdown，包进 <a> 会得到嵌套的非法 anchor，
       浏览器拆开后整块卡片的链接就失效了。需要整块可点时，由正文里的链接自己用 ::after 铺满。 -->
  <UAlert
    :title="title"
    :icon="icon || theme.icon"
    color="neutral"
    variant="outline"
    class="border"
    :class="[theme.root, inStack ? 'my-0 rounded-none border-0 bg-transparent ring-0' : 'my-4']"
    :ui="ui"
  >
    <!-- UAlert 没有默认插槽，正文（段落、列表、代码块）只能走 description -->
    <template #description>
      <slot />
    </template>
  </UAlert>
</template>
