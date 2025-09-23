import type { MDCRoot } from '@nuxtjs/mdc'

export interface Release {
  url: string
  repo: string
  tag: string
  title: string
  date: string
  body: MDCRoot
}
