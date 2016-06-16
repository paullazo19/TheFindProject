import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Landing from './modules/Landing'
import CreateRouteLabel from './modules/CreateRouteLabel'
import CreateRoutePath from './modules/CreateRoutePath'


render((
  <Router history={browserHistory}>
    <Route path="/" component={CreateRoutePath}/>
    <Route path="/landing" component={Landing}/>
    <Route path="/createRouteLabel" component={CreateRouteLabel}/>
    <Route path="/createRoutePath" component={CreateRoutePath}/>
  </Router>
), document.getElementById('app'))
