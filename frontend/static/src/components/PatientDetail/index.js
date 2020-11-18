import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Button, Modal, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './index.css';
import PatientForm from './../PatientForm';
class PrescriptionPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
      datetime: '',
      displayModal: false,
    }
    this.saveDose = this.saveDose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleError(err) {
    console.warn(err)
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
    render() {
      return(
      <li class="list-group-item d-flex align-items-baseline">
        <p>{this.props.prescription.medication_name}</p>
        <button onClick={() => this.setState({displayModal: true})} className="btn btn-link ml-auto" type="button">Record</button>
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
        <Link className="newmed nav-link" to={`/prescription/${this.props.prescription.id}`}>Edit</Link>
        <button className="btn btn-link" type="button" onClick={() => this.props.removePrescription(this.props.prescription)}>Remove</button>
      </li>
    )
  }
}
class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      first_name: '',
      last_name: '',
      city: '',
      state: '',
      image:null,
      availableCaregivers: [],
      displayModal: false,
    }
    this.fetchPatientDetail = this.fetchPatientDetail.bind(this);
    this.removePrescription = this.removePrescription.bind(this);
    // this.editPrescription = this.editPrescription.bind(this);
    this.fetchCargivers = this.fetchCaregivers.bind(this);
    this.removeCaregiver = this.removeCaregiver.bind(this);
    this.addCaregiver = this.addCaregiver.bind(this);
  }

  async fetchCaregivers() {
    const id = Number(this.props.match.params.id);
    const response = await fetch(`/api/v1/user/patients/caregivers/`).catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    console.log(data);
    const availableCaregivers = data.filter(caregiver => !caregiver.patients.includes(id))
    this.setState({availableCaregivers});
    // console.log(data);
  }

  async removeCaregiver(caregiver) {
    const csrftoken = Cookies.get('csrftoken');
    let caregivers = [...this.state.caregivers];
    const index = caregivers.indexOf(caregiver);
    caregivers.splice(index, 1);
    this.setState({caregivers});

    // const options = {
    //     method: 'PATCH',
    //     headers: {
    //       'X-CSRFToken': csrftoken,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({caregivers: caregivers}),
    // };
    // const response = await fetch(`/api/v1/user/patients/${this.state.id}/`, options).catch(this.handleError);
    // await response.json().catch(this.handleError);

  }

  async addCaregiver(caregiver) {
    const csrftoken = Cookies.get('csrftoken');
    let caregivers = [...this.state.caregivers];
    caregivers.push(caregiver);

    let availableCaregivers = [...this.state.availableCaregivers];
    const index = availableCaregivers.indexOf(caregiver);
    availableCaregivers.splice(index, 1);
    this.setState({caregivers, availableCaregivers});
    // const options = {
    //     method: 'PATCH',
    //     headers: {
    //       'X-CSRFToken': csrftoken,
    //       'Content-Type': 'application/json',
    //     },
    //       body: JSON.stringify({caregivers: caregivers}),
    // };
    // const response = await fetch(`/api/v1/user/patients/${this.state.id}/`, options);
    // const data = await response.json().catch(this.handleError);
    // console.log(data);

  }
  componentDidMount() {
    this.fetchPatientDetail();
    this.fetchCaregivers();
  }
  // async editPrescription(prescription) {
  //   console.log(prescription);
  //   // event.preventDefault();
  //   // console.log(!(prescription.label_image instanceof File));
  //
  //   if(!(prescription.label_image instanceof File)) {
  //     delete prescription.label_image;
  //   }
  //
  //   const id = prescription.id;
  //   let formData = new FormData();
  //   const keys = Object.keys(prescription);
  //   keys.forEach(key => formData.append(key, prescription[key]));
  //
  //   const options = {
  //     method: 'PUT',
  //     headers: {
  //       'X-CSRFToken': Cookies.get('csrftoken'),
  //     },
  //         body:formData,
  //   }
  //   const handleError = (err) => console.warn(err);
  //   const response = await fetch(`/api/v1/user/patients/prescription/${id}/`, options);
  //   const data = await response.json().catch(handleError)
  //
  //   const prescriptions = [...this.state.prescriptions];
  //   const index = prescriptions.findIndex(prescription => prescription.id === id);
  //   prescriptions[index] = data;
  //   this.setState({prescriptions});
  // }
  async removePrescription(prescription){
    const options = {
          method: 'DELETE',
          headers:{
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'application/json'
          },
        }
        const handleError = (err) => console.warn(err);
        const response = await fetch(`/api/v1/user/patients/prescriptions/${prescription.id}/`, options)
        const data = await response.json().catch(handleError);
        console.log('data', data);
        const prescriptions = [...this.state.prescriptions];
        const index = prescriptions.indexOf(prescription);
        prescriptions.splice(index, 1);
        this.setState({prescriptions});
      }
  async fetchPatientDetail() {
    const id = this.props.match.params.id;
    const response = await fetch(`/api/v1/user/patients/${id}/`).catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    this.setState({...data});
    console.log(data);
  }
  // saveEdit(data) {
  //   this.setState({isEditing: false, ...data});
  // }
  render() {
    const id = this.props.match.params.id;
    const prescriptions = this.state.prescriptions?.map(prescription => <PrescriptionPreview key={prescription.id} prescription={prescription} removePrescription={this.removePrescription} editPrescription={this.editPrescription}/>);
    const caregivers = this.state.caregivers?.map(caregiver => (
      <div key={caregiver.id}>
        <p>{caregiver.username}</p>
        <button type="button" onClick={() => this.removeCaregiver(caregiver)}>Remove</button>
      </div>
    ))

    const availableCaregivers = this.state.availableCaregivers?.map(caregiver => (
      <div key={caregiver.id}>
        <p>{caregiver.username}</p>
        <button type="button" onClick={() => this.addCaregiver(caregiver)}>Add</button>
      </div>
    ))


    return(
      <React.Fragment>
        <div className="row">
          {this.state.isEditing
          ?
          <div className="col-8">
            <PatientForm {...this.state} saveEdit={this.saveEdit} />
          </div>
          :
          <React.Fragment>
          <div className="col-md-7 col-12">
            <img src= {this.state.image} alt="" width="300" className="rounded-circle mb-3"/>
            <Link className="newmed nav-link" to={`/user/patients/edit/${id}`}>Edit Patient</Link>
            <Link className="newmed nav-link" to={`/user/patients/${id}/prescriptions/add/`}>Add New Prescription</Link>
            <Link className="newmed nav-link" to={`/user/medicationHistory/${id}`}>View Prescription History</Link>

            <div className="table-responsive">
            <table className="table table-user-information">
                <tbody>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Name
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.first_name} {this.state.last_name}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Address
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.address}<br/>
                            {this.state.city}, {this.state.state}  {this.state.zipcode}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Date of Birth
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.date_of_birth}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Weight
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.weight}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Height
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.height}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Gender
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.gender}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Food allergies
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.food_allergies}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Medication allergies
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.medication_allergies}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Primary doctor
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.primary_doctor}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Primary docotor's telephone number
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.primary_doctor_telephone_number}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Primary language
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.language}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Bed patient
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.is_bed_patient ? 'YES' : 'NO'}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Needs assitance walking
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.needs_walking_device ? 'YES' : 'NO'}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Walking devices
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.walking_devices}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>
                                Surgeries
                            </strong>
                        </td>
                        <td className="text-primary">
                            {this.state.surgeries}<br/>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
            <ul className="col-md-5 col-12 list-group list-group-flush">
              {prescriptions}
            </ul>

            <ul className="col-md-5 col-12 list-group list-group-flush">


            <li class="list-group-item d-flex align-items-baseline">

              <button onClick={() => this.setState({displayModal: true})} className="btn btn-link ml-auto" type="button">Add Caregiver</button>
              <Modal show={this.state.displayModal} onHide={() => this.setState({displayModal: false})}>
                <Modal.Header closeButton>
                  <Modal.Title>Search Caregivers Below</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {availableCaregivers}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.setState({displayModal: false})}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {caregivers}
            </li>





















              {caregivers}
            </ul>
          </React.Fragment>
          }
        </div>
      </React.Fragment>
    )
  }
}
export default PatientDetail;
