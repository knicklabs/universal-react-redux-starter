import express  from 'express'
import parser   from 'body-parser'
import path     from 'path'

import config   from './config/server.frontend'

import api      from './apps/api/server'
import frontend from './apps/frontend/server'

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEV__    = config.env !== 'production'

const app = express()

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', api)
app.use('/', frontend)

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'apps'))
app.set('port', config.appPort)

app.listen(app.get('port'), function() {
  console.log(`App server (${config.env}) is running on ${this.address().port}`)
})
