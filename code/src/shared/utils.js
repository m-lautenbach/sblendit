import { equals, identity, nthArg, pipe, prop, useWith } from 'ramda'

export const action = nthArg(0)
export const state = nthArg(1)
export const hasType = type => pipe(action, prop('type'), equals(type))
// TODO: don't update if they were no changes to avoid unnecessary persistence
export const updateState = (fnState, fnAction) => useWith(fnState, [fnAction, identity])
