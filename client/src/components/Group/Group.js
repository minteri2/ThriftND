import React from 'react';
import { makeStyles } from '@mui/styles';
import { 
  Paper,
  Grid,
  Button,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab

 } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import { useParams, useLocation, Redirect, Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { useState, useEffect } from "react";
import '../../App.css';

export default function Groups() {
  const location = useLocation();


  const [data, setData] = useState([{}]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
  
        fetch(`/groups?username=${location.state.user}`).then(
        res => res.json()
        ).then(
        data => {
            setData(data);
            setFetched(true);
            console.log(data);

        }
        
        )

    

    },[]);

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }





  return (
      <div>
        <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
         {typeof data.groups === 'undefined' ? (
            <p>Loading...</p>
        ) : ( 
            <div>
            <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Groups You Belong To:</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} style={{width: '100%'}}>
            <Grid item xs={3} style={{borderRight: '1px solid #e0e0e0'}}>
               
                
                <List>

                 {data.groups.map((curr_group) => (  
                     <Link className='links' style={{color:'black'}}to={{
                        pathname: `/groups/${curr_group.group_id}`,
                        state: {
                          user: location.state.user
                        }}}>
                    <ListItem button >
                        <ListItemIcon>
                        <Avatar src={'https://cdn-icons-png.flaticon.com/512/166/166258.png'} />
                        </ListItemIcon>
                        <ListItemText primary={curr_group.group_name}></ListItemText>
                    </ListItem>
                    </Link>
                
                 ))}  
                 
                </List>
            </Grid>
        </Grid>
        
        <Grid container component={Paper} style={{width: '100%'}}>
        <Link className='links' to={{
          pathname: `/creategroup`,
          state: {
            user: location.state.user
          }}}>
          <Button variant="contained">Create New Group</Button>
          </Link>
        </Grid>

        </div>
        )
         
}
      </div>
        
  );
}