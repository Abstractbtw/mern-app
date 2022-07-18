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
          <button className="nav_login"><NavLink to="/login" style={{ textDecoration: 'none' }}>Log In</NavLink></button>
          <div className="nav_ver_line">|</div>
          <button className="nav_registration"><NavLink to="/registration" style={{ textDecoration: 'none' }}>Registration</NavLink></button>
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