import { createSharedComposable } from '@vueuse/core'
import { computed } from 'vue'

export const useKbd = createSharedComposable(() => {
  const macOS = computed(() => import.meta.client && /Macintosh/.test(navigator.userAgent))

  return { macOS }
})
