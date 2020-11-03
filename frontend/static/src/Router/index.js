import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../App';
import Registration from'../Registration';
import Login from'../Login';
import Menu from'../Menu';
import Patient from '../Patient';


function Router () {
  return (
    <BrowserRouter>
      <App>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
        <Route path="/" component={Menu}/>
        <Route path="/patient" component={Patient}/>
      </App>
    </BrowserRouter>
  )
}

export default Router;
