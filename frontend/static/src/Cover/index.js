import React, { Component } from 'react';


import Cookies from 'js-cookie';

class Cover extends Component {

  constructor(props){
    super(props)

  }


  render(){
    return(

    <React.Fragment>
    <div className="cover_container">
    <div className="cover_logo">
    <h1 className="logo">GLOW</h1>
    </div>
    <div className="cover_font_awesome">
    <i class="fab fa-facebook-square"></i>
    <i class="fab fa-instagram"></i>
    <i class="fab fa-youtube-square"></i>
    </div>
    <div className="links">
    <a href="#">CREATE ACCOUNT</a>
    <a href="#">LOGIN</a>
    </div>
    </div>
    </React.Fragment>
    )

};


}
export default Cover;
