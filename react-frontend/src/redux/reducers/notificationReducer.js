import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function notificationReducer(state = initialState.notifications, action) {
  switch (action.type) {
    case types.LOAD_NOTIFICTIONS_SUCCESS:
      return [ ...action.payload ];
    default:
      return state;
  }
}
