import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import _ from 'underscore'


var stepCluster = [5];
var stepNum;

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
      turnDetected: 0,
      currentHeading: 0,
      modal: {
        isOn: true
      },
      startRecord: {
        isOn: false
      },
      leftTurn: {
        detected: false
      },
      rightTurn: {
        detected: false
      }
    }
  },
  componentDidMount(){
    this.throttleOnWatchPosition = _.throttle(this.onWatchPosition, 500);
  },
  convertStepNum(speed){
    return speed / 0.565
  },
  onWatchPosition(position){
    // convert stepNum in function
    console.log("watched");
    this.convertStepNum();
    this.setState({
      steps: this.state.steps + this.convertStepNum(position.coords.speed),
      deltaHeading: position.coords.heading,
      turnDetected: this.state.currentHeading - this.state.deltaHeading
    })
    setInterval(()=> {
      this.handleTurning();
    }, 1000)
  },
  componentWillUpdate(){
    console.log(this.state.steps);
    if (this.state.startRecord.isOn == true) {
      navigator.geolocation.watchPosition(this.throttleOnWatchPosition, null, {enableHighAccuracy: true});
    }
  },
  handleTurning(e){
    if (Math.abs(this.state.turnDetected) > 60 && Math.abs(this.state.turnDetected) < 120) {
      stepCluster.push("turn right");
      this.setState({
          currentHeading: this.state.deltaHeading,
          rightTurn: {
            detected: true
          }
      })
      this.handleStepCluster();

    } else if (Math.abs(this.state.turnDetected) > 240 && Math.abs(this.state.turnDetected) < 300) {
      stepCluster.push("turn left");
      this.setState({
          currentHeading: this.state.deltaHeading,
          leftTurn: {
            detected: true
          }
      })
      this.handleStepCluster();
    }
  },
  handleStepCluster(e){
      stepCluster.push(Math.ceil(this.state.steps));
      this.setState({
        steps: 0
      })
  },
  directToAllRoutes(){
    hashHistory.push("/AllRoutes")
  },
  submitRoutePath(e){
    e.preventDefault();
    this.directToAllRoutes();
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
    console.log(this.props.params.routeLabelForm);
    var serializedForm = Serialize(this.props.params.routeLabelForm, {hash: true})
    $.post(this.props.routeLabelSource, serializedForm, (resp)=> {
      console.log("sent label form");
      this.getRouteLabels();
    });
  },
  getRouteLabels(){
    $.get(this.props.routeLabelSource, (resp)=> {
      this.setState({ routeLabels: resp })
    })
  },
  render() {
    return (
      <div>
      <div className={this.state.modal.isOn? "modal--show" : "modal--hide"}>
        <Link className="startRecord--back" to={`/createRouteLabel/${this.props.params.building}/${this.props.params.floor}/${this.props.params.room}/${this.refs.routeLabelForm}`}>Back</Link>
        <div className="routeInfo">Building: {`${this.props.params.building}`}<span className="routeInfo--middle">Floor: {`${this.props.params.floor}`}</span>Room: {`${this.props.params.room}`}</div>
        <p className="startRecord--warning">To ensure optimal route accuracy, please begin route inside the building at the main entrance with your back to the door. Thank you.</p>
        <a className="startRecord--button" ref="startRecord" onClick={this.startRecording}>Start Recording</a>
      </div>
      <h2>steps: {this.state.steps}</h2>
      <h2>current heading: {this.state.currentHeading}</h2>
      <h2>delta heading: {this.state.deltaHeading}</h2>

      <form method="POST" action="#" ref="routePathForm" onSubmit={this.submitRoutePath}>
        <input type="text" name="stepCluster" value={stepCluster} readOnly/>
        <input type="submit" ref="endRoute" value="end route"/>
      </form>

      <ul>{stepCluster}</ul>
      </div>
    )
  }
});
