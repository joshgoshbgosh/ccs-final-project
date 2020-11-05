import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Card from 'react-bootstrap/Card';
import './index.css';

import {Link} from 'react-router-dom';

class PatientCard extends Component {
  render() {
    const patient = this.props.patient;
    return(
      <Link to={`/patient/${patient.id}`}>
      
      <Card>
        <Card.Img variant="top" src={patient.image}/>
        <Card.Body>
          <Card.Title>{`${patient.first_name.toUpperCase()} ${patient.last_name.toUpperCase()}`}</Card.Title>
        </Card.Body>
      </Card>
      </Link>
    )
  }
}


class PatientList extends Component {

  componentDidMount() {
    console.log('here');
    if(!this.props.patientList.length) {
      this.props.fetchPatientList();
    }
  }

  render() {

    const patients = this.props.patientList.map(patient => <PatientCard key={patient.id} patient={patient}/>);
    return(
      <React.Fragment>
        {patients}
      </React.Fragment>
    )
  }
}


export default PatientList;
