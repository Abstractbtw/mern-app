import React, {useState, useEffect} from 'react'
import './popup.css'
import {addusers} from '../../actions/user'

function AddUser(props) {

  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setProjects(data))
    
  }, []);

  const onChangeHandler = (text) => {
    setText(text)
    let matches = []
    if (text.length > 0) {
      matches = users.filter(user =>{
        const regex = new RegExp(`${text}`, "gi")
        return user.email.match(regex)
      })
    }
    setSuggestions(matches)
  }

  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
  }

  const [checkUser, setCheckUser] = useState(false)
  const [checkExists, setCheckExists] = useState(false)

  function checkInfo(){
    let exists = 0
    let inproject = 0
    users.map(user => {
      if(user.email === text){
        exists = 1
        projects.map(project => {
          if (project.name === sessionStorage.getItem("ActiveProject")){ 
            project.users.map(projectuser => {
              if(projectuser.email === text){
                inproject = 1
              }
            })
          }
        })
      }
    })
    if(exists === 0){
      setCheckExists(true)
    }
    if(inproject === 1){
      setCheckUser(true)
    }

    if(!checkUser && !checkExists){
      addusers(sessionStorage.getItem("ActiveProject"), text)
    }
  }

  return (props.trigger) ? (
    <div className="popup_bg">
        <div className="add_user_popup">
          <div style={{fontSize: "23px", margin: "5px"}}>Add user</div>
          <div className="user">
            <div className="new_user">
              <input id="new_user" className="users_input" type="text" onChange={(event) => (onChangeHandler(event.target.value), setCheckExists(false), setCheckUser(false))} value={text} placeholder="Enter email" />
              {text ? (
                <button style={{marginRight: "5px"}} className="add_user_btn" onClick={() => (checkInfo())}>Add</button>
              ):(
                <button className="add_user_btn" style={{marginRight: "5px", backgroundColor: "gray"}} disabled>Add</button>
              )}
            </div>
          </div>
          {checkUser ? (
            <div className="error_text" style={{position: "absolute", marginLeft: "5px"}}>User already in project</div>
          ):("")}
          {checkExists ? (
            <div className="error_text" style={{position: "absolute", marginLeft: "5px"}}>User not found</div>
          ):("")}
          <div className="suggestions">
            {suggestions && suggestions.map((suggestion, index) => 
              <div key={index} className="suggestion" onClick={() => onSuggestHandler(suggestion.email)}>
                <div>{suggestion.name}</div>
                <div style={{fontSize: "10px", margin: "auto", marginLeft: "5px"}}>{suggestion.email}</div>
              </div>
            )}

          </div>
        </div>
      </div>
  ) : ""
}

export default AddUser