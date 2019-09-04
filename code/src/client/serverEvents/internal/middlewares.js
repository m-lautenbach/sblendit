import io from 'socket.io-client'
import { filter, isEmpty, last, lte, pipe, prop, view } from 'ramda'
import { lensActions } from '../lenses'

let index = 0
const middleware = ({ getState, dispatch }) => {
  const socket = io()
  return next => action => {
    const result = next(action)
    const newActions = pipe(
      view(lensActions),
      filter(pipe(prop('index'), lte(index))),
    )(getState())
    if (isEmpty(newActions)) {
      return
    }
    const oldIndex = index
    index = last(newActions).index + 1
    socket.emit(
      'actions',
      newActions,
      successful =>
        successful &&
        dispatch({
          type: 'CLEAR_SERVER_ACTIONS',
          payload: { from: oldIndex, to: index },
        }),
    )
    return result
  }
}

export default [middleware]
