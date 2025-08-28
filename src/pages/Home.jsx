import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Gavel, Person, Balance, ArrowDownward, Security } from "@mui/icons-material";
import { motion } from "framer-motion";

const Home = ({ scrollToSection }) => {
  const features = [
    {
      icon: <Gavel sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "Case Management",
      description: "Track and manage legal cases efficiently with our comprehensive dashboard.",
    },
    {
      icon: <Person sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "User Profiles",
      description: "Access detailed user information and case histories in one place.",
    },
    {
      icon: <Balance sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "Mediation Records",
      description: "Manage and review mediation processes and outcomes seamlessly.",
    },
    {
      icon: <Security sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "Secure USSD Access",
      description: "Access judiciary services securely through USSD technology for mobile convenience.",
    },
  ];

  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000 0%, #D32F2F 20%, #2E7D32 60%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{ mb: 3, fontWeight: 700, color: "#FFFFFF" }}
                >
                  <Box component="span" sx={{ color: "#D32F2F" }}>Sharia</Box>Link
                  <br />
                  <Box component="span" sx={{ color: "#2E7D32" }}>
                    SHARIA LINK HUB
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 4, fontSize: "20px", opacity: 0.9, color: "#FFFFFF" }}
                >
                  Streamlining legal case management and mediation processes 
                  for efficient judicial administration. <br />
                  One portal All Your Civil Services

                </Typography>
<Button
  variant="contained"
  size="large"
  sx={{
    bgcolor: "#2E7D32",
    color: "#FFFFFF",
    fontSize: "18px",
    padding: "12px 32px",
    "&:hover": {
      bgcolor: "#1B5E20",
    },
  }}
  onClick={() => scrollToSection("about")}
>
  Scroll to Explore The Dashboard 
</Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 4,
                    padding: 4,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#FFFFFF" }}>
                    Key Features
                  </Typography>
                  <Grid container spacing={2}>
                    {features.map((feature, index) => (
                      <Grid item xs={6} key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card
                            sx={{
                              background: "rgba(255, 255, 255, 0.15)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: 3,
                              height: "100%",
                              "&:hover": {
                                background: "rgba(255, 255, 255, 0.2)",
                                transform: "translateY(-4px)",
                                transition: "all 0.3s ease",
                              },
                            }}
                          >
                            <CardContent sx={{ textAlign: "center", p: 2 }}>
                              {feature.icon}
                              <Typography
                                variant="h6"
                                sx={{ mt: 1, mb: 1, fontWeight: 600, fontSize: "16px" }}
                              >
                                {feature.title}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "12px" }}>
                                {feature.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button
            onClick={() => scrollToSection("about")}
            sx={{ color: "white", flexDirection: "column" }}
          >
            <ArrowDownward sx={{ fontSize: 32 }} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Scroll to explore
            </Typography>
          </Button>
        </motion.div>
      </Box>
  );
};

export default Home;