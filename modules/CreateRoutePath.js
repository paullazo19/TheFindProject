import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'
import _ from 'underscore'

export default React.createClass({
  getDefaultProps(){
    return {
      routeLabelSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-label",
      routePathSource: "https://tiny-tiny.herokuapp.com/collections/TFP-route-path"
    }
  },
  getInitialState(){
    return{
      steps: 0,
      deltaHeading: 0,
      turnDetected: 0,
      currentHeading: 0,
      modal: {
        isOn: true
      },
      startRecord: {
        isOn: false
      },
      leftTurn: {
        detected: false
      },
      rightTurn: {
        detected: false
      },
      stepCluster: []
    }
  },
  componentDidMount(){
    this.currentSteps = 0;
    this.stepCluster = [];
    navigator.geolocation.getCurrentPosition((position)=> {
      this.setState({
        currentHeading: position.coords.heading
      })
    }, null)

  },
  setCurrentHeading(){
      this.setState({
          currentHeading: this.state.deltaHeading
      })

    // if (this.state.startRecord.isOn == true) {
    //   var start = Date.now();
    //   var end = start + 5000;
    //   console.log("timeout");
    //   if (start > end) {
    //     clearInterval(timer);
    //   }
    //   var timer = setInterval(this.setCurrentHeading, 1000);
    // }
    //
    //   this.setState({currentHeading:this.state.deltaHeading});
    // }
  },
  convertStepNum(speed){
    return speed / 0.565
  },
  onWatchPosition(position){
    console.log(this.stepCluster);
    if (this.currentSteps >= 1) {
      this.stepCluster.push({value: 1, heading: position.coords.heading})
      var remainder = this.currentSteps > 1? this.currentSteps-1 : 0;
      this.currentSteps = remainder;
    }
    this.currentSteps += this.convertStepNum(position.coords.speed);
      // // convert stepNum in function
      // this.setState({
      //   steps: this.state.steps + this.convertStepNum(position.coords.speed),
      //   deltaHeading: position.coords.heading
      // })
      // if (this.state.steps > 0) {
      //   this.calcDifference(this.state.currentHeading, this.state.deltaHeading);
      // }
  },
  // calcDifference(currentHeading, deltaHeading){
  //   //calculate absolute of currentHeading - deltaHeading
  //   var difference = currentHeading - deltaHeading;
  //   if (difference > 180) {
  //     difference = difference - 360;
  //   }
  //   difference = Math.abs(difference);
  //
  //   this.handleTurning(difference);
  // },
  // handleTurning(difference){
  //   // if (this.state.stepCluster.length === 0) {
  //   //     this.handleStepCluster()
  //   // }
  //   var lastCluster = typeof(this.state.stepCluster[this.state.stepCluster.length -1]);
  //   // if (lastCluster === "number") {
  //   console.log(difference);
  //     if (difference <= 120 && difference >= 60) {
  //       this.handleStepCluster();
  //       this.setState({
  //         stepCluster: this.state.stepCluster.push("turn right"),
  //         currentHeading: this.state.deltaHeading,
  //         rightTurn: {
  //           detected: true
  //         }
  //       })
  //     } else if (difference <= 300 && difference >= 240) {
  //       this.handleStepCluster();
  //       this.setState({
  //         stepCluster: this.state.stepCluster.push("turn left"),
  //         currentHeading: this.state.deltaHeading,
  //         rightTurn: {
  //           detected: true
  //         }
  //       });
  //     }
  //   // }
  // },
  handleStepCluster(e){
    // prevent 0 from pushing to cluster
    if (this.state.steps != 0 ) {
      this.setState({
        steps: 0,
        stepCluster: [Math.ceil(this.state.steps)]
      })
    }
    console.log(this.state.stepCluster);
  },
  directToAllRoutes(){
    hashHistory.push("/AllRoutes")
  },
  submitRoutePath(e){
    e.preventDefault();
    this.directToAllRoutes();
    var serializedForm = Serialize(this.refs.routePathForm, {hash: true})
    $.post(this.props.routePathSource, serializedForm, (resp)=> {
      alert("Route successfully submitted. Thank you!")

    });
  },
  startRecording(e){
    // _.delay(this.setCurrentHeading, 1000);

    this.throttleOnWatchPosition = _.throttle(this.onWatchPosition, 100);
    navigator.geolocation.watchPosition(this.throttleOnWatchPosition, null, {enableHighAccuracy: true});

    this.setState({
      modal: {
        isOn: false
      },
      startRecord: {
        isOn: true
      }
    })
    console.log(this.props.params.routeLabelForm);
    var serializedForm = Serialize(this.props.params.routeLabelForm, {hash: true})
    $.post(this.props.routeLabelSource, serializedForm, (resp)=> {
      console.log("sent label form");
      this.getRouteLabels();
    });
  },
  getRouteLabels(){
    $.get(this.props.routeLabelSource, (resp)=> {
      this.setState({ routeLabels: resp })
    })
  },
  render() {
    console.log(this.state.stepCluster);
    return (
      <div>
      <div className={this.state.modal.isOn? "modal--show" : "modal--hide"}>
        <Link className="startRecord--back" to={`/createRouteLabel/${this.props.params.building}/${this.props.params.floor}/${this.props.params.room}/${this.refs.ft.value}/${this.refs.in.value}`}>Back</Link>
        <div className="routeInfo">Building: {`${this.props.params.building}`}<span className="routeInfo--middle">Floor: {`${this.props.params.floor}`}</span>Room: {`${this.props.params.room}`}</div>
        <p className="startRecord--warning">To ensure optimal route accuracy, please begin route inside the building at the main entrance with your back to the door. Thank you.</p>
        <a className="startRecord--button" ref="startRecord" onClick={this.startRecording}>Start Recording</a>
      </div>
      <h2>steps: {this.state.steps}</h2>
      <h2>current heading: {this.state.currentHeading}</h2>
      <h2>delta heading: {this.state.deltaHeading}</h2>

      <form method="POST" action="#" ref="routePathForm" onSubmit={this.submitRoutePath}>
        <input type="text" name="stepCluster" value={this.state.stepCluster} readOnly/>
        <input type="submit" ref="endRoute" value="end route"/>
      </form>

      <ul></ul>
      </div>
    )
  }
});
