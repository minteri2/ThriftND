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
import { useParams, useLocation, Redirect } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { useState, useEffect } from "react";

export default function Chats() {
  const {username} = useParams();
  const location = useLocation();


  const [data, setData] = useState([{}]);
  const [message, setMessage] = useState('');
  const [send, setSend] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [changeChat, setChangeChat] = useState(false);

  useEffect(() => {
    
    if (!changeChat){
        fetch(`/chats?username=${username}`).then(
        res => res.json()
        ).then(
        data => {
            setData(data)
        }
        )
    }

    if(changeChat){
        console.log(changeChat);
      fetch(`/chat?username=${username}&chat_id=${changeChat}`).then(
        res => res.json()
           ).then(
        mess => {
          setActiveChat({
              ... mess,
              'chat_id': changeChat
          });
        setChangeChat(false);
        setMessage('');
        }
      )
    }
    if (send) {
        // sendMessage()
        console.log(message);
        fetch(`/send?username=${username}&chat_id=${activeChat.chat_id}&message=${message}`).then(
            res => res.json()
            ).then(
              data => {
                setSend(false);
                console.log(data)
              }
            )
          
    }
    

    },[changeChat, send]);


//   const onClickHandler = () => {
//     setFlag(true);
//   }
  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }

const onClickHandler = (chat) => {
    setChangeChat(chat.chat_id);

}
const onClickSendHandler = () => {
    console.log(activeChat);
    setSend(true);
    setChangeChat(activeChat.chat_id)
    
}

const onChangeHandler = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
}



  return (
      <div>
        <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
        {typeof data.chats === 'undefined' ? (
            <p>Loading...</p>
        ) : (
            <div>
            <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chats</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} style={{width: '100%'}}>
            <Grid item xs={3} style={{borderRight: '1px solid #e0e0e0'}}>
                
               
                <List>

                {data.chats.map((chat) => (
                    <ListItem button key={chat.name} onClick={()=>onClickHandler(chat)}>
                    <ListItemIcon>
                        <Avatar  />
                    </ListItemIcon>
                    <ListItemText >{chat.name}</ListItemText>
                    <ListItemText align="right"></ListItemText>
                </ListItem>
                ))}
                
                </List>
            </Grid>
            <Grid item xs={9}>
                <List style={{
                  height: '70vh',
                  overflowY: 'auto'}}>
                {activeChat && (activeChat.messages.map((msg) => (
                    <ListItem >
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align={msg.alignment} primary={msg.message_desc}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align={msg.alignment} secondary={msg.timestamp}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    )))}
                    
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField value={message} id="outlined-basic-email" label="Type Something" fullWidth onChange={onChangeHandler}/>
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" ><SendIcon onClick={onClickSendHandler}/></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
        )}
        
      </div>
  );
}

