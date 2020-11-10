// build logout functionality
import React, { Component } from 'react';

import Cookies from 'js-cookie';
import './index.css';


class Menu extends Component {

  constructor(props) {
    super(props)


this.handleLogOut = this.handleLogOut.bind(this);

};




  async handleLogOut(event){
      event.preventDefault();
      const csrftoken = Cookies.get('csrftoken');
      const response = await fetch('/api/v1/rest-auth/logout/', {
         method: 'POST',
         headers: {
            'X-CSRFToken': csrftoken,
          },

      });

      const data = await response.json();
      if(data.detail) {
        Cookies.remove('Authorization');
      }
    };



    render() {
      return (
        <React.Fragment>
          <nav>
          <div>
          <a className="about-ref"href="http://localhost:3000/about">ABOUT</a>
          </div>
          <div>
          <a className="make-pat"href="http://localhost:3000/patient">CREATE PATIENT</a>
          </div>
          <div>
          <a className="findpharm"href="http://localhost:3000/map">FIND PHARMACY</a>
          </div>
          <div className="menu_font_awesome">

            <i class="one fas fa-circle"></i>

            <i class="two fas fa-circle"></i>

            <i class="three fas fa-circle"></i>

            <i class="four fas fa-circle"></i>


          </div>
          <div>
          <button className="log-out" onClick={this.handleLogOut}>LOG OUT</button>
          </div>


          </nav>
        </React.Fragment>
      )
    }









};

export default Menu;
