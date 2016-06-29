import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import _ from 'underscore'

var heightInches;
var strideInches;
var strideMeters;

export default React.createClass({
  getDefaultProps(){
    return {
      routeLabelSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-label"
    }
  },
  getInitialState(){
    return{
      startRecord: {
        isOn: false
      }
    }
  },
  startRecording(e){
    hashHistory.push(`/createRoutePath/${this.props.params.building}/${this.props.params.floor}/${this.props.params.room}/${this.props.params.ft}/${this.props.params.in}`)
  },
  render() {
    return (
      <div className="wrapper">
        <Link className="startRecord--back" to={`/createRouteLabel/${this.props.params.building}/${this.props.params.floor}/${this.props.params.room}/${this.props.params.ft}/${this.props.params.in}`}>Back</Link>
        <div className="routeInformation">Building: {`${this.props.params.building}`}<span className="routeInformation--middle">Floor: {`${this.props.params.floor}`}</span>Room: {`${this.props.params.room}`}</div>
        <p className="startCreate--warning">To ensure optimal route accuracy, please begin route inside the building at the main entrance with your back to the door. Thank you.</p>
        <a className="startCreate--button" ref="startRecord" onClick={this.startRecording}>Start Recording</a>
      </div>
    )
  }
});
