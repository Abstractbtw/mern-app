import axios from 'axios'

export const registration = async (name, password) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/auth/registration`, {name, password})
    alert(response.data.message)
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



export const addusers = async (name, username) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/auth/addusers`, {name, username})
    document.location.reload()
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



export const addcomment = async (name, username, comment) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/auth/addcomment`, {name, username, comment})
    document.location.reload()
  } catch (e) {
    alert(e.response.data.message)
  }
}



export const deleteproject = async (name) => {
  try{
    const answer = window.confirm("Are you sure?")
    if (answer) {
      const response = await axios.post(`http://localhost:5000/api/auth/deleteproject`, {name})
      document.location.reload()
    }
  } catch (e) {
    alert(e.response.data.message)
  }
}



export const addtime = async (name, time) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/auth/addtime`, {name, time})
    document.location.reload()
  } catch (e) {
    alert(e.response.data.message)
  }
}