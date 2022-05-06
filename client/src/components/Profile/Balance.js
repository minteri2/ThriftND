
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
import Typography from '@mui/material/Typography';
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';



export default function Checkout() {

  const location = useLocation();
  const history = useHistory();


  const [payment, setPayment] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [data,setData] = useState([{}]);
  const [checkout,setCheckout] = useState(false);
  const [newPay, setNewPay] = useState({
    cardNum: "",
    expDate:"",
    name: "",
    address: ""
  })
  const [add,setAdd] = useState(false);

  useEffect(() => {
    
    if (!fetched){
      axios.get(`http://18.205.219.249:5000/getpayments?username=${location.state.user}`).then(
        res => {
          setData(res.data);
          setFetched(true);
      }
        );
    }

    if (payment && checkout) {
      axios.get(`http://18.205.219.249:5000/transferBalance?username=${location.state.user}&pay=${payment.paymentmethod}`).then(
        res => {
          alert('You have successfully transferred your balance!');
          history.push({
            pathname: `/user/${location.state.user}`,
            state: {
              user: location.state.user
            }});
        }
        );
    }

    if (add) {
      axios.get(`http://18.205.219.249:5000/addPay?username=${location.state.user}&card_num=${newPay.cardNum}&exp_date=${newPay.expDate}&card_name=${newPay.name}&address=${newPay.address}`).then(
        res => {
          const cards_copy = data.payment_methods.slice();
          cards_copy.push(res.data.card);
          setData({
            ...data,
            'payment_methods': cards_copy
          })
          setAdd(false);
          setNewPay({
            cardNum: "",
            expDate:"",
            name: "",
            address: ""
          })
        }
        );
    }
  }, [checkout, add])
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

    const onChangeAddHandler = (e) => {

      e.preventDefault();
      if (e.target.name === 'expDate' && e.target.value.length === 2 && newPay.expDate.length !== 3){
        setNewPay({
          ...newPay,
          [e.target.name]: e.target.value + '/'
        });
      }
      else if (e.target.value.length === 2 && newPay.expDate.length === 3) {
        setNewPay({
          ...newPay,
          [e.target.name]: e.target.value.charAt(0)
        });
      }
      else {
        setNewPay({
          ...newPay,
          [e.target.name]: e.target.value
        });
      }
      }

    const onClickHandler = () => {
      setCheckout(true);
    }

    const onClickAddHandler = () => {
      setAdd(true);
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
    <Grid container >
        <Grid container xs={4}  md={3} lg={2} >
          <Grid item xs={12} sx={{marginBottom: '20px'}}>
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
              <MenuItem value={'addCard'}>+  Add New Payment Method</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          {payment.paymentmethod === 'addCard' ? (
            
          <Grid container >
            <Typography  variant='h6' sx={{fontWeight: 'bold'}}>Add Payment Method</Typography>
          <FormControl fullWidth>
            <Grid item sx={{marginBottom: '20px', marginTop:'20px'}}>
              <TextField 
                required
                id="card-num-input"
                label="Card Number"
                placeholder="i.e. 9999 9999 9999 9999"
                name="cardNum"
                value={newPay.cardNum}
                onChange={onChangeAddHandler}
                />
                
            </Grid>
            <Grid item sx={{marginBottom: '20px'}}>
              <TextField 
                required
                id="name-input"
                label="Name on Card"
                placeholder="Name"
                name="name"
                value={newPay.name}
                onChange={onChangeAddHandler}/>
            </Grid>
            <Grid item sx={{marginBottom: '20px'}}>
              <TextField 
                required
                id="exp-date-input"
                label="Expiration Date"
                placeholder="i.e. 01/26"
                name="expDate"
                value={newPay.expDate}
                onChange={onChangeAddHandler}/>
            </Grid>
            <Grid item sx={{marginBottom: '20px'}}>
            <TextField
              id="address-input"
              label="Billing Address"
              multiline
              name="address"
              value={newPay.address}
              required
              onChange={onChangeAddHandler}
            />
            </Grid>
            
          </FormControl>
          <Button onClick={onClickAddHandler} variant="contained">Add Payment Method</Button>
          </Grid>
        ) : (
          <Button onClick={onClickHandler} variant="contained">Transfer Balance</Button>
        )}
                

        </Grid>
      
      </Grid>
      </div>
      )
      }
    </div>
);
}