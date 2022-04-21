import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from '../Login/Navbar';
import Typography from '@mui/material/Typography';


export default function Homepage() {
  return (
    <div>
      <Navbar/>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
      >
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>

      </Grid>
      <img src={require('./homepagepic.PNG')} alt="home-pic" width="100%"/>    
        
        
      </Grid>

      <Grid container direction={"row"}>
            <Grid item style={{width: '40%'}}>
            <img src={require('./ndstuff2.jpg')} alt="home-pic" width="100%"/> 
            </Grid>
            <div container style={{width: '60%', backgroundColor: '#C7D6FF'}}>
              <Typography component="h1" variant="h4" align="center" color="textPrimary" padding={10}>
                About Us
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" component="p" padding={5}>
                We are an e-commerce platform that matches sellers and buyers of secondhand products at Notre Dame.
                If you are looking to sell or buy winter clothes, accessories, dorm decor, ND gear, textbooks, 
                lab materials, furniture for your off-campus appartment or football tickets, 
                Thrift ND will help you to quickly find it at an affordable price.    
                </Typography>
             </div>
			
      </Grid>
      <Grid container direction={"row"}>
            <div container style={{width: '60%', backgroundColor: '#E0C7FF',}}>
              <Typography component="h1" variant="h4" align="center" color="textPrimary" padding={5}>
                Chat Feature
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" component="p" padding={5}>
                ThriftND helps buyers and sellers to connect in order to make arrangements for product delivery.
                Students can meet around campus in order to deliver or pick up the product in a way that they both find convenient.
                Buyers can also contact sellers in order to request more specific information, and so on.   
                </Typography>
             </div>
            <Grid item style={{width: '40%'}}>
            <img src={require('./chat.jpg')} alt="home-pic" width="100%"/> 
            </Grid>
            
			
      </Grid>
      <Grid container direction={"row"}>
            <Grid item style={{width: '40%', backgroundColor: '#C7D6FF'}}>
            <img src={require('./groups.jpg')} alt="home-pic" width="100%"/> 
            </Grid>
            <div container style={{width: '60%', backgroundColor: '#C7D6FF'}}>
              <Typography component="h1" variant="h4" align="center" color="textPrimary" padding={5}>
                Group Feature
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" component="p" padding={4}>
              Another feature that ThriftND offers is being able to form groups with people having similar interests. 
              For example, students that are majoring in Chemical Engineering might form a group to sell and buy 
              lab goggles, lab coats, Organic Chemistry textbooks, and other related products. 
              Make sure you join or create groups that you and your friends might find useful by searching them!
    
                </Typography>
             </div>
			
      </Grid>
      
      
        
    </div>
    
  );
}