import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Rating,
  Grid,
  Typography 
} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Product/ProductList';
import logo from '../Login/nd.png';
import { Identity } from "@mui/base";
import UserResults from "./UserResults";
import ProductResults from "./ProductResults";

export default function SearchResults() {
  const {query} = useParams();

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/search?q=${query}`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [query])

  console.log(data);

  
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
              <ProductResults products={data.products}/> 
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
              <UserResults users={data.users}/>
            </Grid>
          </Grid>           
          ) : (
            <Typography variant="h4">No Users Found</Typography>
        )}
      </Grid>
        )}
    </div>
  );
}