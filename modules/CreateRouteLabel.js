import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Serialize from 'form-serialize'
import Validator from 'validator'

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
    console.log(this.state.buildingAddress.hasError);
    if (this.state.buildingAddress.hasError == true) {
          console.log("true", this.state.buildingAddress.hasError);
          return true;
    } else {
          console.log("false", this.state.buildingAddress.hasError);
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
      console.log(!Validator.isLength(inputElement, {min:5, max:500}));
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
    var serializedForm = Serialize(this.refs.routeLabelForm, {hash: true})
    $.post(this.props.routeLabelSource, serializedForm, (resp)=> {
      this.getRouteLabels();
      // clear text after input
      this.refs.building.value="";
      this.refs.floor.value="";
      this.refs.room.value="";
    });
    //Direct user to starting screen for route creation

  },
  // componentWillUpdate(){
  //   this.checkAllInputStates();
  // },
  // componentDidMount(){
  //   this.getRouteLabels();
  // },
  render() {
    console.log(this.state.routeLabels);
    return (
      <div>
        <form className={this.checkAllInputStates()? "form--error" : ""} method="POST" ref="routeLabelForm" action="#" onSubmit={this.handleCreateRouteSubmit}>
          <label>
            <span className="hidden__label">Building address or name</span>
            <input className="createRouteLabel__input" type="text" ref="building" name="building" autoComplete="off" placeholder="Building address or name" onKeyUp={this.handleBuildingInputChange}/>
          </label>
          <label>
            <span className="hidden__label">Floor number</span>
            <input className="createRouteLabel__input" type="text" ref="floor" name="floor" autoComplete="off" placeholder="Floor number"/>
          </label>
          <label>
            <span className="hidden__label">Room description</span>
            <input className="createRouteLabel__input" type="text" ref="room" name="room" autoComplete="off" placeholder="Room description"/>
          </label>
          <input className="createRouteLabel__input" type="submit" value="submit"/>
        </form>
      </div>
    )
  }
});
