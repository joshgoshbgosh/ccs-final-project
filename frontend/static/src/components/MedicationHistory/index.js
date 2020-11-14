import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';



class MedicationHistory extends Component {
    constructor(props){
      super(props);
      this.state = {
        data:[]
      }

       this.fetchMedicationHistory = this.fetchMedicationHistory.bind(this)
     }
     componentDidMount() {
       this.fetchMedicationHistory();
     }
     async fetchMedicationHistory() {
       console.log(this.props.match.params);
       // const prescription_id = this.props.prescription.id
       const id = this.props.match.params.id;
       const response = await fetch(`/api/v1/user/patients/15/prescriptionHistory/`).catch(this.handleError);
       const data = await response.json().catch(this.handleError);
       this.setState({data});
       console.log('medicationHistroy',this.state);
     }
     render(){
       let text = this.state.data.map(item =>{
         return <div>{item.id}{item.comments}{item.datetime}</div>;


       })
       return(
         <div>
         <div>{text}</div>


         </div>
       )
     }
  }

export default MedicationHistory;
