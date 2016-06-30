import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import _ from 'underscore'
import Header from './Header'

var heightInches;
var strideInches;
var strideMeters;

var stepCluster = [];

export default React.createClass({
  getDefaultProps(){
    return {
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path2",
      routeLabelSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-label2"
    }
  },
  componentDidMount(){
    this.convertToStrideMeters(this.props.params.ft, this.props.params.in)
    this.currentSteps = 0;
    navigator.geolocation.getCurrentPosition((position)=> {
    }, null)
    this.throttleOnWatchPosition = _.throttle(this.onWatchPosition, 100);
    navigator.geolocation.watchPosition(this.throttleOnWatchPosition, null, {enableHighAccuracy: true});
  },
  convertToStrideMeters(feet, inches){
    heightInches = Number(feet*12) + Number(inches)
    strideInches = heightInches/2.3;
    strideMeters = strideInches*0.0254;
  },
  convertStepNum(speed){
    return speed / strideMeters
  },
  onWatchPosition(position){
    if (this.currentSteps >= 1) {
      stepCluster.push({value: 1, heading: position.coords.heading})
      var remainder = this.currentSteps > 1? this.currentSteps-1 : 0;
      this.currentSteps = remainder;
    }
    this.currentSteps += this.convertStepNum(position.coords.speed);
  },
  directToAllRoutes(){
    hashHistory.push(`/allRoutes/${this.props.params.path_id}/${this.props.params.ft}/${this.props.params.in}`)
  },
  submitRoutePath(e){
    e.preventDefault();
    var serializedForm = Serialize(this.refs.routePathForm, {hash: true})
    $.ajax({
      url: this.props.routePathSource,
      method: "POST",
      dataType: "JSON",
      data: {
        route: stepCluster
      },
      success: (resp)=> {
        $.get(this.props.routePathSource, (resp)=> {
          this.latestPath = resp[0]._id;
          console.log("latest", this.latestPath);
          if (this.latestPath != null) {
            this.submitRouteLabel();
          }
        })
      }
    });
  },
  submitRouteLabel(){
    var serializedForm = Serialize(this.refs.routeLabelForm, {hash: true})

    $.ajax({
      url: this.props.routeLabelSource,
      method: "POST",
      dataType: "JSON",
      data: {
        building: this.props.params.building,
        floor: this.props.params.floor,
        room: this.props.params.room,
        path_id: this.latestPath
      },
      success: (resp)=> {
        alert("Route successfully submitted. Thank you!");
        this.directToAllRoutes();
      }
    })
  },
  render() {
    console.log("stepCluster", stepCluster);
    return (
      <div className="wrapper">
        <Header/>
        <p>Please walk at a casual pace holding the device steadily in front of you. When you&rsquo;ve completed the route, press the button below.</p>
        <form method="POST" action="#" ref="routePathForm" onSubmit={this.submitRoutePath}>
          <input className="input--hidden" type="text" name="route" value={stepCluster} readOnly/>
          <input className="submit" type="submit" ref="endRoute" value="end route" />
        </form>

        <form className="label__form--hidden" method="POST" action="#" ref="routeLabelForm">
          <input type="text" name="building" value={this.props.params.building} readOnly/>
          <input type="text" name="floor" value={this.props.params.floor} readOnly/>
          <input type="text" name="room" value={this.props.params.room} readOnly/>
        </form>
      </div>
    )
  }
});
