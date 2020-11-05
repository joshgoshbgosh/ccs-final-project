import React, { Component } from 'react';
import Prescription from './../Prescription';

class PatientDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`/api/v1/patients/${id}/`)
    .then(response => response.json())
    .then(data => this.setState({...data}));
  }

  render() {
    return(
      <div>
        <div>{this.state.first_name}</div>
        <div>{this.state.last_name}</div>
        <div>{this.state.address}</div>
        <Prescription patientID={this.state.id}/>
      </div>
    )
  }
}

export default PatientDetail;
