import React, { useState, useEffect } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";
import {
  Rating,
  Grid,
  Typography
} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Product/ProductList';
import { Identity } from "@mui/base";
import UserResults from "./UserResults";
import ProductResults from "./ProductResults";
import GroupResults from "./GroupResults";
import axios from 'axios';
export const signUp = (newUser) => {
  return axios.get(`http://18.205.219.249:5000/register?username=${newUser.username}&fname=${newUser.firstName}&lname=${newUser.lastName}&email=${newUser.email}&phone=${newUser.phone}&password=${newUser.password}`).then(
    res => {return res.data;}
  )
}

 
export default function SearchResults() {
  const location = useLocation();
 
  const {query} = useParams();
 
  const [data, setData] = useState([{}]);
 
  useEffect(() => {
    axios.get(`http://18.205.219.249:5000/search?q=${query}`).then(
      res => {
        setData(res.data);
      }
    );
  }, [query])
 
  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }
 
 
 
  return (
 
 
    <div>
      <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
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
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>Search Results:</Typography>
        </Grid>
        {data.products.length > 0 ? (
          <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
          xs={10}>
            <Grid item xs={12}>
              <Typography variant="h4">Products:</Typography>
            </Grid>
            <Grid item xs={10}>
              <ProductResults cartItems={location.state.cartItems} user={location.state.user} products={data.products}/>
            </Grid>
          </Grid>
          ) : (
            <Typography variant="h4">No Products Found</Typography>
        )}  
        {data.users.length > 0 ? (
          <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
          xs={10}>
            <Grid item>
              <Typography variant="h4" align="left">Users:</Typography>
            </Grid>
            <Grid container >
              <UserResults cartItems={location.state.cartItems} authUser={location.state.user} users={data.users}/>
            </Grid>
          </Grid>          
          ) : (
            <Typography variant="h4">No Users Found</Typography>
        )}
        {data.groups.length > 0 ? (
          <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
          xs={10}>
            <Grid item>
              <Typography variant="h4" align="left">Groups:</Typography>
            </Grid>
            <Grid container >
              <GroupResults cartItems={location.state.cartItems} authUser={location.state.user} groups={data.groups}/>
            </Grid>
          </Grid>          
          ) : (
            <Typography variant="h4">No Groups Found</Typography>
        )}
       
      </Grid>
        )}
    </div>
  );
}
