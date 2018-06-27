import PropTypes from "prop-types";
import React from "react";
import { Grid } from "@material-ui/core";
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
  Notification
} from "components";
import { connect } from "react-redux";
import { updatePackagerSetting } from "../../actions/packagerSettingsActions";
import { addNotification } from "../../actions/notificationActions";
import SolutionManagerTabs from "./SolutionManagerTabs";

const constants = require("../../assets/Strings.js");

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const { dialog } = electron.remote;

class SolutionManagement extends React.Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
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

  handleSolutionPackaging() {
    let isValid = true;
    let settings = this.props.packagerSettings;
    if (settings.action === constants.EXTRACT) {
      if (!settings.zipFile) {
        console.log("No zip file!");
        isValid = false;
      }
      if (!settings.folder) {
        console.log("No folder for output!");
        isValid = false;
      }
    }

    if (isValid) ipcRenderer.send("packager", this.props.packagerSettings);
  }

  showNotification = () => {
    debugger;
    console.log("Show Note clicked");

    this.props.onAddNotification({ id: 1, message: "Test 2" });
  };

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <RegularCard
              cardTitle="Solution"
              cardSubtitle="Browse for a solution to begin"
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
                <React.Fragment>
                  <Button
                    color="primary"
                    onClick={this.browseForSolutionFile.bind(this)}
                  >
                    Browse
                  </Button>
                  <Button
                    color="primary"
                    onClick={this.handleSolutionPackaging.bind(this)}
                    disabled={this.state.solutionFile.length === 0}
                  >
                    {this.props.packagerSettings.action === "extract"
                      ? "Extract "
                      : "Pack "}
                    Solution
                  </Button>
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
          <Button onClick={this.showNotification.bind(this)}> Test </Button>
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
  onAddNotification: addNotification
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SolutionManagement);
