import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../App';
import Registration from'../Registration';
import Login from'../Login';
import Menu from'../Menu';
import Patient from '../Patient';
import Cover from '../Cover';
import Map from './../Map/MyGoogleMap';




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

      </App>
    </BrowserRouter>
  )
}

export default Router;
