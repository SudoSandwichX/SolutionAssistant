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
    this.setState({ selectedValue: event.target.value });

    event.target.name = [name];
    // Ignore lifting state if not defined
    if (this.props.handleStateLift) this.props.handleStateLift(event);
  };

  render() {
    const {
      classes,
      formControlProps,
      labelText,
      labelProps,
      inputProps,
      error,
      success,
      menuItems
    } = this.props;

    const parentState = this.props.value;

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
    const menu = menuItems.map(item => (
      <React.Fragment key={item.value}>
        <option value={item.value}>{item.text}</option>
      </React.Fragment>
    ));
    return (
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
      >
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={inputProps.id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Select
          native
          value={parentState ? parentState : this.state.selectedValue}
          onChange={this.handleChange(inputProps.name)}
          {...inputProps}
        >
          {menu}
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
