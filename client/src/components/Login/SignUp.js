import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navbar2 from '../Navbar/Navbar2';

export default function SignUp() {
  return (
    <div >
     
      <Navbar2/>

      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
      >
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>

      </Grid>
      <img src={require('./login_image.PNG')} alt="signup-pic" width="100%"/>
      <h1>Sign up below:</h1>
        
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            placeholder="First Name"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            placeholder="Last Name"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="Email"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-required"
            label="Phone Number"
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
          <Button variant="contained">Sign Up</Button>         
        </Grid>
        </Grid>
      
        
    </div>
        
  );
}