import React, { useState, useEffect } from "react";
import { useParams, useLocation, Redirect, Link, useHistory } from "react-router-dom";
import { 
  Rating,
  Grid,
  Typography ,
  Button
} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Product/ProductList';
import '../../App.css';

export default function ProfilePage() {
  const location = useLocation();
  const {username} = useParams();
  const [data, setData] = useState([{}]);
  const [chatData, setChatData] = useState([{}]);
  const history = useHistory();
  const [fetched, setFetched] = useState(false);

  const[newChat, setNewChat] = useState(false)

  const onClickHandler = (e) => {
    e.preventDefault();
    setNewChat(true);
  }
  useEffect(() => {
    if (!fetched) {
      fetch(`/user?user=${username}`).then(
        res => res.json()
      ).then(
        data => {
          setData(data);
          setFetched(true);
        }
      )
    }
    
    if(newChat){
      fetch(`/newchat?username_1=${location.state.user}&username_2=${data.user.username}`).then(
        res => res.json()
      ).then(
        chatData => {
          const full_name = data.user.first_name + " " + data.user.last_name;
          history.push({
            pathname: '/chats',
            state: {
              user: location.state.user,
              chatUser: chatData.success,
              chatName: full_name
            }});
        }
      )
      setNewChat(false)
    }
  }, [username, newChat])

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

  let rating = 0;
  let available = [];
  let sold = [];

  

  if (typeof data.products !== 'undefined') {
    let tot = 0;
    let num = 0;
    data.products.map((product) => {
      if (product.status == 2){
        sold.push(product)
      }
      else {
        available.push(product)
      }
      if (product.hasOwnProperty("rating")) {
        tot += product.rating;
        num += 1;
      }
    })
    rating = tot/num;
  }

  
  return (


    <div>
      <Navbar user={location.state.user} />
      {(typeof data.user === 'undefined') ? (
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
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{data.user.first_name} {data.user.last_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <h2> </h2>
         </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>@{data.user.username} | {data.user.email} | ({data.user.phone.substring(0,3)}) {data.user.phone.substring(3,6)}-{data.user.phone.substring(6)}</Typography>
        </Grid>
        <Grid item xs={12}>
        <h2> </h2>        
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" > </Typography>
        </Grid>
        
        {(data.user.username == location.state.user) ? (
          <Grid item xs>
            <Typography variant='h6'>Your Balance: ${data.user.balance.toFixed(2)}</Typography>
            <Link className='links' to={{
              pathname: `/upload/product`,
              state: {
                user: username
              }}}>
          
                <Button variant="contained">Upload Product</Button>
              </Link>
          </Grid>
        ) : (
              <Button variant="contained" onClick={onClickHandler} >Chat</Button>
        )}
        {available.length > 0 && 
          (
          <Grid 
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
          xs={10}>
            <Grid item xs={12}>
              <Typography variant="h4">Products for sale:</Typography>
            </Grid>
            <Grid item xs={10}>
              <ProductList  user={location.state.user} products={available}/> 
            </Grid>
          </Grid> )  
        }  
        {sold.length > 0 && (
          <Grid 
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
          xs={10}>
            <Grid item xs={12}>
              <Typography variant="h4" align="left">Sold in the Past:</Typography>
            </Grid>
            <Grid item xs={12}>
              <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly size="large"/>
            </Grid>
            <Grid item xs={10}>
              <ProductList  user={location.state.user} products={sold}/>
            </Grid>
          </Grid>  
        
          
        )}
      </Grid>
        )}
    </div>
  );
}

