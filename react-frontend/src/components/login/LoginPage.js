import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";

class LoginPage extends React.Component {

  username;
  password;

  login = () => {
    this.props.actions.loginUser({ username: this.username, password: this.password }).catch(error => {
      alert("Login failed" + error);
    });
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedInUser && this.props.loggedInUser.token && (prevProps !== prevState))
      this.props.history.push("/")
  }

  handleNameChange = (value) => {
    this.username = value.target.value;
  }

  handlePasswordChange = (value) => {
    this.password = value.target.value;
  }

  render() {
    return (
      <div className="container col-sm-6 shadow margin-login">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" onChange={this.handleNameChange} />
          </div >
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" onChange={this.handlePasswordChange} />
          </div >
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.login}>
              <span className="glyphicon glyphicon-log-in"></span>
              Login
              </button>
            <a href="/register" className="btn btn-link">Register</a>
          </div >
        </form >
      </div >
    );
  }
}

LoginPage.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.users.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loginUser: bindActionCreators(userActions.loginUser, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
