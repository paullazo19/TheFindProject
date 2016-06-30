import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import Validator from 'validator'
import Header from './Header'

var inputElement;

export default React.createClass({
  getInitialState(){
    return{
      routeLabels: [],
      buildingAddress: {
        hasError: 0
      },
      floorNumber: {
        hasError: 0
      },
      roomDescription: {
        hasError: 0
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
  handleBuildingInputChange(){
    inputElement = this.refs.building.value;
    this.setState({
      buildingAddress: {
        hasError: !Validator.isLength(inputElement, {min:5, max:500})
      }
    })
    this.checkAllInputStates();
  },
  handleFloorInputChange(e){
    inputElement = this.refs.floor.value;
    this.setState({
      floorNumber: {
        hasError: !Validator.isInt(inputElement, {min:1, max:500})
      }
    })
    this.checkAllInputStates();
  },
  handleRoomInputChange(){
    inputElement = this.refs.room.value;
    this.setState({
      roomDescription: {
        hasError: !Validator.isLength(inputElement, {min:5, max:500})
      }
    })
    this.checkAllInputStates();
  },
  handleCreateRouteSubmit(e){
    e.preventDefault();

    if (this.state.buildingAddress.hasError === false &&
        this.state.floorNumber.hasError === false &&
        this.state.roomDescription.hasError === false) {
      //Direct user to starting screen for route creation
      this.directUserToStartCreateScreen();
      console.log("ran direct user");
    } else {
      this.checkAllInputStates();
    }
  },
  directUserToStartCreateScreen(){
    console.log("info pushed");
    hashHistory.push(`/startCreate/${this.refs.building.value}/${this.refs.floor.value}/${this.refs.room.value}/${this.props.params.ft}/${this.props.params.in}`)
  },
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <form className={this.checkAllInputStates()? "form--error" : ""} method="POST" ref="routeLabelForm" action="#" onSubmit={this.handleCreateRouteSubmit}>
          <label>
            <span className="hidden__label">Building address or name</span>
            <input className="createRouteLabel__input" type="text" ref="building" name="building" autoComplete="off" placeholder="Building address or name" onKeyUp={this.handleBuildingInputChange} defaultValue={this.props.params.building? this.props.params.building : ""}/>
          </label>
          <span className={this.state.buildingAddress.hasError? "input--error" : "hide--error"}>Building address must be at least 5 characters.</span>
          <label>
            <span className="hidden__label">Floor number</span>
            <input className="createRouteLabel__input" type="text" ref="floor" name="floor" autoComplete="off" placeholder="Floor number" onKeyUp={this.handleFloorInputChange} defaultValue={this.props.params.floor? this.props.params.floor : ""}/>
          </label>
          <span className={this.state.floorNumber.hasError? "input--error" : "hide--error"}>Floor must be entered as a number.</span>
          <label>
            <span className="hidden__label">Room description</span>
            <input className="createRouteLabel__input" type="text" ref="room" name="room" autoComplete="off" placeholder="Room description" onKeyUp={this.handleRoomInputChange} defaultValue={this.props.params.room? this.props.params.room : ""}/>
          </label>
          <span className={this.state.roomDescription.hasError? "input--error" : "hide--error"}>Room description must have at least 5 characters.</span>
          <input className="submit" type="submit" value="create route label"/>
        </form>
      </div>
    )
  }
});
