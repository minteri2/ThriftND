import * as React from 'react';
import {
  List,
  ListItem,
  Typography,
  Grid,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import "../../App.css";
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

 
 
export default function GroupResults({ cartItems, authUser, groups }) {
 
    const history = useHistory();
  const linkStyle = {
    color: "white",
    textDecoration: "none"
  }

  const [join,setJoin] = useState(false);

  useEffect(() => {
    
    
    if (join) {
      axios.get(`http://18.205.219.249:5000/join?username=${authUser}&group_id=${join}`).then(
        res => {
          history.push({
          pathname: `/groups/${join}`,
          state: {
              user: authUser
          }});
          }
        );
    }
    
}, [join])
 
const onClickHandler = (group) => {
    console.log("laaa")
    setJoin(group.group_id);
  }
  return (
    <Grid container
      xs={12}
      gap={2}
      justifyContent="space-between">
      {groups.map((group, i) => (
          <Grid  item xs={2} className="bgpurple" justifyContent="center">
        <Button onClick={()=>onClickHandler(group)}>
        
    
              <Typography align="center" style={{color: 'white'}}>{group.group_name} </Typography>
              </Button>
        </Grid>
        
      ))}
    </Grid>
  );
}
