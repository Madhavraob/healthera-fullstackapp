import { combineReducers } from "redux";
import users from "./userReducer";
import records from "./recordReducer";
import notifications from "./notificationReducer";

const rootReducer = combineReducers({
  users,
  records,
  notifications
});

export default rootReducer;
