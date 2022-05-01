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

export default function Groups() {

  const classes = useStyles();
  const location = useLocation();


  const [data, setData] = useState([{}]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    
    if (!fetched){
        fetch(`/groups?username=${location.state.user}`).then(
        res => res.json()
        ).then(
        data => {
            setData(data);
            setFetched(true);
            console.log(data);

        }
        
        )
    }

    

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
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
               
                
                <List>

                 {data.groups.map((curr_group) => (  
                     <Link to={{
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
        </div>
        )
         
}
      </div>
        
  );
}