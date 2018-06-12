import PropTypes from "prop-types";
import React from "react";
import { Grid } from "@material-ui/core";
import { RegularCard, Button, CustomInput, ItemGrid } from "components";
import { connect } from "react-redux";
import { updatePackagerSetting } from "../../actions/packagerSettingsActions";
import SolutionManagerTabs from "./SolutionManagerTabs";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const { dialog } = electron.remote;

class SolutionManagement extends React.Component {
  state = {
    solutionFile: ""
  };

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

  unpackSolution() {
    console.log(
      "TODO write unpack solution. Needs to account for user options"
    );
    debugger;
    ipcRenderer.send("solution-packager", this.props.packagerSettings);
  }

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
                    onClick={this.unpackSolution.bind(this)}
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
