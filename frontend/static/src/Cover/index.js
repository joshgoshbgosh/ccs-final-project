import React, { Component } from 'react';
import './index.css';

import Cookies from 'js-cookie';

class Cover extends Component {

  constructor(props){
    super(props)

  }


  render(){
    return(

    <React.Fragment>
    <div classname="row justify-content-center">
    <div className="col-12 col-xs-12 cover_container">
    <div className="cover_logo">
    <h1 className="logo">GLOW</h1>
    </div>
    <div className="cover_font_awesome">
    <i className="fab fa-facebook-square"></i>
    <i className="fab fa-instagram"></i>
    <i className="fab fa-youtube-square"></i>

    </div>
    <div className="account">
    <a className="create" href="http://localhost:3000/registration">CREATE ACCOUNT</a>
    </div>
    <div className="logn">
    <a className="login"href="http://localhost:3000/login">LOGIN</a>
    </div>
    </div>
    </div>
    </React.Fragment>
    )

};


}
export default Cover;
