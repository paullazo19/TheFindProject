import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'
import _ from 'underscore'
import $ from 'jquery'

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
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path",
      RoutesData: RoutesData
    }
  },
  getInitialState(){
    return{
      steps: 0,
      deltaHeading: 0,
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
    this.stepCluster = [];
    navigator.geolocation.getCurrentPosition((position)=> {
      this.setState({
        currentHeading: position.coords.heading
      })
    }, null)
    // this.segmentRoute();

    _.delay(this.setCurrentHeading, 1000);

    this.throttleOnWatchPosition = _.throttle(this.onWatchPosition, 100);
    navigator.geolocation.watchPosition(this.throttleOnWatchPosition, null, {enableHighAccuracy: true});

    $.ajax({
      url: `${this.props.routePathSource}/${this.props.params.path_id}`,
      method: "GET",
      dataType: "JSON",
      success: (resp)=> {
        // console.log(resp);
        this.routeData = resp
        this.segmentRoute();
      }
    })
  },
  convertToStrideMeters(feet, inches){
    heightInches = Number(feet*12) + Number(inches)
    strideInches = heightInches/2.3;
    strideMeters = strideInches*0.0254;
    // console.log("hss", heightInches, strideInches, strideMeters);
    // return strideMeters
  },
  setCurrentHeading(){
      this.setState({
          currentHeading: this.state.deltaHeading
      })
  },
  convertStepNum(speed){
    // console.log("stride meters", strideMeters);
    return speed / strideMeters
  },
  onWatchPosition(position){
    // if (this.currentSteps >= 1) {
    //   this.stepCluster.push({value: 1, heading: position.coords.heading})
    //   var remainder = this.currentSteps > 1? this.currentSteps-1 : 0;
    //   this.currentSteps = remainder;
    // }
    // console.log("watching");
    this.currentSteps += this.convertStepNum(position.coords.speed);
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
    // this.turnDetected = "";
  },
  segmentRoute(){
    // console.log("routeData", this.routeData);
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
      if (i > 0) {
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

        // this.state.route.push(adjustedStepCluster);
        // this.state.route.push("turn right");
        route.push(adjustedStepCluster);
        route.push("turn right");

        // console.log("previous", previousStepCluster, "current", currentStepCluster, "adjusted", adjustedStepCluster);
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

          // this.state.route.push(adjustedStepCluster);
          // this.state.route.push("turn right");
          route.push(adjustedStepCluster);
          route.push("turn left");
      }
    })
  },
  // segmentRoute(){
  //   this.props.RoutesData[0].route.map((step, i)=> {
  //     if (i != 0) {
  //         var difference = step.heading - this.props.RoutesData[0].route[i-1].heading;
  //     }
  //     if (difference > 0) {
  //       difference = difference - 360;
  //     }
  //     difference = Math.abs(difference);
  //     if (difference >= 240 && difference <= 300) {
  //
  //       if (isNaN(adjustedStepCluster) === true) {
  //         previousStepCluster = 0;
  //         adjustedStepCluster = 0;
  //       } else {
  //         previousStepCluster = adjustedStepCluster;
  //       }
  //
  //       currentStepCluster = i+1;
  //       adjustedStepCluster = currentStepCluster - previousStepCluster;
  //
  //       // this.state.route.push(adjustedStepCluster);
  //       // this.state.route.push("turn right");
  //       route.push(adjustedStepCluster);
  //       route.push("turn right");
  //
  //       // console.log("previous", previousStepCluster, "current", currentStepCluster, "adjusted", adjustedStepCluster);
  //     }
  //     if (difference >= 60 && difference <= 120) {
  //
  //         if (isNaN(adjustedStepCluster) === true) {
  //           previousStepCluster = 0;
  //           adjustedStepCluster = 0;
  //         } else {
  //           previousStepCluster = adjustedStepCluster;
  //         }
  //
  //         currentStepCluster = i+1;
  //         adjustedStepCluster = currentStepCluster - previousStepCluster;
  //
  //         // this.state.route.push(adjustedStepCluster);
  //         // this.state.route.push("turn right");
  //         route.push(adjustedStepCluster);
  //         route.push("turn left");
  //     }
  //   })
  // },
  navigateRoute(){
    console.log(this.state.segment, "route length", route.length);
    // var routeSegment;
    // route.map((routeSegment, i)=> {
    //   routeSegment = routeSegment
    // })
    // this.turnDetected = "turn right";
    // this.turnDetected = "turn left";
    // currentSegment = route[this.state.segment];
    if (this.currentSteps >= route[this.state.segment]) {
      // var remainder = this.currentSteps > 1? this.currentSteps-1 : 0;
      // currentSegment = this.stepCluster.length === 0 ? route[0] : route[1];
      console.log("equal 1");
      this.setState({
        segment: this.state.segment + 1
      })
      this.currentSteps = 0;
      // currentSegment = this.state.segment + 1;
    } else if (route[this.state.segment] === "turn right" && this.turnDetected === "turn right") {
      console.log("equal 2");
      this.setState({
        segment: this.state.segment + 1
      })
      // currentSegment = this.state.segment + 1;
    } else if (route[this.state.segment] === "turn left" && this.turnDetected === "turn left") {
      console.log("equal 3");
      this.setState({
        segment: this.state.segment + 1
      })
      // currentSegment = this.state.segment;
      // console.log("currentSegment", currentSegment);
    } else if (this.state.segment === route.length) {
      // alert("You've completed the route!");
    }
  },
  render() {
    console.log(route, route.length, array, array.length);
    // console.log("equal C", this.state.segment, "currentSegment", currentSegment);
    // console.log("bye", this.state.segment, route[0], route[1], route[2], route[3]);
    return(
      <div>
        <h3>This is the individual route page.</h3>
        <p>{this.props.params.uuid}</p>
        <p>{route[this.state.segment]}</p>
        <p>steps: {this.currentSteps}</p>
        <p>turn detected: {this.turnDetected}</p>
      </div>
    )
  }
});
