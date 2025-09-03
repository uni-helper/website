import extractorMdc from '@unocss/extractor-mdc'
import { presetWind } from '@unocss/preset-wind3'
import { defineConfig, presetAttributify, presetIcons, transformerDirectives } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  shortcuts: [
    [/^step$/, () => {
      return `
        [counter-increment:step]
        before:[content:counter(step)] before:absolute before:w-9 before:h-9 before:bg-muted before:rounded-full before:font-mono before:font-medium before:text-center before:text-base before:inline-flex before:items-center before:justify-center before:-indent-px before:border-4 before:border-background
        before:-ml-[50px] before:-mt-1
      `
    }],
  ],
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
    [/^size-(\d+)$/, ([_, n]) => ({
      height: `calc(var(--spacing) * ${n})`,
      width: `calc(var(--spacing) * ${n})`,
    })],
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  presets: [
    presetWind(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetAnimations(),
    presetShadcn(
      builtinColors.map(c => ({ color: c })),
    ),
  ],
  transformers: [
    transformerDirectives(),
  ],
  extractors: [
    extractorMdc(),
  ],
  content: {
    filesystem: ['content/**/*.md'],
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '(components|src|content)/**/*.{js,ts,md}',
        // include shadcn components
        '**/shadcn-docs-nuxt/components/**/*.{ts,vue}',
      ],
    },
  },
  safelist: [
    'i-ri-menu-2-fill',
  ],
})
