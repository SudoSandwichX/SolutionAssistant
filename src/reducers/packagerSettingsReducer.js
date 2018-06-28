import { UPDATE_SINGLE_PACKAGER_SETTING } from "../actions/packagerSettingsActions";
import update from "immutability-helper";

const initialState = {
  action: "extract", // {Extract|Pack}
  zipFile: "", // <file path>
  zipFilePath: "",
  folder: "", // <folder path>
  packageType: "", // {Unmanaged|Managed|Both}
  allowWrite: "", // {Yes|No}
  allowDelete: "", // {Yes|No|Prompt}
  clobber: "",
  errorLevel: "", // {Yes|No|Prompt}
  map: "", // <file path>
  nologo: "",
  log: "", // <file path>
  sourceLoc: "", // <string>
  localize: ""
};

// compare previous state to new state and update accordingly.
export default function packagerSettingsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case UPDATE_SINGLE_PACKAGER_SETTING:
      // Can you iterete in update?
      return update(state, {
        [Object.keys(payload.packagerSettings)[0]]: {
          $set:
            payload.packagerSettings[Object.keys(payload.packagerSettings)[0]]
        }
      });
    default:
      return state;
  }
}
