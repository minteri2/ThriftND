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

export default function Order() {
  const location = useLocation();

  const {username} = useParams();

  const [prods, setProds] = useState([{}]);
  const [fetched, setFetched] = useState(false);
  const [unreserve, setUnreserve] = useState(false);
  const [addReserved, setAddReserved] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!fetched){
      fetch(`/orders?username=${location.state.user}`).then(
      res => res.json()
      ).then(
      data => {
          console.log(data);
          setProds(data)
          setFetched(true);
      }
      )
  }

  // if (checkout) {
  //   fetch(`/checkout?username=${location.state.user}&pay=${payment.paymentmethod}`).then(
  //     res => res.json()
  //     ).then(
  //     data => {
  //       alert('Congrats! Your order has been placed');
  //       history.push({
  //         pathname: `/order`,
  //         state: {
  //           user: location.state.user
  //         }});
  //     }
  //     )
  // }

  }, [])



  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

  const onChangeHandler = (product, i, e, newValue) => {
    const prod_copy = {...product};
    prod_copy.rating = newValue;
    const prods_copy = prods.products.slice()
    prods_copy.splice(i,1,prod_copy);
    setProds({'products': prods_copy});

  }

  return (
    <div>
      <Navbar user={location.state.user} />
      {typeof prods.products === 'undefined' ? (
        <Grid>
          <h1>Bought Products:</h1>
          <p>You have not bought products with us before</p>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="space-around"
          alignItems="left"
          direction="row"
          
          //sx={{ bgcolor: 'primary.main' }}
        >
          <Grid container xs={12} md={7} justifyContent="space-evenly" sx={{borderRight: 'solid',
                height: 'fit-content'}}>

          
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
              <h1>Bought Products:</h1>
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
                      <Grid item xs={12} md={8}>
                        <ImageListItem key={product.png_file}>
                          <img
                            src={`${product.png_file}`}
                            srcSet={`${product.png_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={product.prod_name}
                            loading="lazy"
                          />
                        </ImageListItem> 
                      </Grid>
                      <Grid container xs  rowSpacing={1} justifyContent='center' sx={{alignContent: 'center'}}>
                        <Grid item xs={12}>
                          <Typography sx={{fontWeight: 'bold'}} variant="h5" align="center">{product.prod_name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" align="center">${product.price.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container justifyContent="center" >
                        <Rating
                          name="simple-controlled"
                          value={product.rating}
                          onChange={(e,newValue) => {onChangeHandler(product, i,e,newValue)}}
                        />
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
    </div>
  );
}
