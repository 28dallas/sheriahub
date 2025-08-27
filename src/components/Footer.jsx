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
import { Phone, Email, LocationOn, Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = ({ scrollToSection }) => {
  const footerSections = [
    {
      title: "Quick Links",
      titleColor: "#2E7D32",
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
      titleColor: "#D32F2F",
      items: [
        { icon: <Phone sx={{ fontSize: 18, color: "#2E7D32" }} />, text: "+254 719 732842" },
        { icon: <Email sx={{ fontSize: 18, color: "#2E7D32" }} />, text: "info@judiciary.go.ke" },
        { icon: <LocationOn sx={{ fontSize: 18, color: "#2E7D32" }} />, text: "Nairobi, Kenya" },
      ],
    },
    {
      title: "Connect With Us",
      titleColor: "#2E7D32",
      social: [
        { icon: <Facebook />, label: "Facebook", url: "#" },
        { icon: <Twitter />, label: "Twitter", url: "#" },
        { icon: <LinkedIn />, label: "LinkedIn", url: "#" },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #000000 0%, #D32F2F 15%, #000000 40%, #2E7D32 85%)",
        color: "#FFFFFF",
        py: 6,
        px: { xs: 2, sm: 4 },
        borderTop: "4px solid #D32F2F",
      }}
    >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {footerSections.map((section, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, color: section.titleColor }}
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
                            color: "#FFFFFF",
                            textTransform: "none",
                            fontSize: "14px",
                            "&:hover": {
                              color: "#2E7D32",
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
                          <Box>
                            {item.icon}
                          </Box>
                          <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
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
                            color: "#FFFFFF",
                            "&:hover": {
                              color: "#2E7D32",
                              backgroundColor: "rgba(46, 125, 50, 0.1)",
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
              sx={{ mb: 2, color: "#2E7D32" }}
            >
              Access Services via <Box component="span" sx={{ color: "#D32F2F" }}>USSD</Box>
            </Typography>
            <Button
              variant="contained"
              startIcon={<Phone />}
              sx={{
                bgcolor: "#2E7D32",
                color: "#FFFFFF",
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#1B5E20",
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
              sx={{ mt: 2, color: "#FFFFFF" }}
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
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
              © 2024 <Box component="span" sx={{ color: "#D32F2F" }}>Judiciary</Box> Dashboard. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFFFFF", mt: 1 }}>
              Designed for efficient judicial administration and public service.
            </Typography>
          </Box>
        </Container>
      </Box>
  );
};

export default Footer;