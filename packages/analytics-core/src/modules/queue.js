// Follows ducks pattern http://bit.ly/2DnERMc
import EVENTS from '../events'

/*
TODO figure out if this should live in state...
Queue could be in mermory as well.
But also needs to be persisted to storage
*/

const initialState = {
  actions: [],
}

export default function queueReducer(state = initialState, action) {
  const { type, data, timestamp, payload } = action

  switch (type) {
    case 'queue':
      let actionChain
      /* prioritize identify in event queue */
      if (payload && payload.type && payload.type === 'identify') {
        actionChain = [action].concat(state.actions)
      } else {
        actionChain = state.actions.concat(action)
      }
      return {
        ...state,
        actions: actionChain
      }
    case 'dequeue':
      return []
    // todo push events to history
    default:
      return state
  }
}

export const queueAction = (data, timestamp) => {
  return {
    type: 'queue',
    timestamp: timestamp,
    data: data
  }
}
