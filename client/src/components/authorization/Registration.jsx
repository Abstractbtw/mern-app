import React, {useState} from "react"
import './authorization.css'
import {registration} from '../../actions/user'

const Registration = () => {
  
  const [Username, setName] = useState("")
  const [Userpassword, setPassword] = useState("")

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Registration</div>
        <input onChange={(event)=>setName(event.target.value)} value={Username} className="auth_input" type="text" placeholder="Enter name"></input>
        <input onChange={(event)=>setPassword(event.target.value)} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        <button className="auth_button" onClick={() => registration(Username, Userpassword)}>Sign in</button>
      </div>
     </div>
  )
}

export default Registration