import React, { Component } from 'react';
import Cookies from 'js-cookie';
class PatientForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name:'',
      date_of_birth: '',
      weight: '',
      height:'',
      gender: '',
      food_allergies:'',
      medication_allergies:'',
      primary_doctor:'',
      primary_doctor_telephone_number:'',
      language:'',
      bed_patient:'',
      walking_devices: '',
      able_to_walk_alone:'',
      surgeries:'',
      image: null,
      address:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  handleChange (event){
    this.setState({[event.target.name]: event.target.value});
}
  handleUpload (event){
    this.setState({[event.target.name]: event.target.files[0]});
  }
  handleError(err) {
    console.warn(err);
  }
  async handleSubmit(event){
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    // shallow copy of state
    const patient = {...this.state};
    // remove walking device if one is not selected
    if(!patient.walking_devices) {
      delete patient.walking_devices
    }
    // remove image if one is not selected
    if(!patient.image) {
      delete patient.label_image;
    }
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
       <div className="row">
        <form className="news-form col-lg-6 col-xs-12" onSubmit={this.handleSubmit}>
          <div className="patient_form">
               <div>
                    <div>
                       <label htmlFor='image'className="avatar">Profile Image</label>
                    </div>
                    <div>
                      <input className="photo"type="file" name="image" onChange={this.handleUpload}/>
                    </div>
                    <div>
                      <img src={this.state.upload} alt=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='first_name'className="first"></label>
                    </div>
                    <div>
                        <input type="text" id='first_name' placeholder="First Name..."name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='last_name'className="last"></label>
                    </div>
                    <div>
                        <input type="text" id='last_name' placeholder="Last Name..."name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='address'className="address"></label>
                    </div>
                    <div>
                        <input type="text" id='address' placeholder="Address..."name="address" value={this.state.address} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='date_of_birth'className="bday"></label>
                    </div>
                    <div>
                        <input type="date" id='date_of_birth' name="date_of_birth" value={this.state.date_of_birth} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='weight'className="weight"></label>
                    </div>
                    <div>
                        <input type="text" id='weight' placeholder="Weight..."name="weight" value={this.state.weight} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='height'className="height"></label>
                    </div>
                    <div>
                        <input type="text" id='height' placeholder="Height" name="height" value={this.state.height} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='gender'className="gender"></label>
                    </div>
                    <div>
                          <select className="news-option" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                            <option value="Select">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                    </div>
                </div>
                <div>
                    <div className="form-group">
                    <label htmlFor='food_allergies'className="food_all"></label>
                    </div>
                    <div>
                    <input type="text" id='food_allergies' placeholder="Food Allergies..."name="food_allergies" value={this.state.food_allergies} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor='medication_allergies'className="med_allegery"></label>
                    </div>
                    <div>
                    <input type="text" id='medication_allergies' placeholder="Medication Allergies..."name="medication_allergies" value={this.state.medication_allergies} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor='primary_doctor'className="doctor"></label>
                    </div>
                    <div>
                    <input type="text" id='primary_doctor' placeholder="Primary Doctor..."name="primary_doctor" value={this.state.primary_doctor} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor='primary_doctor_telephone_number'className="number"></label>
                    </div>
                    <div>
                    <input type="text" id='primary_doctor_telephone_number' placeholder="Primary Doctor Number..." name="primary_doctor_telephone_number" value={this.state.primary_doctor_telephone_number} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor='language'className="language"></label>
                    </div>
                    <div>
                    <input type="text" id='language' placeholder="Language..."name="language" value={this.state.language} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor='bed_patient'className="bed_patient">Bed Patient</label>
                    </div>
                    <div>
                    <input type="checkbox" className="bed_patient" id="bed_patient" name="bed_patient" value={this.state.bed_patient} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor='walking_devices'className="walking_devices">Walking Device</label>
                    </div>
                    <div>
                      <select className="walk_device" id="walking_devices" name="walking_devices" value={this.state.walking_devices} onChange={this.handleChange}>
                        <option value="Select">Select Device</option>
                        <option value="Wheel_Chair">Wheel Chair</option>
                        <option value="Walker">Walker</option>
                        <option value="Cane">Cane</option>
                      </select>
                    </div>
                    <div className="surgeries">
                    <label htmlFor="surgeries"className="surgeries"></label>
                    </div>
                    <div>
                    <textarea name="surgeries" placeholder="Surgery History..."className="surgeries" rows="5" id='surgeries' value={this.state.surgeries} onChange={this.handleChange}/>
                    </div>
                  <button type="submit"className="sub btn btn-dark">Submit</button>
                </div>
              </div>
          </form>
        </div>
      </React.Fragment>
   )
 }
}
export default PatientForm;
