import React, { useEffect, useState } from 'react';
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
import { Dashboard, Home, Login, Logout, Verified } from '@mui/icons-material';
// import { Image } from '@mui/icons-material';

import logo from '/download.png';
import api from '../services/axios';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [classN,setClassN]=useState('');
  const [loadingClass, setLoadingClass] = useState<boolean>(false);
  const userRole = localStorage.getItem("userRole");
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await api.get('/user');
            const classValue = response.data.class.replace('class_', '');
            // console.log(classValue);
            setClassN(classValue);
            // console.log(response.data.class);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    fetchUserData();
}, []);

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

  const handleDashboardClick = async () => {
    if (userRole === 'admin') {
      window.location.href = '/admin/home'; 
    } else {
  
      if (!classN && !loadingClass) {
        setLoadingClass(true); 
        try {
          const response = await api.get("/user");
          const classValue = response.data.class.replace("class_", "");
          setClassN(classValue);
          navigate(`/class/${classValue}`);
        } catch (err) {
          console.error("Error fetching class:", err);
        } finally {
          setLoadingClass(false);
        }
      } else if (classN) {
        navigate(`/class/${classN}`);
      }
    }
  };

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
      {userRole=='user' &&(
     <>
      <MenuItem onClick={handleMenuClose}>  <Link to="/dashboard" style={{ textDecoration: 'none'
        ,color: '#1976d2' 
        }}>My Account</Link></MenuItem>
      <hr />
     </>
      )}
      <Box display="flex"justifyContent="center" alignItems="center" >
    
           
    <Button 
    variant="contained"
    color="primary"
    onClick={() => handleLogout(onLogoutSuccess, onLogoutError)}
  >
          <Logout/>

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
      
     {/* Mobile ones */}
      {isLoggedIn?
          (
          <>
        
         {userRole=='user' &&(
         <>
           <MenuItem>

           <IconButton size="large"   color="inherit">
            <Home />
        </IconButton>
           <Link to="/dashboard" style={{ textDecoration: 'none',color: '#1976d2'   }}>My Profile</Link>
           </MenuItem>
       
         </> 
          )}

        <MenuItem>
          <IconButton size="large"   color="inherit">
              <Verified />
          </IconButton>
          <Link to="/verification" style={{ textDecoration: 'none',color: '#1976d2'   }}>Verify Certificates</Link>
        </MenuItem>
            <MenuItem>
          <IconButton size="large"color="inherit">
              <Dashboard />
          </IconButton>
          <button
                    onClick={handleDashboardClick}
                    style={{
                      fontSize:'16px',
                      padding:0,
                      textDecoration: "none",
                      color: "#1976d2",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    disabled={loadingClass}  
                  >
                     {loadingClass 
    ? "Loading..." 
    : userRole === 'admin' 
      ? "Admin Dashboard" 
      : "User Dashboard"}
                  </button>  </MenuItem>
        <hr />
            <Box display="flex" justifyContent="center" alignItems="center" >
    
           
          <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogout(onLogoutSuccess, onLogoutError)}
        >
          <Logout/>
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
          <IconButton size="large"   color="inherit">
              <Verified />
          </IconButton>
          <Link to="/verification" style={{ textDecoration: 'none'  }}>Verifiy Certificates</Link>
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
            <img 
      src={logo} 
      alt="logo" 
      style={{ width: '100%', height: 'auto' }} 
    />
    </Box>
    <Typography
  variant="h6"
  noWrap
  component="div"
  sx={{
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexGrow: 1, 
    fontWeight: 'bold',
    color: '#1976d2',
    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' }, 
    textDecoration: 'none',
  }}
>
  <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
    Sustainability Olympiad
  </Link>
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
            <Typography
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  <Link to="/verification" style={{ textDecoration: 'none', color: '#1976d2' }}>Verify Certificates</Link>
                </Typography>
                &nbsp;
                &nbsp;
            {isLoggedIn ? (
              <>
                <Typography
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
  <button
    onClick={handleDashboardClick}
    style={{
      fontSize: '16px',
      textDecoration: "none",
      color: "#1976d2",
      background: "none",
      border: "none",
      cursor: "pointer",
    }}
    disabled={loadingClass}
  >
    {loadingClass 
    ? "Loading..." 
    : userRole === 'admin' 
      ? "Admin Dashboard" 
      : "User Dashboard"}
  </button>

                    {/* <Link to="/home" style={{ textDecoration: 'none', color: '#1976d2' }}>Dashboard</Link> */}
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
