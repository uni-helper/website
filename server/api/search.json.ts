import { queryCollectionSearchSections } from '@nuxt/content/server'

export default defineEventHandler(event => {
  return queryCollectionSearchSections(event, 'content')
})
