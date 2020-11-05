import React, { Component } from 'react';

import Cookies from 'js-cookie';


class Prescription extends Component {
  constructor(props){
    super(props);

    this.state = {
      patient: 16,
      brand_name:'',
      medication_name:'',
      directions: '',
      quantity: '',
      refills:'',
      pharmacy_number:'',
      rx:'',
      prescriber:'',
      label_image:null,
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

addPrescription(event){
         //this post is for image uploads
         event.preventDefault();

         const csrftoken = Cookies.get('csrftoken');
      
         const formData = new FormData();
         const data = Object.keys(this.state);
         // console.log('data', data);
         data.forEach(item => formData.append(item, this.state[item]));

         fetch('/api/v1/patients/prescriptions/', {
            method: 'POST',
            headers: {
              'X-CSRFToken': csrftoken,
            },
            body: formData
         });
         };

render() {
  return(
      <React.Fragment>
        <form className="med-form" onSubmit={(event) => {this.addPrescription(event, this.state); this.setState({
          brand_name:'', medication_name: '', directions:'', quantity:'', refills:'', pharmacy_number:'', rx:'',
          prescriber:''})}}>
          <div className="form-group">
            <label htmlFor='brand_name'className="brand">Brand Name</label>
            <input type="text" id='brand_name' name="brand_name" value={this.state.brand_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='medication_name'className="med">Medication Name</label>
            <input type="text" id='medication_name' name="medication_name" value={this.state.medication_name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='directions'className="direct">Directions</label>
            <input type="text" id='directions' name="directions" value={this.state.directions} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='quantity'className="quantity">Quantity</label>
            <input type="text" id='quantity' name="quantity" value={this.state.quantity} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='refills'className="refill">Refills</label>
            <input type="text" id='refills' name="refills" value={this.state.refills} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='pharmacy_number'className="number">Pharmacy Number</label>
            <input type="text" id='pharmacy_number' name="pharmacy_number" value={this.state.pharmacy_number} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='rx'className="rx">RX</label>
            <input type="text" id='rx' name="rx" value={this.state.rx} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor='prescriber'className="prescribe">Prescriber</label>
            <input type="text" id='prescriber' name="prescriber" value={this.state.prescriber} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor='image'className="label_pic">Label Image</label>
            <input type="file" name="label_image" onChange={this.handleUpload}/>
            <img src={this.state.upload}/>
          </div>
          <button type="submit"className="sub btn btn-dark">Submit</button>
        </form>
      </React.Fragment>
    )
  }


}
export default Prescription;
