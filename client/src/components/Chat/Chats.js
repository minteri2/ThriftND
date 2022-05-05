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
  const location = useLocation();


  const [data, setData] = useState(false);
  const [message, setMessage] = useState('');
  const [send, setSend] = useState(false);
  const [activeChat, setActiveChat] = useState({});
  const [changeChat, setChangeChat] = useState(false);

  useEffect(() => {
    
    if (!data){
        fetch(`/chats?username=${location.state.user}`).then(
        res => res.json()
        ).then(
        data => {
            console.log(data);
            setData(data)
            if (typeof location.state.chatUser !== 'undefined'){
                setActiveChat({
                    'name': location.state.chatName
                })
                setChangeChat(location.state.chatUser);
            }
            
        }
        )
    }

    if(changeChat){
      fetch(`/chat?username=${location.state.user}&chat_id=${changeChat}`).then(
        res => res.json()
           ).then(
        mess => {
            console.log('yes')
          setActiveChat({
              ...activeChat,
              ...mess,
              'chat_id': changeChat
          });
        setChangeChat(false);
        
        }
      )
    }

    if (message && send) {
        fetch(`/send?username=${location.state.user}&chat_id=${activeChat.chat_id}&message=${message}`).then(
            res => res.json()
            ).then(
              data => {
                const chat_copy = activeChat.messages.slice();
                chat_copy.push(data.message);
                setActiveChat({
                    ... activeChat,
                    'messages': chat_copy
                });
                setSend(false);
                setMessage('');
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
    setActiveChat({
        'name': chat.name
    })

}
const onClickSendHandler = () => {
    setSend(true);
    
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
                <Grid item xs>
                {activeChat.name && <Typography variant="h4" align='center'>{activeChat.name}</Typography>}
                </Grid>
                <Divider />
                <List style={{
                  height: '70vh',
                  overflowY: 'auto'}}>
                {activeChat.messages && (activeChat.messages.map((msg) => (
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
                {activeChat.chat_id && (
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField value={message} id="outlined-basic-email" label="Type Something" fullWidth onChange={onChangeHandler}/>
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab onClick={onClickSendHandler} color="primary" aria-label="add" ><SendIcon /></Fab>
                    </Grid>
                </Grid>
                )}
            </Grid>
        </Grid>
        </div>
        )}
        
      </div>
  );
}

