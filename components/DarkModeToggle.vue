<script setup lang="ts">
const colorMode = useColorMode()
function toggleDark(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: colorMode.value === 'dark'
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: colorMode.value === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
</script>

<template>
  <UiButton variant="ghost" size="icon" @click="toggleDark">
    <Icon name="lucide:sun" class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" size="18" />
    <Icon name="lucide:moon" class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" size="18" />
    <span class="sr-only">Toggle theme</span>
  </UiButton>
</template>
