import React from "react";
import { withStyles, FormControl, InputLabel, Input } from "@material-ui/core";
import { Clear, Check } from "@material-ui/icons";
import PropTypes from "prop-types";
import cx from "classnames";

import customInputStyle from "assets/jss/material-dashboard-react/customInputStyle";

class CustomInput extends React.Component {
  handleChange = name => event => {
    //this.setState({ selectedValue: event.target.value });

    // Ignore lifting state if not defined
    if (this.props.handleStateLift)
      this.props.handleStateLift([name], event.target);
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
      success,
      endAdornment
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
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          {...inputProps}
          onChange={this.handleChange(inputProps.name)}
          endAdornment={endAdornment}
        />
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

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
