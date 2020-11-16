// build login component
// all inputs controlled
// post request to create a new user
import React, { Component } from 'react';
import './index.css';
import { Redirect } from 'react-router-dom';


// import UserArticles from './UserArticles';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleLogIn = this.handleLogIn.bind(this);


  }

  handleChange (event){
    this.setState({[event.target.name]: event.target.value});
}


// async handleLogIn(event){
//
//   event.preventDefault();
//   const csrftoken = Cookies.get('csrftoken');
//   const response = await fetch('/api/v1/rest-auth/login/', {
//      method: 'post',
//      headers: {
//        'Content-Type':'application/json',
//         'X-CSRFToken': csrftoken,
//       },
//      body: JSON.stringify(this.state)
//   });
//
//   const data = await response.json();
//   if(data.key) {
//     Cookies.set('Authorization', `Token ${data.key}`);
//
//   }
// };


render() {
  if(this.props.isLoggedIn) {
      return <Redirect to="/user/patients" />
    }
  return (
    <React.Fragment>


      <div className=" row justify-content-center">
      <form className="col-lg-6 col-xs-12" onSubmit={(event) => this.props.handleLogin(event, this.state)}>
      <div className="log_div">
      <h1 className="log-logo">GLOW</h1>
      </div>
      <div className="cover_font_awesome">

        <i class="one fas fa-circle"></i>

        <i class="two fas fa-circle"></i>

        <i class="three fas fa-circle"></i>

        <i class="four fas fa-circle"></i>


      </div>
        <div className="log-label form-group">
          <label className="form-userName">LOG IN</label>
          </div>
          <div>
          <input type="text" placeholder="Enter Username..." name="username" value={this.state.username} onChange ={this.handleChange} />
        </div>
        <div className="pass-lab form-group">
          <label className="form-password1"></label>
          <input type="password" placeholder="Enter Password..." name="password" value={this.state.password} onChange ={this.handleChange} />
        </div>
        <button type="submit"className="subbut">SUBMIT</button>
      </form>
      </div>

  </React.Fragment>

                        )
                      }
                    }
export default Login;
