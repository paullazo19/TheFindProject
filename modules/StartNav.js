import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import RoutesData from '../data/RoutesData'

var route = [];
var stepHeading;

var previousStepCluster;
var currentStepCluster;
var adjustedStepCluster;
var currentSegment;

export default React.createClass({
  getDefaultProps(){
    return {
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
      stepHeading: 0,
      route: [],
      modal: {
        isOn: false
      },
      startNav: {
        isOn: false
      }
    }
  },
  componentDidMount(){
    this.currentSteps = 0;
    this.stepCluster = [];
    navigator.geolocation.getCurrentPosition((position)=> {
      this.setState({
        currentHeading: position.coords.heading
      })
    }, null)
    this.segmentRoute();
    this.navigateRoute();
  },
  convertStepNum(speed){
    return speed / 0.565
  },
  onWatchPosition(position){
    if (this.currentSteps >= 1) {
      this.stepCluster.push({value: 1, heading: position.coords.heading})
      var remainder = this.currentSteps > 1? this.currentSteps-1 : 0;
      this.currentSteps = remainder;
    }
    this.currentSteps += this.convertStepNum(position.coords.speed);
  },
  calcDifference(currentHeading, deltaHeading){
    //calculate absolute of currentHeading - deltaHeading
    var difference = currentHeading - deltaHeading;
    if (difference > 180) {
      difference = difference - 360;
    }
    difference = Math.abs(difference);

    this.handleTurning(difference);
  },
  startNav(e){
    this.setState({
      modal: {
        isOn: false
      },
      startRecord: {
        isOn: true
      }
    })
  },
  segmentRoute(){
    this.props.RoutesData[0].route.map((step, i)=>{
      if (i != 0) {
          var difference = this.props.RoutesData[0].route[i-1].heading - step.heading;
      }
      if (difference > 180) {
        difference = difference - 360;
      }
      difference = Math.abs(difference);
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
        route.push("turn right");

        // console.log("previous", previousStepCluster, "current", currentStepCluster, "adjusted", adjustedStepCluster);
      }
    })

    // <ul>
    //   {this.props.RoutesData[0].route.map((step, i)=>{
    //     if (i != 0) {
    //         var difference = this.props.RoutesData[0].route[i-1].heading - step.heading;
    //     }
    //     if (difference > 180) {
    //       difference = difference - 360;
    //     }
    //     difference = Math.abs(difference);
    //     if (difference >= 60 && difference <= 120) {
    //
    //       var previousStepCluster = 0;
    //       var currentStepCluster = i+1;
    //       var adjustedStepCluster = currentStepCluster - previousStepCluster;
    //
    //       console.log("previous", previousStepCluster, "current", currentStepCluster, "adjusted", adjustedStepCluster, "turn right");
    //     }
    //     return <li ref="routeSegment" key={i}>{step.heading}</li>
    //   })}
    // </ul>

  },
  navigateRoute(){
    route.map((routeSegment, i)=> {
      this.stepCluster.length = 5;
      currentSegment = route[i];
      // return console.log(routeSegment, route[0]);
      if (this.stepCluster.length === currentSegment ) {
        // var remainder = this.currentSteps > 1? this.currentSteps-1 : 0;
        // currentSegment = this.stepCluster.length === 0 ? route[0] : route[1];
        console.log("equal");
        currentSegment = route[i+1];
      }
    })

  },
  render() {
    console.log("hello", currentSegment, route);
    return(
      <div>
        <h3>This is the individual route page.</h3>
        <p>{this.props.params.uuid}</p>
        <p>{currentSegment}</p>

        <div className={this.state.modal.isOn? "modal--show" : "modal--hide"}>
          <p className="startRecord--warning">To ensure the best navigation experience, please begin navigation inside the building at the main entrance with your back to the door. Thank you.</p>
          <a className="startRecord--button" ref="startNav" onClick={this.startNav}>Start Recording</a>
        </div>
      </div>
    )
  }
});
