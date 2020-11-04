import React, { Component } from 'react';

import Cookies from 'js-cookie';


class Prescription extends Component {
  constructor(props){
    super(props);

    this.state = {
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
  event.preventDefault();

  const csrftoken = Cookies.get('csrftoken');

  const formData = new FormData();
  const data = Object.keys(this.state);
  // console.log('data', data);
  data.forEach(item => formData.append(item, this.state[item]));

  fetch('/api/v1/prescription/', {
     method: 'POST',
     headers: {
       'X-CSRFToken': csrftoken,
     },
     body: formData
  });
};








}
export default Prescription;
