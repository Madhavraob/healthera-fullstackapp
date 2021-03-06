import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as notificationActions from "../../redux/actions/notificationActions";
import * as quoteActions from "../../redux/actions/quoteActions";
import { NotificationModel } from "../../models/NotificationModel";
import "./NotificationListPage.css"

class NotificationListPage extends React.Component {

  currentUser;

  constructor(props) {
    super(props)
    this.state = {
      notification: new NotificationModel()
    }
  }

  componentDidMount() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.loadNotifications();
    } else {
      this.props.history.push("/login");
    }
  }

  loadQuote = (patientId) => {
    this.props.actions.getQuote(patientId).catch(error => {
      alert("Fetch quote failed" + error);
    });
  }

  loadNotifications = () => {
    if (this.currentUser.role === 'patient') {
      this.props.actions.getByPatientId(this.currentUser._id).catch(error => {
        alert("Fetch patients failed" + error);
      });
      this.loadQuote(this.currentUser._id);
      this.setState({ notification: new NotificationModel() })
    } else {
      this.props.actions.getAll().catch(error => {
        alert("Fetch patients failed" + error);
      });
    }
  }

  updateNotification = (value, item) => {
    const modifiedNotification = { ...item };
    modifiedNotification.resolved = !modifiedNotification.resolved;
    this.props.actions.update(modifiedNotification).then(() => {
      this.loadNotifications();
    })
      .catch(ex => {
        console.log(ex)
      });
  }

  notificationMsgChange = (event) => {
    const modifiedNotification = { ...this.state.notification };
    modifiedNotification.alert = event.target.value;
    this.setState({ notification: modifiedNotification })
  }

  sendNotification = () => {
    const newNotification = {
      alert: this.state.notification.alert,
      resolved: false,
      tel: this.currentUser.tel,
      userId: this.currentUser._id,
      username: this.currentUser.username
    };
    this.props.actions.create(newNotification).then(() => {
      this.loadNotifications();
    });
  }

  render() {
    let notificationsTemplate = null;
    let alertBtnTemplate = null;
    let activeNotifications = this.props.notifications.filter(notification => !notification.resolved);
    if (activeNotifications && activeNotifications.length) {
      notificationsTemplate = (<div className="container shadow">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Tel Number</th>
              <th>Message</th>
              <th>Resolved</th>
            </tr>
          </thead>

          <tbody>
            {this.props.notifications.map(item =>
              (
                <tr key={item._id}>
                  <td >{item.username}</td>
                  <td>{item.tel}</td>
                  <td>{item.alert}</td>
                  <td><input type="checkbox" checked={item.resolved} onChange={(event) => this.updateNotification(event, item)} /></td>
                </tr >
              )
            )}
          </tbody>
        </table>
      </div>
      )
    } else if (this.props.quote && this.props.quote.quote) {
      notificationsTemplate = (
        <blockquote>
          {this.props.quote.quote}
        </blockquote>)
    }

    if (this.currentUser && this.currentUser.role === 'patient')
      alertBtnTemplate = (
        <button type="button" className="btn btn-warning btn-lg alert-btn" data-toggle="modal" data-target="#myModal">
          <span className="glyphicon glyphicon-alert"></span>
          Create Alert
          </button>)

    return (
      <div className="container-fluid">

        <div>
          <div className="inlint-block-style">
            <h1>Hi {this.currentUser ? this.currentUser.firstName : ''}!</h1>
            <p>Hope you are doing good today!!</p>
          </div>
          {alertBtnTemplate}
        </div >
        {notificationsTemplate}
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title inline-style">Send Alert</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <form >
                  <div className="form-group">
                    <label htmlFor="alert">Message</label>
                    <textarea type="text" className="form-control" value={this.state.notification.alert}
                      onChange={this.notificationMsgChange}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.sendNotification}>Send</button>
              </div>
            </div>

          </div >
        </div >
      </div >
    );
  }
}

NotificationListPage.propTypes = {
  notifications: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  quote: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
    quote: state.quote
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      create: bindActionCreators(notificationActions.create, dispatch),
      update: bindActionCreators(notificationActions.update, dispatch),
      getByPatientId: bindActionCreators(notificationActions.getByPatientId, dispatch),
      getAll: bindActionCreators(notificationActions.getAll, dispatch),
      getQuote: bindActionCreators(quoteActions.getByPatientId, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationListPage);

