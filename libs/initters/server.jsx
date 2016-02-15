import React                from 'react'
import ReactDOMServer       from 'react-dom/server'
import Helmet               from 'react-helmet'
import Router               from 'react-router'
import { RoutingContext }   from 'react-router'
import { match }            from 'react-router'
import { combineReducers }  from 'redux'
import { applyMiddleware }  from 'redux'
import { createStore }      from 'redux'
import { Provider }         from 'react-redux'
import middleware           from 'redux-thunk'
import serialize            from 'serialize-javascript'
import jade                 from 'jade'

import populateState        from '../populateState'
import apiCall              from '../apiCall'

export default async (req, res, next, params) => {
  const reducer = combineReducers(params.reducers)
  const store   = applyMiddleware(middleware)(createStore)(reducer)
  const appHost = `${req.protocol}://${req.headers.host}`
  const apiHost = `${req.protocol}://${req.headers.host}/api`
  const routes  = params.routes({ store })

  // Match the request location to the router
  match({routes, location: req.url}, async (error, redirectLocation, initialState) => {

    if (error) {
      let err = new Error()
      err.status = error.status || 500
      return next(err)
    }

    const components = initialState.components
    const args       = {
      apiHost : apiHost,
      dispatch: store.dispatch,
      location: initialState.location,
      params  : initialState.params
    }

    populateState(components, args).then(() => {
      const state = store.getState()

      let { bundle, locals } = params

      locals.body = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RoutingContext {...initialState} />
        </Provider>
      )

      let head = Helmet.rewind()
      locals.head = {
        title: head.title.toString(),
        meta: head.meta.toString()
      }

      const chunks = __DEV__ ? {} : require('public/assets/chunk-manifest.json')

      locals.chunks = serialize(chunks)
      locals.data   = serialize(state)

      const layout = `${process.cwd()}/apps/${bundle}/layouts/Layout.jade`
      const html   = jade.compileFile(layout, { pretty: false })(locals)

      res.send(html)
    })
    .catch(() => {
      res.status(500).send(err.stack)
    })
  })
}
