export const addToCart = (username, prod_id) => {
  return fetch(`/addCart?prod_id=${prod_id}&username=${username}`).then(
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
