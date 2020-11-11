import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../App';
import Registration from'../Registration';
import Login from'../Login';
import Menu from'../Menu';
import Patient from '../Patient';
import Cover from '../Cover';
import Map from './../Map/MyGoogleMap';
import Prescription from '../Prescription';
import PatientList from '../PatientList';
import About from '../About';
import Schedule from '../Schedule';



function Router () {




  return (
    <BrowserRouter>
      <App>
        <Route path="/cover" component={Cover}/>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
        <Route path="/menu" component={Menu}/>
        <Route path="/patient" component={Patient}/>
        <Route path="/map" component={Map}/>
        <Route path="/prescription" component={Prescription}/>
        <Route path="/patientlist" component={PatientList}/>
        <Route path="/about" component={About}/>
        <Route path="/schedule" component={Schedule} />


      </App>
    </BrowserRouter>
  )
}

export default Router;
