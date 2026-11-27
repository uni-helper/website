export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()

  // The design tokens ignore the system dark media query when data-theme is explicit.
  // Nuxt UI only writes .light or .dark, so mirror the choice onto the attribute.
  watchEffect(() => {
    const root = document.documentElement
    const theme = colorMode.preference

    if (theme === 'light' || theme === 'dark')
      root.dataset.theme = theme
    else
      root.removeAttribute('data-theme')
  })
})
