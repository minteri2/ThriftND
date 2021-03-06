import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link, useParams, useLocation, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Navbar from '../Navbar/Navbar';
import { 
  Grid,
  Divider,
  Typography ,
  Box,
  Button,
  Rating
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { removeFromCart, addToCart, removeReserved } from './CartService';
import '../../App.css';

import axios from 'axios';


export default function Cart() {
  const location = useLocation();

  const {username} = useParams();

  const [prods, setProds] = useState([{}]);
  const [remove, setRemove] = useState(false);
  const [unreserve, setUnreserve] = useState(false);
  const [addReserved, setAddReserved] = useState(false);

  useEffect(() => {

      if (!remove && !unreserve && !addReserved) {
        axios.get(`http://18.205.219.249:5000/cart?username=${username}`).then(
          res => {setProds(res.data);}
        )
      }

    if (remove) {
      removeFromCart(username, remove).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            alert('Product successfully removed from cart.')

          }
          setRemove(false); 
        }
      )
    }

    if (addReserved) {
      addToCart(username, addReserved.prod_id).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            alert('Product succesfully added to cart.')
          } 
          setAddReserved(false);
        })
    }

    if (unreserve) {
      console.log(unreserve);
      removeReserved(unreserve).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            alert('Product removed from reserved list');
            
          }
          setUnreserve(false);
    })
  }

  }, [remove, addReserved, unreserve])

  let total = 0;
  if (typeof prods.products !== 'undefined') {
    prods.products.map((product) => {
      total += product.price;
    });
  }

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

  const onRemoveClickHandler = (prod_id) => {
    setRemove(prod_id);
  }

  const onAddReservClickHandler = (product, i) => {
    setAddReserved({
      ... product,
      'id': i
    });
  }


  const onRemoveReservClickHandler = (prod_id) => {
    setUnreserve(prod_id);
  }

  return (
    <div>
      <Navbar user={location.state.user} />
      {typeof prods.products === 'undefined' || prods.products.length === 0 ? (
        <Grid>
        <h1>Shopping Cart:</h1>
        <p>Your cart is empty!</p>
      </Grid>
      ) : (
        <Grid
          container
          justifyContent="space-around"
          alignItems="left"
          direction="row"
          
          //sx={{ bgcolor: 'primary.main' }}
        >
          <Grid container xs={12}   sx={{borderRight: 'solid',
                height: 'fit-content'}}>

          
            <Grid container 
              xs={10}
              justifyContent="flex-start"
              direction="column"
              alignItems="left"
              rowSpacing={2}
              sx={{
                marginTop: '20px',
                height: 'fit-content'
              }}
            >
              <h1>Shopping Cart:</h1>
            </Grid>
            <Grid container 
              xs={2} 
              // justifyContent="flex-start"
              direction="column"
              alignItems="right"
              // rowSpacing={2}
              sx={{
                marginTop: '20px'
              }}
            >
              <h3>Your total is: ${total.toFixed(2)}</h3>
              
              
              <Link to={{
                pathname: `/checkout`,
                state: {
                  user: location.state.user
                }}}
                className='links'>
                <Button variant="contained">Checkout</Button>
              </Link>    
              

            </Grid>

            <Grid container 
              xs={12} 
              justifyContent="flex-start"
              direction="column"
              alignItems="left"
              rowSpacing={10}
              sx={{
                marginTop: '20px'
              }}
            >
      
              <ImageList cols={1}>
                {prods.products.map((product, i) => (
                  <div>
                    <Grid container xs={12} sx={{
                      marginBottom: '20px',
                      }}
                    >
                      {/* <Grid item xs={12} md={8}> */}
                        <ImageListItem key={product.png_file}>
                          <img
                            src={`${product.png_file}`}
                            style={{height:300}}
                            srcSet={`${product.png_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={product.prod_name}
                            loading="lazy"
                          />
                        </ImageListItem> 
                      {/* </Grid> */}
                      <Grid container xs  rowSpacing={1} justifyContent='center' sx={{ alignContent: 'center'}}>
                        <Grid item xs={12}>
                          <Typography sx={{fontWeight: 'bold'}} variant="h5" align="center">{product.prod_name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" align="center">${product.price.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container justifyContent="center" >
                          <Button onClick={() => onRemoveClickHandler(product.prod_id)} variant="outlined" startIcon={<DeleteIcon />}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
            
                    </Grid>
                    <Divider sx={{
                      marginBottom: "10px",
                      borderBottomWidth: 5
                    }}/> 
                  </div>
                ))}
              </ImageList>
            </Grid>
          </Grid>
          </Grid>
          
          )}
          {typeof prods.products === 'undefined' || prods.reservations.length === 0 ? (
            <Grid>
            <h1>Reserved Items:</h1>
            <p>You have no reserved items!</p>
          </Grid>
          ) : (
          <Grid
          container
          justifyContent="space-around"
          alignItems="left"
          direction="row"
          
          //sx={{ bgcolor: 'primary.main' }}
        >
          <Grid container xs={12}   sx={{borderRight: 'solid',
                height: 'fit-content'}}></Grid>
          <Grid container 
              xs={8}
              justifyContent="flex-start"
              direction="column"
              alignItems="left"
              rowSpacing={2}
              sx={{
                marginTop: '20px',
                height: 'fit-content'
              }}
            >
              <h1>Reserved Items:</h1>
            </Grid>
            <Grid container 
              xs={4} 
              justifyContent="flex-start"
              direction="column"
              alignItems="right"
              rowSpacing={2}
              sx={{
                marginTop: '20px'
              }}
            >
                

            </Grid>
             <Grid container 
              xs={12} 
              justifyContent="flex-start"
              direction="column"
              alignItems="left"
              rowSpacing={10}
              sx={{
                marginTop: '20px'
              }}
            >
      
              <ImageList cols={1}>
                {prods.reservations.map((product, i) => (
                  <div>
                    <Grid container xs={12} sx={{
                      marginBottom: '20px',
                      }}
                    >
                      {/* <Grid item xs={12} md={8}> */}
                        <ImageListItem key={product.png_file}>
                          <img
                            src={`${product.png_file}`}
                            style={{height:300}}
                            srcSet={`${product.png_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={product.prod_name}
                            loading="lazy"
                          />
                        </ImageListItem> 
                      {/* </Grid> */}
                      <Grid container xs  rowSpacing={1} justifyContent='center' sx={{alignContent: 'center'}}>
                        <Grid item xs={12}>
                          <Typography sx={{fontWeight: 'bold'}} variant="h5" align="center">{product.prod_name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" align="center">${product.price.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container justifyContent="center" >
                        {!product.inCart && <Button variant="contained" onClick={() => onAddReservClickHandler(product,i)} sx={{marginRight:'15px'}}>Add to Cart</Button>} 
                      <Button onClick={() => onRemoveReservClickHandler(product.prod_id)} variant="outlined" startIcon={<DeleteIcon />}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
            
                    </Grid>
                    <Divider sx={{
                      marginBottom: "10px",
                      borderBottomWidth: 5
                    }}/> 
                  </div>
                ))}
              </ImageList>
            </Grid>
          </Grid>
          
      )} 
    </div>
  );
}

