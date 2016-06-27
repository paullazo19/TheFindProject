import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'
import StartNav from './StartNav'

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
            return  <Link to={`/startNav/${route.uuid}`} className="route--link" key={i}>{`Building: ${route.label.building}, Floor: ${route.label.floor}, Room: ${route.label.room}`}</Link>
          }) }
        </ul>
      </div>
    )
  }
});
