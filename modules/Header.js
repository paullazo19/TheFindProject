import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

export default React.createClass({
  render(){
    return(
      <Link to="/" className="TFP__logo--header"><img alt="The Find Project logo located at top of screen on every page directs you back to the home page" src="/assets/TFP-logo-reverse.png"/></Link>
    )
  }
});
