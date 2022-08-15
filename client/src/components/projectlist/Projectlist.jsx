import React, {useState, useEffect} from 'react'
import './projectlist.css'
import {addproject, addcomment, addtime, checkclose} from '../../actions/user'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'

import AddUser from "../popups/AddUser"
import CloseProject from "../popups/CloseProject"
import DeleteProject from "../popups/DeleteProject"
import DeleteUser from "../popups/DeleteUser"

function Projectlist(){

  const [Projectname, setName] = useState("")
  const [Projectdesc, setDesc] = useState("")
  const [projects, setProjects] = useState([])
  const [date, setDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState();

  const [opened, setOpened] = useState(true)
  const [closed, setClosed] = useState(false)

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

  const openedProjects = []
  const closedProjects = []
  projects.map(project => {
    if(project.status === "opened"){
      openedProjects.push(project)
    }
    else{
      closedProjects.push(project)
    }
  })

  const activeEmail = localStorage.getItem('email')
  const activeUser = localStorage.getItem('name')
  const activeRole = localStorage.getItem('role')

  const [comment, setComment] = useState("")


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

  let countProjects = 0

  function openProject(name){
    sessionStorage.setItem('Active', "true")
    sessionStorage.setItem("ActiveProject", name)
    document.location.reload()
  }

  const [deletedProject, setDeletedProject] = useState()
  const [deletedUser, setDeletedUser] = useState()

  const [showAdd, setShowAdd] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showDeleteProject, setShowDeleteProject] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)

  const activeUserProjects = []
  const userOpenedProjects = []
  const userClosedProjects = []
  projects.map(project => {
    project.users.map(user => (user.email.includes(activeEmail) ? (
        activeUserProjects.push(project)
    ):("")
    ))
  })
  activeUserProjects.map(project => {
    if(project.status === "opened"){
      userOpenedProjects.push(project)
    }
    else{
      userClosedProjects.push(project)
    }
  })

  function Projects({ currentProjects }) {
    return (
      currentProjects &&
      currentProjects.map((project, index) => (
        (project.status === "opened" && opened) || (project.status === "closed" && closed) ? (
          <tr className="table_project" key={index}>
            <td className="project_name" onClick={() => (openProject(project.name))}>{project.name}</td>
            <td className="table_desc" onClick={() => (openProject(project.name))}>{project.desc}</td>
            {project.status === "opened" ? (
              <td className="table_active" style={{color: "green"}} onClick={() => (openProject(project.name))}>{project.status}</td>
            ) : (
              <td className="table_active" style={{color: "red"}} onClick={() => (openProject(project.name))}>{project.status}</td>
            )}
            <td className="table_active" onClick={() => (openProject(project.name))}>{project.startDate}</td>
            {project.finishDate ? (
              <td className="table_active" onClick={() => (openProject(project.name))}>{project.finishDate}</td>
            ):(
              <td className="table_active" onClick={() => (openProject(project.name))}>-</td>
            )}
            {(project.status === "closed") && (activeRole !== "User") ? (<td className="project_delete"><button className="main_btn" onClick={() => (setShowDeleteProject(true), setDeletedProject(project.name))}>Delete</button></td>):(<></>)}
          </tr>
        ):("")
      ))
    )
  }

  function ProjectsCount({currentProjects}){
    return(
      <>
        {currentProjects &&
          <tr style={{backgroundColor: "white", borderTop: "5px solid lightgray"}}>
            <td>
              <div style={{paddingLeft: "5px", color: "gray"}}>Projects on page: {currentProjects.length}</div>
            </td>
          </tr>
        }
      </>
    )
  }

  let projectsPerPage = 5
  
  function PaginatedProjects() {

    const [currentProjects, setCurrentProjects] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [projectsOffset, setProjectOffset] = useState(0)
    const [currentProjectsLength, setCurrentProjectsLength] = useState(0)

    useEffect(() => {
      if (opened && closed) {
        if(activeRole === "User"){
          setCurrentProjectsLength(activeUserProjects.length)
          const endOffset = projectsOffset + projectsPerPage
          setCurrentProjects(activeUserProjects.slice(projectsOffset, endOffset))
          setPageCount(Math.ceil(activeUserProjects.length / projectsPerPage))
        }else{
          setCurrentProjectsLength(projects.length)
          const endOffset = projectsOffset + projectsPerPage
          setCurrentProjects(projects.slice(projectsOffset, endOffset))
          setPageCount(Math.ceil(projects.length / projectsPerPage))
        }
      } else if (opened && !closed){
        if(activeRole === "User"){
          setCurrentProjectsLength(userOpenedProjects.length)
          const endOffset = projectsOffset + projectsPerPage
          setCurrentProjects(userOpenedProjects.slice(projectsOffset, endOffset))
          setPageCount(Math.ceil(userOpenedProjects.length / projectsPerPage))
        }else{
          setCurrentProjectsLength(openedProjects.length)
          const endOffset = projectsOffset + projectsPerPage
          setCurrentProjects(openedProjects.slice(projectsOffset, endOffset))
          setPageCount(Math.ceil(openedProjects.length / projectsPerPage))
        }
      } else {
        if(activeRole === "User"){
          setCurrentProjectsLength(userClosedProjects.length)
          const endOffset = projectsOffset + projectsPerPage
          setCurrentProjects(userClosedProjects.slice(projectsOffset, endOffset))
          setPageCount(Math.ceil(userClosedProjects.length / projectsPerPage))
        }else{
          setCurrentProjectsLength(closedProjects.length)
          const endOffset = projectsOffset + projectsPerPage
          setCurrentProjects(closedProjects.slice(projectsOffset, endOffset))
          setPageCount(Math.ceil(closedProjects.length / projectsPerPage))
        }
      }
    }, [projectsOffset, projectsPerPage])

    const handlePageClick = (event) => {
      const newOffset = (event.selected * projectsPerPage) % currentProjectsLength
      setProjectOffset(newOffset)
    }
  
    return (
      <>
      {currentProjectsLength > 0 ? (
        <>
          <Projects currentProjects={currentProjects} />
          <ProjectsCount currentProjects={currentProjects} />
          <tr style={{backgroundColor: "white"}}>
            <td>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </td>
          </tr>
        </>
        ):(
          <tr style={{backgroundColor: "white", borderTop: "5px solid lightgray"}}><td>No projects found</td></tr>
        )}
      </>
    )
  }

  return (
    <div>
      
      <AddUser trigger={showAdd} setTrigger={setShowAdd} />

      <CloseProject trigger={showClose} setTrigger={setShowClose} />

      <DeleteProject trigger={showDeleteProject} setTrigger={setShowDeleteProject} project={deletedProject} />

      <DeleteUser trigger={showDeleteUser} setTrigger={setShowDeleteUser} project={deletedProject} user={deletedUser} />

      {sessionStorage.getItem('Active') !== "false" ? (
        <div>
          {projects.map((project, index) => (
            <div key={index}>
              {project.name === sessionStorage.getItem("ActiveProject") ? (
                project.status === "opened" ? (
                checkclose(project.name, project.to)
                ):(<></>),
                <div className="project_background">
                  <div className="project_main">

                    <div className="project_top">
                      <div className="opened_project_name">{project.name}</div>
                      <button className="project_close" onClick={() => (sessionStorage.setItem('Active', "false"), sessionStorage.setItem("ActiveProject", ""), document.location.reload())}>&times;</button>
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
                                              {user.name}
                                              {activeRole === "Admin" && project.status === "opened" ? (
                                                <button className="delete_btn" onClick={() => (setShowDeleteUser(true), setDeletedUser(user), setDeletedProject(project.name))}>Delete</button>
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
                                            <button className="add_user_btn" onClick={() => (setShowAdd(true))}>Add user</button>
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
                                <input className="comment_input" type="text" placeholder="Comment..." value={comment} onChange={(event) => setComment(event.target.value)}/>
                                {comment ? (
                                    <button className="comment_btn" onClick={() => (addcomment(project.name, activeUser, comment), setComment(""))}>Send</button>
                                  ):(
                                    <button className="comment_btn" style={{backgroundColor: "gray"}} disabled>Send</button>
                                  )}
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
                          <button className="close_btn" onClick={() => setShowClose(true)}>Close project</button>
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
                      {Projectname && Projectdesc ? (
                        <button className="project_btn" onClick={() => (addproject(Projectname, Projectdesc), setName(""), setDesc(""))}>Add project</button>
                      ):(
                        <button className="disabled_project_btn" disabled>Add project</button>
                      )}
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

                      <tr style={{borderLeft: "5px solid lightgray", borderRight: "5px solid lightgray", cursor: "default"}}>
                        <td className="table_head">Project name</td>
                        <td className="table_head">Description</td>
                        <td className="table_head">Status</td>
                        <td className="table_head">Date of start</td>
                        <td className="table_head">Date of close</td>
                      </tr>
                      

                      <PaginatedProjects/>


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

                      <tr style={{borderLeft: "5px solid lightgray", borderRight: "5px solid lightgray", cursor: "default"}}>
                        <td className="table_head">Project name</td>
                        <td className="table_head">Description</td>
                        <td className="table_head">Status</td>
                        <td className="table_head">Date of start</td>
                        <td className="table_head">Date of close</td>
                      </tr>

                      <PaginatedProjects/>

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