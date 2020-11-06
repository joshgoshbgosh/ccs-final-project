import React, { Component } from 'react';
import Prescription from './../Prescription';

class PatientDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }
  deletePatient(id) {
    fetch(`api/v1/patients/${id}/`,{
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => console.log('Celebrate:', result));
  }

  function buildHTML(data) {
    console.log('data', data);
    let html = '';
    data.forEach(function(patient){
      html += `<li><p>${patient.detail}</p><button onclick=deletePatient('${patient._id}')>Delete</button></li>`
  })
}


  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`/api/v1/patients/${id}/`)
    .then(response => response.json())
    .then(data => this.setState({...data}));
  }

  render() {
    return(
      <div>
        <div>{this.state.first_name}</div>
        <div>{this.state.last_name}</div>
        <div>{this.state.address}</div>
        <Prescription patientID={this.state.id}/>
      </div>
    )
  }
}

export default PatientDetail;
