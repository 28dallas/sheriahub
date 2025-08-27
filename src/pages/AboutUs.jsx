import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { Groups, History, LocationOn } from "@mui/icons-material";
import { motion } from "framer-motion";

const AboutUs = () => {
  const aboutSections = [
    {
      icon: <Groups sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "Our Mission",
      titleColor: "#000000",
      content: "Sheria Link Hub is a digital platform designed to bridge the gap between citizens, government institutions, and relevant authorities, fostering a transparent, accountable, and responsive justice system."
    },
    {
      icon: <History sx={{ fontSize: 48, color: "#D32F2F" }} />,
      title: "Our History",
      titleColor: "#D32F2F",
      content: "Our mission is to empower individuals by providing a centralized space where legal concerns, rights violations, and public service grievances can be submitted, tracked, and addressed efficiently. Every interaction is securely logged, timestamped, and stored to ensure full accountability and traceability — creating a digital paper trail that strengthens institutional integrity."
    },
    {
      icon: <LocationOn sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "Our Reach",
      titleColor: "#000000",
      content: "By leveraging real-time case tracking, data-backed reporting, and cross-agency collaboration tools, Justice Hub ensures that no complaint goes unheard, no abuse goes unchallenged, and no authority operates without oversight. Citizens can follow the status of their cases, view timelines of government response, and access legal resources — all in one place."
    }
  ];

  return (
    <Box
      id="about"
      sx={{
        minHeight: "100vh",
        bgcolor: "#FFFFFF",
        py: 8,
        px: { xs: 2, sm: 4 },
      }}
    >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 6, color: "#000000" }}
            >
              About <Box component="span" sx={{ color: "#D32F2F" }}>Us</Box>
            </Typography>
            
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 6, maxWidth: 800, mx: "auto", fontSize: "20px" }}
            >
              At its core, Justice Hub is not just a tech solution — it's a civic movement toward open governance, fair justice, and restored public trust.
            </Typography>

            <Grid container spacing={4}>
              {aboutSections.map((section, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 4,
                        height: "100%",
                        textAlign: "center",
                        borderRadius: 3,
                        "&:hover": {
                          transform: "translateY(-8px)",
                          transition: "all 0.3s ease",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        {section.icon}
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ mb: 2, fontWeight: 600, color: section.titleColor }}
                      >
                        {section.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {section.content}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
  );
};

export default AboutUs;
