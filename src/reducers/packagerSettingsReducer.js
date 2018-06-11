import {
  UPDATE_SINGLE_PACKAGER_SETTING,
  updatePackagerSetting
} from "../actions/packagerSettingsActions";
import update from "immutability-helper";
import { debug } from "util";

const initialState = {
  action: "extract", // {Extract|Pack}
  zipFile: "", // <file path>
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
  debugger;
  switch (type) {
    case UPDATE_SINGLE_PACKAGER_SETTING:
      // Can you iterete in update?
      return update(state, {
        [Object.keys(payload.packagerSettings)[0]]: {
          $set:
            payload.packagerSettings[Object.keys(payload.packagerSettings)[0]]
        }

        /*  UPDATE MULTIPLE. Is there a better way? 
        action: payload.packagerSettings.action ? payload.packagerSettings.action : state.action, 
        packageType: payload.packagerSettings.packageType ? payload.packagerSettings.packageType : state.packageType, 
        zipFile: payload.packagerSettings.zipFile ? payload.packagerSettings.zipFile : state.zipFile, 
        folder: payload.packagerSettings.folder ? payload.packagerSettings.folder : state.folder, 
        allowWrite: payload.packagerSettings.allowWrite ? payload.packagerSettings.allowWrite : state.allowWrite, 
        allowDelete: payload.packagerSettings.allowDelete ? payload.packagerSettings.allowDelete : state.allowDelete, 
        clobber: payload.packagerSettings.clobber ? payload.packagerSettings.clobber : state.clobber, 
        errorLevel: payload.packagerSettings.errorLevel ? payload.packagerSettings.errorLevel : state.errorLevel, 
        map: payload.packagerSettings.map ? payload.packagerSettings.map : state.map, 
        log: payload.packagerSettings.log ? payload.packagerSettings.log : state.log, 
        nologo: payload.packagerSettings.nologo ? payload.packagerSettings.nologo : state.nologo, 
        sourceLoc: payload.packagerSettings.sourceLoc ? payload.packagerSettings.sourceLoc : state.sourceLoc, 
        localize: payload.packagerSettings.localize ? payload.packagerSettings.localize : state.localize 
      */
      });
    default:
      return state;
  }
}
