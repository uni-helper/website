// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
  ],

  css: ['@unocss/reset/tailwind.css'],

  colorMode: {
    classSuffix: '',
    storageKey: 'uni-helper-color-mode',
  },

  site: {
    url: 'https://uni-helper.js.org',
  },

  gtag: {
    id: 'G-249B95M763',
  },

  compatibilityDate: '2024-08-01',
})
