import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Chip,
  CircularProgress
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  FilterList,
  Download,
  Refresh,
  TrendingUp,
  Assignment,
  CheckCircle,
  Pending,
  Cancel
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { fetchCases } from "../api/api";
import { useLanguage } from "../contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    county: "all",
    startDate: "",
    endDate: "",
    status: "all"
  });

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", 
    "Machakos", "Meru", "Nyeri", "Garissa", "Kakamega"
  ];

  const statusColors = {
    "Pending": "#FFA500",
    "Resolved": "#4CAF50",
    "Rejected": "#F44336",
    "In Progress": "#2196F3"
  };

  useEffect(() => {
    loadCases();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cases, filters]);

  const loadCases = async () => {
    try {
      setLoading(true);
      const data = await fetchCases();
      const casesWithIds = data.map((c, index) => ({ 
        id: c._id || index, 
        ...c,
        createdAt: c.createdAt || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      }));
      setCases(casesWithIds);
    } catch (error) {
      console.error("Error loading cases:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...cases];

    if (filters.county !== "all") {
      filtered = filtered.filter(caseItem => 
        caseItem.county?.toLowerCase() === filters.county.toLowerCase()
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(caseItem => 
        caseItem.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(caseItem => 
        new Date(caseItem.createdAt) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(caseItem => 
        new Date(caseItem.createdAt) <= new Date(filters.endDate + "T23:59:59")
      );
    }

    setFilteredCases(filtered);
  };

  const getStatusSummary = () => {
    const summary = {
      "Pending": 0,
      "Resolved": 0,
      "Rejected": 0,
      "In Progress": 0
    };

    filteredCases.forEach(caseItem => {
      const status = caseItem.status || "Pending";
      if (summary[status] !== undefined) {
        summary[status]++;
      }
    });

    return Object.entries(summary).map(([name, value]) => ({ name, value }));
  };

  const getCountySummary = () => {
    const countyData = {};
    
    filteredCases.forEach(caseItem => {
      const county = caseItem.county || "Unknown";
      countyData[county] = (countyData[county] || 0) + 1;
    });

    return Object.entries(countyData)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const generateReport = () => {
    // In a real implementation, this would generate a PDF report
    const reportData = {
      totalCases: filteredCases.length,
      statusSummary: getStatusSummary(),
      countySummary: getCountySummary(),
      filters: filters,
      generatedAt: new Date().toISOString()
    };
    
    console.log("Generated Report:", reportData);
    alert("PDF report generation would be implemented here. Check console for report data.");
  };

  const statusData = getStatusSummary();
  const countyData = getCountySummary();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Box
      id="dashboard"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
        px: { xs: 2, sm: 4, md: 6 }
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {t('dashboard')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('monitorCases')}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={loadCases}
                disabled={loading}
              >
                {t('refresh')}
              </Button>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={generateReport}
              >
                {t('generateReport')}
              </Button>
            </Box>
          </Box>

          {/* Filters */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FilterList sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">{t('filters')}</Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>{t('county')}</InputLabel>
                  <Select
                    value={filters.county}
                    label={t('county')}
                    onChange={(e) => handleFilterChange("county", e.target.value)}
                  >
                    <MenuItem value="all">{t('allCounties')}</MenuItem>
                    {counties.map(county => (
                      <MenuItem key={county} value={county}>{county}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>{t('status')}</InputLabel>
                  <Select
                    value={filters.status}
                    label={t('status')}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                  >
                    <MenuItem value="all">{t('allStatus')}</MenuItem>
                    <MenuItem value="pending">{t('pending')}</MenuItem>
                    <MenuItem value="resolved">{t('resolved')}</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                    <MenuItem value="in progress">{t('inProgress')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label={t('startDate')}
                  InputLabelProps={{ shrink: true }}
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange("startDate", e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label={t('endDate')}
                  InputLabelProps={{ shrink: true }}
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange("endDate", e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Assignment sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
                  <Typography variant="h4" component="div">
                    {filteredCases.length}
                  </Typography>
                  <Typography color="text.secondary">
                    {t('totalCases')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Pending sx={{ fontSize: 48, color: "warning.main", mb: 1 }} />
                  <Typography variant="h4" component="div">
                    {statusData.find(s => s.name === "Pending")?.value || 0}
                  </Typography>
                  <Typography color="text.secondary">
                    {t('pending')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <CheckCircle sx={{ fontSize: 48, color: "success.main", mb: 1 }} />
                  <Typography variant="h4" component="div">
                    {statusData.find(s => s.name === "Resolved")?.value || 0}
                  </Typography>
                  <Typography color="text.secondary">
                    {t('resolved')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <TrendingUp sx={{ fontSize: 48, color: "info.main", mb: 1 }} />
                  <Typography variant="h4" component="div">
                    {statusData.find(s => s.name === "In Progress")?.value || 0}
                  </Typography>
                  <Typography color="text.secondary">
                    {t('inProgress')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={4}>
            {/* Status Distribution Chart */}
            <Grid xs={12} md={6}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  {t('caseStatusDistribution')}
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={statusColors[entry.name] || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* County Distribution Chart */}
            <Grid xs={12} md={6}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  {t('casesByCounty')}
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={countyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard;
