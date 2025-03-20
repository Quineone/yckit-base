import mitt from 'mitt'
import { EventName, type Events } from './types'

export { EventName }

export const useEvents = () => {
  const emitter = mitt<Events>()

  return {
    emitter,
  }
}
