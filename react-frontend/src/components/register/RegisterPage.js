import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";
import { bindActionCreators } from "redux";
import { UserModel } from "../../models/UserModel";

class RegisterPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: new UserModel()
    }
  }

  handleInputChange = (event, field) => {
    const newUser = { ...this.state.user };
    newUser[field] = event.target.value;
    this.setState({ user: newUser });
  }

  register = () => {
    this.props.actions.register(
      this.state.user
    ).then(() => {
      this.props.history.push("/login")
    }).catch(error => {
      alert("Registering user failed" + error);
    });
  }

  componentDidMount() {
    if (this.props.loggedInUser && this.props.loggedInUser.token)
      this.props.history.push("/")
  }

  render() {
    return (
      <div className="container col-sm-6 shadow margin-login">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">FirstName</label>
            <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, "firstName")} />
          </div >
          <div className="form-group">
            <label htmlFor="lastName">LastName</label>
            <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, "lastName")} />
          </div >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, "username")} />
          </div >
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" onChange={(event) => this.handleInputChange(event, "password")} />
          </div >
          <div className="form-group">
            <label htmlFor="tel">Telephone</label>
            <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, "tel")} />
          </div >
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select className="form-control" onChange={(event) => this.handleInputChange(event, "role")}>
              <option value="''">Select User Category</option>
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </select>
          </div >
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.register}>
              <span className="glyphicon glyphicon-log-in"></span>
              Register
              </button>
              <a href="/login" className="btn btn-link">Login</a>
          </div >
        </form >
      </div >
    );
  }
}

RegisterPage.propTypes = {
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
      register: bindActionCreators(userActions.register, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
