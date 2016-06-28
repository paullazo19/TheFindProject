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
    this.submitRouteLabel();
  },
  submitRouteLabel(){
    var serializedForm = Serialize(this.refs.routeLabelForm, {hash: true})
    $.post(this.props.routeLabelSource, serializedForm, (resp)=> {
      console.log("sent label form");
    });
  },
  render() {
    return (
      <div>

        <Link className="startRecord--back" to={`/createRouteLabel/${this.props.params.building}/${this.props.params.floor}/${this.props.params.room}/${this.props.params.ft}/${this.props.params.in}`}>Back</Link>
        <div className="routeInfo">Building: {`${this.props.params.building}`}<span className="routeInfo--middle">Floor: {`${this.props.params.floor}`}</span>Room: {`${this.props.params.room}`}</div>
        <p className="startRecord--warning">To ensure optimal route accuracy, please begin route inside the building at the main entrance with your back to the door. Thank you.</p>
        <a className="startRecord--button" ref="startRecord" onClick={this.startRecording}>Start Recording</a>

      <form className="label__form--hidden" method="POST" action="#" ref="routeLabelForm">
        <input type="text" name="building" value={this.props.params.building} readOnly/>
        <input type="text" name="floor" value={this.props.params.floor} readOnly/>
        <input type="text" name="room" value={this.props.params.room} readOnly/>
      </form>

      </div>
    )
  }
});
