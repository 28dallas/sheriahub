import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { 
  PersonAdd, 
  Close, 
  Visibility, 
  VisibilityOff,
  Person,
  Email,
  Phone,
  Cake
} from "@mui/icons-material";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    primary: { main: "#1A365D" },
    secondary: { main: "#D4A017" },
    error: { main: "#D32F2F" },
    success: { main: "#2E7D32" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

const RegistrationForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    contact: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const { name, password, email, contact, age } = formData;
    
    if (!name || !password || !email || !contact || !age) {
      setError("All fields are required");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(contact)) {
      setError("Please enter a valid Kenyan phone number (+254... or 07...)");
      return false;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
      setError("Age must be between 18 and 120 years");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Import API functions
      const { createProfile } = await import("../api/api");

      // Prepare profile data
      const profileData = {
        name: formData.name,
        phoneNumber: formData.contact,
        email: formData.email,
        age: parseInt(formData.age),
        password: formData.password, // In production, this should be hashed
        registrationDate: new Date().toISOString(),
        status: "Active",
      };

      // Register user in the database
      await createProfile(profileData);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          name: "",
          password: "",
          email: "",
          contact: "",
          age: "",
        });
      }, 3000);

    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      console.error("Error registering user:", err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.password &&
      formData.email &&
      formData.contact &&
      formData.age
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1A365D 0%, #2B4A8A 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonAdd sx={{ mr: 2, color: "#D4A017" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Register New User
            </Typography>
          </Box>
          <Button
            onClick={onClose}
            sx={{ color: "white", minWidth: "auto", p: 1 }}
          >
            <Close />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert severity="success" sx={{ mb: 3 }}>
                Registration successful! Welcome to SheriaLink. You can now report cases and track your submissions.
              </Alert>
            </motion.div>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create an account to report legal issues and track your case submissions.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 3 }}>
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="contact"
                label="Phone Number"
                value={formData.contact}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                type="tel"
                placeholder="+254... or 07..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="age"
                label="Age"
                value={formData.age}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                type="number"
                inputProps={{ min: 18, max: 120 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                helperText="Password must be at least 6 characters long"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderColor: "#1A365D",
              color: "#1A365D",
              "&:hover": {
                borderColor: "#2B4A8A",
                backgroundColor: "rgba(26, 54, 93, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!isFormValid() || loading}
            sx={{
              bgcolor: "#D4A017",
              color: "#1A365D",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                bgcolor: "#C19B13",
              },
              "&:disabled": {
                bgcolor: "#E0E0E0",
                color: "#9E9E9E",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "#1A365D" }} />
            ) : (
              "Register"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default RegistrationForm;