import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StartCreate from '../modules/StartCreate';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

jest.unmock("../modules/StartCreate");

describe('Start Create component', ()=> {
  var formRendered,
  e

  beforeEach(()=>{
    var paramData = {
      building: "buil",
      floor: 1,
      room: "room"
    }

    formRendered = TestUtils.renderIntoDocument(
      <StartCreate params = {paramData}/>
    );

    e = {
      preventDefault: ()=> { }
    };

    spyOn(e, "preventDefault");
    spyOn(formRendered, "startRecording");
    spyOn(hashHistory, "push");

  })

  // describe("When a user clicks start recording", ()=> {
  //
  //   it('should direct to create path screen', ()=> {
  //     TestUtils.Simulate.click(formRendered.refs.startRecord);
  //     expect(formRendered.startRecording).toBeCalled();
  //   });
  // })
})
