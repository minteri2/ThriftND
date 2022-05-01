import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@mui/icons-material/Send';
import { useParams, useLocation, Redirect } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

export default function Chats() {
  const classes = useStyles();
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
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                
               
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
                <List className={classes.messageArea}>
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

