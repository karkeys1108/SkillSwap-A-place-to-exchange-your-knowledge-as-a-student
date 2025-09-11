import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const SkillCard = ({ skill, level, category, description, icon: Icon }) => {
  return (
    <StyledCard elevation={3}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          {Icon && <Icon sx={{ mr: 1, color: 'primary.main' }} />}
          <Typography variant="h6" component="h3">
            {skill}
          </Typography>
        </Box>
        
        {category && (
          <Chip 
            label={category} 
            size="small" 
            color="secondary" 
            sx={{ mb: 2 }}
          />
        )}
        
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" color="text.secondary">
              Proficiency
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {level}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={level} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default SkillCard;
