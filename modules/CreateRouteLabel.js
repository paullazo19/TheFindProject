import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Serialize from 'form-serialize'
import Validator from 'validator'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

export default React.createClass({
  getInitialState(){
    return{
      routeLabels: [],
      buildingAddress: {
        hasError: false
      },
      floorNumber: {
        hasError: false
      },
      roomDescription: {
        hasError: false
      },
      allValid: {
        hasError: false
      }
    }
  },
  checkAllInputStates(){
    if (this.state.buildingAddress.hasError == true) {
          return true;
    }
    else if (this.state.floorNumber.hasError == true) {
          return true;
    }
    else if (this.state.roomDescription.hasError == true) {
          return true;
    }
    else {
          return false
    }
  },
  handleBuildingInputChange(e){
    var inputElement = ReactDOM.findDOMNode(e.target).value;
      this.setState({
        buildingAddress: {
          hasError: !Validator.isLength(inputElement, {min:5, max:500})
        }
      })
      this.checkAllInputStates();
  },
  handleFloorInputChange(e){
    var inputElement = ReactDOM.findDOMNode(e.target).value;
      this.setState({
        floorNumber: {
          hasError: !Validator.isInt(inputElement, {min:1, max:500})
        }
      })
      this.checkAllInputStates();
  },
  handleRoomInputChange(e){
    var inputElement = ReactDOM.findDOMNode(e.target).value;
      this.setState({
        roomDescription: {
          hasError: !Validator.isLength(inputElement, {min:5, max:500})
        }
      })
      this.checkAllInputStates();
  },
  getDefaultProps(){
    return {
      routeLabelSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-label"
    }
  },
  getRouteLabels(){
    $.get(this.props.routeLabelSource, (resp)=> {
      this.setState({ routeLabels: resp })
    })
  },
  handleCreateRouteSubmit(e){
    //POST request
    e.preventDefault();
    // var serializedForm = Serialize(this.refs.routeLabelForm, {hash: true})
    // $.post(this.props.routeLabelSource, serializedForm, (resp)=> {
    //   this.getRouteLabels();
    //   // clear text after input
    //   this.refs.building.value="";
    //   this.refs.floor.value="";
    //   this.refs.room.value="";
    // });
    //Direct user to starting screen for route creation
    browserHistory.push('/CreateRoutePath')

  },
  render() {
    console.log(this.state.routeLabels);
    return (
      <div>
        <form className={this.checkAllInputStates()? "form--error" : ""} method="POST" ref="routeLabelForm" action="#" onSubmit={this.handleCreateRouteSubmit}>
          <label>
            <span className="hidden__label">Building address or name</span>
            <input className="createRouteLabel__input" type="text" ref="building" name="building" autoComplete="off" placeholder="Building address or name" onKeyUp={this.handleBuildingInputChange}/>
          </label>
          <span className={this.state.buildingAddress.hasError? "input--error" : "hide--error"}>Building address must be at least 5 characters.</span>
          <label>
            <span className="hidden__label">Floor number</span>
            <input className="createRouteLabel__input" type="text" ref="floor" name="floor" autoComplete="off" placeholder="Floor number" onKeyUp={this.handleFloorInputChange}/>
          </label>
          <span className={this.state.floorNumber.hasError? "input--error" : "hide--error"}>Floor must be entered as a number.</span>
          <label>
            <span className="hidden__label">Room description</span>
            <input className="createRouteLabel__input" type="text" ref="room" name="room" autoComplete="off" placeholder="Room description" onKeyUp={this.handleRoomInputChange}/>
          </label>
          <span className={this.state.roomDescription.hasError? "input--error" : "hide--error"}>Room description must have at least 5 characters.</span>
          <input className="createRouteLabel__input" type="submit" value="submit"/>
        </form>
      </div>
    )
  }
});
