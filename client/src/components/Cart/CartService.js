export const addToCart = (username, prod_id) => {
  return fetch(`/addCart?prod_id=${prod_id}&username=${username}`).then(
    res => res.json()
  ).then(
    data => {return data}
  )
}

export const removeFromCart = (username, prod_id) => {
  return fetch(`/removeCart?username=${username}&prod_id=${prod_id}`).then(
    res => res.json()
  ).then(
    data => {return data}
  )
}

export const reserveItem = (username, prod_id) => {
  return fetch(`/reserve?prod_id=${prod_id}&username=${username}`).then(
    res => res.json()
  ).then(
    data => {return data}
  )
}

export const removeReserved = (prod_id) => {
  return fetch(`/unreserve?prod_id=${prod_id}`).then(
    res => res.json()
  ).then(
    data => {return data}
  )
}
