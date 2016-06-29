import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import _ from 'underscore'

var heightInches;
var strideInches;
var strideMeters;

var stepCluster = [];

export default React.createClass({
  getDefaultProps(){
    return {
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path",
      routeLabelSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-label"
    }
  },
  componentDidMount(){
    // this.getRouteLabels();
    this.convertToStrideMeters(this.props.params.ft, this.props.params.in)
    this.currentSteps = 0;
    // stepCluster = [];
    console.log("cluster", stepCluster);
    navigator.geolocation.getCurrentPosition((position)=> {
      console.log("got current position");
    }, null)
    this.throttleOnWatchPosition = _.throttle(this.onWatchPosition, 100);
    navigator.geolocation.watchPosition(this.throttleOnWatchPosition, null, {enableHighAccuracy: true});

    // setInterval(()=>{
    //   stepCluster.push({value: 1, heading: 225});
    //   // value="[{value:1, heading: 225}]"
    //   console.log("step", stepCluster);
    // }, 2000);
  },
  convertToStrideMeters(feet, inches){
    heightInches = Number(feet*12) + Number(inches)
    strideInches = heightInches/2.3;
    strideMeters = strideInches*0.0254;
    console.log("hss", heightInches, strideInches, strideMeters);
    // return strideMeters
  },
  convertStepNum(speed){
    console.log("stride meters", strideMeters);
    return speed / strideMeters
  },
  onWatchPosition(position){
    console.log(stepCluster);
    if (this.currentSteps >= 1) {
      stepCluster.push({value: 1, heading: position.coords.heading})
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
  directToAllRoutes(){
    hashHistory.push("/allRoutes")
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
    // $.post(this.props.routePathSource, serializedForm, (resp)=> {
    //
    //   $.get(this.props.routePathSource, (resp)=> {
    //     this.latestPath = resp[0]._id;
    //     console.log("latest", this.latestPath);
    //     if (this.latestPath != null) {
    //       this.submitRouteLabel();
    //     }
    //   })
    //
    // });
  },
  // getRouteLabels(){
  //   $.get(this.props.routeLabelSource, (resp)=> {
  //     this.latestLabel = resp[0]._id;
  //     console.log(this.latestLabel);
  //   })
  // },
  submitRouteLabel(){
    var serializedForm = Serialize(this.refs.routeLabelForm, {hash: true})
    // $.post(this.props.routeLabelSource, serializedForm, (resp)=> {
    //   alert("Route successfully submitted. Thank you!");
    //   this.directToAllRoutes();
    //   console.log("sent label form");
    // });

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
        <h2>steps: {this.currentSteps}</h2>
        <h2>cluster: {stepCluster}</h2>
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
