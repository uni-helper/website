import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  theme: {
    colors: {
      primary: '#2b9939',
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      collections: {
        app: FileSystemIconLoader('./assets/icons', (svg: string) =>
          svg.replaceAll(/#fff/g, 'currentColor')),
      },
    }),

    presetAttributify(),
    presetTypography({
      cssExtend: {
        img: {
          display: 'inline',
        },
      },
    }),
  ],
  transformers: [transformerDirectives()],
})
