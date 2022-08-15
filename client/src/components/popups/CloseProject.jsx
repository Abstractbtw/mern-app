import React from 'react'
import './popup.css'
import {closeproject} from '../../actions/user'

function CloseProject(props){
  return (props.trigger) ? (
      <div className="popup_bg">
          <div className="close_project_popup">
            <div style={{fontSize: "23px", margin: "5px"}}>Are you sure?</div>
            <div style={{padding: "15px"}}>
              <button className="main_button" style={{float: "left"}} onClick={() => (closeproject(sessionStorage.getItem("ActiveProject")), props.setTrigger(false))}>Yes</button>
              <button className="main_button" style={{float: "right"}} onClick={() => props.setTrigger(false)}>Cancel</button>
            </div>
          </div>
        </div>
    ) : ""
}

export default CloseProject