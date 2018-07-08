import { combineReducers } from "redux";

// ##############################
// // // Actions
// #############################
import {
  addNotification,
  removeNotification
} from "./actions/notificationActions";

import { updatePackagerSetting } from "./actions/packagerSettingsActions";

// ##############################
// // // Reducers
// #############################
import notificationsReducer from "./reducers/notificationsReducer";
import packagerSettingsReducer from "./reducers/packagerSettingsReducer";

// ##############################
// // // Root Reducer
// #############################
export default combineReducers({
  packagerSettings: packagerSettingsReducer,
  notifications: notificationsReducer
});

export {
  // Actions
  addNotification,
  removeNotification,
  updatePackagerSetting,
  // Reducers
  notificationsReducer,
  packagerSettingsReducer
};
