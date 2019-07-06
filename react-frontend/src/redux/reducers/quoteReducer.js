import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function quoteReducer(state = initialState.quote, action) {
  switch (action.type) {
    case types.LOAD_QUOTE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
