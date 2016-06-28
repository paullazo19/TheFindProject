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
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path"
    }
  },
  getInitialState(){
    return{
      steps: 0,
      deltaHeading: 0,
      turnDetected: 0,
      currentHeading: 0,
      leftTurn: {
        detected: false
      },
      rightTurn: {
        detected: false
      },
      stepCluster: []
    }
  },
  componentDidMount(){
    this.convertToStrideMeters(this.props.params.ft, this.props.params.in)
    this.currentSteps = 0;
    this.stepCluster = [];
    navigator.geolocation.getCurrentPosition((position)=> {
      this.setState({
        currentHeading: position.coords.heading
      })
    }, null)
    this.throttleOnWatchPosition = _.throttle(this.onWatchPosition, 100);
    navigator.geolocation.watchPosition(this.throttleOnWatchPosition, null, {enableHighAccuracy: true});
  },
  convertToStrideMeters(feet, inches){
    heightInches = Number(feet*12) + Number(inches)
    strideInches = heightInches/2.3;
    strideMeters = strideInches*0.0254;
    console.log("hss", heightInches, strideInches, strideMeters);
    // return strideMeters
  },
  setCurrentHeading(){
      this.setState({
          currentHeading: this.state.deltaHeading
      })
  },
  convertStepNum(speed){
    console.log("stride meters", strideMeters);
    return speed / strideMeters
  },
  onWatchPosition(position){
    console.log(this.stepCluster);
    if (this.currentSteps >= 1) {
      this.stepCluster.push({value: 1, heading: position.coords.heading})
      var remainder = this.currentSteps > 1? this.currentSteps-1 : 0;
      this.currentSteps = remainder;
    }
    this.currentSteps += this.convertStepNum(position.coords.speed);
      // // convert stepNum in function
      // this.setState({
      //   steps: this.state.steps + this.convertStepNum(position.coords.speed),
      //   deltaHeading: position.coords.heading
      // })
      // if (this.state.steps > 0) {
      //   this.calcDifference(this.state.currentHeading, this.state.deltaHeading);
      // }
  },
  handleStepCluster(e){
    // prevent 0 from pushing to cluster
    if (this.state.steps != 0 ) {
      this.setState({
        steps: 0,
        stepCluster: [Math.ceil(this.state.steps)]
      })
    }
    console.log(this.state.stepCluster);
  },
  directToAllRoutes(){
    hashHistory.push("/AllRoutes/:ft/:in")
  },
  submitRoutePath(e){
    e.preventDefault();
    this.directToAllRoutes();
    var serializedForm = Serialize(this.refs.routePathForm, {hash: true})
    $.post(this.props.routePathSource, serializedForm, (resp)=> {
      alert("Route successfully submitted. Thank you!")

    });
  },
  render() {
    console.log(this.state.stepCluster);
    return (
      <div>
        <h2>steps: {this.state.steps}</h2>
        <h2>current heading: {this.state.currentHeading}</h2>
        <h2>delta heading: {this.state.deltaHeading}</h2>
        <form method="POST" action="#" ref="routePathForm" onSubmit={this.submitRoutePath}>
          <input type="text" name="stepCluster" value={this.state.stepCluster} readOnly/>
          <input type="submit" ref="endRoute" value="end route"/>
        </form>
      </div>
    )
  }
});
