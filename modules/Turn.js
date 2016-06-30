import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import _ from 'underscore'

export default React.createClass({
  calcDifference(currentHeading, deltaHeading){
    //calculate absolute of currentHeading - deltaHeading
    var difference = currentHeading - deltaHeading;
    if (difference > 180) {
      difference = difference - 365;
    }
    difference = Math.abs(difference);


    if (difference <= 120 && difference >= 60) {
      return "turn right"
    } else if (difference <= 300 && difference >= 240) {
      return "turn left"
    } else {
      return "invalid turn"
    }


  },
  render(){
    return(
      <div></div>
    )
  }
});
