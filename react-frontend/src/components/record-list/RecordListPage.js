import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as userActions from "../../redux/actions/userActions";
import * as recordActions from "../../redux/actions/recordActions";
import { bindActionCreators } from "redux";

class RecordListPage extends React.Component {

  username;
  patientId;
  patientName;
  password;
  currentPatient = { firstName: '' };
  newRecord = {
    userId: '', username: '', pulseRate: '', bloodPressure: '',
    temprature: '', weight: '', comments: ''
  }

  componentDidMount() {
    this.loadRecords();
  }

  loadRecords = () => {
    this.patientId = this.props.match.params.patientId;    
    this.patientName = this.props.match.params.patientName;    
    this.props.actions.getByPatientId(this.props.match.params.patientId).catch(error => {
      alert("Fetch patients failed" + error);
    });
  }

  handleNameChange = (value) => {
    this.username = value.target.value;
  }

  handlePasswordChange = (value) => {
    this.password = value.target.value;
  }

  handleInputChange = (event, field) => {
    this.newRecord[field] = event.target.value;
  }

  createRecord = () => {
    this.newRecord.userId = this.patientId;
    this.newRecord.username = this.patientName;    
    this.props.actions.create(this.newRecord)
    .then(() => {
      this.loadRecords();
    })
    .catch(error => {
      alert("Create Record failed" + error);
    });
  }

  render() {
    const addReportBtnStyles = { float: 'right', marginTop: '15px' };
    const inlineStyle = { display: 'inline-block' };
    const shadowStyle = {boxShadow: "0 15px 20px rgba(0, 0, 0, 0.3)"}
    return (
      <div className="container-fluid">

        <h3 style={inlineStyle}>Reports of {this.patientName}</h3>
        <button type="button" className="btn btn-info btn-md" style={addReportBtnStyles} data-toggle="modal" data-target="#myModal">Add Report</button>

        <div className="container-fluid" style={shadowStyle}>
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
                  <h4 className="modal-title" style={inlineStyle}>Create Record</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="pulseRate">Pulserate</label>
                      <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, 'pulseRate')}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="bloodPressure">Bloodpressure</label>
                      <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, 'bloodPressure')}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="temprature">Temprature</label>
                      <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, 'temprature')}/>
                    </div>
                    <div className="form-group">1
                      <label htmlFor="weight">weight</label>
                      <input type="text" className="form-control" onChange={(event) => this.handleInputChange(event, 'weight')}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="comments">Comments</label>
                      <textarea type="text" className="form-control" onChange={(event) => this.handleInputChange(event, 'comments')}/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.createRecord}>Add</button>
                </div>
              </div>


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
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
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

