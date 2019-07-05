import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as recordActions from "../../redux/actions/recordActions";
import { bindActionCreators } from "redux";
import { RecordModel } from '../../models/RecordModel'
import './RecordListPage.css';

class RecordListPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      record: new RecordModel(),
      patientId: '',
      patientName: ''
    }
  }

  componentDidMount() {
    this.loadRecords();
  }

  loadRecords = () => {
    this.setState({ patientId: this.props.match.params.patientId });
    this.setState({ patientName: this.props.match.params.patientName });
    this.props.actions.getByPatientId(this.props.match.params.patientId).catch(error => {
      alert("Fetch patients failed" + error);
    });
  }

  handleInputChange = (event, field) => {
    const newRecord = { ...this.state.record };
    newRecord[field] = event.target.value;
    this.setState({ record: newRecord });
  }

  createRecord = () => {
    const newRecord = { ...this.state.record };
    newRecord.userId = this.state.patientId;
    newRecord.username = this.state.patientName;
    this.setState({ record: newRecord });
    this.props.actions.create(newRecord)
      .then(() => {
        this.setState({ record: new RecordModel() });
        this.loadRecords();
      })
      .catch(error => {
        alert("Create Record failed" + error);
      });
  }

  render() {
    return (
      <div className="container-fluid">

        <h3 className="inline-style">Reports of {this.state.patientName}</h3>
        <button type="button" className="btn btn-info btn-md add-record-btn" data-toggle="modal" data-target="#myModal">Add Report</button>

        <div className="container-fluid shadow">
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
                  <h4 className="modal-title inline-style">Create Record</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="pulseRate">Pulserate</label>
                      <input type="text" className="form-control" value={this.state.record.pulseRate} onChange={(event) => this.handleInputChange(event, 'pulseRate')} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bloodPressure">Bloodpressure</label>
                      <input type="text" className="form-control" value={this.state.record.bloodPressure} onChange={(event) => this.handleInputChange(event, 'bloodPressure')} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="temprature">Temprature</label>
                      <input type="text" className="form-control" value={this.state.record.temprature} onChange={(event) => this.handleInputChange(event, 'temprature')} />
                    </div>
                    <div className="form-group">1
                      <label htmlFor="weight">weight</label>
                      <input type="text" className="form-control" value={this.state.record.weight} onChange={(event) => this.handleInputChange(event, 'weight')} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="comments">Comments</label>
                      <textarea type="text" className="form-control" value={this.state.record.comments} onChange={(event) => this.handleInputChange(event, 'comments')} />
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
  records: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    records: state.records
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      create: bindActionCreators(recordActions.create, dispatch),
      getByPatientId: bindActionCreators(recordActions.getByPatientId, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordListPage);

