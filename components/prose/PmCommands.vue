<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  commands: { name: string, code: string }[]
  inStack?: boolean
}>()

const active = ref(props.commands[0]?.name)
const current = computed(() => props.commands.find(command => command.name === active.value) ?? props.commands[0] ?? { name: '', code: '' })
const { copy, copied } = useClipboard()
</script>

<template>
  <div class="bg-code-bg text-code-fg overflow-hidden" :class="inStack ? 'my-0 rounded-none border-0' : 'my-5 rounded-xl border'">
    <div class="flex items-center gap-1 border-b px-2 py-1.5">
      <button
        v-for="command in commands"
        :key="command.name"
        class="rounded-md px-3 py-1 text-sm font-medium transition-colors"
        :class="active === command.name ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
        @click="active = command.name"
      >
        {{ command.name }}
      </button>
      <UButton
        class="ml-auto"
        color="neutral"
        variant="ghost"
        square
        size="xs"
        :icon="copied ? 'lucide:check' : 'lucide:clipboard'"
        aria-label="复制命令"
        @click="copy(current.code)"
      />
    </div>
    <pre class="overflow-x-auto p-4 text-sm leading-7"><code>{{ current.code }}</code></pre>
  </div>
</template>
