import { view } from 'ramda'
import locationToPersistable from '../locationToPersistable'
import { lensLocation } from '../lenses'
import { USER_NAVIGATION } from './actionTypes'

const userNavigation = ({ getState, dispatch }) => {
  window.onpopstate = () =>
    dispatch({
      type: USER_NAVIGATION,
      payload: {
        newLocation: locationToPersistable(window.location),
      },
    })

  return next => action => {
    const oldLocation = view(lensLocation, getState())
    const result = next(action)
    const newLocation = view(lensLocation, getState())

    if (
      action.type !== 'USER_NAVIGATION' &&
      (oldLocation.pathname !== newLocation.pathname || oldLocation.search !== newLocation.search)
    ) {
      history.pushState(null, 'test', `${newLocation.pathname}${newLocation.search}`)
    }
    return result
  }
}

export default [userNavigation]
