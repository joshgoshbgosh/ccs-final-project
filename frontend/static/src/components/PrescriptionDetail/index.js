import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';


class PrescriptionDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brand_name: '',
    }
    // this.deleteMed = this.deleteMed.bind(this);
    // this.editMed = this.editMed.bind(this);
    this.fetchPrescriptionDetail = this.fetchPrescriptionDetail.bind(this);
  }
  componentDidMount() {
    this.fetchPrescriptionDetail();
  }
  async fetchPrescriptionDetail() {
    const id = this.props.match.params.id;
    const response = await fetch(`/api/v1/user/patients/prescriptions/${id}/`).catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    this.setState({...data});
    console.log(data);
  }

  render() {
    return(
      <div>
      <div className="detail-list col-lg-12 col-xs-12">
        <div className="brand">{this.state.brand_name}</div>
        <div className="med_name">{this.state.medication_name}</div>
        <div className="drections">{this.state.directions}</div>
        <div className="qnty">{this.state.quantity}</div>
        <div className="refill">{this.state.refills}</div>
        <div className="pharm_number">{this.state.pharmacy_number}</div>
        <div className="rxnum">{this.state.rx}</div>
        <div className="doc_prescriber">{this.state.prescriber}</div>
        <div className="as_need">{this.state.take_as_needed}</div>
        <div className="hour_frequent">{this.state.hourly_frequency}</div>
        </div>
      </div>
    )
  }
}
export default PrescriptionDetail;
