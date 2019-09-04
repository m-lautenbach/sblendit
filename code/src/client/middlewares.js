import { flatten } from 'ramda'
import routing from '../shared/routing/internal/middlewares'
import serverEvents from './serverEvents/internal/middlewares'

export default flatten([routing, serverEvents])
