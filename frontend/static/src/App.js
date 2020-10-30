import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registration from'./Registration/index.js';
import Cookies from 'js-cookie';
// import your components
// load each one individually in the App component below
// and test each one separately

function App() {
  return (
    <div className="App">
    <Registration/>
    </div>
  );
}

export default App;
