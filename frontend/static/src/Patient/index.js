import React, { Component } from 'react';
import Cookies from 'js-cookie';


class Patient extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      date_of_birth: '',
      weight: '',
      height:'',
    }
  }
}
