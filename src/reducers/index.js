import { combineReducers } from "redux";
import packagerSettingsReducer from "./packagerSettingsReducer";

export default combineReducers({
  packagerSettings: packagerSettingsReducer
});
