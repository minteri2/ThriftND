import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar2 from '../Navbar/Navbar2';
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import { logIn } from "./AuthService";



export default function Login() {

  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState();
  const [data, setData] = useState({});
  

  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (login && username && password) {

      logIn(username, password).then(
        data => {
          setData(data)
        }
      )

      setLogin(false);
    }
  
  }, [login, username, password]);

  if (typeof data.isAuthenticated !== 'undefined') {
    if (data.isAuthenticated) {
      history.push({
        pathname: '/home',
        state: {
          user: username
        }});
    }
    else {
      alert("We can't seem to find your account.");
    }

    setData({});
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLogin(true);
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.id == "username-input"){
            setUsername(e.target.value);
        } 
    
    if (e.target.id == "password-input"){
      setPassword(e.target.value);
    } 
  }  

  

  return (

    <div>
      <Navbar2/>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
      >
      <img src={require('./login_image.PNG')} alt="Login-pic" width="100%"/>
 
        <LoginForm onClick={onSubmitHandler} onChange={onChangeHandler}/>
        
      </Grid>
        
    </div>
    
  );
}