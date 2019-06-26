import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router'

class Header extends React.Component {
  activeStyle = { color: "#F15B2A" };
  currentUser = localStorage.getItem('currentUser');

  constructor(props) {
    super(props)
  }
  logout = () => {
    localStorage.removeItem('currentUser');
    this.props.history.push("/login");
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">HealthCare</a>
          </div>
          <ul className="nav navbar-nav">
            <li><a href="/">
              <span className="glyphicon glyphicon-home"></span>
              Home</a></li>
            <li hidden={!(this.currentUser && this.currentUser.role === 'nurse')}>
              <a href="/patient-list">
                <span className="glyphicon glyphicon-user"></span>
                Patients</a></li>
            <li hidden={!(this.currentUser && this.currentUser.role === 'patient')}>
              <a href={'/patient/' + (this.currentUser ? this.currentUser._id : '')}>
                <span className="glyphicon glyphicon-paste"></span>
                Reports</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li onClick={this.logout}><a><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }

}

export default withRouter(Header);
