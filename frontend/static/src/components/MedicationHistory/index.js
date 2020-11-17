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
       console.log(this.state)
     }
     async fetchMedicationHistory() {
       console.log(this.props.match.params);
       // const prescription_id = this.props.prescription.id
       const id = this.props.match.params.id;
       const response = await fetch(`/api/v1/user/patients/${id}/prescriptionHistory/`).catch(this.handleError);
       const data = await response.json().catch(this.handleError);
       this.setState({data});
       console.log('medicationHistroy',this.state);
     }
     render(){
       let text = this.state.data.map(item =>{
         return <div className="medhistory"><div className="history_box"><div>Prescription ID - {item.id}</div><div>Comments - {item.comments}</div> <div>Date/Time - {item.datetime}</div></div></div>;


       })
       return(
         <div>
         <div className="top_bar">
         <p className="pDtail">Medication History</p>
         </div>
         <div>

         </div>
         <div className= 'col-lg-12 col-xs-12 d-block w-100'>{text}</div>
         <div className="bottom_bar ">
         <Link className="pdtail_link" to={`/user/patients/${this.props.match.params.id}/`}>Return To Patient Detail</Link>
         </div>

         </div>
       )
     }
  }

export default MedicationHistory;
