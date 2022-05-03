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



export default function GroupForm({ onClick, onChange }) {
  
  return (

    <div>
      <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      rowSpacing={2}
    >
      <h1>Create Group Below:</h1>
      <Grid item xs={4}>
        <TextField
          required
          id="group-name-input"
          label="Group name"
          placeholder="Group Name"
          name="groupname"
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="group-desc-input"
          label="Group Description"
          placeholder="Group Description"
          name="groupdesc"
          onChange={onChange}
        />
      </Grid>
      
      <Grid item xs={4}>
        <Button variant="contained" onClick={onClick}>Create</Button>         
      </Grid>
    </Grid>
    </div>
    
  );
}