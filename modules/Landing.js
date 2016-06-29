import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div className="wrapper">
        <nav className="landing--nav">
          <Link className="landing--link" to={`/CreateRouteLabel/${this.props.params.ft}/${this.props.params.in}`}>Create new route</Link>
          <Link className="landing--link" to={`/AllRoutes/${this.props.params.path_id}/${this.props.params.ft}/${this.props.params.in}`}>Navigate existing route</Link>
        </nav>
      </div>
    )
  }
});
