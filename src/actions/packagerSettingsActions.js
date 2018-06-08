export const UPDATE_PACKAGER_SETTINGS = "packagerSettings:Update";

export function updatePackagerSettings(packagerSettings) {
  console.debug("action fired");
  return {
    type: UPDATE_PACKAGER_SETTINGS,
    payload: {
      packagerSettings
    }
  };
}
