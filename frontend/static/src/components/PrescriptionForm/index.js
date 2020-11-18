import React, { Component } from 'react';
import './index.css';
import Cookies from 'js-cookie';
class PrescriptionForm extends Component {
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
      preview: '',
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleImage = this.handleImage.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleCheckbox = this.handleCheckbox.bind(this);
}
handleCheckbox(event) {
  this.setState({[event.target.name]: event.target.checked});
}
handleChange (event){
  this.setState({[event.target.name]: event.target.value});
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
async handleSubmit(event){
  event.preventDefault();
  const id = this.props.match.params.id;
  const csrftoken = Cookies.get('csrftoken');
  const formData = new FormData();
  const prescription = { ...this.state };
  if(!prescription.label_image) {
    delete prescription.label_image;
  }
  const keys = Object.keys(prescription);
  keys.forEach(key => formData.append(key, prescription[key]));
  formData.append('patient', id);
  const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken,
      },
      body: formData,
  };
  await fetch(`/api/v1/user/patients/${id}/prescriptions/`, options);
  this.props.history.push(`/user/patients/${id}/`);
};
render() {
  return(
      <React.Fragment>
      {
        !this.props.isEditing
      ?
        <h2 className="list-label">PRESCRIPTION FORM</h2>
      :
        null}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="label_image"><b>Label image</b></label>
            <input type="file" className="form-control" placeholder="Upload image" name="label_image" id="label-image" onChange={this.handleImage} required/>
            {this.state.label_image ? (
            <img src={this.state.preview} alt='preview'/>
          ) : (
            null
          )}
          </div>
          <div className="form-group">
            <label htmlFor='brand_name'>Brand Name</label>
            <input className="form-control" type="text" id='brand_name' name="brand_name" value={this.state.brand_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='medication_name'>Medication Name</label>
            <input className="form-control" type="text" id='medication_name' name="medication_name" value={this.state.medication_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='directions'>Directions</label>
            <input className="form-control" type="text" id='directions' name="directions" value={this.state.directions} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='hourly_frequency'>Hourly Frequency</label>
            <input className="form-control" type="text" id='hourly_frequency' name="hourly_frequency" value={this.state.hourly_frequency} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='quantity'>Quantity</label>
            <input className="form-control" type="text" id='quantity' name="quantity" value={this.state.quantity} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='refills'>Refills</label>
            <input className="form-control" type="text" id='refills' name="refills" value={this.state.refills} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='pharmacy_number'>Pharmacy Number</label>
            <input className="form-control" type="text" id='pharmacy_number' name="pharmacy_number" value={this.state.pharmacy_number} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='rx'>RX</label>
            <input className="form-control" type="text" id='rx' name="rx" value={this.state.rx} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='prescriber'>Prescriber</label>
            <input className="form-control" type="text" id='prescriber' name="prescriber" value={this.state.prescriber} onChange={this.handleChange} />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="take_as_needed" id="take_as_needed" checked={this.state.take_as_needed} onChange={this.handleCheckbox}/>
            <label className="form-check-label" htmlFor='take_as_needed'><b>Take as needed</b></label>
          </div>
          <br/>
          <button type="submit"className="sub btn btn-dark">Submit</button>
        </form>
      </React.Fragment>
    )
  }
}
export default PrescriptionForm;
