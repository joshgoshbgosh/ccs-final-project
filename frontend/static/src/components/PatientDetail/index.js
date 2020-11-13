import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
// // import Card from 'react-bootstrap/Card';
// class Prescription extends Component {       //this is displaying patient meds on display page
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       id: '',
//       brand_name:'',
//       medication_name: '',
//       directions:'',
//       quantity:'',
//       prescriber: '',
//       rx: '',
//       pharmacy_number:'',
//       isEditing: false,
//     }
//
//     this.handleInput = this.handleInput.bind(this);
//
//   }
//
//   handleInput(e) {
//     this.setState({[e.target.name]: e.target.value});
//   }
//
//   componentDidMount() {
//     console.log(this.props.prescription)
//     this.setState({...this.props.prescription});
//   }
//
//
//
//   render() {
//     // const prescription = this.props.prescription;
//     return(
//        <div className="med-display">
//
//         <div className='row'>
//         <div className='col-lg-3 col-xs-12'>
//         <div className="detail-display">{this.state.brand_name}</div>
//         {this.state.isEditing
//           ?
//           <React.Fragment>
//           <label htmlFor="brand_name">Brand Name</label>
//           <input type='text' id="brand_name" name="brand_name" value={this.state.brand_name} onChange={this.handleInput}/>
//
//           <label htmlFor="medication_name">Mecication Name</label>
//           <input type='text' id="medication_name" name="medication_name" value={this.state.medication_name} onChange={this.handleInput}/>
//
//           <label htmlFor="directions">Directions</label>
//           <input type='text' id="directions" name="directions" value={this.state.directions} onChange={this.handleInput}/>
//
//           <label htmlFor="quantity">Quantity</label>
//           <input type='text' id="quantity" name="quantity" value={this.state.quantity} onChange={this.handleInput}/>
//
//           <label htmlFor="medication_name">Prescriber</label>
//           <input type='text' id="prescriber" name="prescriber" value={this.state.prescriber} onChange={this.handleInput}/>
//
//           <label htmlFor="medication_name">RX</label>
//           <input type='text' id="rx" name="rx" value={this.state.rx} onChange={this.handleInput}/>
//
//           <label htmlFor="medication_name">Pharmacy_number Name</label>
//           <input type='text' id="pharmacy_number" name="pharmacy_number" value={this.state.pharmacy_number} onChange={this.handleInput}/>
//
//           <button type='button' onClick={()=> {this.setState({isEditing: false}); this.props.editMed(this.state)}}>Save</button>
//           </React.Fragment>
//
//           :
//           <React.Fragment>
//             <div>{this.state.medication_name}</div>
//             <div>{this.state.directions}</div>
//             <div>{this.state.quantity}</div>
//             <div>{this.state.prescriber}</div>
//             <div>{this.state.rx}</div>
//             <div>{this.state.pharmacy_number}</div>
//             <button type='button' onClick={() => this.setState({isEditing: true})}>Edit</button>
//             <button type='button' onClick={() => this.props.deleteMed(this.props.prescription)}>Delete</button>
//           </React.Fragment>
//         }
//         </div>
//         </div>
//       </div>
//     )
//   }
// }
class Prescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
      datetime: '',
      displayModal: false,
    }
    this.saveDose = this.saveDose.bind(this);
    this.removePrescription = this.removePrescription.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleError(err) {
    console.warn(err);
  }
  async saveDose() {
    const prescription_id = this.props.prescription.id
    const dose = {
      comments: this.state.comments,
      datetime: this.state.datetime,
      prescription: prescription_id,
    }
    const csrftoken = Cookies.get('csrftoken');
    const options = {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dose),
    };
    const response = await fetch(`/api/v1/user/patients/${prescription_id}/doses/`, options);
    const data = await response.json().catch(this.handleError);
    console.log(data);
    // that the data object that was returned and fire off a request to your twilio url (tied to a view)
    // the twilio url/view needs to fire off the text message

    this.setState({displayModal: false})
  }
  removePrescription(event){
  }
  render() {
    return(
      <div>
        <div>{this.props.prescription.medication_name}</div>
        {/*<Link className="nav-link" to={}>Edit</Link>*/}
        {/*<button className="btn btn-link" >Remove</button>*/}
        <button type="button" className="btn btn-link" >Remove</button>
        <Button variant="primary" onClick={() => this.setState({displayModal: true})}>Add Dose</Button>
        <Modal show={this.state.displayModal} onHide={() => this.setState({displayModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.prescription.medication_name.toUpperCase()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Date Time</Form.Label>
                <Form.Control type="datetime-local" placeholder="Select date" name="datetime" value={this.state.datetime} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="comments">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" rows={3} name="comments" value={this.state.comments} onChange={this.handleChange}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({displayModal: false})}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveDose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    // this.deleteMed = this.deleteMed.bind(this);
    // this.editMed = this.editMed.bind(this);
    this.fetchPatientDetail = this.fetchPatientDetail.bind(this);
  }
  componentDidMount() {
    this.fetchPatientDetail();
  }
  async fetchPatientDetail() {
    const id = this.props.match.params.id;
    const response = await fetch(`/api/v1/user/patients/${id}/`).catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    this.setState({...data});
    console.log(data);
  }
  // async deleteMed(prescription){
  //
  //     const options = {
  //       method: 'DELETE',
  //       headers:{
  //         'X-CSRFToken': Cookies.get('csrftoken'),
  //         'Content-Type': 'application/json'
  //       },
  //     }
  //     const handleError = (err) => console.warn(err);
  //
  //     const response = await fetch(`/api/v1/patients/prescription/${prescription.id}/`, options)
  //     const data = await response.json().catch(handleError);
  //     console.log('data', data);
  //     const prescriptions = [...this.state.prescriptions];
  //     const index = prescriptions.indexOf(prescription);
  //     prescriptions.splice(index, 1);
  //     this.setState({prescriptions});
  //
  //   }
  //
  //   async editMed(prescription) {
  //     console.log(prescription);
  //     // event.preventDefault();
  //     // console.log(!(prescription.label_image instanceof File));
  //
  //     if(!(prescription.label_image instanceof File)) {
  //       delete prescription.label_image;
  //     }
  //
  //
  //     const id = prescription.id;
  //     let formData = new FormData();
  //     const keys = Object.keys(prescription);
  //     keys.forEach(key => formData.append(key, prescription[key]));
  //
  //     const options = {
  //       method: 'PUT',
  //       headers: {
  //         'X-CSRFToken': Cookies.get('csrftoken'),
  //       },
  //           body:formData,
  //     }
  //     const handleError = (err) => console.warn(err);
  //     const response = await fetch(`/api/v1/patients/prescription/${id}/`, options);
  //     const data = await response.json().catch(handleError)
  //
  //     const prescriptions = [...this.state.prescriptions];
  //     const index = prescriptions.findIndex(prescription => prescription.id === id);
  //     prescriptions[index] = data;
  //     this.setState({prescriptions});
  //   }
  render() {
    const id = this.props.match.params.id;
    console.log(this.state.prescriptions)
    const prescriptions = this.state.prescriptions?.map(prescription => <Prescription key={prescription.id} prescription={prescription} />);
    return(
      <div>
        <div className="p_detail">
      
        <div className="fname">{this.state.first_name}</div>
        <div className="lname">{this.state.last_name}</div>
        <div className="lname">{this.state.date_of_birth}</div>
        <div className="lname">{this.state.height}</div>
        <div className="lname">{this.state.weight}</div>
        <div className="lname">{this.state.address}</div>
        <div className="lname">{this.state.gender}</div>
        <div className="lname">{this.state.medication_allergies}</div>
        <div className="lname">{this.state.food_allergies}</div>
        <div className="lname">{this.state.primary_doctor}</div>
        <div className="lname">{this.state.primary_doctor_telephone_number}</div>
        <div className="lname">{this.state.language}</div>
        <div className="lname">{this.state.bed_patient}</div>
        <div className="lname">{this.state.walking_devices}</div>
        <div className="lname">{this.state.able_to_walk_alone}</div>
        <div className="lname">{this.state.surgeries}</div>

        </div>
        <div className="meddisplay">
        <div className="medname">
        {prescriptions}
        </div>
        </div>
        <Link className="newmed nav-link" to={`/user/patients/${id}/prescriptions/add/`}>New Prescription</Link>
      </div>
    )
  }
}
export default PatientDetail;
