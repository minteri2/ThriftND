import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SignUp() {
  return (
    <div>
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