import reducers from '../shared/reducers'
import serverEvents from './serverEvents/internal/reducer'

export default reducers.concat(serverEvents)
