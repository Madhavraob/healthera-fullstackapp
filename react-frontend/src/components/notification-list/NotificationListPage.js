import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";
import * as notificationActions from "../../redux/actions/notificationActions";
import { bindActionCreators } from "redux";

class NotificationListPage extends React.Component {

  username;
  password;
  currentPatient;
  notificationMsg = '';
  currentUser;

  componentDidMount() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadNotifications();
  }

  loadNotifications = () => {
    if (this.currentUser.role === 'patient') {
      this.props.actions.getByPatientId(this.currentUser._id).catch(error => {
        alert("Fetch patients failed" + error);
      });
    } else {
      this.props.actions.getAll().catch(error => {
        alert("Fetch patients failed" + error);
      });
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.users.loggedInUser && this.props.users.loggedInUser.token)
  //     this.props.history.push("/")
  // }

  // handleSubmit = () =>
  handleNameChange = (value) => {
    this.username = value.target.value;
  }

  updateNotification = (value, _id) => {
    const updatedNotification = this.props.notifications.find(notification => notification._id === _id);
    updatedNotification.resolved = !updatedNotification.resolved;
    this.props.actions.update(updatedNotification).then(() => {
      this.loadNotifications();
    });
  }

  notificationMsgChange = (event) => {
    this.notificationMsg = event.target.value;
  }

  sendNotification = () => {
    debugger
    let currentUserLocal = JSON.parse(localStorage.getItem('currentUser'));
    const newNotification = {
      alert: this.notificationMsg,
      resolved: false,
      tel: currentUserLocal.tel,
      userId: currentUserLocal._id,
      username: currentUserLocal.firstName
    };
    this.props.actions.create(newNotification).then(() => {
      this.loadNotifications();
    });
  }

  render() {
    // const style = "box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3);"
    const bottonStyle = { float: 'right', 'marginTop': '22px' };
    const messageStyle = { display: 'inline-block' };
    const sendAlert = { display: 'inline' };
    return (
      <div className="container-fluid">

        <div>
          <div style={messageStyle}>
            <h1>Hi {this.props.users.loggedInUser.firstName}!</h1>
            <p>Hope you are doing good today!!</p>
          </div>
          <button type="button" className="btn btn-warning btn-lg" style={bottonStyle} data-toggle="modal" data-target="#myModal">
            <span className="glyphicon glyphicon-alert"></span>
            Create Alert
          </button>
        </div >

        <div className="container">
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
                    <td><input type="checkbox" checked={item.resolved} onChange={(event) => this.updateNotification(event, item._id)} /></td>
                  </tr >
                )
              )}
            </tbody>
          </table>
        </div>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" style={sendAlert}>Send Alert</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <form >
                  <div className="form-group">
                    <label htmlFor="alert">Message</label>
                    <textarea type="text" className="form-control" onChange={this.notificationMsgChange}></textarea>
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
  users: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getAllPatients: bindActionCreators(userActions.getAllPatients, dispatch),
      create: bindActionCreators(notificationActions.create, dispatch),
      update: bindActionCreators(notificationActions.update, dispatch),
      getByPatientId: bindActionCreators(notificationActions.getByPatientId, dispatch),
      getAll: bindActionCreators(notificationActions.getAll, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationListPage);

