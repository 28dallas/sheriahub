import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Phone, Email, LocationOn, Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: { main: "#1A365D" },
    secondary: { main: "#D4A017" },
    background: { default: "#1A365D" },
    text: { primary: "#FFFFFF", secondary: "#E2E8F0" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: { fontWeight: 600, fontSize: "18px" },
    body2: { fontSize: "14px", color: "#E2E8F0" },
  },
});

const Footer = ({ scrollToSection }) => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", action: () => scrollToSection("home") },
        { label: "Cases", action: () => scrollToSection("cases") },
        { label: "Profiles", action: () => scrollToSection("profiles") },
        { label: "Mediations", action: () => scrollToSection("mediations") },
        { label: "About Us", action: () => scrollToSection("about") },
      ],
    },
    {
      title: "Contact Info",
      items: [
        { icon: <Phone sx={{ fontSize: 18 }} />, text: "+254 XXX XXX XXX" },
        { icon: <Email sx={{ fontSize: 18 }} />, text: "info@judiciary.go.ke" },
        { icon: <LocationOn sx={{ fontSize: 18 }} />, text: "Nairobi, Kenya" },
      ],
    },
    {
      title: "Connect With Us",
      social: [
        { icon: <Facebook />, label: "Facebook", url: "#" },
        { icon: <Twitter />, label: "Twitter", url: "#" },
        { icon: <LinkedIn />, label: "LinkedIn", url: "#" },
      ],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          py: 6,
          px: { xs: 2, sm: 4 },
          borderTop: "4px solid",
          borderColor: "secondary.main",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {footerSections.map((section, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, color: "secondary.main" }}
                  >
                    {section.title}
                  </Typography>
                  
                  {section.links && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {section.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          onClick={link.action}
                          sx={{
                            justifyContent: "flex-start",
                            color: "text.secondary",
                            textTransform: "none",
                            fontSize: "14px",
                            "&:hover": {
                              color: "secondary.main",
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          {link.label}
                        </Button>
                      ))}
                    </Box>
                  )}

                  {section.items && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {section.items.map((item, itemIndex) => (
                        <Box
                          key={itemIndex}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box sx={{ color: "secondary.main" }}>
                            {item.icon}
                          </Box>
                          <Typography variant="body2">
                            {item.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {section.social && (
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      {section.social.map((social, socialIndex) => (
                        <IconButton
                          key={socialIndex}
                          component={Link}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "text.secondary",
                            "&:hover": {
                              color: "secondary.main",
                              backgroundColor: "rgba(212, 160, 23, 0.1)",
                            },
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* USSD Link Button Section */}
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: "1px solid",
              borderColor: "rgba(255, 255, 255, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "secondary.main" }}
            >
              Access Services via USSD
            </Typography>
            <Button
              variant="contained"
              startIcon={<Phone />}
              sx={{
                bgcolor: "secondary.main",
                color: "primary.main",
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#C19B13",
                  transform: "translateY(-2px)",
                },
              }}
              onClick={() => {
                // Open Africa's Talking USSD Simulator in a new tab
                window.open("https://developers.africastalking.com/simulator", "_blank", "noopener,noreferrer");
              }}
            >
              Link to USSD
            </Button>
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Dial *384# from your mobile phone to access our services
            </Typography>
          </Box>

          {/* Copyright */}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "1px solid",
              borderColor: "rgba(255, 255, 255, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              © 2024 Judiciary Dashboard. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
              Designed for efficient judicial administration and public service.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;