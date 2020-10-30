// build registration component
// all inputs controlled
// post request to create a new user
import React, { Component } from 'react';
import Cookies from 'js-cookie';

//class set here for the registration

class Registration extends Component {

  constructor(props) {
    super(props)


    this.state = {
      username:'',
      email:'',
      password1:'',
      password2: '',
    }

    this.handleChange = this.handleChange.bind(this)
}


handleChange (event){
  this.setState({[event.target.name]: event.target.value});


  }

  async addUser(event) {

    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    const response = await fetch('/api/v1/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state)
    });

    const data = await response.json();

    if(data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);

    }
  };



      render() {
        return(
          <React.Fragment>

          <form className="col-12 col-md-6 mb-5" onSubmit={(event) => {this.addUser(event, this.state); this.setState({username:'', email:'', password1:'', password2: ''})}>
            <div className="form-group">
              <label className="form-userName">CREATE ACCOUNT</label>
              <input type="text" placeholder="Enter Username..."name="username" Value={this.state.userName} onChange ={this.handleChange}  />
            </div>
            <div className="form-group">
                <label className="form-email"></label>
                <input type="text" placeholder="Enter Email..."name="email" Value={this.state.email} onChange ={this.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-password1"></label>
                <input type="text" placeholder="Enter Password..." name="password1" Value={this.state.password1} onChange ={this.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-password2"></label>
                <input type="text" placeholder="Re-enter Password..." name="password2" defaultValue={this.state.title} onChange ={this.handleChange} />
            </div>
              <button type="submit"className="sub btn btn-dark">Submit</button>
          </form>

          </React.Fragment>
        )
      }








}
export default Registration;
