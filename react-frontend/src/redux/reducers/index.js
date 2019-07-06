import { combineReducers } from "redux";
import users from "./userReducer";
import records from "./recordReducer";
import notifications from "./notificationReducer";
import quote from "./quoteReducer";
const rootReducer = combineReducers({
  users,
  records,
  notifications,
  quote
});

export default rootReducer;
