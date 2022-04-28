import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';



export default function Cart() {
  return (

    <div>
      <Navbar/>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
      >
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>

      </Grid>
      <img src={require('./lala.jpg')} alt="Login-pic" width="100%"/>
 
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Username"
            placeholder="Username"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined">Login</Button>         
        </Grid>
        <p textAlign="center">or</p>
        <Grid item xs={4}>
          <Link to="/register">
            <Button variant="contained">Sign Up</Button>
          </Link>       
        </Grid>
        
      </Grid>
        
    </div>
    
  );
}