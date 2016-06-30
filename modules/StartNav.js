import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'
import _ from 'underscore'
import Header from './Header'

export default React.createClass({
  startNav(e){
    hashHistory.push(`/navRoutePath/${this.props.params.path_id}/${this.props.params.ft}/${this.props.params.in}`)
  },
  render() {
    return(
      <div className="wrapper">
        <Header/>
        <Link className="startNavigation--back" to={`/AllRoutes/${this.props.params.path_id}/${this.props.params.ft}/${this.props.params.in}`}>Back</Link>
        <p className="startNavigation--warning">To ensure the best navigation experience, please begin navigation inside the building at the main entrance with your back to the door. Thank you.</p>
        <a className="startNavigation--button" ref="startNav" onClick={this.startNav}>Start Navigation</a>
      </div>
    )
  }
});
