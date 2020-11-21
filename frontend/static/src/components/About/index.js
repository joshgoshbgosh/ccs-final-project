import React, { Component } from 'react';
import './index.css';




import family from './../../images/family.jpg';
import family3   from './../../images/family3.jpg';
import family4 from './../../images/family4.jpg';

class About extends Component {


render() {

  return(


    <div id="about" className="container-fluid">
    <div className="tanbox">

      <div className="undercard w-2">
      <img className="underphoto w-2"src ={family3} />
      </div>
      <div className="middlecard w-2">
      <img className="middlephoto w-2" src={family4} />
      </div>
      <div className="topcard w-2">
      <img className="topphoto w-2" src={family} />
      </div>





    </div>
    <div className="words d-flex flex-wrap w-2">
    <p className="wordparagraph">Hi, I'm Josh Lanier and this is my app GLOW.  My dad is an Alzheimer's patient.  He currently
    is getting in home care by my mom and contracted caregivers 24/7.  Glow (which stands for Generated Log Of Well-Being)
    is an app designed from seeing the struggle of family members taking care of their loved ones.
     From hired help not being detailed enough, to family care takers not having the tools needed for the
     best care possible,  Glow is designed for simplicity, yet  high quality detailed effectiveness for
     the caregiver. From detailed written documentation of scheduled medication, to alerts and notifications of scheduled medications.
    Glow is designed to help equip and bring peace of mind to the everyday family caregiver.</p>
    </div>
      <h1 className="glowlogo d-none d-md-block">GLOW</h1>















    </div>
  )
};


}
export default About;
