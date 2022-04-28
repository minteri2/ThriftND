import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useLocation, useHistory } from 'react-router-dom';



export default function Homepage() {
  const location = useLocation();
  const history = useHistory();

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    history.push('/login');
  }
  
  return (
    <div>
      <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
      >
      
      
      <img src={require('./homepagepic.PNG')} alt="home-pic" width="100%"/>    
      </Grid>
      <Grid container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
         >
            <Grid item style={{width: '500px', backgroundColor: 'black'}}>
            <img src={require('./ndstuff2.jpg')} alt="home-pic" width="100%"/> 
            </Grid>
			      <Grid container
            style={{width: '500px', backgroundColor: '#AD89A3'}}

             justifyContent="space-around"
             alignItems="center"
            >

           <h1>About Us</h1>
            <p>Whether it is Notre Dame gear, textbooks, lab materials, dorm decor, appartment furniture, 
            football tickets, or anything else you might need for school, we've got you. 
            Our platform allows ND students and staff to sell or buy secondhand items, chat, and 
            make groups to discuss different matters!
            </p>
          </Grid> 
      </Grid> 
			
      
        
    </div>
    
  );
}