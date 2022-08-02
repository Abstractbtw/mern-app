import React from 'react'
import './navbar.css'
import {NavLink} from 'react-router-dom'


function Navbar() {

  const activeUser=localStorage.getItem('name')

  const setUser = () => {
    localStorage.setItem('name', '')
    document.location.reload()
  }

  return (
    <div className="navbar">
      <div className="nav_header">Projects</div>
      {!activeUser ? (
        <div className="authbar">
          <NavLink to="/login" className="nav_login">Log In</NavLink>
          <div className="nav_ver_line">|</div>
          <NavLink to="/registration" className="nav_registration">Registration</NavLink>
        </div>
      ) : (
        <div>
          <div className="nav_auth">Logged in as: {activeUser}</div>
          <button onClick={setUser} className="nav_log_out">Log out</button>
        </div>
      )}
    </div>
  )
}

export default Navbar