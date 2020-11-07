import React, { Component } from 'react';
import PrescriptionForm from './../Prescription';
import './index.css';

class Prescription extends Component {       //this is displaying patient meds on display page
  constructor(props) {
    super(props);

    this.state = {
      brand_name:'',
      medication_name: '',
      directions:'',
      quantity:'',
      details:'',
      prescriber: '',
      rx: '',
      pharmacy_number:'',

    }
  }

  componentDidMount() {
    console.log(this.props.prescription)
    this.setState({...this.props.prescription});
  }
//   deletePatient(id) {
//     fetch(`/api/v1/patients/<int:user>/prescription/<int:pk>/`,{
//       method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(result => console.log('Celebrate:', result));
//   }
//
//   patient(data) {
//     console.log('data', data);
//     let html = '';
//     data.forEach(function(patient){
//       html += `<li><p>${prescription.detail}</p><button onclick=deletePatient('${prescription._id}')>Delete</button></li>`
//   })
// }


  render() {
    return(
      <div className="med-display">
        <div className='row'>
        <div className='col-lg-3 col-xs-12'>
        <div className="detail-display">{this.state.brand_name}</div>
        <div>{this.state.medication_name}</div>
        <div>{this.state.directions}</div>
        <div>{this.state.quantity}</div>
        <div>{this.state.details}</div>
        <div>{this.state.prescriber}</div>
        <div>{this.state.rx}</div>
        <div>{this.state.pharmacy_number}</div>
        </div>
        </div>
      </div>
    )
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
    const prescriptions = this.state.prescriptions?.map(prescription => <Prescription prescription={prescription}/>)
    return(
      <div>
        <div>{this.state.first_name}</div>
        <div>{this.state.last_name}</div>
        <div>{this.state.date_of_birth}</div>
        <div>{this.state.address}</div>
        <div>{this.state.height}</div>
        <div>{this.state.weight}</div>
        <div>{this.state.food_allergies}</div>
        <div>{this.state.medication_allergies}</div>
        <div>{this.state.primary_doctor}</div>
        <div>{this.state.primary_doctor_telephone_number}</div>
        <div>{this.state.language}</div>
        <div>{this.state.bed_patient}</div>
        <div>{this.state.walking_devices}</div>
        <div>{this.state.able_to_walk_alone}</div>
        <div>{this.state.surgeries}</div>
        {prescriptions}
        <PrescriptionForm patientID={this.state.id}/>
      </div>
    )
  }
}

export default PatientDetail;
