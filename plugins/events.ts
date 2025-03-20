export default defineNuxtPlugin(() => {
  const { emitter } = useEvents()

  return {
    provide: {
      events: emitter,
    },
  }
})
