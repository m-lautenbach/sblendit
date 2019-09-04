import { compose, lensProp } from 'ramda'
import { lensModel } from '../model/lenses'

export const lensTasks = compose(lensModel, lensProp('tasks'))
