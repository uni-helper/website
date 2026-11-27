import { uniHelperShikiTheme } from './shiki-theme'

function addLazyImageAttributes() {
  return (tree: any) => {
    const walk = (node: any) => {
      if (!node || typeof node !== 'object')
        return

      if (node.type === 'element' && node.tagName === 'img') {
        node.properties ||= {}
        node.properties.loading ||= 'lazy'
        node.properties.decoding ||= 'async'
      }

      if (Array.isArray(node.children))
        node.children.forEach(walk)
    }

    walk(tree)
  }
}

export default {
  unified: {
    rehype(processor: any) {
      return processor.use(addLazyImageAttributes)
    },
  },
  shiki: {
    async setup(highlighter: any) {
      await highlighter.loadTheme(uniHelperShikiTheme)
    },
  },
}
