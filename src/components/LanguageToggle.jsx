import React from "react";
import { Button } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "English" ? "Kiswahili" : "English"));
  };

  return (
    <Button variant="outlined" onClick={toggleLanguage}>
      {language === "English" ? "Switch to Kiswahili" : "Switch to English"}
    </Button>
  );
};

export default LanguageToggle;
