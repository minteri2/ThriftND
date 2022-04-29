export const signUp = (newUser) => {
  return fetch(`/register?username=${newUser.username}&fname=${newUser.firstName}&lname=${newUser.lastName}&email=${newUser.email}&phone=${newUser.phone}&password=${newUser.password}`).then(
    res => res.json()
  ).then(
    data => {
      return data
    }
  )
}

export const logIn = (username, password) => {
  return fetch(`/login?username=${username}&password=${password}`).then(
    res => res.json()
  ).then(
    data => {
      return data
    }
  )
}