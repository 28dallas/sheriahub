import React, { useState } from "react";
import { Link } from "react-scroll"; // Updated import for smooth scrolling
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon, Gavel, Add, PersonAdd } from "@mui/icons-material";
import ReportCaseForm from "./ReportCaseForm";
import RegistrationForm from "./RegistrationForm";
import LanguageToggle from "./LanguageToggle"; // Import the LanguageToggle component

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [registrationFormOpen, setRegistrationFormOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReportFormOpen = () => {
    setReportFormOpen(true);
  };

  const handleReportFormClose = () => {
    setReportFormOpen(false);
  };

  const handleRegistrationFormOpen = () => {
    setRegistrationFormOpen(true);
  };

  const handleRegistrationFormClose = () => {
    setRegistrationFormOpen(false);
  };

  const navItems = [
    { label: "Home", path: "home" },
    { label: "About", path: "about" },
    { label: "Cases", path: "cases" },
    { label: "Profiles", path: "profiles" },
    { label: "Mediations", path: "mediations" },
    { label: "Education", path: "education" }, // Add Education tab
  ];

  const drawer = (
      <div style={{ backgroundColor: "#FFFFFF", height: "100%", padding: "16px" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#000000", mb: 4 }}>
        SHARIA LINK HUB
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            component={Link}
            to={item.path}
            smooth={true} // Enable smooth scrolling
            onClick={handleDrawerToggle}
            sx={{ 
              color: "#000000",
              "&:hover": {
                backgroundColor: "rgba(46, 125, 50, 0.04)",
                color: "#2E7D32"
              }
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={() => {
            handleDrawerToggle();
            handleRegistrationFormOpen();
          }}
          sx={{ 
            mt: 2, 
            bgcolor: "#000000", 
            color: "#FFFFFF", 
            borderRadius: 1,
            "&:hover": {
              bgcolor: "#2E7D32"
            }
          }}
        >
          <PersonAdd sx={{ mr: 1 }} />
          <ListItemText primary="Register" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleDrawerToggle();
            handleReportFormOpen();
          }}
          sx={{ 
            mt: 1, 
            bgcolor: "#2E7D32", 
            color: "#FFFFFF", 
            borderRadius: 1,
            "&:hover": {
              bgcolor: "#1B5E20"
            }
          }}
        >
          <Add sx={{ mr: 1 }} />
          <ListItemText primary="Report Case" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "#000000", // Black navbar background
          boxShadow: "none", // Remove shadow for a cleaner look
        }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, color: "#FFFFFF" }}
            >
              <MenuIcon />
            </IconButton>
            <Gavel sx={{ mr: 1, color: "#2E7D32" }} />
            <Typography
              variant="h6"
              sx={{ color: "#FFFFFF", fontWeight: 700 }}
            >
              
            </Typography>
          </div>
          <div className="hidden sm:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                smooth={true} // Enable smooth scrolling
                sx={{
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "rgba(46, 125, 50, 0.1)",
                    color: "#2E7D32",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <LanguageToggle /> {/* Add the LanguageToggle component here */}
            <Button
              onClick={handleRegistrationFormOpen}
              variant="outlined"
              startIcon={<PersonAdd />}
              sx={{
                borderColor: "#FFFFFF",
                color: "#FFFFFF",
                fontWeight: 600,
                ml: 2,
                "&:hover": {
                  borderColor: "#2E7D32",
                  backgroundColor: "rgba(46, 125, 50, 0.1)",
                  color: "#2E7D32",
                },
              }}
            >
              Register
            </Button>
            <Button
              onClick={handleReportFormOpen}
              variant="contained"
              startIcon={<Add />}
              sx={{
                bgcolor: "#2E7D32",
                color: "#FFFFFF",
                fontWeight: 600,
                ml: 2,
                "&:hover": {
                  bgcolor: "#1B5E20",
                },
              }}
            >
              Report Case
            </Button>
          </div>
          <Tooltip title="User Profile">
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ bgcolor: "#2E7D32", color: "#FFFFFF" }}>U</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: 240 } }}
      >
        {drawer}
      </Drawer>
      
      <ReportCaseForm 
        open={reportFormOpen} 
        onClose={handleReportFormClose} 
      />
      
      <RegistrationForm 
        open={registrationFormOpen} 
        onClose={handleRegistrationFormClose} 
      />
    </>
  );
};

export default Navbar;
