import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Card,
  CardContent,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  TextField,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Chip
} from "@mui/material";
import {
  Person,
  Security,
  Notifications,
  Language,
  Save,
  Edit,
  ContactMail,
  Settings,
  AccountCircle,
  Badge
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { fetchProfiles } from "../api/api";
import { useLanguage } from "../contexts/LanguageContext";

const Profile = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254712345678",
    role: "Citizen",
    county: "Nairobi",
    language: "English",
    notifications: true,
    darkMode: false,
    idNumber: "12345678",
    address: "123 Main Street, Nairobi",
    dateJoined: "2024-01-15"
  });
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const profiles = await fetchProfiles();
        if (profiles.length > 0) {
          setUser(prev => ({ ...prev, ...profiles[0] }));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setSaveStatus("saving");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus("success");
      setIsEditing(false);
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "sw", name: "Kiswahili", native: "Kiswahili" },
    { code: "kik", name: "Kikuyu", native: "Gĩkũyũ" },
    { code: "luo", name: "Luo", native: "Dholuo" },
    { code: "kal", name: "Kalenjin", native: "Kalenjin" },
    { code: "som", name: "Somali", native: "Soomaali" }
  ];

  const roleDescriptions = {
    "Citizen": "You can submit and track land dispute cases. Access basic case management features.",
    "Officer": "You can review and process land dispute cases. Access advanced case management tools.",
    "Auditor": "You have full access to audit and monitor all system activities. Administrative privileges."
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box
      id="profile"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
        px: { xs: 2, sm: 4, md: 6 }
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: 48
              }}
            >
              <Person sx={{ fontSize: 48 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {t('userProfile')}
            </Typography>
            <Chip
              label={user.role}
              color={
                user.role === "Citizen" ? "primary" :
                user.role === "Officer" ? "secondary" : "success"
              }
              sx={{ mb: 2 }}
            />
            <Typography variant="body1" color="text.secondary">
              {t('manageAccount')}
            </Typography>
          </Box>

          {saveStatus === "success" && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('saveSuccess')}
            </Alert>
          )}

          {saveStatus === "error" && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {t('saveError')}
            </Alert>
          )}

          {/* Tabs Navigation */}
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': { minHeight: 64 }
              }}
            >
              <Tab icon={<AccountCircle />} label={t('personalInfo')} />
              <Tab icon={<Settings />} label={t('preferences')} />
              <Tab icon={<Security />} label={t('accountSecurity')} />
            </Tabs>
          </Paper>

          {/* Personal Info Tab */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <ContactMail sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">{t('contactInformation')}</Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('fullName')}
                          value={user.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={!isEditing}
                          variant={isEditing ? "outlined" : "filled"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('email')}
                          type="email"
                          value={user.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditing}
                          variant={isEditing ? "outlined" : "filled"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('phoneNumber')}
                          value={user.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditing}
                          variant={isEditing ? "outlined" : "filled"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('county')}
                          value={user.county}
                          onChange={(e) => handleInputChange("county", e.target.value)}
                          disabled={!isEditing}
                          variant={isEditing ? "outlined" : "filled"}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Badge sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">{t('accountDetails')}</Typography>
                    </Box>
                    
                    <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2, mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {t('userID')}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {user.idNumber}
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2, mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {t('physicalAddress')}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {user.address}
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {t('memberSince')}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {new Date(user.dateJoined).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Preferences Tab */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Language sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">{t('languageRegion')}</Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {t('languagePreference')}
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        value={user.language}
                        onChange={(e) => handleInputChange("language", e.target.value)}
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                        SelectProps={{ native: true }}
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.name}>
                            {lang.native} ({lang.name})
                          </option>
                        ))}
                      </TextField>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        {t('regionalSettings')}
                      </Typography>
                      <TextField
                        fullWidth
                        label={t('county')}
                        value={user.county}
                        onChange={(e) => handleInputChange("county", e.target.value)}
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                        sx={{ mb: 2 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Notifications sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">{t('notificationsDisplay')}</Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {t('notificationSettings')}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={user.notifications}
                            onChange={(e) => handleInputChange("notifications", e.target.checked)}
                            disabled={!isEditing}
                          />
                        }
                        label={t('enableNotifications')}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        {t('displayPreferences')}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={user.darkMode}
                            onChange={(e) => handleInputChange("darkMode", e.target.checked)}
                            disabled={!isEditing}
                          />
                        }
                        label={t('darkMode')}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Account Security Tab */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Security sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">{t('roleInformation')}</Typography>
                    </Box>
                    
                    <Box sx={{ p: 3, bgcolor: "primary.50", borderRadius: 2, mb: 3 }}>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        {t('currentRole')}: {user.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {roleDescriptions[user.role]}
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {t('accountStatus')}
                      </Typography>
                      <Chip
                        label={t('active')}
                        color="success"
                        variant="filled"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Security sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">{t('securitySettings')}</Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {t('lastPasswordChange')}: 3 {t('monthsAgo')}
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      disabled={!isEditing}
                    >
                      {t('changePassword')}
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      disabled={!isEditing}
                    >
                      {t('twoFactorAuth')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                size="large"
              >
                {t('editProfile')}
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading}
                  size="large"
                >
                  {loading ? <CircularProgress size={24} /> : t('saveChanges')}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  size="large"
                >
                  {t('cancel')}
                </Button>
              </>
            )}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Profile;
