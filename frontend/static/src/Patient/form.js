import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './form.css';


class PatientForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name:'',
      date_of_birth: '',
      weight: '',
      height:'',
      gender: null,
      food_allergies:'',
      medication_allergies:'',
      primary_doctor:'',
      primary_doctor_telephone_number:'',
      language:'',
      bed_patient:'',
      walking_devices: null,
      able_to_walk_alone:'',
      surgeries:'',
      image: null,
      address:'',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }


  handleChange (event){
    this.setState({[event.target.name]: event.target.value});
}

  handleUpload (event){
    this.setState({[event.target.name]: event.target.files[0]});
  }



  addPatient(event){
    event.preventDefault();

    const csrftoken = Cookies.get('csrftoken');
    // shallow copy of state
    const patient = {...this.state};

    // remove walking device if one is not selected
    if(!patient.walking_devices) {
      delete patient.walking_devices
    }

    const formData = new FormData();
    const data = Object.keys(patient);

    console.log(data)
    // console.log('data', data);
    data.forEach(item => formData.append(item, this.state[item]));

    fetch('/api/v1/patients/', {
       method: 'POST',
       headers: {
         'X-CSRFToken': csrftoken,
       },
       body: formData
    });
};
render() {
    return (
      <React.Fragment>
        <form className="news-form col-lg-6 col-xs-12" onSubmit={(event) => {this.addPatient(event, this.state); this.setState({first_name:'', last_name:'',
      date_of_birth:'', weight:'', height:'', gender:('Male','Female'), food_allergies:'', medication_allergies:'', primary_doctor:'',
    primary_doctor_telephone_number:'', language:'', bed_patient:'', walking_devices:('Wheel_Chair', 'Walker', 'Cane'), able_to_walk_alone:'', surgeries:''})}}>

        <div className="col-lg-6 col-xs-12">
          <label htmlFor='image'className="avatar">Profile Image</label>
          <input className="photo"type="file" name="image" onChange={this.handleUpload}/>
          <img src={this.state.upload}/>
        </div>
          <div className="form-group">
            <label htmlFor='first_name'className="first">First Name</label>
            <input type="text" id='first_name' name="first_name" value={this.state.first_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='last_name'className="last">Last Name</label>
            <input type="text" id='last_name' name="last_name" value={this.state.last_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='address'className="address">Address</label>
            <input type="text" id='address' name="address" value={this.state.address} onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor='date_of_birth'className="bday">Date Of Birth</label>
            <input type="date" id='date_of_birth' name="date_of_birth" value={this.state.date_of_birth} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='weight'className="weight">Weight</label>
            <input type="text" id='weight' name="weight" value={this.state.weight} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='height'className="height">Height</label>
            <input type="text" id='height' name="height" value={this.state.height} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='gender'className="gender">Gender</label>
              <select className="news-option" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                <option value="Select">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
          </div>
          <div className="form-group">
            <label htmlFor='food_allergies'className="food_all">Food Allergies</label>
            <input type="text" id='food_allergies' name="food_allergies" value={this.state.food_allergies} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='medication_allergies'className="med_allegery">Medication Allergies</label>
            <input type="text" id='medication_allergies' name="medication_allergies" value={this.state.medication_allergies} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='primary_doctor'className="doctor">Primary Doctor</label>
            <input type="text" id='primary_doctor' name="primary_doctor" value={this.state.primary_doctor} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='primary_doctor_telephone_number'className="number">Primary Doctor Telephone Number</label>
            <input type="text" id='primary_doctor_telephone_number' name="primary_doctor_telephone_number" value={this.state.primary_doctor_telephone_number} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='language'className="language">Language</label>
            <input type="text" id='language' name="language" value={this.state.language} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='bed_patient'className="bed_patient">Bed Patient</label>
            <input type="checkbox" className="bed_patient" id="bed_patient" name="bed_patient" value={this.state.bed_patient} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='walking_devices'className="walking_devices">Walking Device</label>
              <select className="walk_device" id="walking_devices" name="walking_devices" value={this.state.walking_devices} onChange={this.handleChange}>
                <option value="Select">Select Device</option>
                <option value="Wheel_Chair">Wheel Chair</option>
                <option value="Walker">Walker</option>
                <option value="Cane">Cane</option>
              </select>
          </div>

          <div className="surgeries">
            <label htmlFor="surgeries"className="surgeries">Surgeries</label>
            <textarea name="surgeries" className="surgeries" rows="5" id='surgeries' value={this.state.surgeries} onChange={this.handleChange}/>
          </div>

            <button type="submit"className="sub btn btn-dark">Submit</button>

        </form>
      </React.Fragment>

   )
 }

}
export default PatientForm;
