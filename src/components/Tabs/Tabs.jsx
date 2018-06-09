import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

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

class TabsWrappedLabel extends React.Component {
  state = {
    value: 1
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  buildTabContent(props) {}

  render() {
    const { classes, tabs } = this.props;
    const { value } = this.state;
    const tab = (
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={this.handleChange}>
          {this.props.tabs.map(tab => <Tab value={tab.id} label={tab.title} />)}
        </Tabs>
      </AppBar>
    );
    const content = tabs.map(tab => (
      <React.Fragment>
        {value === tab.id && <TabContainer> {tab.content}</TabContainer>}
      </React.Fragment>
    ));

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {tab}
          </Tabs>
        </AppBar>
        {content}
      </div>
    );
  }
}

TabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabsWrappedLabel);
