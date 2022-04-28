import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar2 from '../Navbar/Navbar2';
import "../../App.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Typography } from "@mui/material";



export default function LoginForm({ onClick, onChange }) {
  const [show, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow(!show);
  };
  return (

    <div>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
        sx={{
          marginTop: '20px'
        }}
      >
 
        <Grid container xs={12} alignItems="center" sx={{marginBottom: '15px'}}>
          <Grid item xs={9}>
            <TextField
              required
              id="username-input"
              label="Username"
              placeholder="Username"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid container xs={12} alignItems="center">
          <Grid item xs={9}>
            <TextField
              id="password-input"
              label="Password"
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Grid>
        </Grid>
        <Grid container xs={12} alignItems="center" justifyContent="center" sx={{marginTop: '15px'}}>
          <Grid item xs={9} sx={{marginBottom: '15px'}}>
            <Grid container justifyContent="center">
              <Button variant="outlined" onClick={onClick}>Login</Button>
            </Grid>       
          </Grid>
          <Grid item xs/>
          <Grid item xs={9} sx={{marginBottom: '15px'}}>
            <Typography textAlign="center">or</Typography>
          </Grid>
          <Grid item xs/>
          <Grid item xs={9}>
            <Grid container justifyContent="center">
              <Link to="/register" className="links">
                <Button variant="contained">Sign Up</Button>
              </Link>
            </Grid>  
          </Grid>
          <Grid item xs/>
        </Grid>
        
      </Grid>
        
    </div>
    
  );
}