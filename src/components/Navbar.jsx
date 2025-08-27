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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReportCaseForm from "./ReportCaseForm";
import RegistrationForm from "./RegistrationForm";

const theme = createTheme({
  palette: {
    primary: { main: "#FF0000" }, // Red
    secondary: { main: "#008000" }, // Green
    background: { default: "#FFFFFF" }, // White
    text: { primary: "#000000", secondary: "#E2E8F0" }, // Black
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: { fontWeight: 700, letterSpacing: "0.05em" },
    button: { textTransform: "none", fontWeight: 500 },
  },
});

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
  ];

  const drawer = (
      <div className="bg-gray-50 h-full p-4">
      <Typography variant="h6" className="font-bold text-blue-900 mb-4">
        SHERIA LINK HUB
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
            className="text-blue-900 hover:bg-blue-50"
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
          className="text-blue-900 hover:bg-blue-50"
          sx={{ mt: 2, bgcolor: "#1A365D", color: "#E2E8F0", borderRadius: 1 }}
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
          className="text-blue-900 hover:bg-blue-50"
          sx={{ mt: 1, bgcolor: "#2E7D32", color: "#FFFFFF", borderRadius: 1 }}
        >
          <Add sx={{ mr: 1 }} />
          <ListItemText primary="Report Case" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          background: "#D52B1E", // Red for the navbar background
          boxShadow: "none", // Remove shadow for a cleaner look
        }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Gavel sx={{ mr: 1, color: "#D4A017" }} />
            <Typography
              variant="h6"
              sx={{ color: "#E2E8F0", fontWeight: 700 }}
            >
              Judiciary Dashboard
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
                  color: "#E2E8F0",
                  "&:hover": {
                    backgroundColor: "rgba(212, 160, 23, 0.1)",
                    color: "#D4A017",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              onClick={handleRegistrationFormOpen}
              variant="outlined"
              startIcon={<PersonAdd />}
              sx={{
                borderColor: "#E2E8F0",
                color: "#E2E8F0",
                fontWeight: 600,
                ml: 2,
                "&:hover": {
                  borderColor: "#D4A017",
                  backgroundColor: "rgba(212, 160, 23, 0.1)",
                  color: "#D4A017",
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
              <Avatar sx={{ bgcolor: "#D4A017", color: "#1A365D" }}>U</Avatar>
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
    </ThemeProvider>
  );
};

export default Navbar;