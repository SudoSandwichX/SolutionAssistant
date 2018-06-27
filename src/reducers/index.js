import { combineReducers } from "redux";
import packagerSettingsReducer from "./packagerSettingsReducer";
import notificationsReducer from "./notificationsReducer";

export default combineReducers({
  packagerSettings: packagerSettingsReducer,
  notifications: notificationsReducer
});
