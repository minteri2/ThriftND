import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';



export default function Homepage() {
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
      <img src={require('./homepagepic.PNG')} alt="home-pic" width="100%"/>    
        
        
      </Grid>

      <Grid container direction={"row"}>
            <Grid item style={{width: '500px'}}>
            <img src={require('./ndstuff2.jpg')} alt="home-pic" width="100%"/> 
            </Grid>
			<Grid 
        justifyContent="space-around"
        alignItems="center">
          <h1>About Us</h1>
          <p>Whether it is Notre Dame gear, textbooks, lab materials, dorm decor, appartment furniture, 
            football tickets, or anything else you might need for school, we've got you. 
            Our platform allows ND students and staff to sell or buy secondhand items that
          </p>
      </Grid> 
			
      </Grid>
      
        
    </div>
    
  );
}