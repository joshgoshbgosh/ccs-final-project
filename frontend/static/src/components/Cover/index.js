import React, { Component } from 'react';
import './index.css';
import nurse2 from './../../images/nurse2.jpg';



class Cover extends Component {




  render(){
    return(
    <React.Fragment>

    <div classname="row">
    <div className="col-12 col-xs-12 cover_container">
    <div className="cover_logo">
      <h1 className="logo">GLOW</h1>
    </div>


    <div className="account col-12 col-xs-12">
      <a className="about-page" href="/about">ABOUT</a>
      <a className="map-page" href="/map">MAP</a>
      <a className="create" href="/registration">CREATE ACCOUNT</a>
      <a className="login"href="/login">LOGIN</a>
    </div>
    </div>
    </div>


    </React.Fragment>
    )

};


}
export default Cover;
