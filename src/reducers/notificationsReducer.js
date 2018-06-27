import { ADD_NOTIFICATION } from "../actions/notificationActions.js";

let initialState = [{ id: 0, message: "test" }];

// compare previous state to new state and update accordingly.
export default function notificationsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_NOTIFICATION:
      debugger;
      // Can you iterete in update?
      return [
        ...state,
        {
          id: payload.notification.id,
          message: payload.notification.message
        }
      ];
    default:
      return state;
  }
}
