import React, {useState, useEffect} from "react"
import './authorization.css'
import {registration} from '../../actions/user'
import {NavLink} from 'react-router-dom'

const Registration = () => {
  
  const [Username, setName] = useState("")
  const [Userpassword, setPassword] = useState("")
  const [Useremail, setEmail] = useState("")

  const [checkEmail, setCheckEmail] = useState(false)
  const [checkUser, setCheckUser] = useState(false)
  const [checkPass, setCheckPass] = useState(false)

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setUsers(data))
    
  }, []);

  function checkInputs(){
    if(!(/\S+@\S+\.\S+/.test(Useremail))){
      setCheckEmail(true)
    }
    users.map(user => {
      if(Useremail === user.email){
        setCheckUser(true)
      }
    })
    if(Userpassword.length < 3 || Userpassword.length > 12){
      setCheckPass(true)
    }
    if(!checkEmail && !checkPass && !checkUser){
      registration(Useremail, Username, Userpassword)
    }
  }

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Registration</div>
        <input onChange={(event) => (setEmail(event.target.value), setCheckEmail(false), setCheckUser(false))} value={Useremail} className="auth_input" type="text" placeholder="Enter email"></input>
        {checkEmail ? (
          <div className="error_text">Value is not email</div>
        ):("")}
        {checkUser ? (
          <div className="error_text">This user already exists</div>
        ):("")}
        <input onChange={(event) => setName(event.target.value)} value={Username} className="auth_input" type="text" placeholder="Enter name"></input>
        <input onChange={(event) => (setPassword(event.target.value), setCheckPass(false))} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        {checkPass ? (
          <div className="error_text">Password must be longer than 3 and shorter than 12 symbols</div>
        ):("")}
        <div className="links">
          {Useremail && Username && Userpassword ? (
            <button style={{ textDecoration: 'none', marginRight: '10px', cursor: "pointer" }} className="auth_button" onClick={() => (checkInputs())}>Sign in</button>
          ):(
            <button className="disabled_auth_button" style={{ textDecoration: 'none', marginRight: '10px'}} disabled>Sign in</button>
          )}
          <NavLink to="/" style={{textDecoration: 'none'}} className="auth_button">Back</NavLink>
        </div>
      </div>
     </div>
  )
}

export default Registration