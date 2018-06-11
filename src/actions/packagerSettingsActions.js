export const UPDATE_SINGLE_PACKAGER_SETTING = "packagerSettings:UpdateSingle";

export function updatePackagerSetting(packagerSettings) {
  //console.debug("action fired"); // console statement does not show in console window?
  //
  return {
    type: UPDATE_SINGLE_PACKAGER_SETTING,
    payload: {
      // Payload is the package settings object so only pass 
      // the children of packagerSettings children.      
      packagerSettings
    }
  };
}
