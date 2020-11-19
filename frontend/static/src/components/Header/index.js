import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
function Header(props){
  return(
    <header>
      <nav className="navbar mb-5">
          <ul className="navbar-nav flex-row">
            <li className="nav-item mr-2"><NavLink className="navbar-brand" to="/">GLOW</NavLink></li>
            {props.isLoggedIn
              ?
              <React.Fragment>
                <li className="nav-item mr-2"><NavLink className="nav-link" to={`/user/patients`}>Patients</NavLink></li>
                <li className="nav-item newpatient"><NavLink className="nav-link" to={`/user/patients/add`}>New Patient</NavLink></li>

              </React.Fragment>
              :
              null
            }
          </ul>
          <ul className="navbar-nav flex-row ml-auto">
          { props.isLoggedIn
            ? (
              <li className="nav-item"><button className="btn nav-link" onClick={props.handleLogout}>Logout</button></li>
            ) : (
              <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
            )
          }
          </ul>
      </nav>
    </header>
  );
}
export default Header;
