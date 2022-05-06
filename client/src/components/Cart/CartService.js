import axios from 'axios';


export const addToCart = (username, prod_id) => {
  return axios.get(`http://18.205.219.249:5000/addCart?prod_id=${prod_id}&username=${username}`).then(
    res => {return res.data;}
  )
}

export const removeFromCart = (username, prod_id) => {
  return axios.get(`http://18.205.219.249:5000/removeCart?username=${username}&prod_id=${prod_id}`).then(
    res => {return res.data;}
  )
}

export const reserveItem = (username, prod_id) => {
  return axios.get(`http://18.205.219.249:5000/reserve?prod_id=${prod_id}&username=${username}`).then(
    res => {return res.data;}
  )
}

export const removeReserved = (prod_id) => {
  return axios.get(`http://18.205.219.249:5000/unreserve?prod_id=${prod_id}`).then(
    res => {return res.data;}
  )
}
