import React from 'react'
import { Route } from 'react-router'

import Layout   from '../layouts/Layout'
import App      from '../components/App'
import Main     from '../components/Main'
import About    from '../components/About'
import NotFound from '../components/NotFound'

export default (context) => (
  <Route name="layout" component={Layout}>
    <Route name="app" component={App}>
      <Route name="main" path="/" component={Main} />
      <Route name="about" path="/about" component={About} />
      <Route name="not-found" path="*" component={NotFound} />
    </Route>
  </Route>
)
