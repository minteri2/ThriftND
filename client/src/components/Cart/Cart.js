import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from '../Login/Navbar';
import Typography from '@mui/material/Typography';
import logo from '../Login/nd.png';
import CartList from '../Product/CartList';


const itemData = [
  {
    img: logo,
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  }];

export default function Cart(props) {
  

  return (

    <div>
      <Navbar/>
      <Grid 
        container 
        direction="column"
        >

        <Typography 
          variant="h4" 
          align="left" 
          color="black" 
          component="p" padding={2}>
          Shopping Cart <hr></hr>
        </Typography>
    
        <Grid
          container
          direction="row"
          alignItems="left"
          rowSpacing={2}
          marginLeft={2}
        > 
        <Grid item width="20%">
            <CartList type='sold' products={itemData}/>
          </Grid>
        </Grid>

      </Grid>
        
    </div>
    
  );
}