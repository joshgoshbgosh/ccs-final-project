import React, { Component } from 'react';
import Cookies from 'js-cookie';
class PatientForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name:'',
      address:'',
      city: '',
      state: '',
      zipcode: '',
      date_of_birth: '',
      weight: '',
      gender: '',
      food_allergies:'',
      medication_allergies:'',
      primary_doctor:'',
      primary_doctor_telephone_number:'',
      language:'',
      is_bed_patient: false,
      needs_walking_device: false,
      walking_devices: '',
      surgeries:'',
      image: null,
      preview: '',
      feet: "Select",
      inches: "Select",
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }
  async saveEdit(event) {
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    // shallow copy of state
    const patient = {...this.state};
    patient.height = `${this.state.feet}' ${this.state.inches}"`;
    // remove walking device if one is not selected
    if(!patient.needs_walking_device) {
      delete patient.walking_devices
      delete patient.needs_walking_devices
    }
    if(typeof(patient.image) === 'string' ) {
      delete patient.image;
    }
    if(!patient.is_bed_patient) {
      delete patient.is_bed_patient
    }
    if(!patient.food_allergies) {
      delete patient.food_allergies
    }
    if(!patient.medication_allergies) {
      delete patient.medication_allergies
    }
    if(!patient.surgeries) {
      delete patient.surgeries
    }
    // remove image if one is not selected
    if(!patient.image) {
      delete patient.label_image;
    }
    delete patient.feet;
    delete patient.inches;
    // console.log(patient.height);
    const formData = new FormData();
    const keys = Object.keys(patient);
    keys.forEach(key => formData.append(key, this.state[key]));
    const options = {
        method: 'PATCH',
        headers: {
          'X-CSRFToken': csrftoken,
        },
        body: formData,
    };
    const response = await fetch(`/api/v1/user/patients/${patient.id}/`, options).catch(this.handleError);
    await response.json().catch(this.handleError);
    this.props.history.push(`/user/patients/${patient.id}`);
  }
  handleImage(event) {
    // The selected files' are returned by the element's HTMLInputElement.files property — this returns a FileList object, which contains a list of File objects
    let file = event.target.files[0];
    // we'll use this value when we save the image (see _saveImage)
    this.setState({
      image: file
    });
    // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    let reader = new FileReader();
    // A handler for the loadend event. This event is triggered each time the reading operation is completed (either in success or failure).
    reader.onloadend = () => {
      this.setState({
        preview: reader.result
      });
    }
    // Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
    reader.readAsDataURL(file);
  }
  handleInput (event){
    this.setState({[event.target.name]: event.target.value});
  }
  handleCheckbox(event) {
    this.setState({[event.target.name]: event.target.checked});
  }
  handleError(err) {
    console.warn(err);
  }
  async componentDidMount() {
    if(this.props.match.params.id) {
      const id = this.props.match.params.id;
      const response = await fetch(`/api/v1/user/patients/${id}/`).catch(this.handleError);
      const data = await response.json().catch(this.handleError);
      this.setState({...data});
      // console.log(data);
    }
  }
  async handleSubmit(event){
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    // shallow copy of state
    const patient = {...this.state};
    patient.height = `${this.state.feet}' ${this.state.inches}"`;
    // remove walking device if one is not selected
    if(!patient.needs_walking_device) {
      delete patient.walking_devices
      delete patient.needs_walking_devices
    }
    if(!patient.is_bed_patient) {
      delete patient.is_bed_patient
    }
    if(!patient.food_allergies) {
      delete patient.food_allergies
    }
    if(!patient.medication_allergies) {
      delete patient.medication_allergies
    }
    if(!patient.surgeries) {
      delete patient.surgeries
    }
    // remove image if one is not selected
    if(!patient.image) {
      delete patient.label_image;
    }
    delete patient.feet;
    delete patient.inches;
    // console.log(patient.height);
    const formData = new FormData();
    const keys = Object.keys(patient);
    keys.forEach(key => formData.append(key, this.state[key]));
    const options = {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken,
        },
        body: formData,
    };
    const response = await fetch('/api/v1/user/patients/', options).catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    this.props.history.push(`/user/patients/${data.id}/`);
};

render() {
    return (
      <React.Fragment>
        {
          !this.props.isEditing
        ?
          <h2 className="list-label">NEW PATIENT FORM</h2>
        :
          null}
        <form onSubmit={this.handleSubmit}>
        <div className="form-group" style={{height: "200px", width: "200px"}}>
          <label htmlFor="image"><b>Image</b></label>
          <input type="file" className="form-control" placeholder="Upload image" name="image" id="image" onChange={this.handleImage} required/>
          {this.state.image ? (
          <img src={this.state.preview} alt='preview' style={{width: "80%"}}/>
        ) : (
          null
        )}
        </div>
          <div className="form-group">
            <label htmlFor="first-name"><b>First name</b></label>
            <input type="text" className="form-control" placeholder="Enter first name" name="first_name" id="first-name" value={this.state.first_name} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="last-name"><b>Last name</b></label>
            <input type="text" className="form-control" placeholder="Enter last name" name="last_name" id="last-name" value={this.state.last_name} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label><b>Address</b></label>
            <input type="text" className="form-control" placeholder="Enter street address" name="address" id="adress" value={this.state.address} onChange={this.handleInput} required/>
            <br/>
            <input type="text" className="form-control" placeholder="Enter city" name="city" id="city" value={this.state.city} onChange={this.handleInput} required/>
            <br/>
            <input type="text" className="form-control" placeholder="Enter state" name="state" id="state" value={this.state.state} onChange={this.handleInput} required/>
            <br/>
            <input type="text" className="form-control" placeholder="Enter zipcode" name="zipcode" id="zipcode" value={this.state.zipcode} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="date-of-birth"><b>Birthday</b></label>
            <input type="date" className="form-control" placeholder="Enter birthday" name="date_of_birth" id="date-of-birth" value={this.state.date_of_birth} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="weight"><b>Weight</b></label>
            <input type="number" className="form-control" placeholder="Enter weight" name="weight" id="weight" value={this.state.weight} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label><b>Height</b></label>
            <select className="form-control" onChange={this.handleInput} value={this.state.feet} name="feet">
              <option value="Select">Feet</option>
              <option value="09">9</option>
              <option value="08">8</option>
              <option value="07">7</option>
              <option value="06">6</option>
              <option value="05">5</option>
              <option value="04">4</option>
              <option value="03">3</option>
              <option value="02">2</option>
              <option value="01">1</option>
            </select>
            <br/>
            <select className="form-control" onChange={this.handleInput} value={this.state.inches} name="inches">
              <option value="Select">Inches</option>
              <option value="11">11</option>
              <option value="10">10</option>
              <option value="09">9</option>
              <option value="08">8</option>
              <option value="07">7</option>
              <option value="06">6</option>
              <option value="05">5</option>
              <option value="04">4</option>
              <option value="03">3</option>
              <option value="02">2</option>
              <option value="01">1</option>
            </select>
          </div>
          <div className="form-group">
            <label><b>Gender</b></label>
            <select className="form-control" onChange={this.handleInput} value={this.state.gender} name="gender">
              <option value="Select">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="food-allergies"><b>Food allergies</b></label>
            <textarea className="form-control" rows="3" placeholder="Describe food allergies" name="food_allergies" id="food-allergies" value={this.state.food_allergies} onChange={this.handleInput}/>
          </div>
          <div className="form-group">
            <label htmlFor="medication-allergies"><b>Medication allergies</b></label>
            <textarea className="form-control" rows="3" placeholder="Describe medication allergies" name="medication_allergies" id="medication-allergies" value={this.state.medication_allergies} onChange={this.handleInput}/>
          </div>
          <div className="form-group">
            <label htmlFor="primary-doctor"><b>Primary doctor</b></label>
            <input type="text" className="form-control" placeholder="Enter primary doctor's name" name="primary_doctor" id="primary-doctor" value={this.state.primary_doctor} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="primary-doctor-telephone-number"><b>Primary doctor's telephone number</b></label>
            <input type="tel" className="form-control" placeholder="Enter primary doctor's name" name="primary_doctor_telephone_number" id="primary-doctor-telephone_number" value={this.state.primary_doctor_telephone_number} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="language"><b>Primary language</b></label>
            <input type="text" className="form-control" placeholder="Enter patient's primary language" name="language" id="language" value={this.state.language} onChange={this.handleInput} required/>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="is_bed_patient" id="is-bed-patient" checked={this.state.is_bed_patient} onChange={this.handleCheckbox}/>
            <label className="form-check-label" htmlFor="is-bed-patient"><b>Bed patient</b></label>
          </div>
          <br/>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="needs_walking_device" id="needs-walking-device" checked={this.state.needs_walking_device} onChange={this.handleCheckbox}/>
            <label className="form-check-label" htmlFor="needs-walking-device"><b>Needs walking assitance</b></label>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="walking-devices"><b>Walking devices</b></label>
            <textarea className="form-control" rows="3" placeholder="List walking devices" name="walking_devices" id="walking-devices" value={this.state.walking_devices} onChange={this.handleInput} disabled={!this.state.needs_walking_device} />
          </div>
          <div className="form-group">
            <label htmlFor="surgeries"><b>Surgeries</b></label>
            <textarea className="form-control" rows="8" placeholder="Describe surgery history" name="surgeries" id="surgeries" value={this.state.surgeries} onChange={this.handleInput}/>
          </div>
          {
            this.state.id
          ?
            <button type="button" className="btn btn-primary" onClick={this.saveEdit}>Save Changes</button>
          :
            <button type="submit" className="btn btn-primary">Submit</button>
          }
        </form>
      </React.Fragment>
   )
 }
}
export default PatientForm;
