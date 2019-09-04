import { compose, lens, lensProp } from 'ramda'
import { parse as qsParse, stringify as qsStringify } from 'query-string'
import Path from 'path-parser'

export const lensLocation = lensProp('location')
export const lensState = lensLocation

export const lensPath = compose(lensLocation, lensProp('pathname'))
const _lensRoute = testMethod => pattern => compose(
  lensPath,
  lens(
    path => (new Path(pattern))[testMethod](path),
    params => (new Path(pattern)).build(params),
  ),
)

export const lensRoute = _lensRoute('test')
export const lensRoutePartial = _lensRoute('partialTest')

export const lensQuery = compose(
  lensLocation,
  lensProp('search'),
  lens(
    qsParse,
    qsStringify,
  ),
)
