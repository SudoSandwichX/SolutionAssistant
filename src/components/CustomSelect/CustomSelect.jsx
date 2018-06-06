import React from "react";
import {
  withStyles,
  FormControl,
  InputLabel,
  Select,
  NativeSelect,
  MenuItem
} from "@material-ui/core";
import { Clear, Check } from "@material-ui/icons";
import PropTypes from "prop-types";
import cx from "classnames";

import customInputStyle from "assets/jss/material-dashboard-react/customInputStyle";

class CustomSelect extends React.Component {
  state = {
    selectedValue: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      success
    } = this.props;

    const labelClasses = cx({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = cx({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });
    const marginTop = cx({
      [classes.marginTop]: labelText === undefined
    });
    return (
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
      >
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Select
          native
          value={this.state.selectedValue}
          onChange={this.handleChange("selectedValue")}
          inputProps={{
            id: "age-native-simple"
          }}
        >
          <option value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
        {error ? (
          <Clear className={classes.feedback + " " + classes.labelRootError} />
        ) : success ? (
          <Check
            className={classes.feedback + " " + classes.labelRootSuccess}
          />
        ) : null}
      </FormControl>
    );
  }
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomSelect);
