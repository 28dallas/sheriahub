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
          background: "linear-gradient(135deg, #000000 0%, #D32F2F 10%, #000000 35%, #2E7D32 80%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonAdd sx={{ mr: 2, color: "#2E7D32" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#FFFFFF" }}>
            Register <Box component="span" sx={{ color: "#D32F2F" }}>New</Box> User
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
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#2E7D32",
                backgroundColor: "rgba(46, 125, 50, 0.04)",
                color: "#2E7D32",
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
              bgcolor: "#2E7D32",
              color: "#FFFFFF",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                bgcolor: "#1B5E20",
              },
              "&:disabled": {
                bgcolor: "#E0E0E0",
                color: "#9E9E9E",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
            ) : (
              "Register"
            )}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default RegistrationForm;