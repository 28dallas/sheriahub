import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Grid,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const Education = () => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);

  const modules = [
    { id: 1, title: t('module1Title'), description: t('module1Description') },
    { id: 2, title: t('module2Title'), description: t('module2Description') },
    { id: 3, title: t('module3Title'), description: t('module3Description') },
    { id: 4, title: t('module4Title'), description: t('module4Description') },
  ];

  useEffect(() => {
    const calculateProgress = () => {
      const completedCount = completedModules.length;
      const totalModules = modules.length;
      const progressPercentage = (completedCount / totalModules) * 100;
      setProgress(progressPercentage);
    };

    calculateProgress();
  }, [completedModules, modules.length]);

  const handleModuleCompletion = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('education')}
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('progress')}
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
          <Typography variant="body2">
            {Math.round(progress)}% {t('completed')}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        {t('modules')}
      </Typography>
      
      <Grid container spacing={3}>
        {modules.map(module => (
          <Grid item xs={12} md={6} key={module.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {module.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {module.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleModuleCompletion(module.id)}
                  disabled={completedModules.includes(module.id)}
                >
                  {completedModules.includes(module.id) ? t('completed') : t('markComplete')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Education;
