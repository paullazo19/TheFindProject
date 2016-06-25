import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Landing from './modules/Landing'
import CreateRouteLabel from './modules/CreateRouteLabel'
import CreateRoutePath from './modules/CreateRoutePath'
import AllRoutes from './modules/AllRoutes'


render((
  <Router history={hashHistory}>
    <Route path="/" component={AllRoutes}/>
    <Route path="/landing" component={Landing}/>
    <Route path="/createRouteLabel/:building/:floor/:room/:routeLabelForm" component={CreateRouteLabel}/>
    <Route path="/createRoutePath/:building/:floor/:room/:routeLabelForm" component={CreateRoutePath}/>
    <Route path="/allRoutes" component={AllRoutes}/>
  </Router>
), document.getElementById('app'))
