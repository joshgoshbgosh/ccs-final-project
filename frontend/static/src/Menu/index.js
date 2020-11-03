// build logout functionality
import React, { Component } from 'react';

import Cookies from 'js-cookie';


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
          <button>ABOUT</button>
          </div>
          <div>
          <button>CREATE PATIENT</button>
          </div>
          <div>
          <button>FIND PHARMACY</button>
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
