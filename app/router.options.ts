import type { RouterConfig } from '@nuxt/schema'

function findHashPosition(
  hash: string,
): { el: any, behavior: ScrollBehavior, top: number } | undefined {
  const el = document.querySelector(hash)
  // vue-router does not incorporate scroll-margin-top on its own.
  if (el) {
    const top = Number.parseFloat(getComputedStyle(el).scrollMarginTop)

    return {
      el: hash,
      behavior: 'smooth',
      top,
    }
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  async scrollBehavior(to, from, savedPosition) {
    await sleep(1)
    if (history.state && history.state.stop) {
      return
    }
    if (history.state && history.state.smooth) {
      return {
        el: history.state.smooth,
        behavior: 'smooth',
      }
    }

    if (savedPosition) {
      return {
        ...savedPosition,
        behavior: 'smooth'
      }
    }

    if (to.hash) {
      return findHashPosition(to.hash)
    }

    // Scroll to top of window
    return { top: 0 }
  },
}