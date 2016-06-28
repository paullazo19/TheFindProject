import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'
import _ from 'underscore'

export default React.createClass({
  startNav(e){
    hashHistory.push(`/navRoutePath/${this.props.params.uuid}/${this.props.params.ft}/${this.props.params.in}`)
  },
  render() {
    return(
      <div>
        <Link className="startRecord--back" to={`/AllRoutes/${this.props.params.uuid}/${this.props.params.ft}/${this.props.params.in}`}>Back</Link>
        <p className="startRecord--warning">To ensure the best navigation experience, please begin navigation inside the building at the main entrance with your back to the door. Thank you.</p>
        <a className="startRecord--button" ref="startNav" onClick={this.startNav}>Start Recording</a>
      </div>
    )
  }
});
