// https://vite-pwa-org.netlify.app/assets-generator/cli.html#configurations

import { defineConfig } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    transparent: {
      padding: 0,
      sizes: [64, 192, 512],
      favicons: [[48, 'favicon.ico']],
    },
    maskable: {
      padding: 0,
      sizes: [512],
      resizeOptions: { background: 'transparent', fit: 'contain' },
    },
    apple: {
      padding: 0,
      sizes: [180],
      resizeOptions: { background: 'transparent', fit: 'contain' },
    },
    // png: {
    //   compressionLevel: 9,
    //   quality: 85,
    // },
  },
  images: ['public/icon.svg'],
})
