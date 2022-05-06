import axios from 'axios';
export const signUp = (newUser) => {
  return axios.get(`http://18.205.219.249:5000/register?username=${newUser.username}&fname=${newUser.firstName}&lname=${newUser.lastName}&email=${newUser.email}&phone=${newUser.phone}&password=${newUser.password}`).then(
    res => {return res.data;}
  )
}

export const logIn = (username, password) => {
  return axios.get(`http://18.205.219.249:5000/login?username=${username}&password=${password}`).then(
    res => {return res.data;}
  )
}