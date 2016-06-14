import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Landing from './modules/Landing'
import CreateRoute from './modules/CreateRoute'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/landing" component={Landing}/>
    <Route path="/createRoute" component={CreateRoute}/>
  </Router>
), document.getElementById('app'))
