import React, { useState, useEffect } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";
import { 
  Rating,
  Grid,
  Typography 
} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Product/ProductList';

export default function ProfilePage() {
  const location = useLocation();
  const {username} = useParams();
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch(`/user?user=${username}`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

  let rating = 0;
  let available = [];
  let sold = [];

  

  if (typeof data.products !== 'undefined') {
    let tot = 0;
    let num = 0;
    data.products.map((product) => {
      if (product.status == 2){
        sold.push(product)
      }
      else {
        available.push(product)
      }
      if (product.hasOwnProperty("rating")) {
        tot += product.rating;
        num += 1;
      }
    })
    rating = tot/num;
  }

  
  return (


    <div>
      <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
      {(typeof data.user === 'undefined') ? (
          <p>Loading...</p>
        ): (
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
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{data.user.first_name} {data.user.last_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>@{data.user.username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.user.email} | {data.user.phone}</Typography>
        </Grid>
        {available.length > 0 && 
          (
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
              <ProductList cartItems={location.state.cartItems} user={location.state.user} products={available}/> 
            </Grid>
          </Grid> )  
        }  
        {sold.length > 0 && (
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
              <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly size="large"/>
            </Grid>
            <Grid item xs={10}>
              <ProductList cartItems={location.state.cartItems} user={location.state.user} products={sold}/>
            </Grid>
          </Grid>  
        
          
        )}
      </Grid>
        )}
    </div>
  );
}

