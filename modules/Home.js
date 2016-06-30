import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import _ from 'underscore'
import Header from './Header'

export default React.createClass({
  goToApp(e){
    hashHistory.push("/app")
  },
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <section className="home--intro">
          <p>The Find Project is an app to provide independent, indoor navigation for blind people.</p>
          <p>Sighted people create routes, and blind people use those routes to navigate indoors, where GPS navigation is not reliable.</p>
        </section>
        <input type="submit" className="submit" value="continue to The Find Project" onClick={this.goToApp}/>
      </div>
    )
  }
});
