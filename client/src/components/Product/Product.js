import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Grid,
  Typography ,
  Box,
  Button,
  Rating
} from '@mui/material';
import Navbar from '../Login/Navbar';
import ProductList from '../Product/ProductList';
import logo from '../Login/nd.png';

export default function ProfilePage() {
  const {product_id} = useParams();

  const [data, setData] = useState([{}]);

  let main_product; 
  let seller;
  let prod_review;

  useEffect(() => {
    fetch("/products").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])
  if (typeof data.products !== 'undefined') {
    console.log(data.reviews);
  }
  

  if (typeof data.products !== 'undefined') {
    data.products.map((product,i) => {
      if (product_id == product.prod_id){
        main_product = product;
        data.users.map((user) => {
          if (user.user_id == product.seller_id){
            seller = user;
          }
        })
        data.reviews.map((review) => {
          if (review.prod_id == product.prod_id){
            prod_review = review;
          }
        })
      }
    })
  }
  
  return (
    <div>
      <Navbar/>
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
          <Grid container xs={10} justifyContent="space-evenly">
            <Grid item xs={5} >
              <Box
                component="img"
                sx={{
                  height: '100%',
                  width: '100%',
                  // maxHeight: { xs: 233, md: 167 },
                  // maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={main_product.img}
              />
            </Grid>
            <Grid container 
              xs={5} 
              justifyContent="flex-start"
              direction="column"
              alignItems="center"
              rowSpacing={2}
              sx={{
                marginTop: '20px'
              }}>
              <Typography 
                align="center"
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  width:'100%',
                }}>
                {main_product.prod_name}
              </Typography>
              <Typography 
                align="center"
                variant="h6" 
                sx={{ 
                  width:'100%',
                }}>
                Sold By: {seller.first_name} {seller.last_name}
              </Typography>
              <Typography 
                align="center"
                variant="h6" 
                sx={{ 
                  width:'100%',
                }}>
                @{seller.username}
              </Typography>
              <Typography 
                variant="h5" 
                align="center"
                sx={{ 
                  fontWeight: 'bold',
                  width:'100%',
                }}>
                ${main_product.prod_price.toFixed(2)}
              </Typography>
              {/* <Grid item>
                    <Button variant="outlined">Reserve (24hr)</Button>        
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Add to Cart</Button> 
              </Grid> */}
              <Grid item>
                <Typography> {main_product.prod_desc}
                </Typography>
              </Grid>
              {main_product.prod_status === 0 ? (
                <Grid container
                justifyContent="flex-start"
                direction="column"
                alignItems="center"
                rowSpacing={2}
                sx={{
                  marginTop: '5px'
                }}>
                  <Grid item>
                    <Button variant="outlined">Reserve (24hr)</Button>        
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Add to Cart</Button> 
                  </Grid>
                </Grid>
              ) : (
                <Grid container
                justifyContent="flex-start"
                direction="column"
                alignItems="center"
                rowSpacing={2}
                sx={{
                  marginTop: '40px'
                }}>
                  <Grid>
                    <Typography variant="h5"
                    sx={{ 
                      fontWeight: 'bold',
                    }}>Review</Typography>
                  </Grid>
                  <Grid item>
                    <Rating name="half-rating-read" defaultValue={prod_review.rating} precision={0.1} readOnly size="large"/>
                  </Grid>
                  <Grid>
                    <Typography>{prod_review.review_desc}</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        )}
    </div>
  );
}

