import React from "react";
import { AddAlert } from "@material-ui/icons";
import { Snackbar } from "components";
import { connect } from "react-redux";
import {
  addNotification,
  removeNotification
} from "../../actions/notificationActions";
// this will store the notifications and their count to track them and also maxNotifications for use in internal functions

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
  }
  componentDidMount() {
    console.log(this.props.notifications);
  }

  closeNotification(id) {
    let notification = this.props.notifications.find(x => x.id === id);
    this.props.onRemoveNotification(notification);
    console.log(`Close Note ${notification.id}`);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.notifications.length > 0 && (
          <Snackbar
            id={
              this.props.notifications[this.props.notifications.length - 1].id
            }
            place="br"
            color="info"
            icon={AddAlert}
            message={
              this.props.notifications[this.props.notifications.length - 1]
                .message
            }
            open={
              this.props.notifications[this.props.notifications.length - 1].open
            }
            closeNotification={this.closeNotification}
            close
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapActionsToProps = {
  onAddNotification: addNotification,
  onRemoveNotification: removeNotification
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Notification);
