import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'


var stepCluster = [5];
var currentHeading = 3;

export default React.createClass({
  getDefaultProps(){
    return {
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path"
    }
  },
  getInitialState(){
    return{
      steps: 0,
      deltaHeading: 0
    }
  },
  componentDidMount(){
    navigator.geolocation.watchPosition((position)=>{
      var stepNum = position.coords.speed / 0.565;
      this.setState({
        steps: this.state.steps + stepNum,
        deltaHeading: position.coords.heading
      })
      if (Math.abs(currentHeading - this.state.deltaHeading) > 90) {
        alert("greater than 90");
        currentHeading = this.state.deltaHeading;
        this.handleStepCluster();
      }
      setInterval(()=> {
        this.handleTurning();
      }, 500)
    }, null, {enableHighAccuracy: true});
  },
  handleTurning(e){
    if ((currentHeading - this.state.deltaHeading) > 90) {
      stepCluster.push("turn left");
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
  render() {
    console.log(stepCluster);
    return (
      <div>
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
