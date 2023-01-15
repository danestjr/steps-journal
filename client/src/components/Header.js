import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from 'reactstrap';
import LogoutButton from './Logout';
import LoginButton from './Login';

import './Header.css'

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const userDetails = () => {
      if (args.user) {
        return (
        <div className="userstatus"> 
        <NavbarText>Logged in as: {args.user.given_name} </NavbarText>
        <LogoutButton />
        </div>
        )
      }else {
        return (
          <div className="userstatus"> 
            <LoginButton />
         </div>
        )
      }
  }

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">Walking App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          </Nav>
         {userDetails()}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;