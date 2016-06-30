import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Turn from '../modules/Turn';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/Turn");

describe('determines turns', ()=> {
  var turnRendered;

  beforeEach(()=>{
    turnRendered = TestUtils.renderIntoDocument(
      <Turn/>
    );
    // spyOn(formRendered, "checkAllInputStates").and.callThrough();
  })

  it('calculates right between current heading and delta heading', ()=> {
    expect(turnRendered.calcDifference(0, 100)).toBe('turn right');
    expect(turnRendered.calcDifference(355, 90)).toBe('turn right');
    expect(turnRendered.calcDifference(175, 275)).toBe('turn right');
  });

  it('calulates left between current heading and delta heading', ()=> {
    expect(turnRendered.calcDifference(0, 300)).toBe('turn left');
    expect(turnRendered.calcDifference(0, 240)).toBe('turn left');
    expect(turnRendered.calcDifference(0, 275)).toBe('turn left');
  });

  it('calculates error string', ()=> {
    expect(turnRendered.calcDifference(0, 180)).toBe('invalid turn');
    expect(turnRendered.calcDifference(0, 59)).toBe('invalid turn');
  });



})
