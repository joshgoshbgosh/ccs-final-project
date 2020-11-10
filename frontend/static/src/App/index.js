import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './index.css';
import Cookies from 'js-cookie';

import Cover from './../Cover';
import Login from './../Login';
import Registration from './../Registration';
import Menu from './../Menu';

import Map from './../Map/MyGoogleMap';
import Prescription from './../Prescription';

import PatientForm from './../Patient/form';
import PatientList from './../PatientList';
import PatientDetail from './../Patient';

import About from './../About';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      patientList: [],

    }

    this.fetchPatientList = this.fetchPatientList.bind(this);

  }




  async fetchPatientList() {
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/patients/').catch(handleError);
    const data = await response.json().catch(handleError);
    this.setState({patientList: data});
  }

  render() {
    return (
      <div className="container App">
        <Switch>
          <Route path="/cover" component={Cover}/>
          <Route path="/menu" component={Menu}/>

          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration}/>

          <Route path="/patientlist" render={(props) => <PatientList {...props} patientList={this.state.patientList} fetchPatientList={this.fetchPatientList} />}/>
          <Route path="/patient/:id" component={PatientDetail}/>
          <Route path="/patient" component={PatientForm}/>

          <Route path="/map" component={Map}/>
          <Route path="/prescription" component={Prescription}/>

          <Route path="/about" component={About}/>
        </Switch>
      </div>
    );
  }

}

export default withRouter(App);
