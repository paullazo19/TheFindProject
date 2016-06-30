import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import Header from './Header'

export default React.createClass({
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <h3 className="landing--heading">Which would you like to do?</h3>
        <nav className="landing--nav">
          <Link className="landing--link" to={`/CreateRouteLabel/${this.props.params.ft}/${this.props.params.in}`}>Create new route</Link>
          <Link className="landing--link" to={`/AllRoutes/${this.props.params.path_id}/${this.props.params.ft}/${this.props.params.in}`}>Navigate existing route</Link>
        </nav>
      </div>
    )
  }
});
