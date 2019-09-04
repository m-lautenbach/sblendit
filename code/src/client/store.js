import { createStore, applyMiddleware } from 'redux'
import { compose } from 'ramda'

import combineReducers from '../shared/combineReducers'
import reducers from './reducers'
import middlewares from './middlewares'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) :
    compose

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

export default createStore(
  combineReducers(reducers),
  preloadedState,
  composeEnhancers(applyMiddleware(...middlewares)),
)
