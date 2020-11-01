import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registration from'./Registration/index.js';
import Map from './Map/MyGoogleMap.js';
import './App.css';
import Cookies from 'js-cookie';
import Login from './Login/index.js';
import Menu from './Menu/index.js';

// import your components
// load each one individually in the App component below
// and test each one separately


 // our location object from earlier

function App() {
  return (
    <div className="App">
      <Map/>

    </div>
  );
}

export default App;
