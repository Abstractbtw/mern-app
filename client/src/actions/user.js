import axios from 'axios'

export const registration = async (name, password) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/auth/registration`, {name, password})
    alert(response.data.message)
    window.location.replace("http://localhost:3000/")
  } catch (e) {
    alert(e.response.data.message)
  }
}


export const login = async (name, password) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/auth/login`, {name, password})
    localStorage.setItem('name', response.data.user.name)
    localStorage.setItem('role', response.data.user.role)
    document.location.reload()
    window.location.replace("http://localhost:3000/")
  } catch (e) {
    alert(e.response.data.message)
  } 
}



export const addproject = async (name, desc) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/auth/addproject`, {name, desc})
    document.location.reload()
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}



export const addusers = async (name) => {
  try{
    const username = document.getElementById("new_user").value
    if(username){
      const response = await axios.post(`http://localhost:5000/api/auth/addusers`, {name, username})
      document.location.reload()
      document.getElementById("update").style.display = "none"
    }
    else alert("Empty field")
  } catch (e) {
    alert(e.response.data.message)
  }
}



export const deleteuser = async (name, username) => {
  try{
    const answer = window.confirm("Are you sure?")
    if (answer) {
      const response = await axios.post(`http://localhost:5000/api/auth/deleteuser`, {name, username})
      document.location.reload()
    }
  } catch (e) {
    alert(e.response.data.message)
  }
}



export const addcomment = async (name, username) => {
  try{
    let comment = document.getElementById("new_comment").value
    if(comment){
      const response = await axios.post(`http://localhost:5000/api/auth/addcomment`, {name, username, comment})
      document.location.reload()
    }
    else alert("Empty comment")
  } catch (e) {
    alert(e.response.data.message)
  }
}



export const deleteproject = async (name) => {
  try{
    const answer = window.confirm("Are you sure?")
    if (answer) {
      const response = await axios.post(`http://localhost:5000/api/auth/closeproject`, {name})
      document.location.reload()
    }
  } catch (e) {
    alert(e.response.data.message)
  }
}



export const addtime = async (name, time, from, finishDate) => {
  try{
    const answer = window.confirm("Are you sure?")
    if (answer && Date.parse(time) >= Date.parse(from)) {
      const response = await axios.post(`http://localhost:5000/api/auth/addtime`, {name, time, finishDate})
      document.location.reload()
    }
    else alert("Wrong date")
  } catch (e) {
    alert(e.response.data.message)
  }
}



export const checkclose = async (name, to) => {
  try{
    const now = new Date()
    if (Date.parse(now) >= Date.parse(to)) {
      const response = await axios.post(`http://localhost:5000/api/auth/closeproject`, {name})
      document.location.reload()
    }
  } catch (e) {
    alert(e.response.data.message)
  }
}