import React, { useEffect, useState } from "react";
import { fetchMediations } from "../api/api";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Balance } from "@mui/icons-material";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    primary: { main: "#1A365D" },
    secondary: { main: "#D4A017" },
    background: { default: "#F8FAFC" },
    text: { primary: "#1A365D", secondary: "#E2E8F0" },
    error: { main: "#991B1B" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h5: { fontWeight: 700, letterSpacing: "0.05em", fontSize: "28px" },
    body1: { fontSize: "16px" },
    body2: { fontSize: "14px", color: "text.secondary" },
  },
});

const columns = [
  { field: "county", headerName: "County", flex: 1, minWidth: 120 },
  { field: "reason", headerName: "Reason", flex: 2, minWidth: 200 },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  { field: "phoneNumber", headerName: "Phone", flex: 1, minWidth: 150 },
];

const Mediations = () => {
  const [mediations, setMediations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMediations = async () => {
      try {
        setLoading(true);
        const data = await fetchMediations();
        setMediations(data.map((m) => ({ id: m._id, ...m })));
        setError(null);
      } catch (err) {
        setError("Failed to load mediations. Please try again.");
        console.error("Error fetching mediations:", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMediations();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        id="mediations"
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
              <Balance sx={{ color: "secondary.main", mr: 1, fontSize: 32 }} />
              <Typography variant="h5" color="primary">
                Mediation Records
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
                  rows={mediations}
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

export default Mediations;
