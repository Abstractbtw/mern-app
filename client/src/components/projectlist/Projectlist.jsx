import React, {useState, useEffect} from 'react'
import './projectlist.css'
import {addproject, addusers, deleteuser, addcomment, deleteproject} from '../../actions/user'

function Projectlist(){

  const [Projectname, setName] = useState("")
  const [Projectdesc, setDesc] = useState("")
  const [Projectuser, setProjectUser] = useState("")
  const [projects, setProjects] = useState([])
  const [activeUser, setActiveUser] = useState({})
  const [newComment, setNewComment] = useState()

  useEffect(function () {
    fetch('http://localhost:5000/projects', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setProjects(data))
  }, []);

  useEffect(function () {
    fetch('http://localhost:5000/currentUser', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => setActiveUser(data))
  }, []);

  return (
      <div className="project_container">
        {activeUser.name ? (
          <div>
            <div className="projects_header">
              {activeUser.role === "Admin" ? (
                <div className="list_header">
                <div>
                  <input className="project_input" onChange={(event)=>setName(event.target.value)} value={Projectname} type="text" placeholder="Enter name" /><br />
                  <input className="project_input" onChange={(event)=>setDesc(event.target.value)} value={Projectdesc} type="text" placeholder="Enter description" /><br />
                  <button className="project_btn" onClick={() => (addproject(Projectname, Projectdesc), setName(""), setDesc(""))}>Add project</button>
                </div>
              </div>
              ) : (
                <></>
              )}
            </div>
            <div className="projectlist">
              <table className="project_table">
                <thead>
                </thead>
                <tbody>


                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <>
                    { project.users.includes(activeUser.name) ? (
                      <tr className="table_tr" key={index}>
                        <td className="project_td1">
                          <div className="project_info">
                            <div className="project_name">
                              <h1>{project.name}</h1>
                            </div>
                            <div className="project_desc">
                              {project.desc}
                            </div>
                            <div className="project_bottom">
                              <div className="project_term">
                                <div className="project_header">Time</div>
                                <div>From:</div>
                                <div>To:</div>
                              </div>
                              <div className="project_users">
                                <div>
                                  <div className="project_header">Users</div>
                                  <div className="users_line">


                                    {project.users.length > 0 ? (
                                      project.users.map((user, index) => (
                                          <div className="user" key={index}>
                                            {user}
                                            {activeUser.role === "Admin" ? (
                                              <button className="delete_btn" onClick={() => (deleteuser(project.name, user))}>Delete</button>
                                              ):(
                                                <></>
                                              )}
                                            <br />
                                          </div>
                                      ))
                                    ) : (
                                      <div className="user">No users</div>
                                    )}

                                    {activeUser.role === "Admin" ? (
                                      <div className="user">
                                        <div className='new_user'>
                                          <input className="users_input" onChange={(event)=>setProjectUser(event.target.value)} type="text" placeholder="Add user"/>
                                          <button className="delete_btn" onClick={() => (addusers(project.name, Projectuser), setProjectUser(""))}>Add</button>
                                        </div>
                                      </div>
                                    ):(
                                      <></>
                                    )}
                                  </div> 
                                </div>
                              </div>
                            </div>
                            {activeUser.role === "Admin" ? (
                              <div>
                                <button className="close_btn" onClick={() => deleteproject(project.name)}>Close project</button>
                              </div>
                            ):(
                              <></>
                            )}
                          </div>
                        </td>
                        <td className="project_td2">
                          <div>
                            <div className="project_header">Comments</div>
                            <div className="project_comments">


                              {project.comments.length > 0 ? (
                                project.comments.map((comment, index) => (
                                  <div key={index}>
                                    <div className="comment">
                                      {comment.user}: {comment.comment}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div>No comments</div>
                              )}


                            </div>
                            {activeUser.role === "User" ? (
                              <div className="new_comment">
                                <input className="comment_input" onChange={(event)=>setNewComment(event.target.value)} type="text" placeholder="Comment..."/>
                                <button className="comment_btn" onClick={() => (addcomment(project.name, activeUser.name, newComment), setNewComment(""))}>Send</button>
                              </div>
                            ):(
                              <></>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}</>
                    ))
                  ):(
                    <tr><td><h1>No projects</h1></td></tr>
                  )}


                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="not_login">Log in to see projects</div>
        )}
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