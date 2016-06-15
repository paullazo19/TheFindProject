import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../modules/App';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/App");

describe('User signup app', () => {
  var appRendered,
      e,
      browserHistory

  beforeEach(()=>{
    appRendered = TestUtils.renderIntoDocument(
      <App/>
    );

    e = {
      preventDefault: ()=>{ }
    };

    browserHistory = {
      push: ()=> { }
    };
  });


  describe('App height input component', () => {

    beforeEach(()=> {
      spyOn(e, "preventDefault");
      spyOn(appRendered, "submitHeightForm").and.callThrough();
      spyOn(appRendered, "convertToStrideMeters");
      spyOn(browserHistory, "push");
    });

    it('pushes to landing page on height submit', () => {
      // This places our component into our test to find off of
      var appRendered = TestUtils.renderIntoDocument(
        <App/>
      )

      appRendered.submitHeightForm(e);
      // console.log(browserHistory);
      // expect(browserHistory.push).toBeCalled();
    });
  });
})
