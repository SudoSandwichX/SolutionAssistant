export const ADD_NOTIFICATION = "notification:add";
export const REMOVE_NOTIFICATION = "notification:remove";

export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      // Payload is the package settings object so only pass
      // the children of packagerSettings children.
      notification
    }
  };
}

export function removeNotification(notification) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: {
      // Payload is the package settings object so only pass
      // the children of packagerSettings children.
      notification
    }
  };
}
