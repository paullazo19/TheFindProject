import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Validator from 'validator'
import Header from './Header'

var wnt = {};
    wnt.mobile = false;
    wnt.ie = false;

export default React.createClass({
  getInitialState(){
    return{
      feet: 0,
      inches: 0,
      feetError: 0,
      inchesError: 0
    }
  },
  componentDidMount(){
    // used device detection from: http://fiddle.jshell.net/webninjataylor/4AYCS/light/

    /******** DEVICE TYPE AND IE DETECTION ********/
    if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     ){
    	wnt.mobile = true;
    } else if (navigator.userAgent.match(/MSIE/i)){
    		wnt.ie = true;
    } else {
    	alert('Sorry, this app is for mobile devices with location services only to be able to create and navigate routes.');
    }
  },
  handleFeetInput(e){
    var inputElement = ReactDOM.findDOMNode(e.target).value;
    this.setState({
      feetError: !Validator.isInt(inputElement, {min:0, max:8})
    })
  },
  handleInchesInput(e){
    var inputElement = ReactDOM.findDOMNode(e.target).value;
    this.setState({
      inchesError: !Validator.isInt(inputElement, {min:0, max:11})
    })
  },
  submitHeightForm(e){
    e.preventDefault();
    if (this.state.feetError === false &&
        this.state.inchesError === false ){

          var feet = ReactDOM.findDOMNode(this.refs.ft).value;
          var inches = ReactDOM.findDOMNode(this.refs.in).value;

          this.convertToStrideMeters(feet, inches);
          this.directUserToLanding();
          console.log("submit successful");

    } else {
        console.log("did not submit");
        this.checkAllInputStates();
    }
  },
  checkAllInputStates(){
    if (this.state.feetError == true) {
          return true;
    }
    else if (this.state.inchesError == true) {
          return true;
    }
    else {
          return false
    }
  },
  directUserToLanding(){
    hashHistory.push(`/landing/${this.refs.ft.value}/${this.refs.in.value}`)
  },
  convertToStrideMeters(feet, inches){
    var heightInches = Number(feet*12) + Number(inches)
    var strideInches = heightInches/2.3;
    var strideMeters = strideInches*0.0254;
    console.log(heightInches, strideInches, strideMeters);
    return strideMeters
  },
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <h1>Enter height</h1>
        <p className="heightSubmit__body">We&rsquo;re asking for your height to better calculate your steps while using the app, either navigating or creating routes.</p>
        <form className={this.checkAllInputStates()? "heightInput--error" : "heightInput--form"} method="#" action="#" onSubmit={this.submitHeightForm}>
          <label><span className="hidden__label">Enter your height in feet here. The next field is for inches.</span>
            <input className="height__input" ref="ft" type="text" name="feet" autoComplete="off" onKeyUp={this.handleFeetInput} placeholder="feet"/>
            <span className={this.state.feetError? "input--error" : "hide--error"}>Height in feet must be a number between 0 and 8</span>
          </label>
          <label><span className="hidden__label">Enter the remaining inches here.</span>
            <input className="height__input" ref="in" type="text" name="inches" autoComplete="off" onKeyUp={this.handleInchesInput} placeholder="inches"/>
            <span className={this.state.inchesError? "input--error" : "hide--error"}>Remaining height in inches must be a number between 0 and 11</span>
          </label>
          <input className="submit" type="submit" value="calculate my stride length"/>
        </form>
      </div>
    )
  }
});
