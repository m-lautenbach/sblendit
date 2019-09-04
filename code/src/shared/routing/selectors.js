import { always, T, view, toPairs, pipe, map, cond, append, useWith, flip, prop, apply } from 'ramda'
import pages from '../components/pages'
import { lensRoute } from './lenses'
import pageRoutes from './pageRoutes'

export const getPageByRoute = pipe(
  toPairs,
  map(apply(useWith(flip(Array), [pipe(flip(prop)(pages), always), pipe(lensRoute, view)]))),
  append([T, always(pages.NOT_FOUND)]),
  cond,
)(pageRoutes)
