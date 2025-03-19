# install dependencies

> eslint
- yarn add --dev @nuxt/eslint eslint typescript

> husky + commitlint + lint-staged
- yarn add --dev husky @commitlint/cli @commitlint/config-conventional lint-staged is-ci

> vueuse
- yarn add --dev @vueuse/nuxt @vueuse/core

> @nuxt/ui
- yarn add @nuxt/ui (reka-ui, tailwindcss(v4), @nuxt/fonts, @nuxt/color-mode, @nuxt/icon)

> gtm
- yarn add nuxt-gtag

> pwa
- yarn add @vite-pwa/nuxt
- yarn add --dev @vite-pwa/assets-generator

> event bus
- yarn add mitt



> further consider
- @nuxt/scripts
- @sidebase/nuxt-auth
- @formkit/auto-animate
- nuxt-tiptap-editor


# deployment

> entry point, require node >= 20.6.0
```base
node --env-file=.env .output/server/index.mjs
```
