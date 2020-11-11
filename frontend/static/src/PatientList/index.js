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
      <div className="left">
      {patients}
      </div>
        <div className="row box">
        <div className="col-lg-6 col-xs-12">

        <div className="plist_font_awesome">

          <i class="one fas fa-circle"></i>

          <i class="two fas fa-circle"></i>

          <i class="three fas fa-circle"></i>

          <i class="four fas fa-circle"></i>

        </div>

        <div>
        <a className="plist_home"href="http://localhost:3000/menu">HOME</a>
        </div>
        </div>
        </div>
      </React.Fragment>
    )
  }
}


export default PatientList;
