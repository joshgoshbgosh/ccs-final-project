import React, { Component } from 'react';
import Cookies from 'js-cookie';
class PrescriptionEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      patient: this.props.patientID,
      brand_name:'',
      medication_name:'',
      directions: '',
      quantity: '',
      refills:'',
      pharmacy_number:'',
      rx:'',
      prescriber:'',
      take_as_needed: false,
      hourly_frequency:'',
      label_image:null,
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleUpload = this.handleUpload.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange (event){
  this.setState({[event.target.name]: event.target.value});
}
handleUpload (event){
  this.setState({[event.target.name]: event.target.files[0]});
}
async componentDidMount() {
  // fetch the prescription based on the id in the url
  const response = await fetch(`/api/v1/user/patients/prescriptions/${this.props.match.params.id}/`).catch(this.handleError);
  const data = await response.json().catch(this.handleError);
  this.setState({...data});
}
async handleSubmit(event){
  event.preventDefault();
  const id = this.props.match.params.id;
  const csrftoken = Cookies.get('csrftoken');
  const formData = new FormData();
  const prescription = { ...this.state };
  if(!(prescription.label_image instanceof File)) {
    delete prescription.label_image;
  }
  const keys = Object.keys(prescription);
  console.log(prescription)
  keys.forEach(key => formData.append(key, prescription[key]));
  // formData.append('patient', id);
  const options = {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': csrftoken,
      },
      body: formData,
  };
  await fetch(`/api/v1/user/patients/prescriptions/${id}/`, options);
  this.props.history.push(`/user/patients/${this.state.patient}`);
};
render() {
  return(
      <React.Fragment>
      <div className="col-lg-12 col-xs-12 top_bar">
      <p className="editform-label">EDIT PRESCRIPTION</p>
      </div>
      <div className="row">
        <form className="col-lg-12 col-xs-12 med-form" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor='brand_name'className="brand">Brand Name</label>
            </div>
            <div>
            <input type="text" id='brand_name' name="brand_name" value={this.state.brand_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='medication_name'className="med">Medication Name</label>
            </div>
            <div>
            <input type="text" id='medication_name' name="medication_name" value={this.state.medication_name} onChange={this.handleChange} />
            </div>
          <div className="form-group">
            <label htmlFor='directions'className="direct">Directions</label>
            </div>
            <div>
            <input type="text" id='directions' name="directions" value={this.state.directions} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='hourly_frequency'className="direct">Hourly Frequency</label>
            </div>
            <div>
            <input type="text" id='hourly_frequency' name="hourly_frequency" value={this.state.hourly_frequency} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='take_as_needed'className="take_as_needed">Take As Needed</label>
            <input type="checkbox" className="take_as_needed" id="take_as_needed" name="take_as_needed" value={this.state.take_as_needed} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='quantity'className="quantity">Quantity</label>
            </div>
            <div>
            <input type="text" id='quantity' name="quantity" value={this.state.quantity} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='refills'className="refill">Refills</label>
            </div>
            <div>
            <input type="text" id='refills' name="refills" value={this.state.refills} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='pharmacy_number'className="number">Pharmacy Number</label>
            </div>
            <div>
            <input type="text" id='pharmacy_number' name="pharmacy_number" value={this.state.pharmacy_number} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='rx'className="rx">RX</label>
            </div>
            <div>
            <input type="text" id='rx' name="rx" value={this.state.rx} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='prescriber'className="prescribe">Prescriber</label>
            </div>
            <div>
            <input type="text" id='prescriber' name="prescriber" value={this.state.prescriber} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor='image'className="label_pic">Label Image</label>
            </div>
            <div>
            <input type="file" name="label_image" onChange={this.handleUpload}/>
            <img src={this.state.upload} alt=""/>
          </div>
          <div>
          <button type="submit"className="sub btn btn-dark">Submit</button>
          </div>
        </form>
        </div>
        
      </React.Fragment>
    )
  }
}
export default PrescriptionEdit;
