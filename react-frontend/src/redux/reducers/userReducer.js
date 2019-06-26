import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { loggedInUser: action.payload });
    case types.LOAD_PATIENTS_SUCCESS:
      return Object.assign({}, state, { patients: action.payload });
    default:
      return state;
  }
}
