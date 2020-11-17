import React, {Component} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    if(this.props.isLoggedIn) {
      return <Redirect to="/" />
    }
    return(
      <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
        <div className="container">
          <h1>Login to an Existing Account</h1>
          <div className="form-group">
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" className="form-control" placeholder="Enter Username" name="username" id="username" value={this.state.username} onChange={this.handleInput} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password"><b>Password</b></label>
            <input type="password" className="form-control" placeholder="Enter Password" name="password" id="password" value={this.state.password} onChange={this.handleInput} required/>
          </div>
          <div className="d-flex align-items-baseline">
            <button type="submit" className="btn btn-primary">Login</button>
            <p className="ml-auto">Need an account? <NavLink to="/registration">Register</NavLink></p>
          </div>
        </div>
      </form>
    )
  }
}
export default Login;
