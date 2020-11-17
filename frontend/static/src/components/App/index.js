import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './index.css';
import Cookies from 'js-cookie';

import PrivateRoute from './../PrivateRoute';

// import Menu from './../Menu';
import Header from './../Header';

import Login from './../Login';
import Registration from './../Registration';

import Map from './../Map/MyGoogleMap';

import PatientForm from './../PatientForm';
import PatientList from './../PatientList';
import PatientDetail from './../PatientDetail';

import MedicationHistory from './../MedicationHistory';
import PrescriptionForm from './../PrescriptionForm';
import PrescriptionEdit from './../PrescriptionEdit';
import PrescriptionDetail from './../PrescriptionDetail';

import About from './../About';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: !!localStorage.getItem('user'),
      patientList: [],

    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleError = this.handleError.bind(this);
    this.saveProfile = this.saveProfile.bind(this);

  }

  async handleLogout() {
      const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
      };
      const response = await fetch('/api/v1/rest-auth/logout/', options).catch(this.handleError);
      const data = await response.json().catch(this.handleError);
      if(data.detail === "Successfully logged out.") {
        Cookies.remove('Authorization');
        localStorage.removeItem('user');
        this.setState({ isLoggedIn: false}, () => this.props.history.push('/'));
      }
    }
    async handleLogin(e, obj) {
    e.preventDefault();
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(obj),
    };
    const response = await fetch('/api/v1/rest-auth/login/', options).catch(this.handleError);
    const data = await response.json().catch(this.handleError);
    if(data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.setState({ isLoggedIn: true }, () => this.props.history.push('/user/patients'));
    }
  }
  async handleRegistration(e, obj) {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };
    const response = await fetch('/api/v1/rest-auth/registration/', options);
    const data = await response.json().catch(this.handleError);
    if(data.key) {
      // https://scotch.io/@PratyushB/local-storage-vs-session-storage-vs-cookie
      Cookies.set('Authorization', `Token ${data.key}`);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.setState({ isLoggedIn: true }, () => this.props.history.push('/user/patients'));
      const profile = {phone_number: obj.phone_number}
      this.saveProfile(profile);

    }
  }

  async saveProfile(obj) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };

    const response = await fetch('/api/v1/accounts/profile_create/', options);
    const data = await response.json().catch(this.handleError);
    console.log(data);
  }
  handleError(err) {
    console.warn(err);
  }
  render() {
    return (
      <React.Fragment>
      <Header isLoggedIn={this.state.isLoggedIn} handleLogout={ this.handleLogout } />
      <div className="container">
      <Switch>

          <Route path='/registration' render={(props) => <Registration {...props} isLoggedIn={this.state.isLoggedIn} handleRegistration={ this.handleRegistration } />} />
          <Route path='/login' render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} handleLogin={ this.handleLogin } />} />

          <PrivateRoute path='/prescription/:id' isLoggedIn={this.state.isLoggedIn} component={PrescriptionEdit} />
          <PrivateRoute path='/user/patients/:id/prescriptions/add/' isLoggedIn={this.state.isLoggedIn} component={PrescriptionForm} />
          <PrivateRoute path='/user/prescriptiondetail/:id'isLoggedIn={this.state.isLoggedIn} component={PrescriptionDetail} />

          <PrivateRoute path='/user/patients/add' isLoggedIn={this.state.isLoggedIn} component={PatientForm} />
          <PrivateRoute path='/user/patients/:id' isLoggedIn={this.state.isLoggedIn} component={PatientDetail} />
          <PrivateRoute path='/user/patients' isLoggedIn={this.state.isLoggedIn} component={PatientList} />
          <PrivateRoute path='/user/medicationHistory/:id' isLoggedIn={this.state.isLoggedIn} component={MedicationHistory} />


          <Route path="/" component={About} exact />
        </Switch>
      </div>
      </React.Fragment>
    );
  }

}

export default withRouter(App);
