import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Landing from './modules/Landing'
import CreateRouteLabel from './modules/CreateRouteLabel'
import StartCreate from './modules/StartCreate'
import CreateRoutePath from './modules/CreateRoutePath'
import AllRoutes from './modules/AllRoutes'
import StartNav from './modules/StartNav'
import NavRoutePath from './modules/NavRoutePath'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/landing/:ft/:in" component={Landing}/>
    <Route path="/createRouteLabel/:ft/:in" component={CreateRouteLabel}/>
    <Route path="/startCreate/:building/:floor/:room/:ft/:in" component={StartCreate}/>
    <Route path="/createRoutePath/:building/:floor/:room/:ft/:in" component={CreateRoutePath}/>
    <Route path="/allRoutes" component={AllRoutes}/>
    <Route path="/startNav/:uuid/:ft/:in" component={StartNav}/>
    <Route path="/navRoutePath/:uuid/:ft/:in" component={NavRoutePath}/>
  </Router>
), document.getElementById('app'))
