// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@unocss/nuxt', 'nuxt-simple-sitemap', '@nuxthq/ui'],
  css: ['@unocss/reset/tailwind.css'],
  colorMode: {
    classSuffix: '',
    storageKey: 'uni-helper-color-mode',
  },
  sitemap: {
    siteUrl: 'https://uni-helper.js.org',
  },
})
