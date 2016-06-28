import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'
import NavRoutePath from './NavRoutePath'

var routes;

export default React.createClass({
  getDefaultProps(){
    return {
      RoutesData: RoutesData
    }
  },
  render() {
    console.log(RoutesData);
    return (
      <div>
        <h2 className="routes--heading">All Routes</h2>
        <ul className="routesList">
          { this.props.RoutesData.map((route, i)=> {
            return  <Link to={`/StartNav/${route.uuid}/${this.props.params.ft}/${this.props.params.in}`} className="route--link" key={i}>{`Building: ${route.label.building}, Floor: ${route.label.floor}, Room: ${route.label.room}`}</Link>
          }) }
        </ul>
      </div>
    )
  }
});
