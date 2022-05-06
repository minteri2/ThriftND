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
import axios from 'axios';


export default function Order() {
  const location = useLocation();

  const {username} = useParams();

  const [prods, setProds] = useState([{}]);
  const [fetched, setFetched] = useState(false);
  const [unreserve, setUnreserve] = useState(false);
  const [addReserved, setAddReserved] = useState(false);
  const [rating, setRating] = useState(false);
  const [messages, setMessages] = useState();


  useEffect(() => {
    if (!fetched){
      axios.get(`http://18.205.219.249:5000/orders?username=${location.state.user}`).then(
      res => {
        setProds(res.data)
        setFetched(true);
        const mensajes = []
        res.data.products.map(() => {
          mensajes.push('');
        })
        setMessages(mensajes);
    }
      )
  }

  if (rating) {
    axios.get(`http://18.205.219.249:5000/addReview?username=${location.state.user}&rating=${rating.rating}&mess=${messages[rating.num]}&prod_id=${rating.prod_id}`).then(
      res => {
        const prod_copy = {... rating};
        prod_copy.message = messages[rating.num];
        const prods_copy = prods.products.slice()
        prods_copy.splice(rating.num,1,prod_copy);
        setProds({'products': prods_copy});
        setRating(false);
      }
      )
  }

  }, [rating])



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
    console.log(product.message)
  }

  const onChangeMessageHandler = (i, e) => {
    const messages_copy = messages.slice()
    messages_copy.splice(i,1,e.target.value);
    setMessages(messages_copy);
  }

  const onClickReviewHandler = (product, i) => {
    setRating({
      ...product,
      'num': i
    });
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

          <Grid container xs={12} justifyContent="space-evenly" sx={{
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
                        {product.hasOwnProperty("message") ? (
                          <div>
                          <Grid container justifyContent="center" sx={{marginBottom:'10px'}}>
                          <Rating
                            name="simple-controlled"
                            value={product.rating}
                            readOnly
                          />
                          </Grid>
                          <Grid container justifyContent="center" sx={{marginBottom:'10px'}}>
                          
                          <Typography  align="center">{product.message}</Typography>
                          </Grid>
                          </div>
                        ) : (
                          <div>
                          <Grid container justifyContent="center" sx={{marginBottom:'10px'}}>
                        <Rating
                          name="simple-controlled"
                          value={product.rating}
                          onChange={(e,newValue) => {onChangeHandler(product, i,e,newValue)}}
                        />
                        </Grid>
                        <Grid container justifyContent="center" sx={{marginBottom:'10px'}}>
                        
                          <TextField
                            id="review_mess-input"
                            label="Review Message"
                            multiline
                            name="message"
                            // value={newPay.address}
                            onChange={(e) => {onChangeMessageHandler(i,e)}}
                          />
                        </Grid>
                        <Grid container justifyContent="center" >
                        <Button variant="contained" onClick={() => {onClickReviewHandler(product, i)}}>Submit Review</Button>
                          </Grid>
                          </div>
                        )}
                        
                        
                      </Grid>
            
                    </Grid>
                    <Divider sx={{
                      marginBottom: "10px",
                      borderBottomWidth: 5
                    }}/> 
                  </div>
                ))}
              </ImageList>
            </Grid>          </Grid>
          
        </Grid>
      )} 
    </div>
  );
}
