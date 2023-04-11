// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@nuxtjs/color-mode"],
  css: ["@unocss/reset/tailwind.css"],
  colorMode: {
    classSuffix: "",
  },
});
