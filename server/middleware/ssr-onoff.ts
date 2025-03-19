// doc: https://github.com/nuxt/nuxt/issues/28478#issuecomment-2277811195
// or https://www.lichter.io/articles/nuxt3-dynamic-ssr-spa/#solution-3-a-custom-nitro-middleware

export default defineEventHandler((event) => {
  const { ssr } = getQuery(event)

  if (ssr === 'false') {
    event.context.nuxt ||= {}
    event.context.nuxt.noSSR = true
  }
})
