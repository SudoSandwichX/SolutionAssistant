import { UPDATE_PACKAGER_SETTINGS } from "../actions/packagerSettingsActions";

const initialState = {
  action: "Extract", // {Extract|Pack}
  zipfile: "", // <file path>
  folder: "", // <folder path>
  packageType: "", // {Unmanaged|Managed|Both}
  allowWrite: "", // {Yes|No}
  allowDelete: "", // {Yes|No|Prompt}
  clobber: "",
  errorlevel: "", // {Yes|No|Prompt}
  map: "", // <file path>
  nologo: "",
  log: "", // <file path>
  sourceLoc: "", // <string>
  localize: ""
};

// Must set action value to exact path. Be mindful of the action payload past 
export default function packagerSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PACKAGER_SETTINGS:
      return {
        action: action.payload.packagerSettings.action}
    default:
      return state;
  }
}
