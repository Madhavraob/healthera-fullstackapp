import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";
import * as quoteActions from "../../redux/actions/quoteActions";
import { bindActionCreators } from "redux";

class PatientListPage extends React.Component {

  username;
  password;
  currentPatient = { firstName: '' };
  quote = { userId: '', username: '', quote: '' }

  componentDidMount() {
    this.props.actions.getAllPatients().catch(error => {
      alert("Fetch patients failed" + error);
    });

  }

  handleNameChange = (value) => {
    this.username = value.target.value;
  }

  handlePasswordChange = (value) => {
    this.password = value.target.value;
  }

  setCurrentPatient = (patient) => {
    this.quote.userId = patient._id;
    this.quote.username = patient.firstName;
    this.quote.quote = '';
  }

  handleInputChange = (event, field) => {
    this.quote[field] = event.target.value;
  }


  sendQuote = () => {
    this.props.actions.create(this.quote).catch(error => {
      alert("Create Record failed" + error);
    });
  }

  getReports = (patient) => {
    this.props.history.push(`/reports/${patient._id}/${patient.firstName}`)
  }

  render() {
    const styleShadow = {boxShadow: "0 15px 20px rgba(0, 0, 0, 0.3)"};
    const inlineStyle = {display: "inline"};
    return (
      <div className="container col-sm-6">

        <h3>All Patients:</h3>

        <div className="container" style={styleShadow}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Tel Number</th>
                <th>Send Quote</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.patients.map(item =>
                (
                  <tr key={item._id}>
                    <td onClick={() => this.getReports(item)}>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.tel}</td>
                    <td>
                      <button type="button" className="btn btn-info btn-sm"
                        data-toggle="modal" data-target="#myModal"
                        onClick={() => this.setCurrentPatient(item)}>
                        <span className="glyphicon glyphicon-envelope"></span>
                      </button>
                    </td >
                  </tr >
                )
              )}
            </tbody>
          </table>
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title inline" style={inlineStyle}>Send Quote to {this.quote.username}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="quote">Quote</label>
                      <textarea type="text" className="form-control" onChange={(event) => this.handleInputChange(event, 'quote')} />
                    </div>
                  </form>
                </div >
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.sendQuote}>Send</button>
                </div >
              </div >

            </div >
          </div >
        </div>
      </div >
    );
  }
}

PatientListPage.propTypes = {
  users: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      // loginUser: bindActionCreators(userActions.loginUser, dispatch),
      create: bindActionCreators(quoteActions.create, dispatch),
      getAllPatients: bindActionCreators(userActions.getAllPatients, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientListPage);

