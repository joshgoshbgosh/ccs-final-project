import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Cookies from 'js-cookie';


// import Menu from './Menu/index.js';
// import Map from './Map/MyGoogleMap.js';


// import your components
// load each one individually in the App component below
// and test each one separately


 // our location object from earlier

function App(props) {
  return (
    <div className="App">
      {props.children}
    </div>
  );
}

export default App;
