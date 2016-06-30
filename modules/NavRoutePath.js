import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'
import _ from 'underscore'
import $ from 'jquery'
import Header from './Header'

var route = [];
var stepHeading;
var array = [];

var previousStepCluster;
var currentStepCluster;
var adjustedStepCluster;
var currentSegment;
var turnDetected;

var heightInches;
var strideInches;
var strideMeters;

export default React.createClass({
  getDefaultProps(){
    return {
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path2",
      RoutesData: RoutesData
    }
  },
  getInitialState(){
    return{
      steps: 0,
      deltaHeading: 10,
      turnDetected: 0,
      currentHeading: 0,
      current: 0,
      segment: 0,
      stepHeading: 0,
      route: []
    }
  },
  componentDidMount(){
    this.convertToStrideMeters(this.props.params.ft, this.props.params.in)
    this.currentSteps = 0;
    this.displaySteps = 0;
    this.stepCluster = [];
    navigator.geolocation.getCurrentPosition((position)=> {
      this.setState({
        currentHeading: position.coords.heading
      })
    }, null)

    _.delay(this.setCurrentHeading, 3000);

    this.throttleOnWatchPosition = _.throttle(this.onWatchPosition, 100);
    navigator.geolocation.watchPosition(this.throttleOnWatchPosition, null, {enableHighAccuracy: true});

    $.ajax({
      url: `${this.props.routePathSource}/${this.props.params.path_id}`,
      method: "GET",
      dataType: "JSON",
      success: (resp)=> {
        this.routeData = resp
        this.segmentRoute();
      }
    })
  },
  convertToStrideMeters(feet, inches){
    heightInches = Number(feet*12) + Number(inches)
    strideInches = heightInches/2.3;
    strideMeters = strideInches*0.0254;
  },
  setCurrentHeading(){
      this.setState({
          currentHeading: this.state.deltaHeading
      })
  },
  convertStepNum(speed){
    return speed / strideMeters
  },
  onWatchPosition(position){
    this.currentSteps += this.convertStepNum(position.coords.speed);
    this.displaySteps = this.currentSteps;
    this.displaySteps = this.displaySteps.toFixed(1)
    // convert stepNum in function
    this.setState({
      deltaHeading: position.coords.heading
    })
    if (this.currentSteps > 0) {
      this.calcTurns(this.state.currentHeading, this.state.deltaHeading);
    }
    this.navigateRoute();
  },
  calcTurns(currentHeading, deltaHeading){
    var turn = currentHeading - deltaHeading;

    if (turn > 0) {
      turn = turn - 360;
    }
    turn = Math.abs(turn);

    if (turn >= 240 && turn <= 300) {
      this.turnDetected = "turn right";
    }
    if (turn >= 60 && turn <= 120) {
      this.turnDetected = "turn left";
    }
  },
  segmentRoute(){
    array = $.map(this.routeData, (el)=> {
      return el
    });
    array.shift();
    array = $.grep(array, (n, i)=> {
      return (i % 2 != 0)
    });

    for(var i = 0; i < array.length; i++){
      if (array[i] === "") {
        array[i] = (Number(array[i-1]) + Number(array[i+1]))/2;
        array[i].toString();
      }
    }
    array.map((step, i)=> {
      step = Number(step);
      if (i != 0) {
          var difference = step - array[i-1];
      }
      if (difference > 0) {
        difference = difference - 360;
      }
      difference = Math.abs(difference);
      if (difference >= 240 && difference <= 300) {

        if (isNaN(adjustedStepCluster) === true) {
          previousStepCluster = 0;
          adjustedStepCluster = 0;
        } else {
          previousStepCluster = adjustedStepCluster;
        }

        currentStepCluster = i+1;
        adjustedStepCluster = currentStepCluster - previousStepCluster;

        route.push(adjustedStepCluster);
        route.push("turn right");
      }
      if (difference >= 60 && difference <= 120) {

          if (isNaN(adjustedStepCluster) === true) {
            previousStepCluster = 0;
            adjustedStepCluster = 0;
          } else {
            previousStepCluster = adjustedStepCluster;
          }

          currentStepCluster = i+1;
          adjustedStepCluster = currentStepCluster - previousStepCluster;

          route.push(adjustedStepCluster);
          route.push("turn left");
      }
    })
  },
  navigateRoute(){
    console.log("route:", route );
    if (this.currentSteps >= route[this.state.segment]) {

      this.setState({
        segment: this.state.segment + 1
      })
      this.currentSteps = 0;
    } else if (route[this.state.segment] === "turn right" && this.turnDetected === "turn right") {
      this.setState({
        segment: this.state.segment + 1
      })
    } else if (route[this.state.segment] === "turn left" && this.turnDetected === "turn left") {
      this.setState({
        segment: this.state.segment + 1
      })
    } else if (this.state.segment === route.length && this.state.segment != 0) {
      hashHistory.push("/")
      alert("You've completed the route!");
      route = [];
    }
  },
  render() {
    return(
      <div className="wrapper">
        <Header/>
        <h1 className="nav--command">{route[this.state.segment]}</h1>
        <h2 className="nav--progress">steps progress: {this.displaySteps}</h2>
      </div>
    )
  }
});
