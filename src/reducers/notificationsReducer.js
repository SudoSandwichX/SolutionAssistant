import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../actions/notificationActions.js";
import update from "immutability-helper";

let initialState = [];

// compare previous state to new state and update accordingly.
export default function notificationsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_NOTIFICATION:
      return update(state, {
        $push: [
          {
            id: payload.notification.id,
            message: payload.notification.message,
            open: payload.notification.open
          }
        ]
      });
    case REMOVE_NOTIFICATION:
      const index = state.indexOf(payload.notification);
      // Alt: state.findIndex(obj => obj.id === payload.notification.id)
      if (index >= 0) {
        return update(state, { $splice: [[index, 1]] });
      }
      break;
    default:
      return state;
  }
}
