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
import { removeFromCart } from './CartService';

export default function Cart() {
  const location = useLocation();

  const {username} = useParams();

  const [prods, setProds] = useState([{}]);
  const [remove, setRemove] = useState(false);
  const [fetched, setFetched] = useState(false)

  useEffect(() => {

    if (!fetched) {
      fetch(`/cart?username=${username}`).then(
        res => res.json()
      ).then(
        data => {
          setProds(data)
          setFetched(true)  
        }
      )
    }

    if (remove) {
      removeFromCart(username, remove).then(
        data => {
          if(data.hasOwnProperty("error")) {
            alert(data.error);
          }
          else {
            total = 0;
            prods.products.map((product, i) => {
              if (data.removed == product.prod_id) {
                const prod_copy = prods.products.slice();
                prod_copy.splice(i,1);
                setProds({
                  ... prods,
                  'products': prod_copy
                })
              }
              else {
                total += product.price;
              }
            })
            location.state.cartItems -= 1;

          }
          setRemove(false); 
        }
      )
    }



  }, [remove])

  let total = 0;
  if (typeof prods.products !== 'undefined') {
    prods.products.map((product) => {
      total += product.price;
    });
    location.state.cartItems = prods.products.length;
  }

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

  const onRemoveClickHandler = (prod_id) => {
    setRemove(prod_id);
  }




  return (
    <div>
      <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
      {typeof prods.products === 'undefined' ? (
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
          <Grid container xs={7} justifyContent="space-evenly">

          
            <Grid container 
              xs={8} 
              justifyContent="flex-start"
              direction="column"
              alignItems="left"
              rowSpacing={2}
              sx={{
                marginTop: '20px'
              }}
            >
              <h1>Shopping Cart:</h1>
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
              <h3>Your total is: ${total.toFixed(2)}</h3>
              <Link to="/register">
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
                      marginBottom: '20px'
                      }}
                    >
                      <Grid item xs={8}>
                        <ImageListItem key={product.png_file}>
                          <img
                            src={`${product.png_file}`}
                            srcSet={`${product.png_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={product.prod_name}
                            loading="lazy"
                          />
                        </ImageListItem>  
                      </Grid>
                      <Grid container xs rowSpacing={1} justifyContent='center' sx={{alignContent: 'center'}}>
                        <Grid item xs={12}>
                          <Typography sx={{fontWeight: 'bold'}} variant="h5" align="center">{product.prod_name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" align="center">${product.price.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item justifyContent="center" xs={5}>
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
          {/* <Divider orientation="vertical" 
          sx={{
                      height:'100%',
                      borderBottomWidth: 5
                    }}
                    /> 
          <Grid xs={4}>
            <Grid item>
              <Typography>hola</Typography>
            </Grid>
          </Grid> */}
        </Grid>
      )} 
    </div>
  );
}

