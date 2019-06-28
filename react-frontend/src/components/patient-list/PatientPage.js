import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './patient.css';

class PatientPage extends React.Component {
  constructor(props) {
    super(props)
  }

  newQuote = {
    userId: '', username: '', quote: ''
  };

  handleInputChange = (event, field) => {
    this.newQuote[field] = event.target.value;
  }

  preFillQuote = (user) => {
    this.newQuote.userId = user._id;
    this.newQuote.username = user.username;
  }

  sendQuote = () => {
    debugger
    // this.newQuote.quote = this.patientName;    
    this.props.actions.create(this.newQuote).catch(error => {
      alert("Create Record failed" + error);
    });
  }

  render() {
    const user = this.props.item;
    return (
      // <div>
      <tr>
        <td onClick={this.getUserDetails}>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.tel}</td>
        <td>
          <button type="button" className="btn btn-info btn-sm"
            data-toggle="modal" data-target="#myModal"
            onClick={this.preFillQuote(user)}>
            <span className="glyphicon glyphicon-envelope"></span>
          </button>

          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title inline">Send Quote to {user.firstName}</h4>
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
        </td >
      </tr >

      // </div>
    )
  }
}

PatientPage.propTypes = {
  item: PropTypes.object
};

export default PatientPage;
