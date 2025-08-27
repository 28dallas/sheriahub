import React, { useEffect, useState } from "react";
import { fetchCases } from "../api/api";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Gavel } from "@mui/icons-material";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    primary: { main: "#1A365D" }, // Navy Blue
    secondary: { main: "#D4A017" }, // Gold
    background: { default: "#F8FAFC" }, // Light Gray
    text: { primary: "#1A365D", secondary: "#E2E8F0" },
    error: { main: "#991B1B" }, // Subtle Red
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h5: { fontWeight: 700, letterSpacing: "0.05em", fontSize: "28px" },
    body1: { fontSize: "16px" },
    body2: { fontSize: "14px", color: "text.secondary" },
  },
});

const columns = [
  { field: "caseType", headerName: "Case Type", flex: 1, minWidth: 150 },
  { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
    minWidth: 200,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "county",
    headerName: "County",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => params.value || "-",
  },
];

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        setLoading(true);
        const data = await fetchCases();
        setCases(data.map((c) => ({ id: c._id, ...c })));
        setError(null);
      } catch (err) {
        setError("Failed to load cases. Please try again.");
        console.error("Error fetching cases:", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCases();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        id="cases"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1200, width: "100%", mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Gavel sx={{ color: "secondary.main", mr: 1, fontSize: 32 }} />
              <Typography variant="h5" color="primary">
                Case Management
              </Typography>
            </Box>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress color="secondary" />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : (
              <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <DataGrid
                  rows={cases}
                  columns={columns}
                  pageSizeOptions={[5, 10, 25]}
                  autoHeight
                  disableSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      bgcolor: "primary.main",
                      color: "text.secondary",
                      fontSize: "16px",
                    },
                    "& .MuiDataGrid-row": {
                      "&:hover": {
                        bgcolor: "rgba(212, 160, 23, 0.1)",
                        transition: "background-color 0.3s",
                      },
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid",
                      borderColor: "text.secondary",
                      fontSize: "14px",
                    },
                  }}
                />
              </Paper>
            )}
          </motion.div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Cases;
