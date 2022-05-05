import Navbar2 from '../Navbar/Navbar2';
import GroupForm from "./GroupForm";
import { useHistory } from "react-router-dom";
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


export default function CreateGroup() {
    const location = useLocation();
    const history = useHistory();

    const [newGroup, setNewGroup] = useState({
        groupname: "",
        groupdesc: ""
        });

    const [add,setAdd] = useState(false);
    const onChangeHandler = (e) => {
        e.preventDefault();
        const { name, value: newValue } = e.target;
    
        setNewGroup({
          ...newGroup,
          [name]: newValue
        });
      };
    
      const onClickHandler = (e) => {
        e.preventDefault();
        setAdd(true);
      }
    

    useEffect(() => {

        if (add) {
            fetch(`/creategroup?groupname=${newGroup.groupname}&groupdesc=${newGroup.groupdesc}&username=${location.state.user}`).then(
                res => res.json()
              ).then(
                data => {
                  alert('Group has been created');
                  history.push({
                    pathname: `/groups`,
                    state: {
                      user: location.state.user
                    }});
                }
              )
        }
        setAdd(false)
       
      }, [newGroup, add]);

    
  return (

    <div>
        <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
         
        <Grid container>
            <GroupForm onChange={onChangeHandler} onClick={onClickHandler}/>
        
        </Grid>

        </div>
        
         

      
        
  );
}