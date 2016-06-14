import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

export default React.createClass({
  componentDidMount(){

  },
  render() {
    return (
      <div>
        <button><Link to="/createRoute">Create new route</Link></button>
        <button>Navigate existing route</button>
      </div>
    )
  }
});
