import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { 
      main: "#000000", // Black
      contrastText: "#FFFFFF" // White text on black background
    },
    secondary: { 
      main: "#2E7D32", // Green
      contrastText: "#FFFFFF" // White text on green background
    },
    error: {
      main: "#D32F2F", // Red for Kenyan flag accent
      contrastText: "#FFFFFF"
    },
    background: { 
      default: "#FFFFFF", // White background
      paper: "#FFFFFF" // White paper background
    },
    text: { 
      primary: "#000000", // Black text on white background
      secondary: "#2E7D32" // Green text for secondary elements
    },
    success: {
      main: "#2E7D32", // Green for success states
    },
    info: {
      main: "#000000", // Black for info states
    },
    kenyanRed: {
      main: "#D32F2F", // Custom red for Kenyan flag theme
      light: "#FFEBEE",
      dark: "#B71C1C"
    }
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { fontWeight: 700, color: "#000000" },
    h2: { fontWeight: 700, color: "#000000" },
    h3: { fontWeight: 700, color: "#000000" },
    h4: { fontWeight: 700, color: "#000000" },
    h5: { fontWeight: 700, color: "#000000" },
    h6: { fontWeight: 700, color: "#000000" },
    body1: { color: "#000000" },
    body2: { color: "#2E7D32" }, // Green for secondary text
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          backgroundColor: "#2E7D32", // Green background
          color: "#FFFFFF", // White text
          "&:hover": {
            backgroundColor: "#1B5E20", // Darker green on hover
          },
        },
        outlined: {
          borderColor: "#000000", // Black border
          color: "#000000", // Black text
          "&:hover": {
            borderColor: "#2E7D32", // Green border on hover
            backgroundColor: "rgba(46, 125, 50, 0.04)", // Light green background on hover
            color: "#2E7D32", // Green text on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000", // Black app bar
          color: "#FFFFFF", // White text
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#000000", // Black header
            color: "#FFFFFF", // White text
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "rgba(46, 125, 50, 0.04)", // Light green on hover
            },
          },
        },
      },
    },
  },
});

export default theme;