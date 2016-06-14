import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
  handleCreateRouteSubmit(){
    //POST request
    //Direct user to starting screen for route creation
  },
  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateRouteSubmit}>
          <input className="createRoute__input" type="text" name="building" autoComplete="off" placeholder="Building address or name"/>
          <input className="createRoute__input" type="text" name="floor" autoComplete="off" placeholder="Floor number"/>
          <input className="createRoute__input" type="text" name="room" autoComplete="off" placeholder="Room description"/>
          <input className="createRoute__input" type="submit" value="submit"/>
        </form>
      </div>
    )
  }
});
