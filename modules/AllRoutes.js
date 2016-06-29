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
    return (
      <div className="wrapper">
        <h2 className="routes--heading">All Routes</h2>
        <ul className="routesList">
          { this.state.labels.map((label, i)=> {
            return <Link className={label.building != null ? "route__link": "route__link--error"} to={`/StartNav/${label.path_id}/${this.props.params.ft}/${this.props.params.in}`} key={i}>Building: {label.building}, Floor: {label.floor}, Room: {label.room}</Link>
            })
          }
        </ul>
      </div>
    )
  }
});
