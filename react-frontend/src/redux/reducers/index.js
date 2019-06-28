import { combineReducers } from "redux";
import users from "./userReducer";
import records from "./recordReducer";
import notifications from "./notificationReducer";
import quotes from "./quoteReducer";
const rootReducer = combineReducers({
  users,
  records,
  notifications,
  quotes
});

export default rootReducer;
