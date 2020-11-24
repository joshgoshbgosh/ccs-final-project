import React from 'react';
import { NavLink } from 'react-router-dom';
import  Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import './index.css';
function Header(props){
  return(
    <header>

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Glow</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {props.isLoggedIn
          ?
            <Nav>
              <Nav.Link className="nav-link" href='/user/patients'>Patients</Nav.Link>
              <Nav.Link className="nav-link" href={`/user/patients/add`}>New Patients</Nav.Link>
              <Nav.Link className="nav-link" href={'/user/map'}>Map</Nav.Link>
            </Nav>
          :
            null
          }
        <Nav className="ml-auto">
          { props.isLoggedIn
            ?
            <Nav.Link eventKey={2} className="nav-link" onClick={props.handleLogout}>Logout</Nav.Link>
            :
            <Nav.Link eventKey={2} className="nav-link" href="/login">Login</Nav.Link>

          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </header>
  );
}
export default Header;
