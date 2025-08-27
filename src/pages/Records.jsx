import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";
import { fetchRecords, submitRecord } from "../api/api";
import { useLanguage } from "../contexts/LanguageContext";
import DocumentUpload from "../components/DocumentUpload"; // Import DocumentUpload
import RoleBasedAccess from "../components/RoleBasedAccess"; // Import RoleBasedAccess

const Records = ({ userRole }) => {
  const { t } = useLanguage();
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await fetchRecords();
      setRecords(data);
    } catch (error) {
      console.error("Error loading records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewRecord(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await submitRecord(newRecord);
      setSuccessMessage(t('recordSubmitted'));
      setNewRecord({ title: "", description: "" });
      loadRecords();
    } catch (error) {
      setErrorMessage(t('submissionError'));
    }
  };

  return (
    <RoleBasedAccess userRole={userRole}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('records')}
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">{t('submitNewRecord')}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('title')}
                  value={newRecord.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('description')}
                  multiline
                  rows={4}
                  value={newRecord.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSubmit}>
                  {t('submit')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <DocumentUpload onUpload={loadRecords} /> {/* Integrate DocumentUpload component */}

        <Typography variant="h6" gutterBottom>
          {t('existingRecords')}
        </Typography>
        {loading ? (
          <Typography>{t('loading')}</Typography>
        ) : (
          records.map(record => (
            <Card key={record.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{record.title}</Typography>
                <Typography>{record.description}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </RoleBasedAccess>
  );
};

export default Records;
