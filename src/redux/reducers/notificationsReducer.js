import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../actions/notificationActions";
import update from "immutability-helper";

let initialState = [];

// compare previous state to new state and update accordingly.
export default function notificationsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_NOTIFICATION:
      /* // add to front of array. Causes jittering
      let newArray = state.slice();
      newArray.splice(0, 0, {
        id: payload.notification.id,
        message: payload.notification.message,
        open: payload.notification.open,
        color: payload.notification.color,
        icon: payload.notification.icon
      });
      return newArray;
      
*/

      const index = state.findIndex(obj => obj.id === payload.notification.id);
      if (index <= 0) {
        return update(state, {
          $push: [
            {
              id: payload.notification.id,
              message: payload.notification.message,
              open: payload.notification.open,
              color: payload.notification.color,
              icon: payload.notification.icon
            }
          ]
        });
      } else {
        return state;
      }
    case REMOVE_NOTIFICATION:
      //const index = state.indexOf(notification);
      const index2 = state.findIndex(obj => obj.id === payload.notification);
      if (index2 >= 0) {
        return update(state, { $splice: [[index2, 1]] });
      } else {
        return state;
      }
    default:
      return state;
  }
}
