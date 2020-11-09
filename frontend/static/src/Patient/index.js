import React, { Component } from 'react';
import PrescriptionForm from './../Prescription';
import './index.css';
import Cookies from 'js-cookie';
// import Card from 'react-bootstrap/Card';
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



  render() {
    const prescription = this.props.prescription;
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
        <button type='button' onClick={()=> this.props.deleteMed(this.props.prescription)}>Delete</button>
        <button type='button' onClick={()=> this.props.editMed(this.props.prescription)}>Edit</button>

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
this.deleteMed = this.deleteMed.bind(this);
// this.editMed = this.editMed.bind(this);
  }



  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`/api/v1/patients/${id}/`)
    .then(response => response.json())
    .then(data => this.setState({...data}));
  }
  async deleteMed(prescription){

      const options = {
        method: 'DELETE',
        headers:{
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Content-Type': 'application/json'
        },
      }
      const handleError = (err) => console.warn(err);

      const response = await fetch(`/api/v1/patients/prescription/${prescription.id}/`, options)
     const data = await response.json().catch(handleError)
      const prescriptions = [...this.state.prescriptions]
      const index = prescriptions.indexOf(prescription)
      prescriptions.splice(index, 1)
      this.setState({prescriptions})

    }
    // async editMed(id) {
    //   event.preventDefault();
    //   let formData = new FormData();
    //
    //   const options = {
    //     method: 'PUT',
    //     headers: {
    //       'X-CSRFToken': Cookies.get('csrftoken'),
    //       'Content-Type': 'application/json'
    //     },
    //         body:formData,
    //   }
    //   const handleError = (err) => console.warn(err);
    //   const response = await fetch(`/api/v1/patients/prescription/${prescription.id}/`, options)
    //  const data = await response.json().catch(handleError)
    //  const index = prescriptions.findIndex(prescription => prescription.id === id);
    //  prescriptions[index] = updatedPrescription;
    // }

  render() {
    const prescriptions = this.state.prescriptions?.map(prescription => <Prescription prescription={prescription} deleteMed = {this.deleteMed}
      editMed = {this.editMed}/>)
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
