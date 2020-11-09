import React, { Component } from 'react';
import './index.css';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';

import family from './images/family.jpg';

class About extends Component {

  constructor(props) {
    super(props);

  }
render(){
  return(

    <React.Fragment>
      <div className="about col-12 col-md-6 mb-5">
         <img className="about-img"src={family} />
         <p>
         Hello my name is Josh Lanier and this is my app GLOW.  My dad is an Alzheimer's patient.  He currently
         is getting in home care by my mom and contracted caregivers 24/7.  Glow(Generated Log Of Well-Being)
         is an app designed from seeing the struggle of family members taking care of their loved ones.
          From hired help not being detailed enough, to family care takers not having the tools needed for the
          best care possible,  Glow is designed for simplicity, yet  high quality detailed effectiveness for
          the caregiver. From detailed written and image documentation, to medication check offs and scheduling,
          to finding the closest pharmacies or care facilities no matter where you are.  Glow is designed to
          help equip and bring peace of mind to the everyday family caregiver.
         </p>

       </div>
            <a className="home-button" href="http://localhost:3000/menu">HOME</a>

    </React.Fragment>
  )
};


}
export default About;
