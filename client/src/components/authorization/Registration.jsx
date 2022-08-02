import React, {useState} from "react"
import './authorization.css'
import {registration} from '../../actions/user'
import {NavLink} from 'react-router-dom'

const Registration = () => {
  
  const [Username, setName] = useState("")
  const [Userpassword, setPassword] = useState("")
  const [Useremail, setEmail] = useState("")

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Registration</div>
        <input onChange={(event)=>setEmail(event.target.value)} value={Useremail} className="auth_input" type="text" placeholder="Enter email"></input>
        <input onChange={(event)=>setName(event.target.value)} value={Username} className="auth_input" type="text" placeholder="Enter name"></input>
        <input onChange={(event)=>setPassword(event.target.value)} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        <div className="links">
          <button style={{ textDecoration: 'none', marginRight: '10px' }} className="auth_button" onClick={() => registration(Useremail, Username, Userpassword)}>Sign in</button>
          <NavLink to="/" style={{textDecoration: 'none'}} className="auth_button">Back</NavLink>
        </div>
      </div>
     </div>
  )
}

export default Registration