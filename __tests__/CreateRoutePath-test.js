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
      building: "buil"
    }
    formRendered = TestUtils.renderIntoDocument(
      <CreateRouteLabel params = {paramData}/>
    );

    e = {
      preventDefault: ()=> { }
    };

    spyOn(e, "preventDefault");
    spyOn(formRendered, "directUserToCreateRoutePath");
    spyOn(formRendered, "handleBuildingInputChange");
    spyOn(formRendered, "checkAllInputStates").and.callThrough();

  })

  it("prevents default behavior", ()=> {
    e.preventDefault();
    expect(e.preventDefault).toBeCalled();
  });

  it('directs user to create route path when all error states are false', ()=> {
    stubbedData = {
      buildingAddress: {
        hasError: false
      },
      floorNumber: {
        hasError: false
      },
      roomDescription: {
        hasError: false
      }
    }
    formRendered.setState(stubbedData);
    formRendered.handleCreateRouteSubmit();
    expect(formRendered.directUserToCreateRoutePath).toBeCalled();
  });

  it('checks all input states when an error state is true', ()=> {
    formRendered.handleCreateRouteSubmit();
    expect(formRendered.checkAllInputStates).toBeCalled();
  });

  it('returns true if buildingAddress error state is true', ()=> {
    stubbedData = {
      buildingAddress: {
        hasError: true
      }
    }
    formRendered.setState(stubbedData)
    expect(formRendered.checkAllInputStates()).toBe(true);
  })

  it('returns true if floorNumber error state is true', ()=> {
    stubbedData = {
      floorNumber: {
        hasError: true
      }
    }
    formRendered.setState(stubbedData)
    expect(formRendered.checkAllInputStates()).toBe(true);
  })

  it('returns true if roomDescription error state is true', ()=> {
    stubbedData = {
      roomDescription: {
        hasError: true
      }
    }
    formRendered.setState(stubbedData)
    expect(formRendered.checkAllInputStates()).toBe(true);
  })

  it('returns false if all error states are false', ()=> {
    stubbedData = {
      buildingAddress: {
        hasError: false
      },
      floorNumber: {
        hasError: false
      },
      roomDescription: {
        hasError: false
      }
    }
    formRendered.setState(stubbedData);
    expect(formRendered.checkAllInputStates()).toBe(false);
  });

})
