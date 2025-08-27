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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Gavel, Close } from "@mui/icons-material";
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

const ReportCaseForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    reporting: "",
    location: "",
    case: "",
    phoneNumber: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const reportingOptions = [
    "Corruption",
    "Human Rights Violation",
    "Land Dispute",
    "Family Matter",
    "Criminal Case",
    "Civil Case",
    "Administrative Issue",
    "Other",
  ];

  const caseTypes = [
    "Civil",
    "Criminal",
    "Family",
    "Land",
    "Commercial",
    "Administrative",
    "Constitutional",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Import API functions
      const { createCase, sendUSSDMessage, getConfig } = await import("../api/api");
      const config = getConfig();

      // Prepare case data
      const caseData = {
        name: formData.fullName,
        phoneNumber: formData.phoneNumber,
        county: formData.location,
        caseType: formData.case,
        description: formData.reporting,
        date: formData.date,
        status: "Pending",
      };

      // Save case to database
      const caseResponse = await createCase(caseData);

      // Prepare USSD message
      const ussdMessage = `${config.ussdCode} - SheriaLink Case Report:
Name: ${formData.fullName}
Type: ${formData.reporting}
Location: ${formData.location}
Case: ${formData.case}
Date: ${formData.date}
Status: Pending Review
Case ID: ${caseResponse._id || 'Generated'}`;

      // Send USSD message
      try {
        await sendUSSDMessage(formData.phoneNumber, ussdMessage);
      } catch (ussdError) {
        console.warn("USSD message failed, but case was saved:", ussdError.message);
        // Continue with success even if USSD fails
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          fullName: "",
          reporting: "",
          location: "",
          case: "",
          phoneNumber: "",
          date: "",
        });
      }, 3000);

    } catch (err) {
      setError(err.message || "Failed to submit case. Please try again.");
      console.error("Error submitting case:", err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.reporting &&
      formData.location &&
      formData.case &&
      formData.phoneNumber &&
      formData.date
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
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
            <Gavel sx={{ mr: 2, color: "#D4A017" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Report a Case
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
                Case submitted successfully via USSD! A confirmation message has been sent to {formData.phoneNumber}. You will be contacted soon for follow-up.
              </Alert>
            </motion.div>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              <TextField
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}
              />

              <FormControl required fullWidth>
                <InputLabel>Reporting</InputLabel>
                <Select
                  name="reporting"
                  value={formData.reporting}
                  onChange={handleInputChange}
                  label="Reporting"
                >
                  {reportingOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="location"
                label="Location/County"
                value={formData.location}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
              />

              <FormControl required fullWidth>
                <InputLabel>Case Type</InputLabel>
                <Select
                  name="case"
                  value={formData.case}
                  onChange={handleInputChange}
                  label="Case Type"
                >
                  {caseTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                type="tel"
                placeholder="+254..."
              />

              <TextField
                name="date"
                label="Date of Incident"
                value={formData.date}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
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
              "Submit via USSD"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ReportCaseForm;