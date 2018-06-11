import PropTypes from "prop-types";
import React from "react";
import {
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  FormHelperText,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
  CustomSelect,
  TabsWrappedLabel
} from "components";
import { connect } from "react-redux";
import { updatePackagerSetting } from "../../actions/packagerSettingsActions";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;
const { dialog } = electron.remote;

class SolutionManagement extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    solutionFile: "",
    folder: ""
  };

  handleChange = event => {
    debugger;
    this.setState({ [event.target.name]: event.target.value });
  };

  browseForSolutionFile(e) {
    dialog.showOpenDialog(fileNames => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        console.log("No file selected");
        return;
      } else {
        console.log(fileNames[0]);
        this.setState({ solutionFile: fileNames[0] });
        this.props.onUpdatePackagerSetting({
          zipFile: fileNames[0]
        });
      }
    });
  }

  unpackSolution() {
    console.log(
      "TODO write unpack solution. Needs to account for user options"
    );
    debugger;
    ipcRenderer.send(
      "solution:unpack",
      this.props.packagerSettings.zipFile,
      this.props.packagerSettings.folder
    );
  }

  viewProps() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Tooltip title="ToolTip doesn't work in tabs :'(" placement="top-start">
          <button onClick={this.viewProps.bind(this)}> View Props </button>
        </Tooltip>
        <Button color="primary" onClick={this.unpackSolution.bind(this)}>
          {this.props.packagerSettings.action === "extract"
            ? "Extract "
            : "Pack "}
          Solution
        </Button>
        <div>
          {this.props.packagerSettings.action},
          {this.props.packagerSettings.packageType},
          {this.props.packagerSettings.zipFile},
          {this.props.packagerSettings.folder},
          {this.props.packagerSettings.allowWrite},
          {this.props.packagerSettings.allowDelete},
          {this.props.packagerSettings.clobber},
          {this.props.packagerSettings.errorLevel},
          {this.props.packagerSettings.map},
          {this.props.packagerSettings.log},
          {this.props.packagerSettings.nologo},
          {this.props.packagerSettings.sourceLoc},
          {this.props.packagerSettings.localize}
        </div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <RegularCard
              cardTitle="Solution"
              cardSubtitle="Select a solution to begin"
              content={
                <div>
                  <ItemGrid xs={12} sm={12}>
                    <CustomInput
                      labelText="Solution"
                      id="solution"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.solutionFile.split("\\").pop(),
                        disabled: true,
                        name: "zipFile"
                      }}
                    />
                  </ItemGrid>
                </div>
              }
              footer={
                <Button
                  color="primary"
                  onClick={this.browseForSolutionFile.bind(this)}
                >
                  Browse
                </Button>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={12}>
            <TabsWrappedLabel
              tabs={[
                {
                  id: 1,
                  title: "General",
                  content: "General Tab!"
                },
                {
                  id: 2,
                  title: "Packager Settings",
                  content: SettingsTab(this.props, this.handleChange)
                }
              ]}
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

SolutionManagement.propTypes = {
  onUpdatePackagerSetting: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  packagerSettings: state.packagerSettings
});

const mapActionsToProps = {
  onUpdatePackagerSetting: updatePackagerSetting
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SolutionManagement);

/*
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="Toggle password visibility">
                  <Help />
                </IconButton>
              </InputAdornment>
            }
*/

// Build for packager settings tab
function SettingsTab(props, handleChange) {
  // Handle updating the state of children in the settings tab
  const updateState = (name, target) => {
    props.onUpdatePackagerSetting({
      [name]: target.value
    });
  };

  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={2}>
          <CustomSelect
            labelText="Action"
            inputProps={{
              id: "action-select",
              name: "action"
            }}
            labelProps={{
              required: true
            }}
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "", text: "" },
              { value: "extract", text: "Extract" },
              { value: "pack", text: "Pack" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={2}>
          <CustomSelect
            labelText="Package Type"
            inputProps={{
              id: "packageType-select",
              name: "packageType"
            }}
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "", text: "" },
              { value: "unmanaged", text: "Unmanaged" },
              { value: "managed", text: "Managed" },
              { value: "both", text: "Both" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={2}>
          <CustomSelect
            labelText="Allow Write"
            inputProps={{
              id: "allowWrite-select",
              name: "allowWrite"
            }}
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "", text: "" },
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={2}>
          <CustomSelect
            labelText="Allow Delete"
            inputProps={{
              id: "allowDelete-select",
              name: "allowDelete"
            }}
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "", text: "" },
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" },
              { value: "prompt", text: "Prompt" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={2}>
          <CustomSelect
            labelText="Clobber"
            inputProps={{
              id: "clobber-select",
              name: "clobber"
            }}
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "", text: "" },
              { value: "/clobber", text: "Yes" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={2}>
          <CustomSelect
            labelText="Error Level"
            inputProps={{
              id: "errorLevel-select",
              name: "errorLevel"
            }}
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "", text: "" },
              { value: "off", text: "Off" },
              { value: "error", text: "Error" },
              { value: "warning", text: "Warning" },
              { value: "info", text: "Info" },
              { value: "verbose", text: "Verbose" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <FolderInput
            handleStateLift={updateState}
            folder={props.packagerSettings.folder}
            reduxState={props.onUpdatePackagerSetting}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Map"
            id="map-input"
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              name: "map"
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Log"
            id="log-input"
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              name: "log"
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <CustomInput
            labelText="SourceLoc"
            id="sourceLoc-input"
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              name: "sourceLoc"
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={2}>
          <CustomSelect
            labelText="Localize"
            inputProps={{
              id: "localize-select",
              name: "localize"
            }}
            handleStateLift={updateState}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "", text: "" },
              { value: "/localize", text: "Yes" }
            ]}
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}

class FolderInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: props.folder
    };
  }
  handleChange = event => {
    debugger;
    this.setState({ [event.target.name]: event.target.value });
  };

  browseForFolder = e => {
    dialog.showOpenDialog({ properties: ["openDirectory"] }, fileNames => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        console.log("No file selected");
        return;
      } else {
        this.setState({ folder: fileNames[0] });
        console.log(fileNames[0]);
        this.props.reduxState({
          folder: fileNames[0]
        });
      }
    });
  };

  render() {
    const { handleStateLift, reduxState } = this.props;

    return (
      <CustomInput
        labelText="Folder"
        id="folder-input"
        handleStateLift={handleStateLift}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          name: "folder",
          onChange: this.handleChange.bind(this),
          value: this.state.folder
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
