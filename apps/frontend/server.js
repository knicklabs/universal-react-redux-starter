import express from 'express'

import initter  from '../../libs/initters/server'
import config   from '../../config/server.frontend'
import routes   from './routes'
import reducers from './reducers'
import getAsset from '../../libs/getAsset'

const frontend = express()

frontend.get('*', (req, res, next) => {
  const { bundle } = config

  const params = {
    bundle,
    routes,
    reducers,
    locals: {
      jsAsset: getAsset(bundle, 'js'),
      cssAsset: getAsset(bundle, 'css'),
      vendorAsset: getAsset('vendor', 'js')
    }
  }

  initter(req, res, next, params)
})

export default frontend
