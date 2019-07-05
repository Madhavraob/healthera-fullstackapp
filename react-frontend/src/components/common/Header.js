import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router'

class Header extends React.Component {

  currentUser;

  constructor(props) {
    super(props)
  }

  logout = () => {
    localStorage.removeItem('currentUser');
    this.props.history.push("/login");
  }

  render() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isPatient = this.currentUser && this.currentUser.role === 'patient';
    let header;
    if (isPatient) {
      header = (<li>
        <a href={'/reports/' + (this.currentUser ? (this.currentUser._id + '/' + this.currentUser.firstName) : '')}>
          <span className="glyphicon glyphicon-paste"></span>
          Reports</a></li>)
    } else {
      header = (<li>
        <a href="/patient-list">
          <span className="glyphicon glyphicon-user"></span>
          Patients</a></li>);
    }

    if (this.currentUser) {
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
              {header}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li onClick={this.logout}><a><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return null;
    }
  }

}

Header.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
