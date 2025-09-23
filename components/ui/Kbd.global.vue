<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cn } from '~/lib/utils'

export interface KbdProps {
  as?: any
  value?: KbdKey | string
  class?: any
}

export interface KbdSlots {
  default: (props?: object) => any
}

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
})
defineSlots<KbdSlots>()

const { getKbdKey } = useKbd()
</script>

<template>
  <Primitive
    :as="as"
    :class="cn('inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans h-5 min-w-[20px] text-[11px] ring-inset ring-1 ring-border text-default bg-default', props.class)"
  >
    <slot>
      {{ getKbdKey(value) }}
    </slot>
  </Primitive>
</template>
