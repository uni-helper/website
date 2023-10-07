// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@unocss/nuxt', 'nuxt-simple-sitemap', '@nuxtjs/color-mode', 'nuxt-gtag'],
  css: ['@unocss/reset/tailwind.css'],
  colorMode: {
    classSuffix: '',
    storageKey: 'uni-helper-color-mode',
  },
  sitemap: {
    siteUrl: 'https://uni-helper.js.org',
  },
  gtag: {
    id: 'G-249B95M763',
  },
})
