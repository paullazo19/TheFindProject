import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../modules/App';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/App");

describe('app component', ()=> {
  var appRendered,
      e,
      strideMeters

  beforeEach(()=> {
    appRendered = TestUtils.renderIntoDocument(
      <App/>
    );

    e = {
      preventDefault: ()=> { }
    };

    strideMeters = 0.762;



    spyOn(e, "preventDefault");
    spyOn(appRendered, "submitHeightForm").and.callThrough();
    spyOn(appRendered, "convertToStrideMeters");
    spyOn(appRendered, "directUserToLanding");
  });

  it("prevents default behavior", ()=> {
    e.preventDefault();
    expect(e.preventDefault).toBeCalled();
  });

  it('directs user to landing page on height submit', ()=> {
    appRendered.submitHeightForm(e);
    expect(appRendered.directUserToLanding).toBeCalled();
  });

  it('should convert height in feet to stride in meters', ()=> {
    appRendered.convertToStrideMeters(5, 9);
    expect(appRendered.convertToStrideMeters(5, 9)).toEqual(0.762);
  });
})
