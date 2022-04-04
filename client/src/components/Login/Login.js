import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Login() {
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
        <Grid item xs={6}>
          <img width ={500} height={500} src={require('./nd.png')}/>
        </Grid>
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
        <Grid item xs={4}>
          <Link to="/register">
            <Button variant="contained">Sign Up</Button>
          </Link>       
        </Grid>
        
      </Grid>
        
    </div>
    
  );
}