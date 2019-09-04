import React from 'react'
import { connect } from 'react-redux'
import { view, map, equals, flip, apply, useWith, prop, pipe } from 'ramda'

import pages from './pages'
import { lensPath } from '../routing/lenses'
import pagePaths from '../routing/pageRoutes'

const stateToProps = spec => (state, props) => map(flip(apply)([state, props]), spec)

const Item = connect(
  stateToProps({
    active: useWith(equals, [view(lensPath), pipe(prop('page'), flip(prop)(pagePaths))]),
  }),
  (dispatch, { page }) => ({
    onClick: () => dispatch({
      type: 'NAVIGATE_TO',
      payload: { type: 'page', page },
    }),
  }),
)(
  ({ title, onClick, active }) =>
    <div
      {...{
        onClick,
        css: {
          userSelect: 'none',
          textTransform: 'capitalize',
          cursor: 'pointer',
          border: '#484848 solid 1px',
          borderRight: 'none',
          borderLeft: 'none',
          borderRadius: '.6rem',
          padding: '.4rem',
          transition: 'background-color .8s',
          ...(active ?
              { backgroundColor: '#ffe6e6' } :
              {
                '&:hover': {
                  backgroundColor: '#e1f0fa',
                },
              }
          ),
        },
      }}
    >
      {title}
    </div>,
)
Item.displayName = 'Item'

const Navigation = () =>
  <div
    css={{
      display: 'flex',
      '> *': {
        marginRight: '1rem',
      },
      '> *:last-child': { marginRight: 0 },
      justifyContent: 'space-evenly',

    }}
  >
    {
      ['CAPTURE', 'CLARIFY', 'REFLECT', 'ENGAGE'].map(
        page =>
          <Item key={page} title={pages[page].title} page={page} />,
      )
    }
  </div>

export default Navigation
