import React, { Component } from 'react';




class Medication_List extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }

  }
  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`/api/v1/patients/prescriptions/${id}/`)
    .then(response => response.json())
    .then(data => this.setState({...data}));
  }

  render(){
    return(


      <div>
        <div>{this.state.first_name}</div>
        <div>{this.state.last_name}</div>
        <div>{this.state.medication_name}</div>
        <div>{this.state.rx}</div>
        <div>{this.state.prescriber}</div>
      </div>
    )
  }
}
export default Medication_List;
