import React from "react";
import {SET_DEFAULT_SPEED, SET_FAST_SPEED} from "../actions/settings";

const initialState = {
  fieldWidth: 800,
  fieldHeight: 800,
  cellArea: 50,
  defaultSpeed: 400,
  fastSpeed: 70
}

const settings = (state=initialState, action) => {

  switch (action.type) {

    case(SET_DEFAULT_SPEED):
      return {
        ...state,
        defaultSpeed: action.payload
      }

    case(SET_FAST_SPEED):
      return {
        ...state,
        fastSpeed: action.payload
      }

    default:
      return state;
  }
}

export default settings;