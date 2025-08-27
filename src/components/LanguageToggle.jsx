import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Typography
} from '@mui/material';
import { Language } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    handleLanguageMenuClose();
  };

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'kik', name: 'Kikuyu', flag: '🇰🇪' }
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <>
      <Tooltip title={t('languagePreference')}>
        <IconButton
          onClick={handleLanguageMenuOpen}
          sx={{
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: 'rgba(46, 125, 50, 0.1)',
              color: '#2E7D32',
            },
          }}
        >
          <Language />
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleLanguageMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 120,
          }
        }}
      >
        {languageOptions.map((option) => (
          <MenuItem
            key={option.code}
            onClick={() => handleLanguageChange(option.code)}
            selected={language === option.code}
            sx={{
              backgroundColor: language === option.code ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.12)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">{option.flag}</Typography>
              <Typography variant="body2">{option.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageToggle;
