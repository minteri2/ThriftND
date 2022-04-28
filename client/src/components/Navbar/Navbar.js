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




const login = 'Log Out';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const menuId = 'primary-search-account-menu';
const total_cart_items = 4;

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const history = useHistory();


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [query, setQuery] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (search && query) {
      const q = query.replaceAll(' ', '_');
      history.push(`/results/${q}`);
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
         
          <img src={require('./logo.PNG')} alt="Logo-pic" width="100"/>

         
          <Box sx={{ marginLeft: '20px', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <SearchBar onSubmit={onSubmitHandler} onChange={onChangeHandler}/>
          </Box>
            <Link to="/login">
            <Button
                key={login}
                onClick={handleCloseNavMenu}

                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {login}
              </Button>
            </Link>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link to="/cart">
                <IconButton size="large" 
                aria-label="shopping-cart"
                color="inherit" >
                  <Badge badgeContent={total_cart_items} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                  </IconButton>
              </Link>
              <Link to="/cart">
                <IconButton
                  size="large"
                  aria-label="chat-notifications"
                  color="inherit"
                >
                <Badge badgeContent={17} color="error">
                  <ChatIcon />
                </Badge>
                </IconButton>
              </Link>
              
            
            
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;