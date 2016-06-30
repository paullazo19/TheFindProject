import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CreateRoutePath from '../modules/CreateRoutePath';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/CreateRoutePath");

describe('Create Route Path component', ()=> {
  var formRendered,
  e,
  stubbedData,
  navigator

  beforeEach(()=>{
    var paramData = {
      building: "buil",
      floor: 1,
      room: "room"
    }
    var CreateTest = class extends CreateRoutePath {
      componentDidMount() {
        return true;
      }
    }
    formRendered = TestUtils.renderIntoDocument(
      <CreateTest params = {paramData}/>
    );

    e = {
      preventDefault: ()=> { }
    };

    navigator = {
      geolocation: {
        getCurrentPosition: ()=> { }
      }
    }

    spyOn(e, "preventDefault");
    spyOn(navigator, "geolocation").and.callThrough();
    spyOn(formRendered, "convertStepNum").and.callThrough();
    spyOn(formRendered, "submitRoutePath").and.callThrough();
    spyOn(formRendered, "directToAllRoutes");

    stubbedData = {
      steps: 0,
      deltaHeading: 0,
      currentHeading: 0,
      leftTurn: {
        detected: false
      },
      rightTurn: {
        detected: false
      }
    }
    formRendered.setState(stubbedData);
  })

  // it("prevents default behavior", ()=> {
  //   e.preventDefault();
  //   expect(e.preventDefault).toBeCalled();
  // });
  //
  // describe('when a createRoutePath user walks', ()=> {
  //   it('converts stepNum to add to state.steps', ()=> {
  //     expect(formRendered.convertStepNum(1.13)).toEqual(2);
  //   })
  // })
  //
  // describe('when a createRoutePath user presses end route', ()=> {
  //   it('directs the user to all routes page', ()=> {
  //     formRendered.submitRoutePath(e);
  //     expect(formRendered.directToAllRoutes).toBeCalled();
  //   })
  // })


})
