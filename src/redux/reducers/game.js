import {SCORE_ADD, SCORE_RESET, SET_STARTED} from "../actions/game";

const initialState = {
  started: false,
  scores: 0
}

const game = (state=initialState, action) => {

  switch (action.type) {

    case(SET_STARTED):
      return {
        ...state,
        started: action.payload
      }

    case(SCORE_ADD):
      return {
        ...state,
        scores: state.scores + action.payload
      }

    case(SCORE_RESET):
      return {
        ...state,
        scores: 0
      }

    default:
      return state;
  }
}

export default game;