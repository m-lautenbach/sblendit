import React from 'react'
import { connect } from 'react-redux'
import { view } from 'ramda'
import { lensTasks } from '../../tasks/lenses'

export default connect(
  state => ({
    tasks: view(lensTasks, state) || [],
  }),
  dispatch => ({
    onPurge: () => dispatch({ type: 'PURGE' }),
  }),
)(({ onPurge, tasks }) =>
  <div>
    <h1>Clarify</h1>
    <button onClick={onPurge}>PURGE</button>
    {
      tasks.map(
        ({ title, id }) => <div key={id}>{title}</div>,
      )
    }
  </div>,
)
