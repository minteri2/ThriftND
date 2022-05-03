import React, {useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat';
import SearchBar from '../Search/SearchBar';
import { useHistory } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import '../../App.css';




const login = 'Log Out';

const ResponsiveAppBar = ( { user } ) => {

  const history = useHistory();

  const [query, setQuery] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (search && query) {
      const q = query.replaceAll(' ', '_');
      history.push({
        pathname: `/results/${q}`,
        state: {
          user: user
        }});
      setSearch(false);
    }
  
  }, [query, search]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearch(true);
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }  


  return (
    <AppBar position="relative" style={{background: '#2a2772'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={{
            pathname: '/home',
            state: {
              user: user
            }}}>
            <img src={require('./logo.PNG')} alt="Logo-pic" width="100"/>
          </Link>

         
          <Box sx={{ marginLeft: '20px', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <SearchBar onSubmit={onSubmitHandler} onChange={onChangeHandler}/>
          </Box>
            <Link to="/login" className='links'>
            <Button
                key={login}

                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {login}
              </Button>
            </Link>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link to={{
                pathname: `/cart/${user}`,
                state: {
                  user: user
                }}}>
                <IconButton size="large" 
                aria-label="shopping-cart"
                 style={{color: 'white'}}>
                    <ShoppingCartIcon />
                  </IconButton>
              </Link>
              <Link to={{
                pathname: `/groups`,
                state: {
                  user: user
                }}}>
                <IconButton size="large" 
                aria-label="groups"
                style={{color: 'white'}}>
                    <GroupsIcon />
                  </IconButton>
              </Link>
              <Link to={{
                pathname: `/chats`,
                state: {
                  user: user
                }}}>
                <IconButton
                  size="large"
                  aria-label="chat-notifications"
                  style={{color: 'white'}}
                >
                  <ChatIcon />
                </IconButton>
              </Link>
              
            
            
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Link to={{
                  pathname: `/user/${user}`,
                  state: {
                    user: user
                  }}}> 
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={`${user}`}/>
                </IconButton>
              </Link>
            </Tooltip>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;