import PropTypes from "prop-types";
import React from "react";
import { AddAlert } from "@material-ui/icons";
import { Snackbar } from "components";
import { connect } from "react-redux";
import { addNotification } from "../../actions/notificationActions";
// this will store the notifications and their count to track them and also maxNotifications for use in internal functions

class Notification extends React.Component {
  componentDidMount() {
    debugger;
    console.log(this.props.notifications);
  }

  static showNotification = notification => {
    debugger;
    let tempNotifications = this.props.notifications;
    // push a new notification to notifications

    notification.open = true;
    notification.count = 0;
    notification.key = Date.now();
    tempNotifications.push(notification);
  };

  render() {
    return (
      <React.Fragment>
        <Snackbar
          place="br"
          color="info"
          icon={AddAlert}
          message={
            this.props.notifications[this.props.notifications.length - 1]
              .message
          }
          open={true}
          closeNotification={() => this.setState({ tl: false })}
          close
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapActionsToProps = {
  onAddNotification: addNotification
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Notification);
