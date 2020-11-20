import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Moment from 'react-moment';



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
         return(
           <tr>
             <th scope="row">{item.id}</th>
             <td>{item.comments}</td>
             <td><Moment format="YYYY-MMM-ddd HH:mm A">
                {item.datetime}
            </Moment></td>

           </tr>
       )})
       return(
         <div>
         <h3>Medication History</h3>
         <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Date/Time</th>

                  </tr>
                </thead>
                <tbody>
                  {text}

                </tbody>
              </table>
          <Link className="pdtail_link" to={`/user/patients/${this.props.match.params.id}/`}>Return To Patient Detail</Link>
        </div>
       )
     }
  }

export default MedicationHistory;
