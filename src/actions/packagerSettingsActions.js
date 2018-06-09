export const UPDATE_PACKAGER_SETTINGS = "packagerSettings:Update";

export function updatePackagerSettings(packagerSettings) {
  //console.debug("action fired"); // console statement does not show in console window?
  return {
    type: UPDATE_PACKAGER_SETTINGS,
    payload: {
      // Payload is the package settings object so only pass 
      // the children of packagerSettings children.
      packagerSettings
    }
  };
}
