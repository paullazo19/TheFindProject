import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

export default React.createClass({
  getInitialState(){
    return{
      steps: 0,
      feet: 0,
      inches: 0
    }
  },
  componentDidMount(){
    navigator.geolocation.watchPosition((position)=>{
      var stepNum = position.coords.speed / 0.565;
      this.setState({
        steps: this.state.steps + stepNum
      })
    }, null, {enableHighAccuracy: true});
  },
  submitHeightForm(e){
    e.preventDefault();
      var feet = ReactDOM.findDOMNode(this.refs.ft).value;
      var inches = ReactDOM.findDOMNode(this.refs.in).value;

    this.convertToStrideMeters(feet, inches);
    browserHistory.push('/landing')
  },
  convertToStrideMeters(feet, inches){
    var heightInches = Number(feet*12) + Number(inches)
    var strideInches = heightInches/2.3;
    var strideMeters = strideInches*0.0254;
    console.log(heightInches, strideInches, strideMeters);
  },
  render() {
    return (
      <div>
        <h1>Enter height</h1>
        <p className="heightSubmit__body">We&rsquo;re asking for your height to better calculate your steps while using the app, either navigating or creating routes.</p>
        <form method="#" action="#" onSubmit={this.submitHeightForm}>
          <input ref="ft" type="text" name="feet" autoComplete="off"/> feet<br/>
          <input ref="in" type="text" name="inches" autoComplete="off"/> inches<br/>
          <input type="submit" value="submit"/>
        </form>
        <h2 className="heading">
          {this.state.steps}
        </h2>
      </div>
    )
  }
});
