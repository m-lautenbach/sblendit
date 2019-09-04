import { createStore } from 'redux'
import combineReducers from '../shared/combineReducers'
import reducers from './reducers'

export const create = initialState =>
  createStore(combineReducers(reducers), initialState)
