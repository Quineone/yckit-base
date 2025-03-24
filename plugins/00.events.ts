export default defineNuxtPlugin(() => {
  const { events } = useEvents()

  return {
    provide: {
      events,
    },
  }
})
