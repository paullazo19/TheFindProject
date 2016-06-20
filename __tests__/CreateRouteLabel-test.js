import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CreateRouteLabel from '../modules/CreateRouteLabel';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/CreateRouteLabel");

describe('create route label component', ()=> {
  var formRendered,
      e,
      inputElement

  beforeEach(()=> {
    formRendered = TestUtils.renderIntoDocument(
      <CreateRouteLabel/>
    );

    e = {
      preventDefault: ()=> { }
    };

    spyOn(e, "preventDefault");
    spyOn(formRendered, "handleBuildingInputChange").and.callThrough();
    spyOn(formRendered, "checkAllInputStates").and.callThrough();
    spyOn(formRendered, "directUserToCreateRoutePath");
  });

  it("prevents default behavior", ()=> {
    e.preventDefault();
    expect(e.preventDefault).toBeCalled();
  });

  it("checks all input states", ()=> {
    formRendered.checkAllInputStates();
    expect(formRendered.checkAllInputStates).toBeCalled();
  });

  it("directs user to create route path screen", ()=> {
    formRendered.directUserToCreateRoutePath();
    expect(formRendered.directUserToCreateRoutePath).toBeCalled();
  });
  describe("When a user enters incorrect text for building address", ()=> {
    var stubbedData = "baf"

    it("should set state as true", ()=> {
      formRendered.handleBuildingInputChange(stubbedData);
      expect(formRendered.state.buildingAddress.hasError).toBe(true);
    });

  })

})
