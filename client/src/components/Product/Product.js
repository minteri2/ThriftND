import React, { useState, useEffect } from "react";
import { Redirect, useParams, useLocation } from "react-router-dom";
import { 
  Grid,
  Typography ,
  Box,
  Button,
  Rating
} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { addToCart, reserveItem } from "../Cart/CartService";

export default function ProductPage() {
  const location = useLocation();


  const {product_id} = useParams();

  const [prod, setProd] = useState([{}]);
  const [fetched, setFetched] = useState(false)
  const [add, setAdd] = useState(false);
  const [reserv, setReserv] = useState(false);

  useEffect(() => {
    if (!fetched) {
      fetch(`/product?prod_id=${product_id}`).then(
        res => res.json()
      ).then(
        data => {
          setProd(data)
          setFetched(true);
          console.log(data);
        }
      )
    }

    if (add) {
      addToCart(location.state.user, product_id).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            alert('Product succesfully added to your cart!');
          }
          setAdd(false);
        }
      )
    }

    if (reserv) {
      reserveItem(location.state.user, product_id).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            alert('Product succesfully reserved! You can now go to your Cart to view your reserved products.');
            setProd({
              ...prod,
              'product': {
                ...prod.product,
                'status' : 1
              }
            });
          }
          setReserv(false);
        }
      )
    }
    

  }, [add, reserv])

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

  const onClickAddHandler = () => {
    setAdd(true);
  }

  const onClickReserveHandler = () => {
    setReserv(true);
  }
  
  return (
    <div>
      <Navbar user={location.state.user} />
      {(typeof prod.product === 'undefined') ? (
          <p>Loading...</p>
        ): (
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
        >
          <Grid container xs={10} justifyContent="space-evenly">
            <Grid item xs={5} >
              <Box
                component="img"
                sx={{
                  height: '100%',
                  width: '100%',
                }}
                alt="The house from the offer."
                src={prod.product.png_file}
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
                {prod.product.prod_name}
              </Typography>
              <Typography 
                align="center"
                variant="h6" 
                sx={{ 
                  width:'100%',
                }}>
                Sold By: {prod.seller.first_name} {prod.seller.last_name}
              </Typography>
              <Typography 
                align="center"
                variant="h6" 
                sx={{ 
                  width:'100%',
                }}>
                @{prod.seller.username}
              </Typography>
              <Typography 
                variant="h5" 
                align="center"
                sx={{ 
                  fontWeight: 'bold',
                  width:'100%',
                }}> 
                ${prod.product.price.toFixed(2)}
              </Typography>
              <Grid item>
                <Typography> {prod.product.prod_desc}
                </Typography>
              </Grid>
              {prod.product.status === 0 ? (
                <Grid container
                justifyContent="flex-start"
                direction="column"
                alignItems="center"
                rowSpacing={2}
                sx={{
                  marginTop: '5px'
                }}>
                  <Grid item>
                    <Button variant="outlined" onClick={onClickReserveHandler}>Reserve (24hr)</Button>        
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={onClickAddHandler}>Add to Cart</Button> 
                  </Grid>
                </Grid>
              ) : (prod.product.status === 2 ? (
                <Grid container>
                  { prod.hasOwnProperty("review") ? (
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
                        <Rating name="half-rating-read" defaultValue={prod.review.rating} precision={0.1} readOnly size="large"/>
                      </Grid>
                      <Grid>
                        <Typography>{prod.review.review_desc}</Typography>
                      </Grid> 
                      <Grid>
                        <Typography>Reviewed by: {prod.review.reviewer_username}</Typography>
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
                          }}>This Product has Already Been Sold</Typography>
                        </Grid>
                      </Grid>
                    )}  
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
                    }}>This Product is Currently Reserved</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        )}
    </div>
  );
}

