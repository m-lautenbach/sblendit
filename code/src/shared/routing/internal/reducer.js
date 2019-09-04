import { allPass, cond, equals, flip, pipe, path, prop, set, T } from 'ramda'
import { action, hasType, state, updateState } from '../../utils'
import { lensLocation, lensPath } from '../lenses'
import pagePaths from '../pageRoutes'

export default cond([
  [hasType('USER_NAVIGATION'), updateState(set(lensLocation), path(['payload', 'newLocation']))],
  [
    allPass([hasType('NAVIGATE_TO'), pipe(action, path(['payload', 'type']), equals('page'))]),
    updateState(set(lensPath), pipe(path(['payload', 'page']), flip(prop)(pagePaths))),
  ],
  [T, state],
])
