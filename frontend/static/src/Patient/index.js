import React, { Component } from 'react';
import Cookies from 'js-cookie';


class Patient extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name:'',
      date_of_birth: '',
      weight: '',
      height:'',
      gender: ('Male', 'Female'),
      food_allergies:'',
      medication_allergies:'',
      primary_doctor:'',
      primary_doctor_telephone_number:'',
      language:'',
      bed_patient:'',
      walking_devices:'',
      able_to_walk_alone:'',
      surgeries:'',
      // upload:''



    }
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange (event){
    this.setState({[event.target.name]: event.target.value});
}


  addPatient(event){
    event.preventDefault();

    const csrftoken = Cookies.get('csrftoken');

    fetch('/api/v1/<int:pk>/', {
       method: 'POST',
       headers: {
         'Content-Type':'application/json',
         'X-CSRFToken': csrftoken,
       },
       body: JSON.stringify(this.state)
    });
};
render() {
    return (
      <React.Fragment>
        <form className="news-form" onSubmit={(event) => {this.addPatient(event, this.state); this.setState({first_name:'', last_name:'',
      date_of_birth:'', weight:'', height:'', gender:('male','female'), food_allergies:'', medication_allergies:'', primary_doctor:'',
    primary_doctor_telephone_number:'', language:'', bed_patient:'', walking_devices:'', able_to_walk_alone:'', surgeries:''})}}>
          <div className="form-group">
            <label htmlFor='first_name'className="first">First Name</label>
            <input type="text" id='first_name' name="first_name" value={this.state.first_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='last_name'className="last">Last Name</label>
            <input type="text" id='last_name' name="last_name" value={this.state.last_name} onChange={this.handleChange} />
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
                <option value="male">Male</option>
                <option value="female">Female</option>
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
              <select className="bed_patient" id="bed_patient" name="bed_patient" value={this.state.bed_patient} onChange={this.handleChange}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
          </div>
          <div className="form-group">
            <label htmlFor='walking_devices'className="walking_devices">Walking Devices</label>
            <input type="text" id='walking_devices' name="walking_devices" value={this.state.walking_devices} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='able_to_walk_alone'className="able_to_walk_alone">Able To Walk Alone</label>
            <input type="text" id='able_to_walk_alone' name="able_to_walk_alone" value={this.state.able_to_walk_alone} onChange={this.handleChange} />
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
export default Patient;
