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
  console.log(product_id)

  const [product, setProduct] = useState([{}]);
  const [data, setData] = useState([{}]);
  console.log(data)
  let seller;
  let prod_review;

  useEffect(() => {
    fetch(`/product?prod_id=${product_id}`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])
  if (typeof data.product !== 'undefined') {
    console.log(data.product);
  }
  

  // if (typeof data.products !== 'undefined') {
  //   data.products.map((product,i) => {
  //     if (product_id == product.prod_id){
  //       main_product = product;
  //       data.users.map((user) => {
  //         if (user.user_id == product.seller_id){
  //           seller = user;
  //         }
  //       })
  //       data.reviews.map((review) => {
  //         if (review.prod_id == product.prod_id){
  //           prod_review = review;
  //         }
  //       })
  //     }
  //   })
  // }
  
  return (
    <div>
      <Navbar/>
      {(typeof data.product === 'undefined') ? (
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
                src={data.product.png_file}
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
                {data.product.prod_name}
              </Typography>
              <Typography 
                align="center"
                variant="h6" 
                sx={{ 
                  width:'100%',
                }}>
                Sold By: {data.seller.first_name} {data.seller.last_name}
              </Typography>
              <Typography 
                align="center"
                variant="h6" 
                sx={{ 
                  width:'100%',
                }}>
                @{data.seller.username}
              </Typography>
              <Typography 
                variant="h5" 
                align="center"
                sx={{ 
                  fontWeight: 'bold',
                  width:'100%',
                }}> 
                ${data.product.price.toFixed(2)}
              </Typography>
              <Grid item>
                <Typography> {data.product.prod_desc}
                </Typography>
              </Grid>
              {data.product.status === 0 ? (
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
                    <Rating name="half-rating-read" defaultValue={data.review.rating} precision={0.1} readOnly size="large"/>
                  </Grid>
                  <Grid>
                    <Typography>{data.review.review_desc}</Typography>
                  </Grid> 
                  <Grid>
                    <Typography>Reviewed by: {data.review.reviewer_username}</Typography>
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

