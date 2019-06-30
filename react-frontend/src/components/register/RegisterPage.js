import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";
import { bindActionCreators } from "redux";

class RegisterPage extends React.Component {

  firstName;
  lastName;
  username;
  password;
  tel;
  role;

  register = (event) => {
    this.props.actions.register(
      {
        firstName: this.firstName, lastName: this.lastName,
        username: this.username, password: this.password,
        tel: this.tel, role: this.role
      }).then(res => {
        this.props.history.push("/login")
      }).catch(error => {
        alert("Registering user failed" + error);
      });
  }

  componentDidMount() {
    if (this.props.loggedInUser && this.props.loggedInUser.token)
      this.props.history.push("/")
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.loggedInUser && this.props.loggedInUser.token)
  //     this.props.history.push("/")
  // }

  handleFNameChange = (value) => {
    this.firstName = value.target.value;
  }
  handleLNameChange = (value) => {
    this.lastName = value.target.value;
  }
  handleUNameChange = (value) => {
    this.username = value.target.value;
  }
  handlePasswordChange = (value) => {
    this.password = value.target.value;
  }
  handleTelChange = (value) => {
    this.tel = value.target.value;
  }
  handleRoleChange = (value) => {
    this.role = value.target.value;
  }

  render() {
    return (
      <div className="container col-sm-6">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">FirstName</label>
            <input type="text" className="form-control" onChange={(event) => this.handleFNameChange(event)} />
          </div >
          <div className="form-group">
            <label htmlFor="lastName">LastName</label>
            <input type="text" className="form-control" onChange={(event) => this.handleLNameChange(event)} />
          </div >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" onChange={(event) => this.handleUNameChange(event)} />
          </div >
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" onChange={(event) => this.handlePasswordChange(event)} />
          </div >
          <div className="form-group">
            <label htmlFor="tel">Telephone</label>
            <input type="text" className="form-control" onChange={(event) => this.handleTelChange(event)} />
          </div >
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select className="form-control" onChange={(event) => this.handleRoleChange(event)}>
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </select>
          </div >
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.register}>
              <span className="glyphicon glyphicon-log-in"></span>
              Register
              </button>
            {/* <img className="pl-3" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> */}
            {/* <a href="/register" className="btn btn-link">Register</a> */}
          </div >
        </form >
      </div >
    );
  }
}

RegisterPage.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.users.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      register: bindActionCreators(userActions.register, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
