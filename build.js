import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Landing from './modules/Landing'
import CreateRouteLabel from './modules/CreateRouteLabel'
import CreateRoutePath from './modules/CreateRoutePath'
import AllRoutes from './modules/AllRoutes'
import NavRoutePath from './modules/NavRoutePath'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/landing/:ft/:in" component={Landing}/>
    <Route path="/createRouteLabel/:ft/:in" component={CreateRouteLabel}/>
    <Route path="/createRoutePath/:building/:floor/:room/:ft/:in" component={CreateRoutePath}/>
    <Route path="/allRoutes/:ft/:in" component={AllRoutes}/>
    <Route path="/navRoutePath/:uuid" component={NavRoutePath}/>
  </Router>
), document.getElementById('app'))
