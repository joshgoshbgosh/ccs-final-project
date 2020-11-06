import React, { Component } from 'react';
import PrescriptionForm from './../Prescription';


class Prescription extends Component {
  render() {
    return(<div>I am a presc</div>)
  }
}

class PatientDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }



  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`/api/v1/patients/${id}/`)
    .then(response => response.json())
    .then(data => this.setState({...data}));
  }

  render() {
    const prescriptions = this.state.prescriptions?.map(prescription => <Prescription />)
    return(
      <div>
        <div>{this.state.first_name}</div>
        <div>{this.state.last_name}</div>
        <div>{this.state.address}</div>
        {prescriptions}
        <PrescriptionForm patientID={this.state.id}/>

      </div>
    )
  }
}

export default PatientDetail;
