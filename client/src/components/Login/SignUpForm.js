import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SignUpForm({ onChange, onClick }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      rowSpacing={2}
    >
      <img src={require('./login_image.PNG')} alt="signup-pic" width="100%"/>
      <h1>Sign up below:</h1>
      <Grid item xs={4}>
        <TextField
          required
          id="username-input"
          label="Username"
          placeholder="Username"
          name="username"
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="fname-input"
          label="First Name"
          placeholder="First Name"
          name="firstName"
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="lname-input"
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="email-input"
          label="Email"
          placeholder="Email"
          name="email"
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="phone-input"
          label="Phone Number"
          name="phone"
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="-confirm-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          name="confPassword"
          onChange={onChange}
        />
      </Grid>     
      <Grid item xs={4}>
        <Button variant="contained" onClick={onClick}>Sign Up</Button>         
      </Grid>
    </Grid>
       
  );
}