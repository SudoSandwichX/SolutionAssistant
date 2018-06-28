import PropTypes from "prop-types";
import React from "react";
import { Grid } from "@material-ui/core";
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
  Notification,
  FolderInput
} from "components";
import { connect } from "react-redux";
import { updatePackagerSetting } from "../../actions/packagerSettingsActions";
import {
  addNotification,
  removeNotification
} from "../../actions/notificationActions";
import SolutionManagerTabs from "./SolutionManagerTabs";

const constants = require("../../assets/Strings.js");

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const { dialog } = electron.remote;

class SolutionManagement extends React.Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.splitZipFileString = this.splitZipFileString.bind(this);
  }

  state = {
    solutionFile: "",
    count: 0
  };

  componentDidMount() {
    ipcRenderer.on("packager:output", err => {
      this.handleError(err);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("packager:output", err => {
      this.handleError(err);
    });
  }

  handleError(err) {
    console.log(err);
  }

  handleChange = event => {
    this.props.onUpdatePackagerSetting({
      [event.target.name]: event.target.value
    });
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

  browseForOutputDirectory(e) {
    dialog.showOpenDialog({ properties: ["openDirectory"] }, directory => {
      // fileNames is an array that contains all the selected
      if (directory === undefined) {
        console.log("No directory selected");
        return;
      } else {
        console.log(directory[0]);
        this.setState({ solutionFile: directory[0] });
        this.props.onUpdatePackagerSetting({
          zipFile: directory[0]
        });
      }
    });
  }

  handleSolutionPackaging() {
    let isValid = true;
    let settings = this.props.packagerSettings;
    if (settings.action === constants.EXTRACT) {
      if (!settings.zipFile) {
        this.showNotification({
          message: "No Solution Package selected!"
        });
        isValid = false;
      }
      if (!settings.folder) {
        console.log("No folder for output!");
        isValid = false;
      }
    }

    if (settings.action === constants.PACK) {
      if (!settings.zipFile) {
        this.showNotification({
          message: "Please provide a solution name"
        });
        isValid = false;
      }
    }
    if (isValid) ipcRenderer.send("packager", this.props.packagerSettings);
  }

  splitZipFileString(str) {
    let path = str.substring(0, str.lastIndexOf("\\"));
    let file = this.props.packagerSettings.zipFile.split("\\").pop();
    return { path, file };
  }

  showNotification = notification => {
    console.log("Show Note clicked");

    this.props.onAddNotification({
      id: Date.now(),
      message: notification.message,
      open: true
    });
  };

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              cardTitle="Solution"
              cardSubtitle={
                this.props.packagerSettings.action === constants.EXTRACT
                  ? "Browse for an existing solution to begin"
                  : "Enter output path and the desired solution zip name"
              }
              content={
                <div>
                  {this.props.packagerSettings.action === constants.PACK && (
                    <ItemGrid xs={12} sm={12}>
                      <FolderInput
                        name="zipFilePath"
                        handleStateLift={this.handleChange}
                        folder={this.props.packagerSettings.zipFilePath}
                        error={false}
                      />
                    </ItemGrid>
                  )}

                  <ItemGrid xs={12} sm={12}>
                    <CustomInput
                      labelText="Solution"
                      id="solution"
                      handleStateLift={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.splitZipFileString(
                          this.props.packagerSettings.zipFile
                        ).file,
                        disabled:
                          this.props.packagerSettings.action ===
                            constants.EXTRACT ||
                          this.props.packagerSettings.action === "",
                        name: "zipFile"
                      }}
                    />
                  </ItemGrid>
                </div>
              }
              footer={
                <React.Fragment>
                  {(this.props.packagerSettings.action === constants.EXTRACT ||
                    this.props.packagerSettings.action === "") && (
                    <Button
                      color="primary"
                      onClick={this.browseForSolutionFile.bind(this)}
                    >
                      Browse
                    </Button>
                  )}
                  {this.props.packagerSettings.action !== "" && (
                    <Button
                      color="primary"
                      onClick={this.handleSolutionPackaging.bind(this)}
                      disabled={
                        this.props.packagerSettings.zipFile.length === 0 &&
                        this.props.packagerSettings.action === constants.EXTRACT
                      }
                    >
                      {this.props.packagerSettings.action === "extract"
                        ? "Extract "
                        : "Pack "}
                      Solution
                    </Button>
                  )}
                </React.Fragment>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={12}>
            <SolutionManagerTabs
              packagerSettings={this.props.packagerSettings}
              onUpdatePackagerSetting={this.props.onUpdatePackagerSetting}
            />
          </ItemGrid>
          <Notification />
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
  onUpdatePackagerSetting: updatePackagerSetting,
  onAddNotification: addNotification,
  onRemoveNotification: removeNotification
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SolutionManagement);
