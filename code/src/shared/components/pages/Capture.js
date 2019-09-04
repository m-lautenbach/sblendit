import React from 'react'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'

export default connect(
  null,
  dispatch => ({
    onConfirm: (title) => dispatch({ type: 'CREATE_TASK', payload: { newTask: { title, id: uuidv4() } } }),
  }),
)(({ onConfirm }) =>
  <div>
    <h1>Capture</h1>
    <input
      type="text"
      autoFocus
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target.value.length > 0) {
          onConfirm(e.target.value)
          e.target.value = ''
        }
      }}
      css={{
        fontFamily: '\'Quicksand\', sans-serif',
        fontSize: '4rem',
        marginBottom: '.5rem',
        width: '100%',
        maxWidth: '1000px',
      }}
    />
  </div>,
)
