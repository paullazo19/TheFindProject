import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CreateRoutePath from '../modules/CreateRoutePath';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/CreateRoutePath");

describe('Create Route Path component', ()=> {
  var formRendered,
  e,
  stubbedData

  beforeEach(()=>{
    var paramData = {
      building: "buil",
      floor: 1,
      room: "room"
    }
    formRendered = TestUtils.renderIntoDocument(
      <CreateRoutePath params = {paramData}/>
    );

    e = {
      preventDefault: ()=> { }
    };

    spyOn(e, "preventDefault");
    spyOn(formRendered, "componentWillUpdate").and.callThrough();
    spyOn(formRendered, "handleTurning").and.callThrough();
    spyOn(formRendered, "handleStepCluster").and.callThrough();
    spyOn(formRendered, "convertStepNum").and.callThrough();

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

  it("prevents default behavior", ()=> {
    e.preventDefault();
    expect(e.preventDefault).toBeCalled();
  });

  describe("When a user clicks start recording", ()=> {

    it('should close modal screen', ()=> {
      TestUtils.Simulate.click(formRendered.refs.startRecord);
      expect(formRendered.state.modal.isOn).toBe(false);
    });

    it('should start the watch position function', ()=> {
      TestUtils.Simulate.click(formRendered.refs.startRecord);
      expect(formRendered.state.startRecord.isOn).toBe(true);
    });
  })

  describe('when a createRoutePath user walks and turns a direction', ()=> {
    it('should add turn right to the route sequence when user turns right',  ()=> {
      stubbedData = {
        turnDetected: 100
      }
      formRendered.setState(stubbedData);
      formRendered.handleTurning(e);
      expect(formRendered.state.rightTurn.detected).toBe(true);
    })

    it('should add turn right to the route sequence when user turns right',  ()=> {
      stubbedData = {
        turnDetected: 245
      }
      formRendered.setState(stubbedData);
      formRendered.handleTurning(e);
      expect(formRendered.state.leftTurn.detected).toBe(true);
    })
  })

  describe('when a createRoutePath user walks', ()=> {
    it('converts stepNum to add to state.steps', ()=> {
      expect(formRendered.convertStepNum(1.13)).toEqual(2);
    })
  })


})
