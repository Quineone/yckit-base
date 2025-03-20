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
    // doc: https://nuxt.com/modules/vueuse
    '@vueuse/nuxt',
    // doc: https://nuxt.com/modules/gtag
    'nuxt-gtag',
    // doc: https://nuxt.com/modules/vite-pwa-nuxt
    '@vite-pwa/nuxt',
  ],

  imports: {
    dirs: ['composables/**/use*.ts'],
  },

  devtools: { enabled: true },

  css: [
    join(currentDir, './assets/css/main.css'),
  ],

  runtimeConfig: {
    public: {
      apiEndpoint: process.env.NUXT_PUBLIC_API_ENDPOINT,
    },
  },

  routeRules: {
    // proxy api routes when ssr false to prevent CORS
    '/api/**': { proxy: `${process.env.NUXT_PUBLIC_API_ENDPOINT}/api/**` },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-03-13',

  /*
    modules config options
  */
  eslint: {
    config: {
      stylistic: true, // formatting
    },
  },

  pwa: {
    strategies: 'generateSW', // default
    registerType: 'autoUpdate',
    pwaAssets: {
      config: true,
    },
    manifest: {
      name: '@yckit/base',
      short_name: '@yckit/base',
      // description: '@yckit/base description',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: null, // default
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      // enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/], // default
    },
  },
})
