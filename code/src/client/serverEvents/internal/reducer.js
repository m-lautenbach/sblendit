import { T, cond, over, set, pipe, view, assoc, prop, lt, gte, not, append, allPass, reject, flip } from 'ramda'
import { hasType, state } from '../../../shared/utils'
import { lensActions, lensIndex } from '../lenses'

export default cond([
  [
    pipe(hasType('CLEAR_SERVER_ACTIONS'), not),
    (action, state) => {
      const index = view(lensIndex, state) || 0
      return pipe(
        set(lensIndex, index + 1),
        over(lensActions, append(assoc('index', index, action))),
      )(state)
    },
  ],
  [
    hasType('CLEAR_SERVER_ACTIONS'),
    ({ payload: { from, to } }, state) =>
      over(
        lensActions,
        reject(pipe(prop('index'), allPass([flip(gte)(from), flip(lt)(to)]))),
        state,
      ),
  ],
  [T, state],
])
