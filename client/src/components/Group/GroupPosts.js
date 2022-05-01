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
import { Link } from 'react-router-dom';


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

export default function GroupPosts({ user, cartItems }) {

  const classes = useStyles();
  const {group_id} = useParams();
  const location = useLocation();


  const [data, setData] = useState([{}]);
  const [fetched, setFetched] = useState(false);
  const [send, setSend] = useState(false);
  const [post, setPost] = useState(false);


  useEffect(() => {
    
    if (!send){
        fetch(`/grouppost?group_id=${group_id}&username=${location.state.user}`).then(
            
        res => {console.log(res);
        return res.json();}
        ).then(
        data => {
            setData(data);
            setFetched(true);
            console.log(data);

        }
        
        )
    }

    if (send) {
        // sendMessage()
        fetch(`/addpost?username=${location.state.user}&group_id=${group_id}&post_desc=${post}`).then(
            res => res.json()
            ).then(
              data => {
                setSend(false);
                console.log(data)
              }
            );
    }
          
    }

    ,[send]);



    const onClickSendHandler = () => {
        setSend(true);
        
    }

    const onChangeHandler = (e) => {
        setPost(e.target.value);
    }

  if (typeof location.state === 'undefined') {
    alert('You are not logged in');
    return <Redirect to='/login'/>
  }





  return (
      <div>
        <Navbar user={location.state.user} cartItems={location.state.cartItems}/>
        { typeof data.posts === 'undefined' ? (
            <p>Loading...</p>
        ) : (
            <div>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Posts:</Typography>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                {(data.posts.map((curr_post) => ( 
                    <ListItem >
                        <Grid 
                        container
                        style={{backgroundColor: '#EAF0FF'}}>
                            <Grid item xs={12}>
                                <ListItemText style={{color : 'blue'}} align="left" primary={curr_post.poster}></ListItemText>
                                <ListItemText align="left" primary={curr_post.post_desc}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary={curr_post.timestamp}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    )))} 
                    
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField onChange={onChangeHandler} id="outlined-basic-email" label="Add Post" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" ><SendIcon onClick={onClickSendHandler}/></Fab>
                    </Grid>
                </Grid>
            </Grid>
            </div>
        )}
        
        
        </div>     

        
  );
}