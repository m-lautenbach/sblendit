import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import Main from '../shared/components/Main'

export default (template, store) => {

  const rendered = renderToString(
    <Provider store={store}>
      <Main />
    </Provider>,
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  return template
  .replace(
    '<div id="app"></div>',
    `<div id="app">${rendered}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\\u003c',
    )}
        </script>`,
  )
}
