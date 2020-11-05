import React, { Component } from 'react';
import './index.css';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';

class About extends Component {

  constructor(props) {
    super(props);

  }
render(){
  return(

    <React.Fragment>
    <Card>
      <Card.Img variant="top" src="../images/family.jpg" />
      <Card.Body>

        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
    </React.Fragment>
  )
};


}
export default About;
