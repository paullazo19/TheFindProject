import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CreateRouteLabel from '../modules/CreateRouteLabel';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/CreateRouteLabel");

describe('Create Route Label component', ()=> {
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
    spyOn(formRendered, "directUserToStartCreateScreen");
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
    formRendered.handleCreateRouteSubmit(e);
    expect(formRendered.directUserToStartCreateScreen).toBeCalled();
  });

  it('checks all input states when an error state is true', ()=> {
    formRendered.handleCreateRouteSubmit(e);
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
