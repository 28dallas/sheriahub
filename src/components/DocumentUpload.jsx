import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const DocumentUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      await onUpload(formData);
      setSuccessMessage("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      setErrorMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Upload Document</Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <TextField
        type="file"
        onChange={handleFileChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </Box>
  );
};

export default DocumentUpload;
