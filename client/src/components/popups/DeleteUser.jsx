import React from 'react'
import './popup.css'
import {deleteuser} from '../../actions/user'

function DeleteUser(props){
  return (props.trigger) ? (
      <div className="popup_bg">
          <div className="close_project_popup">
            <div style={{fontSize: "23px", margin: "5px"}}>Are you sure?</div>
            <div style={{padding: "15px"}}>
              <button className="main_button" style={{float: "left"}} onClick={() => (deleteuser(props.project, props.user), props.setTrigger(false))}>Yes</button>
              <button className="main_button" style={{float: "right"}} onClick={() => props.setTrigger(false)}>Cancel</button>
            </div>
          </div>
        </div>
    ) : ""
}

export default DeleteUser