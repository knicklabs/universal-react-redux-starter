import polyfill from 'babel/polyfill'

import initter  from '../../libs/initters/client'
import config   from '../../config/server.frontend'
import routes   from './routes'
import reducers from './reducers'

const params = { routes, reducers }

export default initter(params)
