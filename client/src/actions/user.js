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
    console.log(response.data.user.name)
    alert(response.data.user.name)

  } catch (e) {
    alert(e.response.data.message)
  } 
}