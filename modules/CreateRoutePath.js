import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
  getInitialState(){
    return{
      steps: 0
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

  render() {
    return (
      <div>
      <h2>{this.state.steps}</h2>
      </div>
    )
  }
});
