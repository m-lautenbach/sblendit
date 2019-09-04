import { compose, lensProp } from 'ramda'

export const lensServerEventsState = lensProp('serverEvents')
export const lensActions = compose(lensServerEventsState, lensProp('actions'))
export const lensIndex = compose(lensServerEventsState, lensProp('index'))
