import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
//     sx={{ width: 500, height: 450 }}>
import Navbar from '../Login/Navbar';
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";


import { 
  Grid,
  Divider,
  Typography ,
  Box,
  Button,
  Rating
} from '@mui/material';

export default function Cart() {

  const {username} = useParams();
  console.log(username)

  const [data, setData] = useState([{}]);
  console.log(data)

  useEffect(() => {
    fetch(`/cart?username=${username}`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])
  let total = 0;
  if (typeof data.products !== 'undefined') {
    console.log(data.products);
    data.products.map((product) => {
      total += product.price;
    });
  }

  return (
    <div>
      <Navbar/>
      {typeof data.products === 'undefined' ? (
        <Grid>
        <h1>Shopping Cart:</h1>
        <p>Your cart is empty!</p>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="space-around"
          alignItems="left"
          direction="column"
          //sx={{ bgcolor: 'primary.main' }}
        >
          <Grid container xs={7} justifyContent="space-evenly">

          
      <Grid container 
              xs={8} 
              justifyContent="flex-start"
              direction="column"
              alignItems="left"
              rowSpacing={2}
              sx={{
                marginTop: '20px'
              }}>
        <h1>Shopping Cart:</h1>
      

    <ImageList sx={{ width: 700}} cols={2}>
      {data.products.map((product, i) => (
        <div>
          <ImageListItem key={product.png_file}>
          <img
            src={`${product.png_file}`}
            srcSet={`${product.png_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={product.prod_name}
            loading="lazy"
          />
          <ImageListItemBar
            title={product.prod_name}
            subtitle={<span>$ {product.price}</span>}
            position="below"
          />

        </ImageListItem>  
        <Divider sx={{
          marginBottom: "10px"
        }}/> 
        </div>
                  
        
      ))}
           
    
    </ImageList>
    </Grid>
    <Grid container 
              xs={3} 
              justifyContent="flex-start"
              direction="column"
              alignItems="right"
              rowSpacing={2}
              sx={{
                marginTop: '20px'
              }}>
      <h3>Your total is: ${total}</h3>
      <Link to="/register">
            <Button variant="contained">Checkout</Button>
          </Link>    

       </Grid>
       </Grid>
    </Grid>
      )}
      
    </div>
    
  );
}

