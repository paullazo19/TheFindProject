import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Landing from './modules/Landing'
import CreateRouteLabel from './modules/CreateRouteLabel'
import CreateRoute from './modules/CreateRoute'


render((
  <Router history={browserHistory}>
    <Route path="/" component={CreateRouteLabel}/>
    <Route path="/landing" component={Landing}/>
    <Route path="/createRouteLabel" component={CreateRouteLabel}/>
  </Router>
), document.getElementById('app'))
