// build registration component
// all inputs controlled
// post request to create a new user
import React, { Component } from 'react';
// import Cookies from 'js-cookie';
import './index.css';
import { Redirect } from 'react-router-dom';
//class set here for the registration

class Registration extends Component {

  constructor(props) {
    super(props)


    this.state = {
      username:'',
      phone_number:'',
      email:'',
      password1:'',
      password2: '',

    }

    this.handleChange = this.handleChange.bind(this)
}


handleChange (event){
  this.setState({[event.target.name]: event.target.value});


  }



  // async addUser(event) {
  //
  //   event.preventDefault();
  //   const csrftoken = Cookies.get('csrftoken');
  //   const response = await fetch('/api/v1/rest-auth/registration/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type':'application/json',
  //       'X-CSRFToken': csrftoken,
  //     },
  //     body: JSON.stringify(this.state)
  //   });
  //
  //   const data = await response.json();
  //
  //   if(data.key) {
  //     Cookies.set('Authorization', `Token ${data.key}`);
  //
  //   }
  // };



      render() {
        if(this.props.isLoggedIn) {
            return <Redirect to="/user/patients" />
          }
        return(
          <React.Fragment>
          <div className="acbox">
          <div className="cover_font_awesome">

            <i class="one fas fa-circle"></i>

            <i class="two fas fa-circle"></i>

            <i class="three fas fa-circle"></i>

            <i class="four fas fa-circle"></i>


          </div>
          </div>
          <div className="row justify-content-center">
          <form className="col-lg-6 col-xs-12" onSubmit={(event) => this.props.handleRegistration(event, this.state)}>
            <div className="form-group">
              <label className="form-userName">CREATE ACCOUNT</label>
              <input type="text" placeholder="Enter Username..."name="username" value={this.state.userName} onChange ={this.handleChange}  />
            </div>
            <div className="form-group">
                <label className="form-email"></label>
                <input type="text" placeholder="Enter Email..."name="email" value={this.state.email} onChange ={this.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-phone_number"></label>
                <input type="tel" placeholder="(xxx) xxx-xxxx" name="phone_number" value={this.state.phone_number} onChange ={this.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-password1"></label>
                <input type="password" placeholder="Enter Password..." name="password1" value={this.state.password1} onChange ={this.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-password2"></label>
                <input type="password" placeholder="Re-enter Password..." name="password2" value={this.state.title} onChange ={this.handleChange} />
            </div>
              <button type="submit"className="subbut">Submit</button>
          </form>
          </div>
          </React.Fragment>
        )
      }








}
export default Registration;
