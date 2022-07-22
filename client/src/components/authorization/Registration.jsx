import React, {useState} from "react"
import './authorization.css'
import {registration} from '../../actions/user'
import {Link} from 'react-router-dom'

const Registration = () => {
  
  const [Username, setName] = useState("")
  const [Userpassword, setPassword] = useState("")

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Registration</div>
        <input onChange={(event)=>setName(event.target.value)} value={Username} className="auth_input" type="text" placeholder="Enter name"></input>
        <input onChange={(event)=>setPassword(event.target.value)} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        <div className="links">
          <button style={{ textDecoration: 'none', marginRight: '10px' }} className="auth_button" onClick={() => registration(Username, Userpassword)}>Sign in</button>
          <Link to="../" style={{textDecoration: 'none'}} className="auth_button">Back</Link>
        </div>
      </div>
     </div>
  )
}

export default Registration