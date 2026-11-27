/**
 * Mark content images as lazy. The external shields on the awesome/comparison
 * pages otherwise hold the load event for 15s+; native lazy loading keeps the
 * src and alt in the HTML, so crawlers still see the images.
 */
export default function rehypeLazyImages() {
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
