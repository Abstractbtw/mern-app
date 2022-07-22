import React, {useState, useEffect} from 'react'
import './projectlist.css'
import {addproject, addusers, deleteuser, addcomment, deleteproject, addtime, checkclose} from '../../actions/user'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Projectlist(){

  const [Projectname, setName] = useState("")
  const [Projectdesc, setDesc] = useState("")
  const [projects, setProjects] = useState([])
  const [date, setDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState();
  const [selectedProject, setProject] = useState("")
  const [users, setUsers] = useState([])
  const [opened, setOpened] = useState(true)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/projects', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setProjects(data))
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/users', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setUsers(data))
    
  }, []);


  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const onChangeHandler = (text) => {
    setText(text)
    let matches = []
    if (text.length > 0) {
      matches = users.filter(user =>{
        const regex = new RegExp(`${text}`, "gi")
        return user.name.match(regex)
      })
    }
    setSuggestions(matches)
  }

  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
  }


  const activeUser = localStorage.getItem('name')
  const activeRole = localStorage.getItem('role')


  const showOpened = (event) => {
    if (event.target.checked) {
      setOpened(true)
    } else {
      setOpened(false)
    }
  }

  const showClosed = (event) => {
    if (event.target.checked) {
      setClosed(true)
    } else {
      setClosed(false)
    }
  }

  function showupdate() {
    document.getElementById("update").style.display = "block"
  }


  return (
    <div>
      

      <div id="update" className="add_user_popup_bg">
        <div className="add_user_popup">
          <div style={{fontSize: "23px", margin: "5px"}}>Add user</div>
          <div className="user">
            <div className="new_user">
              <input id="new_user" className="users_input" type="text" onChange={(event) => (onChangeHandler(event.target.value))} value={text} placeholder="Add user" />
              <button style={{marginRight: "5px"}} className="add_user_btn" onClick={() => (addusers(sessionStorage.getItem("ActiveProject")))}>Add</button>
            </div>
          </div>
          <div className="suggestions">
            {suggestions && suggestions.map((suggestion, index) => 
              <div key={index} className="suggestion" onClick={() => onSuggestHandler(suggestion.name)}>{suggestion.name}</div>
            )}

          </div>
        </div>
      </div>



      {sessionStorage.getItem('Active') !== "false" ? (
        <div>
          {projects.map((project, index) => (
            <div key={index}>
              {project.name.includes(sessionStorage.getItem("ActiveProject")) ? (
                project.status === "opened" ? (
                checkclose(project.name, project.to)
                ):(<></>),
                <div className="project_background">
                  <div className="project_main">

                    <div className="project_top">
                      <div className="project_name">{project.name}</div>
                      <button className="project_close" onClick={() => (sessionStorage.setItem('Active', "false"), sessionStorage.setItem("ActiveProject", ""), window.location.reload())}>&times;</button>
                    </div>

                    <table className="project_mid">
                      <tbody>
                        <tr>

                          <td className="project_mid_left">
                            <div className="project_desc">
                              <div className="project_header" style={{color: "black"}}>Description</div>
                              {project.desc}
                            </div>
                            <div className="project_info">
                              <div className="project_term">
                                <div className="project_header">Time</div>
                                <div>From: {project.startDate}</div>
                                <div>To: {project.finishDate}</div>
                                {activeRole === "Admin" && project.status === "opened" ? (
                                  <div className="select_date">
                                    <div className="datepicker">
                                      <DatePicker className="datepicker" selected={date} placeholder="Add time" dateFormat="dd.MM.yyyy" 
                                        onChange={(date) => (setDate(date), setFinishDate(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()))} />
                                    </div>
                                    <button className='time_btn' onClick={() => (addtime(project.name, date, project.from, finishDate))}>Set date</button>
                                  </div>
                                ):(<></>)}
                              </div>
                              <div className="project_users">
                                  <div>
                                    <div className="project_header">Users</div>


                                      {project.users.length > 0 ? (
                                        project.users.map((user, index) => (
                                            <div className="user" key={index}>
                                              {user}
                                              {activeRole === "Admin" && project.status === "opened" ? (
                                                <button className="delete_btn" onClick={() => (deleteuser(project.name, user))}>Delete</button>
                                              ):(<></>)}
                                              <br />
                                            </div>
                                        ))
                                      ) : (
                                        <div className="user">No users</div>
                                      )}

                                      {activeRole === "Admin" && project.status === "opened" ? (
                                        <div>
                                          <div className="user">
                                            <button className="add_user_btn" onClick={() => showupdate()}>Add user</button>
                                          </div>
                                        </div>
                                      ):(<></>)}

                                  </div>
                                </div>
                              </div>
                          </td>
                          <td className="project_mid_right">
                            <div id="comments_div" className="project_comments">

                              {project.comments.length > 0 ? (
                                project.comments.map((comment, index) => (
                                  <div key={index}>
                                    <div className="comment">
                                      <div style={{display: "flex"}}>
                                        <div className="comment_user">{comment.user}</div>
                                        <div className="comment_time">{comment.time}</div>
                                      </div>
                                      <div>{comment.comment}</div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div>No comments</div>
                              )}

                            </div>
                            {activeRole === "User" && project.status === "opened" ? (
                              <div className="new_comment">
                                <input id="new_comment" className="comment_input" type="text" placeholder="Comment..."/>
                                <button className="comment_btn" onClick={() => (addcomment(project.name, activeUser))}>Send</button>
                              </div>
                            ):(<></>)}
                          </td>

                        </tr>
                      </tbody>
                    </table>

                    <div className="project_bottom">
                      <div style={{display: "flex", fontSize: "17px"}}>
                        <div style={{color: "gray"}}>Status:</div>
                        {project.status === "opened" ? (
                          <div style={{color: "green"}}>{project.status}</div>
                        ):(<div style={{color: "red"}}>{project.status}</div>)}
                      </div>
                      {activeRole === "Admin" && project.status === "opened" ? (
                        <div style={{marginLeft: "auto"}}>
                          <button className="close_btn" onClick={() => deleteproject(project.name)}>Close project</button>
                        </div>
                      ):(<></>)}
                    </div>

                  </div>
                </div>
              ):(<></>)}
            </div>
          ))}
        </div>
      ):(<></>)
    }


      <div className="project_container">
        {!activeUser ? (
          <div className="not_login">Log in to see projects</div>
        ) : ( 
          <div>
            {activeRole === "Admin" ? (
              <div>
                <div className="projects_header">
                  <div className="list_header">
                    <div>
                      <input className="project_input" onChange={(event)=>setName(event.target.value)} value={Projectname} type="text" placeholder="Enter name" /><br />
                      <input className="project_input" onChange={(event)=>setDesc(event.target.value)} value={Projectdesc} type="text" placeholder="Enter description" /><br />
                      <button className="project_btn" onClick={() => (addproject(Projectname, Projectdesc), setName(""), setDesc(""))}>Add project</button>
                    </div>
                  </div>
                  <div className="filter">
                    <input type="checkbox" defaultChecked="checked" onChange={showOpened} /> Opened
                    <br/>
                    <input type="checkbox" onChange={showClosed} /> Closed
                  </div>
                </div>
                <div className="projectlist">
                  <table className="project_table">
                    <thead>
                    </thead>
                    <tbody>


                      {projects.length > 0 ? (
                        projects.map((project, index) => (
                          (project.status === "opened" && opened) || (project.status === "closed" && closed) ? (
                            <tr className="table_tr" key={index}>
                                {project.status==="opened" ? (
                                  <td className="opened_project" onClick={() => (sessionStorage.setItem('Active', "true"), sessionStorage.setItem("ActiveProject", project.name), window.location.reload())}>
                                    <div className="project_name">
                                      <h1>{project.name}</h1>
                                    </div>
                                  </td>
                                ):(
                                  <td className="closed_project" onClick={() => (sessionStorage.setItem('Active', "true"), sessionStorage.setItem("ActiveProject", project.name), window.location.reload())}>
                                    <div className="project_name">
                                      <h1>{project.name}</h1>
                                    </div>
                                  </td>
                                )}
                            </tr>
                          ):(<></>)
                        ))
                      ):(
                        <tr><td><h1>No projects</h1></td></tr>
                      )}


                    </tbody>
                  </table>
                </div>
              </div>
            ):(
              <div>
                <div className="projects_header">
                  <div className="filter">
                    <input type="checkbox" defaultChecked="checked" onChange={showOpened} /> Opened
                    <br/>
                    <input type="checkbox" onChange={showClosed} /> Closed
                  </div>
                </div>
                <div className="projectlist">
                  <table className="project_table">
                    <thead>
                    </thead>
                    <tbody>


                      {projects.length > 0 ? (
                        projects.map((project, index) => (
                          <>
                            { project.users.includes(activeUser) ? (
                              (project.status === "opened" && opened) || (project.status === "closed" && closed) ? (
                                <tr className="table_tr" key={index}>
                                  {project.status==="opened" ? (
                                    <td className="opened_project" onClick={() => (sessionStorage.setItem('Active', "true"), sessionStorage.setItem("ActiveProject", project.name), window.location.reload())}>
                                      <div className="project_name">
                                        <h1>{project.name}</h1>
                                      </div>
                                    </td>
                                  ):(
                                    <td className="closed_project" onClick={() => (sessionStorage.setItem('Active', "true"), sessionStorage.setItem("ActiveProject", project.name), window.location.reload())}>
                                      <div className="project_name">
                                        <h1>{project.name}</h1>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              ):(<></>)
                            ) : (
                              <></>
                            )}
                          </>
                        ))
                      ):(
                        <tr><td><h1>No projects</h1></td></tr>
                      )}


                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Projectlist



/* Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description Description Description
 Description Description Description Description Description Description Description Description Description 
 Description Description Description Description Description Description */