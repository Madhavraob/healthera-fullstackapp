import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";
import * as quoteActions from "../../redux/actions/quoteActions";
import { bindActionCreators } from "redux";
import { QuoteModel } from "../../models/QuoteModel";

class PatientListPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      quote: new QuoteModel()
    }
  }

  componentDidMount() {
    this.props.actions.getAllPatients().catch(error => {
      alert("Fetch patients failed" + error);
    });

  }

  setCurrentPatient = (patient) => {
    this.setState({ quote: { userId: patient._id, username: patient.firstName, quote: '' } })
  }

  handleInputChange = (event, field) => {
    const newQuote = this.state.quote;
    newQuote[field] = event.target.value;
    this.setState({ quote: newQuote });
  }


  sendQuote = () => {
    this.props.actions.create(this.state.quote).catch(error => {
      alert("Create Record failed" + error);
    });
  }

  getReports = (patient) => {
    this.props.history.push(`/reports/${patient._id}/${patient.firstName}`)
  }

  render() {
    return (
      <div className="container col-sm-6">

        <h3>All Patients:</h3>

        <div className="container shadow">
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
              {this.props.users.patients.map(patient =>
                (
                  <tr key={patient._id}>
                    <td onClick={() => this.getReports(patient)}>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.tel}</td>
                    <td>
                      <button type="button" className="btn btn-info btn-sm"
                        data-toggle="modal" data-target="#myModal"
                        onClick={() => this.setCurrentPatient(patient)}>
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
                  <h4 className="modal-title inline-style">Send Quote to {this.state.quote.username}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="quote">Quote</label>
                      <textarea type="text" className="form-control" value={this.state.quote.quote} onChange={(event) => this.handleInputChange(event, 'quote')} />
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
      create: bindActionCreators(quoteActions.create, dispatch),
      getAllPatients: bindActionCreators(userActions.getAllPatients, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientListPage);

