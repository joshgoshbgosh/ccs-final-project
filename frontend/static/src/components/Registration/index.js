import React, {Component} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      // username: '',
      email: '',
      phone_number: '',
      password1: '',
      password2: '',
    }
    this.handleInput = this.handleInput.bind(this);
    // this.handleRegistration = this.handleRegistration.bind(this);
  }
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  // handleRegistration(event){
  //   event.preventDefault();
  //   this.props.handleRegistration(this.state);
  // }
  render() {
    if(this.props.isLoggedIn) {
      return <Redirect to="/" />
    }
    return(
      <form onSubmit={(e) => this.props.handleRegistration(e, this.state)}>
        <div className="container">
          <h1>Create an Account</h1>
          {/*<div className="form-group">
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" className="form-control" placeholder="Enter Username" name="username" id="username" value={this.state.username} onChange={this.handleInput} required/>
          </div>*/}
          <div className="form-group">
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" className="form-control" placeholder="Enter Email" name="email" id="email" value={this.state.email} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="phone-number"><b>Phone number</b></label>
            <input type="tel" className="form-control" placeholder="Enter phone number" name="phone_number" id="phone-number" value={this.state.phone_number} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password1"><b>Password</b></label>
            <input type="password" className="form-control" placeholder="Enter Password" name="password1" id="password1" minlength="8" value={this.state.password1} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password2"><b>Confirm Password</b></label>
            <input type="password" className="form-control" placeholder="Confirm Password" name="password2" id="password2" minlength="8" value={this.state.password2} onChange={this.handleInput} required/>
          </div>
          <div className="d-flex align-items-baseline">
            <button type="submit" className="btn btn-primary">Register</button>
            <p className="ml-auto">Already have an account? <NavLink to="/login">Login</NavLink></p>
          </div>
        </div>
      </form>
    )
  }
}
export default Registration;
