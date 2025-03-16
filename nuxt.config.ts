import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // doc: https://eslint.nuxt.com/packages/module
    '@nuxt/eslint',
    // doc: https://ui.nuxt.com/getting-started/installation/nuxt
    '@nuxt/ui',
  ],

  imports: {
    dirs: ['composables/**'],
  },

  devtools: { enabled: true },

  css: [
    join(currentDir, './assets/css/main.css'),
  ],

  runtimeConfig: {
    public: {
      apiEndpoint: process.env.NUXT_PUBLIC_API_ENDPOINT || 'http://localhost:6700',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-03-13',

  eslint: {
    config: {
      // formatting
      stylistic: true,
    },
  },
})
