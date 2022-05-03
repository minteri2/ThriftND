
import Link from '@mui/material/Link';
import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';


export default function Checkout() {

  const location = useLocation();
  const history = useHistory();


  const [payment, setPayment] = useState([{
    paymentmethod: ""
  }]);
  const [fetched, setFetched] = useState(false);
  const [data,setData] = useState([{}]);
  const [checkout,setCheckout] = useState(false);

  useEffect(() => {
    
    if (!fetched){
        fetch(`/getpayments?username=${location.state.user}`).then(
        res => res.json()
        ).then(
        data => {
            setData(data)
            console.log(data);
            setFetched(true);
        }
        )
    }

    if (checkout) {
      fetch(`/checkout?username=${location.state.user}&pay=${payment.paymentmethod}`).then(
        res => res.json()
        ).then(
        data => {
          history.push({
            pathname: `/order`,
            state: {
              user: location.state.user
            }});
        }
        )
    }
  }, [checkout])
  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }
  const onChangeHandler = (e) => {
    e.preventDefault();
      setPayment({
        ...payment,
        [e.target.name]: e.target.value
      })
    }

    const onClickHandler = () => {
      console.log("laaa")
      setCheckout(true);
    }
  
  return (
    <div>
    <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
      {typeof data.payment_methods === 'undefined' ? (
          <p>Loading...</p>
      ) : (
        <div>
    <Grid container sx={{marginBottom: '20px'}}>
    <h1>Choose a Payment Method</h1>
    </Grid>
    <Grid container sx={{marginBottom: '20px'}}>
        <Grid item xs={4}  md={3} lg={2} >
          <FormControl fullWidth>
            <InputLabel id="payment-method">Payment Method</InputLabel>
            <Select
              labelId="payment-method"
              id="payment-method"
              label="Payment Method"
              onChange={onChangeHandler}
              name="paymentmethod">

              {data.payment_methods.map((paymet) => (
                <MenuItem value={paymet.payment_method_id}>Card: **** **** **** {paymet.card_number.substring(12)}, exp: {paymet.exp_date}</MenuItem>
                ))}
              
            </Select>
          </FormControl>
          <Grid> <h1> </h1>
          </Grid>
        
          <Button onClick={onClickHandler} variant="contained">Checkout</Button>
                

        </Grid>
      
      </Grid>
      </div>
      )
      }
    </div>
);
}