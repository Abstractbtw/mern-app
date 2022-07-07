import React from 'react';
import './navbar.css'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav_header">Projects</div>
      <div className="nav_login"><NavLink to="/login">Log In</NavLink></div>
      <div className="nav_ver_line">|</div>
      <div className="nav_registration"><NavLink to="/registration">Registration</NavLink></div>
      <div>Logged in as: </div>
    </div>
  )
}

export default Navbar