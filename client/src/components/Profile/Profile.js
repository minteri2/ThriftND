import React from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Rating,
  Grid,
  Typography 
} from '@mui/material';
import Navbar from '../Login/Navbar';
import ProductList from '../Product/ProductList';
import logo from '../Login/nd.png';

export default function ProfilePage() {
  const {username} = useParams();
  
  return (
    <div>
      {/* <Navbar/> */}
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        direction="column"
        //sx={{ bgcolor: 'primary.main' }}
      >
        {//className={classes.color}
}
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>Mauricio Interiano</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>@{username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>minteri2@nd.edu | 713-502-9151</Typography>
        </Grid>
        
        <Grid 
        container
        justifyContent="space-around"
        alignItems="center"
        direction="column"
        xs={10}>
          <Grid item xs={12}>
            <Typography variant="h4">Available Products:</Typography>
          </Grid>
          <Grid item xs={10}>
            <ProductList products={itemData}/>
          </Grid>
        </Grid>     

        <Grid 
        container
        justifyContent="space-around"
        alignItems="center"
        direction="column"
        xs={10}>
          <Grid item xs={12}>
            <Typography variant="h4" align="left">Sold in the Past:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Rating name="half-rating-read" defaultValue={3.54} precision={0.1} readOnly size="large"/>
          </Grid>
          <Grid item xs={10}>
            <ProductList type='sold' products={itemData}/>
          </Grid>
        </Grid>  

      </Grid>
    </div>
  );
}

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
  }
];