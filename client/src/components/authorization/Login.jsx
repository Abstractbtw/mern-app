import React, {useState} from "react"
import './authorization.css'
import {login} from '../../actions/user'
import {Link} from 'react-router-dom'

const Login = () => {
    
  const [LoginUsername, setName] = useState("")
  const [Userpassword, setPassword] = useState("")

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Log In</div>
        <input onChange={(event) => setName(event.target.value)} value={LoginUsername} className="auth_input" type="text" placeholder="Enter name"></input>
        <input onChange={(event) => setPassword(event.target.value)} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        <div className="links">
          <Link to="../" style={{textDecoration: 'none', marginRight: '10px'}} className="auth_button" onClick={() => login(LoginUsername, Userpassword)}>Log in</Link>
          <Link to="../" style={{textDecoration: 'none'}} className="auth_button">Back</Link>
        </div>
      </div>
     </div>
  )
}

export default Login