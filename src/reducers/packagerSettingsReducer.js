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

// compare previous state to new state and update accordingly.
export default function packagerSettingsReducer(state = initialState, {type, payload}) {
  debugger;
  switch (type) {
    case UPDATE_PACKAGER_SETTINGS:
      return {
        // Could === prev and new but does it matter for perf?
        action: payload.packagerSettings.action ? payload.packagerSettings.action : state.action, 
        packageType: payload.packagerSettings.packageType ? payload.packagerSettings.packageType : state.packageType, 
      }
    default:
      return state;
  }
}
