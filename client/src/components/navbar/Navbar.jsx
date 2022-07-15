import React, {useState, useEffect} from 'react'
import './navbar.css'
import {NavLink} from 'react-router-dom'


function Navbar() {

  const [activeUser, setActiveUser] = useState()

  useEffect(function () {
    fetch('http://localhost:5000/currentUser', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => setActiveUser(data.name))
  }, []);

  return (
    <div className="navbar">
      <div className="nav_header">Projects</div>
      {!activeUser ? (
        <div className="authbar">
          <div className="nav_login"><NavLink to="/login">Log In</NavLink></div>
          <div className="nav_ver_line">|</div>
          <div className="nav_registration"><NavLink to="/registration">Registration</NavLink></div>
        </div>
      ) : (
        <div className="nav_auth">Logged in as: {activeUser}</div>
      )}
    </div>
  )
}

export default Navbar