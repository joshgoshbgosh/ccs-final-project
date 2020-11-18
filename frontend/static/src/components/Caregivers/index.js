import React, {Component} from 'react';
import Cookies from 'js-cookie';




class Caregivers extends Component {
  constructor(props){
    super(props);
    this.state = {
      caregivers: []
    }


    this.fetchCaregivers = this.fetchCaregivers.bind(this);

  }

  componentDidMount(){
    this.fetchCaregivers();
  }



  async fetchCaregivers() {
    const id = this.props.match?.params.id;
    const response = await fetch(`/api/v1/user/patients/caregivers/`).catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    this.setState({caregivers: data});
    console.log(data);
  }

render(){
  const id = Number(this.props.match?.params.id);
  const caregivers = this.state.caregivers
    .filter(caregiver => caregiver.patients.includes(id))
    .map(caregiver => <div key={caregiver.id}>{caregiver.username}</div>);

    const noncaregivers = this.state.caregivers
      .filter(caregiver => !caregiver.patients.includes(id))
      .map(caregiver => <div key={caregiver.id}>{caregiver.username}</div>);

    return(
      <React.Fragment>
        Caregivers
        {caregivers}

        Non Caregivers
        {noncaregivers}
      </React.Fragment>








  )
  }
}
export default Caregivers;
