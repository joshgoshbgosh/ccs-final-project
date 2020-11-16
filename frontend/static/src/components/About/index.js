import React, { Component } from 'react';
import './index.css';

import Carousel from 'react-bootstrap/Carousel'

import dad from './../../images/dad.jpg';
import family from './../../images/family.jpg';
import family2 from './../../images/family2.jpg';


class About extends Component {


render() {

  return(


    <React.Fragment>
    <div className="top_bar">
    <p className="about-label">ABOUT</p>

    </div>
    <div className="photobox row">
      <div className="about col-lg-6 col-xs-12">

        <img
          className="d-block w-100 about-img"
          src={family}
          alt="First slide"
        />




         <p className="d-block w-100">
         Hello my name is Josh Lanier and this is my app GLOW.  My dad is an Alzheimer's patient.  He currently
         is getting in home care by my mom and contracted caregivers 24/7.  Glow(Generated Log Of Well-Being)
         is an app designed from seeing the struggle of family members taking care of their loved ones.
          From hired help not being detailed enough, to family care takers not having the tools needed for the
          best care possible,  Glow is designed for simplicity, yet  high quality detailed effectiveness for
          the caregiver. From detailed written and image documentation, to medication check offs and scheduling,
          to finding the closest pharmacies or care facilities no matter where you are.  Glow is designed to
          help equip and bring peace of mind to the everyday family caregiver.
         </p>
          <a className="home-button" href="http://localhost:3000/menu">HOME</a>
       </div>

      </div>
      <div className="my d-none d-lg-block">MY</div>
      <div className="story d-none d-lg-block">STORY</div>
      <div className="bottom_bar">

      </div>
    </React.Fragment>
  )
};


}
export default About;
