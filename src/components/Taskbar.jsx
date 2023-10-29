import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  // State for controlling the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Open the dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  // Close the dropdown menu
  const handleLogout = () => {
    localStorage.clear()
    setAnchorEl(null);
    window.location.reload()
  };
  const handleProfile=()=>{

  }

  return (
    <div>
      <AppBar position="static" style={{marginBottom:"1rem"}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
         <Button> <Link to="/" style={{textDecoration:"none",color:"white"}}>Tasks</Link></Button>
          {/* <Button color="inherit"><Link to='/add'>Invite</Link></Button> */}
          <Button color="inherit"><Link to="/add" style={{textDecoration:"none",color:"white"}}>Invite</Link></Button>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            edge="end"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
