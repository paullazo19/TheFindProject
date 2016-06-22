import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Landing from './modules/Landing'
import CreateRouteLabel from './modules/CreateRouteLabel'
import CreateRoutePath from './modules/CreateRoutePath'


render((
  <Router history={hashHistory}>
    <Route path="/" component={CreateRouteLabel}/>
    <Route path="/landing" component={Landing}/>
    <Route path="/createRouteLabel/:building/:floor/:room" component={CreateRouteLabel}/>
    <Route path="/createRoutePath/:building/:floor/:room" component={CreateRoutePath}/>
  </Router>
), document.getElementById('app'))
