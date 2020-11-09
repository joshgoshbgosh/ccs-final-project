import React, { Component } from 'react';
import PrescriptionForm from './../Prescription';
import './index.css';
import Cookies from 'js-cookie';
// import Card from 'react-bootstrap/Card';
class Prescription extends Component {       //this is displaying patient meds on display page
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      brand_name:'',
      medication_name: '',
      directions:'',
      quantity:'',
      prescriber: '',
      rx: '',
      pharmacy_number:'',
      isEditing: false,
    }

    this.handleInput = this.handleInput.bind(this);

  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
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
        {this.state.isEditing
          ?
          <React.Fragment>
          <label htmlFor="brand_name">Brand Name</label>
          <input type='text' id="brand_name" name="brand_name" value={this.state.brand_name} onChange={this.handleInput}/>

          <label htmlFor="medication_name">Mecication Name</label>
          <input type='text' id="medication_name" name="medication_name" value={this.state.medication_name} onChange={this.handleInput}/>

          <label htmlFor="directions">Directions</label>
          <input type='text' id="directions" name="directions" value={this.state.directions} onChange={this.handleInput}/>

          <label htmlFor="quantity">Quantity</label>
          <input type='text' id="quantity" name="quantity" value={this.state.quantity} onChange={this.handleInput}/>

          <label htmlFor="medication_name">Prescriber</label>
          <input type='text' id="prescriber" name="prescriber" value={this.state.prescriber} onChange={this.handleInput}/>

          <label htmlFor="medication_name">RX</label>
          <input type='text' id="rx" name="rx" value={this.state.rx} onChange={this.handleInput}/>

          <label htmlFor="medication_name">Pharmacy_number Name</label>
          <input type='text' id="pharmacy_number" name="pharmacy_number" value={this.state.pharmacy_number} onChange={this.handleInput}/>

          <button type='button' onClick={()=> {this.setState({isEditing: false}); this.props.editMed(this.state)}}>Save</button>
          </React.Fragment>

          :
          <React.Fragment>
            <div>{this.state.medication_name}</div>
            <div>{this.state.directions}</div>
            <div>{this.state.quantity}</div>
            <div>{this.state.prescriber}</div>
            <div>{this.state.rx}</div>
            <div>{this.state.pharmacy_number}</div>
            <button type='button' onClick={() => this.setState({isEditing: true})}>Edit</button>
            <button type='button' onClick={() => this.props.deleteMed(this.props.prescription)}>Delete</button>
          </React.Fragment>
        }
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
  this.editMed = this.editMed.bind(this);
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
     const data = await response.json().catch(handleError);
      const prescriptions = [...this.state.prescriptions];
      const index = prescriptions.indexOf(prescription);
      prescriptions.splice(index, 1);
      this.setState({prescriptions});

    }

    async editMed(prescription) {
      console.log(prescription);
      // event.preventDefault();
      // console.log(!(prescription.label_image instanceof File));

      if(!(prescription.label_image instanceof File)) {
        delete prescription.label_image;
      }


      const id = prescription.id;
      let formData = new FormData();
      const keys = Object.keys(prescription);
      keys.forEach(key => formData.append(key, prescription[key]));

      const options = {
        method: 'PUT',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
            body:formData,
      }
      const handleError = (err) => console.warn(err);
      const response = await fetch(`/api/v1/patients/prescription/${id}/`, options);
      const data = await response.json().catch(handleError)

      const prescriptions = [...this.state.prescriptions];
      const index = prescriptions.findIndex(prescription => prescription.id === id);
      prescriptions[index] = data;
      this.setState({prescriptions});
    }

  render() {
    const prescriptions = this.state.prescriptions?.map(prescription => <Prescription prescription={prescription} deleteMed = {this.deleteMed} editMed = {this.editMed}/>)
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
