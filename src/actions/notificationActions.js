export const ADD_NOTIFICATION = "notification:update";

export function addNotification(notification) {
  debugger;
  return {
    type: ADD_NOTIFICATION,
    payload: {
      // Payload is the package settings object so only pass
      // the children of packagerSettings children.
      notification
    }
  };
}
