import rehypeLazyImages from './scripts/rehype-lazy-images'
import { uniHelperShikiTheme } from './shiki-theme'

export default {
  unified: {
    rehype(processor: any) {
      return processor.use(rehypeLazyImages)
    },
  },
  shiki: {
    async setup(highlighter: any) {
      await highlighter.loadTheme(uniHelperShikiTheme)
    },
  },
}
