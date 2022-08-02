import React, {useState} from "react"
import './authorization.css'
import {login} from '../../actions/user'
import {NavLink} from 'react-router-dom'

const Login = () => {
    
  const [Loginemail, setEmail] = useState("")
  const [Userpassword, setPassword] = useState("")

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Log In</div>
        <input onChange={(event) => setEmail(event.target.value)} value={Loginemail} className="auth_input" type="text" placeholder="Enter name"></input>
        <input onChange={(event) => setPassword(event.target.value)} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        <div className="links">
          <button style={{textDecoration: 'none', marginRight: '10px'}} className="auth_button" onClick={() => login(Loginemail, Userpassword)}>Log in</button>
          <NavLink to="/" style={{textDecoration: 'none'}} className="auth_button">Back</NavLink>
        </div>
      </div>
     </div>
  )
}

export default Login