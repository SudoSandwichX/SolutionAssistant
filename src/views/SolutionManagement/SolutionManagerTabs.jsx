import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import { CustomInput, ItemGrid, CustomSelect } from "components";

const electron = window.require("electron");
const { dialog } = electron.remote;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

// Allow dynamics tab building.

// Example Usage
/*
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
                  content: SettingsTab(this.props) // This is a functional component. Passing props to allow for state lifting
                }
              ]}
            />
*/
class SolutionManagerTabs extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);

    this.state = {
      value: 1,
      action: props.packagerSettings.action, // {Extract|Pack}
      zipFile: props.packagerSettings.zipFile, // <file path>
      folder: props.packagerSettings.folder, // <folder path>
      packageType: props.packagerSettings.packageType, // {Unmanaged|Managed|Both}
      allowWrite: props.packagerSettings.allowWrite, // {Yes|No}
      allowDelete: props.packagerSettings.allowDelete, // {Yes|No|Prompt}
      clobber: props.packagerSettings.clobber,
      errorLevel: props.packagerSettings.errorLevel, // {Yes|No|Prompt}
      map: props.packagerSettings.map, // <file path>
      nologo: props.packagerSettings.nologo,
      log: props.packagerSettings.log, // <file path>
      sourceLoc: props.packagerSettings.sourceLoc, // <string>
      localize: props.packagerSettings.localize
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateState = (name, target) => {
    debugger;
    this.setState({
      [name]: target.value
    });
    this.props.onUpdatePackagerSetting({
      [name]: target.value
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  buildTabContent(props) {}

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab key={1} value={1} label="Packager Settings" />
            <Tab key={2} value={2} label="Test Tab" />
          </Tabs>
        </AppBar>
        {value === 1 && (
          <TabContainer key={1}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={2}>
                <CustomSelect
                  value={this.state.action}
                  labelText="Action"
                  inputProps={{
                    id: "action-select",
                    name: "action"
                  }}
                  labelProps={{
                    required: true
                  }}
                  handleStateLift={this.updateState}
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
                  value={this.state.packageType}
                  labelText="Package Type"
                  inputProps={{
                    id: "packageType-select",
                    name: "packageType"
                  }}
                  handleStateLift={this.updateState}
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
                  value={this.state.allowWrite}
                  labelText="Allow Write"
                  inputProps={{
                    id: "allowWrite-select",
                    name: "allowWrite"
                  }}
                  handleStateLift={this.updateState}
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
                  value={this.state.allowDelete}
                  labelText="Allow Delete"
                  inputProps={{
                    id: "allowDelete-select",
                    name: "allowDelete"
                  }}
                  handleStateLift={this.updateState}
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
                  value={this.state.clobber}
                  labelText="Clobber"
                  inputProps={{
                    id: "clobber-select",
                    name: "clobber"
                  }}
                  handleStateLift={this.updateState}
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
                  value={this.state.errorLevel}
                  labelText="Error Level"
                  inputProps={{
                    id: "errorLevel-select",
                    name: "errorLevel"
                  }}
                  handleStateLift={this.updateState}
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
                  handleStateLift={this.updateState}
                  folder={this.props.packagerSettings.folder}
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={6}>
                <CustomInput
                  value={this.state.map}
                  labelText="Map"
                  id="map-input"
                  handleStateLift={this.updateState}
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
                  value={this.state.log}
                  labelText="Log"
                  id="log-input"
                  handleStateLift={this.updateState}
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
                  value={this.state.sourceLoc}
                  labelText="SourceLoc"
                  id="sourceLoc-input"
                  handleStateLift={this.updateState}
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
                  value={this.state.localize}
                  labelText="Localize"
                  inputProps={{
                    id: "localize-select",
                    name: "localize"
                  }}
                  handleStateLift={this.updateState}
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
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer key={2}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={2}>
                <p> Test </p>
              </ItemGrid>
            </Grid>
          </TabContainer>
        )}
      </div>
    );
  }
}

SolutionManagerTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SolutionManagerTabs);

class FolderInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: props.folder
    };
  }
  handleChange = event => {
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

        let target = {
          value: fileNames[0]
        };
        // Ignore lifting state if not defined
        if (this.props.handleStateLift)
          this.props.handleStateLift("folder", target);
      }
    });
  };

  render() {
    const { handleStateLift } = this.props;
    const parentState = this.props.parentState;

    return (
      <CustomInput
        value={parentState}
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
