import React from "react";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import { CustomInput } from "components";

const electron = window.require("electron");
const { dialog } = electron.remote;

export default class FolderInput extends React.Component {
  browseForFolder = e => {
    dialog.showOpenDialog({ properties: ["openDirectory"] }, fileNames => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        console.log("No file selected");
        return;
      } else {
        let event = {
          target: {
            name: this.props.name,
            value: fileNames[0]
          }
        };
        // Ignore lifting state if not defined
        if (this.props.handleStateLift) this.props.handleStateLift(event);
      }
    });
  };

  // value prop should be passed from parent to ensure
  // component is updated correctly
  render() {
    const { handleStateLift, error, folder, name } = this.props;
    return (
      <CustomInput
        labelText="Folder"
        id="folder-input"
        handleStateLift={handleStateLift.bind(this)}
        formControlProps={{
          fullWidth: true,
          error: error
        }}
        inputProps={{
          name: name,
          value: folder
        }}
        labelProps={{
          required: true
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Browse">
              <Folder onClick={this.browseForFolder.bind(this)} />
            </IconButton>
          </InputAdornment>
        }
      />
    );
  }
}
