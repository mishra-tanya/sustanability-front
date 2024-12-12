import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import CssBaseline from '@mui/material/CssBaseline';
import { Global } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../services/logout';
import { Button } from '@mui/material';
import { ExpandMore, Home, Login } from '@mui/icons-material';
// import { Image } from '@mui/icons-material';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  
  const onLogoutSuccess = () => {
    navigate('/login');
  };

  const onLogoutError = (error: any) => {
    console.error(error);
  };
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    // console.log( localStorage.getItem('authToken'));
    setIsLoggedIn(!!token);
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>  <Link to="/dashboard" style={{ textDecoration: 'none'  }}>My Account</Link></MenuItem>
      <hr />
      <Box display="flex"justifyContent="center" alignItems="center" >
    
           
    <Button 
    variant="contained"
    color="primary"
    onClick={() => handleLogout(onLogoutSuccess, onLogoutError)}
  >
    Logout
  </Button>
  </Box>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      
     
      {isLoggedIn?
          (
          <>
           <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile   </p><ExpandMore/>
        <br />
      </MenuItem>
            <hr />
            <Box display="flex" justifyContent="center" alignItems="center" >
    
           
          <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogout(onLogoutSuccess, onLogoutError)}
        >
          Logout
        </Button>
        </Box>
          </>
        )
        :
        (  <>
        <MenuItem>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Home />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none'  }}>Home</Link>
        </MenuItem>
               
                <MenuItem>
          <IconButton size="large" color="inherit">
              <Login />
          </IconButton>
          <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
        </MenuItem>
        </>
        )
        
      }
     
            
          
    </Menu>
  );

  return (
    <>
      <Global
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
      <CssBaseline />
      <Box sx={{ flexGrow: 1,color:"black" }}>
        <AppBar position="static" sx={{ bgcolor: 'white' }}>
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            
            <Box sx={{ width: '70px',marginTop:1, height: 'auto' }}>
  <img src="download.png" alt="logo" style={{ width: '100%', height: 'auto' }} />
</Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: {  sm: 'block' } }}
            >
              
              <Link to="/" style={{ textDecoration: 'none', color: '#1976d2',fontWeight:'bold' }}> Sustainability Olympiad</Link>
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle1"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>Home</Link>
            </Typography>
            {isLoggedIn ? (
              <>
                <Typography
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  <Link to="/home" style={{ textDecoration: 'none', color: '#1976d2' }}>Dashboard</Link>
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {/* <IconButton size="large" aria-label="show 4 new mails"  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton> */}

                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    // color="black#1976d2"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
               
               
              </>
              
            ) : (
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>Login</Link>
              </Typography>
            )}
             <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    sx={{color:"#1976d2"}}
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
