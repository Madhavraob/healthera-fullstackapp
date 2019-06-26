import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";
import * as recordActions from "../../redux/actions/recordActions";
import { bindActionCreators } from "redux";

class RecordListPage extends React.Component {

  username;
  password;
  currentPatient = { firstName: '' };

  componentDidMount() {
    this.props.actions.getByPatientId('5caf28e2e917e108a4bc4fad').catch(error => {
      alert("Fetch patients failed" + error);
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.loggedInUser && this.props.loggedInUser.token)
  //     this.props.history.push("/")
  // }

  // handleSubmit = () =>
  handleNameChange = (value) => {
    this.username = value.target.value;
  }

  handlePasswordChange = (value) => {
    this.password = value.target.value;
  }

  render() {
    // const style = "box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3);"
    return (
      <div className="container col-sm-6">

        <h3>All Patients:</h3>

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>PulseRate</th>
                <th>BloodPressure</th>
                <th>Temprature</th>
                <th>Weight</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {this.props.records.map(item =>
                (
                  <tr key={item._id}>
                    <td >{item.pulseRate}</td>
                    <td>{item.bloodPressure}</td>
                    <td>{item.temprature}</td>
                    <td>{item.weight}</td>
                    <td>{item.comments}</td>
                  </tr >
                )
              )}
            </tbody>
          </table>
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title inline">Send Quote to {this.currentPatient.firstName}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="quote">Quote</label>
                      <textarea type="text" className="form-control" ></textarea>
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

RecordListPage.propTypes = {
  users: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    records: state.records
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getAllPatients: bindActionCreators(userActions.getAllPatients, dispatch),
      create: bindActionCreators(recordActions.create, dispatch),
      getByPatientId: bindActionCreators(recordActions.getByPatientId, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordListPage);

