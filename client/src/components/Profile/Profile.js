import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Rating,
  Grid,
  Typography 
} from '@mui/material';
import Navbar from '../Login/Navbar';
import ProductList from '../Product/ProductList';
import logo from '../Login/nd.png';
import { Identity } from "@mui/base";

export default function ProfilePage() {
  const {username} = useParams();

  const [data, setData] = useState([{}]);
  let main_user;
  let available = [];
  let sold = [];

  useEffect(() => {
    fetch("/products").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])


  if (typeof data.users !== 'undefined') {
    data.users.map((user,i) => {
      if (username == user.username){
        main_user = user;
      }
    })
  }

  if (typeof data.users !== 'undefined') {
    data.products.map((product,i) => {
      if (product.seller_id == main_user.user_id){
        if (product.prod_status == 0){
          available.push(product);
        }
        else {
          sold.push(product);
        }
      }
    })
  }

  
  return (


    <div>
      <Navbar />
      {(typeof data.products === 'undefined') ? (
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
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{main_user.first_name} {main_user.last_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>@{username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{main_user.email} | {main_user.phone}</Typography>
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
              {available && <ProductList products={available}/> }
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
              <Rating name="half-rating-read" defaultValue={3.54} precision={0.1} readOnly size="large"/>
            </Grid>
            <Grid item xs={10}>
              <ProductList products={sold}/>
            </Grid>
          </Grid>  
        
          
        )}
      </Grid>
        )}
    </div>
  );
}

