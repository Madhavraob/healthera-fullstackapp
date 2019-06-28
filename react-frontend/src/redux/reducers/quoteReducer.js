import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function quoteReducer(state = initialState.quotes, action) {
  switch (action.type) {
    case types.LOAD_QUOTES_SUCCESS:
      return [ ...state, ...action.payload ];
    default:
      return state;
  }
}
