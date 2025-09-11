import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import SkillCard from '../components/skills/SkillCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApi from '../hooks/useApi';

const BrowseSkills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    sortBy: 'recent',
  });

  // Fetch skills from API
  const { data: skills, loading, error } = useApi('/api/skills');
  
  // Filter and sort skills based on search and filters
  const filteredSkills = skills
    ?.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(skill => 
      !filters.category || skill.category === filters.category
    )
    .filter(skill => 
      !filters.level || skill.level === filters.level
    )
    .sort((a, b) => {
      if (filters.sortBy === 'recent') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filters.sortBy === 'popular') {
        return b.views - a.views;
      } else if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading skills: {error.message}</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Browse Skills
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover and learn new skills from our community
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
        
        <TextField
          select
          label="Category"
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          SelectProps={{ native: true }}
          variant="outlined"
          sx={{ minWidth: 180 }}
        >
          <option value="">All Categories</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="business">Business</option>
          <option value="languages">Languages</option>
        </TextField>
        
        <TextField
          select
          label="Level"
          value={filters.level}
          onChange={(e) => setFilters({...filters, level: e.target.value})}
          SelectProps={{ native: true }}
          variant="outlined"
          sx={{ minWidth: 150 }}
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </TextField>
        
        <TextField
          select
          label="Sort By"
          value={filters.sortBy}
          onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          SelectProps={{ native: true }}
          variant="outlined"
          sx={{ minWidth: 150 }}
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </TextField>
      </Box>

      {/* Skills Grid */}
      {filteredSkills?.length > 0 ? (
        <Grid container spacing={3}>
          {filteredSkills.map((skill) => (
            <Grid item key={skill.id} xs={12} sm={6} md={4} lg={3}>
              <SkillCard skill={skill} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No skills found matching your criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default BrowseSkills;
