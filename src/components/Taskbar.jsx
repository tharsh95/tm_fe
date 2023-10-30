import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { useUserContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom"; // Use 'useNavigate' for React Router v6

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Get the navigation function

  const { user, setUser } = useUserContext();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
    setAnchorEl(null);
    window.location.reload();
  };
  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  return (
    <div>
      
      <AppBar position="static" style={{ marginBottom: "1rem" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Tooltip title={user?.email}>{user?.name}</Tooltip>
          </Typography>
          <Button>
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                // fontWeight: 'bold',
              }}
              activeStyle={{
                color: "black",
                textDecoration: "underline",
              }}
            >
              Tasks
            </NavLink>
          </Button>
          {user?.role === "Manager" && (
            <>
              <Button color="inherit">
                <NavLink
                  to="/add"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    // fontWeight: 'bold',
                  }}
                  activeStyle={{
                    color: "black",
                  }}
                >
                  Invite
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink
                  to="/trash"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    // fontWeight: 'bold',
                  }}
                  activeStyle={{
                    color: "black",
                  }}
                >
                  Trash
                </NavLink>
              </Button>
            </>
          )}
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
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
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
