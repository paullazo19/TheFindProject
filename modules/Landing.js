import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <button><Link to="/createRouteLabel">Create new route</Link></button>
        <button>Navigate existing route</button>
      </div>
    )
  }
});
