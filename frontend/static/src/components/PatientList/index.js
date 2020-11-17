import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './index.css';
import {Link} from 'react-router-dom';
class PatientCard extends Component {
  render() {
    const patient = this.props.patient;
    return(
      <Link to={`/user/patients/${patient.id}`}>
        <Card>
          <Card.Img variant="top" src={patient.image}/>
          <Card.Body>
            <Card.Title>{`${patient.first_name.toUpperCase()}  ${patient.last_name.toUpperCase()}`}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    )
  }
}
class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: [],
    }
    this.fetchPatientList = this.fetchPatientList.bind(this);
  }
  componentDidMount() {
    this.fetchPatientList();
  }
  async fetchPatientList() {
    const response = await fetch('/api/v1/user/patients/').catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    this.setState({patientList: data});
  }
  render() {
    // console.log(this.props.patientList)
    const patients = this.state.patientList.map(patient => <PatientCard key={patient.id} patient={patient}/>);
    return(
      <div id="patient-list">
      <div className="top_bar col-lg-12 col-xs-12 ">
      <p className="list-label">PATIENT LIST</p>

      </div>

        {patients}
        <div className="bottom_bar col-lg-12 col-xs-12 ">
        </div>
      </div>
    )
  }
}
export default PatientList;
