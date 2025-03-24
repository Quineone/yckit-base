import mitt from 'mitt'
import { EventName, type Events } from './types'

export { EventName }

export const useEvents = () => {
  const events = mitt<Events>()

  return {
    events,
  }
}
