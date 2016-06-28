import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'
import NavRoutePath from './NavRoutePath'
import $ from 'jquery'

var routes;

export default React.createClass({
  getDefaultProps(){
    return {
      RoutesData: RoutesData,
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path",
      routeLabelSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-label"
    }
  },
  getInitialState(){
    return {
      labels: []
    }
  },
  componentDidMount(){
    this.getRouteLabels();
  },
  getRouteLabels(){
    $.get(this.props.routeLabelSource, (resp)=> {
      this.setState({
        labels: resp
      })
    })
  },
  render() {
    // console.log(RoutesData);
    console.log(this.state.labels);
    return (
      <div>
        <h2 className="routes--heading">All Routes</h2>
        <ul>
          { this.state.labels.map((label, i)=> {
            return <li key={i}>{label.building}</li>
            })
          }
        </ul>

        <ul className="routesList">
          { this.props.RoutesData.map((route, i)=> {
            return  <Link to={`/StartNav/${route.uuid}/${this.props.params.ft}/${this.props.params.in}`} className="route--link" key={i}>{`Building: ${route.label.building}, Floor: ${route.label.floor}, Room: ${route.label.room}`}</Link>
          }) }
        </ul>



      </div>
    )
  }
});
