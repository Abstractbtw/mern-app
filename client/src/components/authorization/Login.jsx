import React, {useState} from "react"
import './authorization.css'
import {login} from '../../actions/user'

const Login = () => {
    
  const [LoginUsername, setName] = useState("")
  const [Userpassword, setPassword] = useState("")

  return (
    <div className="auth">
      <div className="auth_header">Log In</div>
      <input onChange={(event) => setName(event.target.value)} value={LoginUsername} className="auth_input" type="text" placeholder="Enter name"></input>
      <input onChange={(event) => setPassword(event.target.value)} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
      <button className="auth_button" onClick={() => login(LoginUsername, Userpassword)}>Log in</button>
     </div>
  )
}

export default Login