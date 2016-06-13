import React from 'react'

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
      <h2 className="heading">
        {this.state.steps}
      </h2>
    )
  }
});
