import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'


var stepCluster = [5];
var currentHeading = 3;
var turnDetected;

export default React.createClass({
  getDefaultProps(){
    return {
      routeLabelSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-label",
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path"
    }
  },
  getInitialState(){
    return{
      steps: 0,
      deltaHeading: 0,
      modal: {
        isOn: true
      },
      startRecord: {
        isOn: false
      }
    }
  },
  componentWillUpdate(){
    console.log("mounted");
    if (this.state.startRecord.isOn == true) {
      console.log("started watching");
      navigator.geolocation.watchPosition((position)=>{
        var stepNum = position.coords.speed / 0.565;
        turnDetected  = currentHeading - this.state.deltaHeading;
        this.setState({
          steps: this.state.steps + stepNum,
          deltaHeading: position.coords.heading
        })
        // if (Math.abs(turnDetected) > 90) {
        //   alert({turnDetected}, "greater than 90");
        //   currentHeading = this.state.deltaHeading;
        //   this.handleStepCluster();
        // }
        setInterval(()=> {
          this.handleTurning();
        }, 500)
      }, null, {enableHighAccuracy: true});
    }
  },
  handleTurning(e){
    if (Math.abs(turnDetected) > 60 && Math.abs(turnDetected) < 120) {
      stepCluster.push("turn right");
      currentHeading = this.state.deltaHeading;
      this.handleStepCluster();

    } else if (Math.abs(turnDetected) > 240 && Math.abs(turnDetected) < 300){
      stepCluster.push("turn left");
      currentHeading = this.state.deltaHeading;
      this.handleStepCluster();
    }
  },
  handleStepCluster(e){
      stepCluster.push(Math.ceil(this.state.steps));
      this.setState({
        steps: 0
      })
      console.log(this.state.steps, stepCluster);
  },
  submitRoutePath(e){
    e.preventDefault();
    var serializedForm = Serialize(this.refs.routePathForm, {hash: true})
    $.post(this.props.routePathSource, serializedForm, (resp)=> {
      alert("Route successfully submitted. Thank you!")
    });
  },
  startRecording(e){
    this.setState({
      modal: {
        isOn: false
      },
      startRecord: {
        isOn: true
      }
    })

    var serializedForm = Serialize(this.refs.routeLabelForm, {hash: true})
    $.post(this.props.routeLabelSource, serializedForm, (resp)=> {
      this.getRouteLabels();
    });
  },
  getRouteLabels(){
    $.get(this.props.routeLabelSource, (resp)=> {
      this.setState({ routeLabels: resp })
    })
  },
  render() {
    console.log(stepCluster, this.state.startRecord.isOn);
    return (
      <div>
      <div className={this.state.modal.isOn? "modal--show" : "modal--hide"}>
        <Link className="startRecord--back" to={`/createRouteLabel/${this.props.params.building}/${this.props.params.floor}/${this.props.params.room}`}>Back</Link>
        <div className="routeInfo">Building: {`${this.props.params.building}`}<span className="routeInfo--middle">Floor: {`${this.props.params.floor}`}</span>Room: {`${this.props.params.room}`}</div>
        <p className="startRecord--warning">To ensure optimal route accuracy, please begin route inside the building at the main entrance with your back to the door. Thank you.</p>
        <a className="startRecord--button" onClick={this.startRecording}>Start Recording</a>
      </div>
      <h2>steps: {this.state.steps}</h2>
      <h2>current heading: {currentHeading}</h2>
      <h2>delta heading: {this.state.deltaHeading}</h2>

      <form method="POST" action="#" ref="routePathForm" onSubmit={this.submitRoutePath}>
        <input type="text" name="stepCluster" value={stepCluster} readOnly/>
        <input type="submit" value="end route"/>
      </form>

      <ul>{stepCluster}</ul>
      </div>
    )
  }
});
