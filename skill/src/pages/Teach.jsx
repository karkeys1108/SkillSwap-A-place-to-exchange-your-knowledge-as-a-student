import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  CardMedia, 
  Box, 
  Chip, 
  Divider, 
  Tabs, 
  Tab, 
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Paper,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  School as SchoolIcon,
  Videocam as VideocamIcon,
  Article as ArticleIcon,
  Code as CodeIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';

const Teach = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState('published');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch teaching content based on tab
  const { data: skills = [], refetch: refetchSkills } = useApi(
    tabValue === 'drafts' ? '/api/teach/drafts' : 
    tabValue === 'published' ? '/api/teach/published' : 
    '/api/teach/archived'
  );
  
  // Mock data for stats
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalHours: 0,
    rating: 4.8,
    reviews: 0,
    completionRate: 0
  });
  
  useEffect(() => {
    // In a real app, fetch teaching stats from API
    const fetchStats = async () => {
      try {
        // const response = await api.get('/api/teach/stats');
        // setStats(response.data);
        
        // Mock data
        setStats({
          totalStudents: 1245,
          totalHours: 356,
          rating: 4.8,
          reviews: 89,
          completionRate: 78
        });
      } catch (error) {
        console.error('Error fetching teaching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleMenuClick = (event, skill) => {
    setAnchorEl(event.currentTarget);
    setSelectedSkill(skill);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSkill(null);
  };
  
  const handleEdit = () => {
    if (selectedSkill) {
      navigate(`/teach/edit/${selectedSkill.id}`);
    }
    handleMenuClose();
  };
  
  const handleDelete = async () => {
    if (!selectedSkill) return;
    
    try {
      // In a real app, delete the skill via API
      // await api.delete(`/api/teach/skills/${selectedSkill.id}`);
      refetchSkills();
      showSnackbar('Skill deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting skill:', error);
      showSnackbar('Failed to delete skill', 'error');
    } finally {
      handleMenuClose();
    }
  };
  
  const handleDuplicate = () => {
    if (selectedSkill) {
      // In a real app, duplicate the skill via API
      // await api.post(`/api/teach/skills/${selectedSkill.id}/duplicate`);
      refetchSkills();
      showSnackbar('Skill duplicated successfully', 'success');
    }
    handleMenuClose();
  };
  
  const handleArchive = async () => {
    if (!selectedSkill) return;
    
    try {
      // In a real app, update the skill status via API
      // await api.put(`/api/teach/skills/${selectedSkill.id}`, { status: 'archived' });
      refetchSkills();
      showSnackbar('Skill archived successfully', 'success');
    } catch (error) {
      console.error('Error archiving skill:', error);
      showSnackbar('Failed to archive skill', 'error');
    } finally {
      handleMenuClose();
    }
  };
  
  const handlePublish = async () => {
    if (!selectedSkill) return;
    
    try {
      // In a real app, update the skill status via API
      // await api.put(`/api/teach/skills/${selectedSkill.id}`, { status: 'published' });
      refetchSkills();
      showSnackbar('Skill published successfully', 'success');
    } catch (error) {
      console.error('Error publishing skill:', error);
      showSnackbar('Failed to publish skill', 'error');
    } finally {
      handleMenuClose();
    }
  };
  
  const showSnackbar = (message, severity = 'info') => {
    // In a real app, use a snackbar context or state
    console.log(`${severity.toUpperCase()}: ${message}`);
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />;
      case 'draft':
        return <PendingIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />;
      case 'archived':
        return <CancelIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />;
      default:
        return null;
    }
  };
  
  // Mock data for skills
  const mockSkills = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn the core concepts of React including components, state, and props.',
      image: 'https://source.unsplash.com/random/400x225/?react',
      students: 1245,
      rating: 4.8,
      lessons: 12,
      duration: '8h 30m',
      status: 'published',
      category: 'Web Development',
      level: 'Beginner',
      createdAt: '2023-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Advanced CSS and Sass',
      description: 'Master modern CSS techniques and Sass to create beautiful, responsive designs.',
      image: 'https://source.unsplash.com/random/400x225/?css',
      students: 856,
      rating: 4.7,
      lessons: 15,
      duration: '10h 15m',
      status: 'published',
      category: 'Web Design',
      level: 'Intermediate',
      createdAt: '2023-02-20T14:45:00Z'
    },
    {
      id: '3',
      title: 'Node.js API Development',
      description: 'Build robust and scalable APIs with Node.js, Express, and MongoDB.',
      image: 'https://source.unsplash.com/random/400x225/?nodejs',
      students: 0,
      rating: 0,
      lessons: 8,
      duration: '6h 45m',
      status: 'draft',
      category: 'Backend Development',
      level: 'Intermediate',
      createdAt: '2023-03-10T09:15:00Z'
    },
    {
      id: '4',
      title: 'Mobile App Design with Figma',
      description: 'Learn to design beautiful mobile apps using Figma with a focus on UI/UX principles.',
      image: 'https://source.unsplash.com/random/400x225/?figma',
      students: 0,
      rating: 0,
      lessons: 10,
      duration: '7h 20m',
      status: 'draft',
      category: 'UI/UX Design',
      level: 'Beginner',
      createdAt: '2023-03-18T16:20:00Z'
    },
    {
      id: '5',
      title: 'Python for Data Science',
      description: 'Learn data analysis and visualization with Python, Pandas, and Matplotlib.',
      image: 'https://source.unsplash.com/random/400x225/?python',
      students: 0,
      rating: 0,
      lessons: 0,
      duration: '0h 00m',
      status: 'draft',
      category: 'Data Science',
      level: 'Beginner',
      createdAt: '2023-04-05T11:10:00Z'
    },
    {
      id: '6',
      title: 'Advanced JavaScript Patterns',
      description: 'Master advanced JavaScript patterns and best practices for writing clean, maintainable code.',
      image: 'https://source.unsplash.com/random/400x225/?javascript',
      students: 0,
      rating: 0,
      lessons: 0,
      duration: '0h 00m',
      status: 'draft',
      category: 'Web Development',
      level: 'Advanced',
      createdAt: '2023-04-12T13:25:00Z'
    },
    {
      id: '7',
      title: 'Responsive Web Design Bootcamp',
      description: 'A comprehensive guide to building responsive websites using modern CSS techniques.',
      image: 'https://source.unsplash.com/random/400x225/?webdesign',
      students: 0,
      rating: 0,
      lessons: 0,
      duration: '0h 00m',
      status: 'draft',
      category: 'Web Design',
      level: 'Beginner',
      createdAt: '2023-04-18T15:40:00Z'
    },
    {
      id: '8',
      title: 'iOS App Development with SwiftUI',
      description: 'Build beautiful iOS applications using SwiftUI and the latest Apple frameworks.',
      image: 'https://source.unsplash.com/random/400x225/?swift',
      students: 0,
      rating: 0,
      lessons: 0,
      duration: '0h 00m',
      status: 'draft',
      category: 'Mobile Development',
      level: 'Intermediate',
      createdAt: '2023-04-22T10:55:00Z'
    }
  ];
  
  // Filter skills based on the selected tab
  const filteredSkills = mockSkills.filter(skill => {
    if (tabValue === 'published') return skill.status === 'published';
    if (tabValue === 'drafts') return skill.status === 'draft';
    return skill.status === 'archived';
  });
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Teach on SkillShare Hub
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your knowledge and earn money by teaching what you love
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/teach/new')}
        >
          Create New Skill
        </Button>
      </Box>
      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
            <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              {stats.totalStudents.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Students
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
            <AccessTimeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              {stats.totalHours}h
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hours Taught
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
            <StarIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mr: 0.5 }}>
                {stats.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({stats.reviews} reviews)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Average Rating
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
            <BarChartIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              {stats.completionRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completion Rate
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
            <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              {filteredSkills.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tabValue === 'published' ? 'Published' : tabValue === 'drafts' ? 'Draft' : 'Archived'} Skills
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs 
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
            },
          }}
        >
          <Tab 
            value="published" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                <span>Published</span>
                <Chip 
                  label={filteredSkills.filter(s => s.status === 'published').length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                />
              </Box>
            } 
          />
          <Tab 
            value="drafts" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PendingIcon fontSize="small" sx={{ mr: 1 }} />
                <span>Drafts</span>
                <Chip 
                  label={filteredSkills.filter(s => s.status === 'draft').length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                />
              </Box>
            } 
          />
          <Tab 
            value="archived" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                <span>Archived</span>
                <Chip 
                  label={filteredSkills.filter(s => s.status === 'archived').length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                />
              </Box>
            } 
          />
        </Tabs>
      </Paper>
      
      {/* Skills Grid */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredSkills.length > 0 ? (
            <Grid container spacing={3}>
              {filteredSkills.map((skill) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={skill.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={skill.image}
                      alt={skill.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Chip 
                          label={skill.level} 
                          size="small" 
                          color={skill.level.toLowerCase() === 'beginner' ? 'success' : skill.level.toLowerCase() === 'intermediate' ? 'warning' : 'error'}
                          sx={{ mb: 1 }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getStatusIcon(skill.status)}
                          <Typography variant="caption" color="text.secondary" textTransform="capitalize">
                            {skill.status}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography gutterBottom variant="h6" component="h2" sx={{ mt: 1 }}>
                        {skill.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {skill.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SchoolIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {skill.students} {skill.students === 1 ? 'student' : 'students'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <VideocamIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {skill.lessons} {skill.lessons === 1 ? 'lesson' : 'lessons'} • {skill.duration}
                        </Typography>
                      </Box>
                      {skill.rating > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StarIcon fontSize="small" sx={{ color: 'gold', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {skill.rating} ({Math.floor(skill.students * 0.1)} reviews)
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                      <Button 
                        size="small" 
                        color="primary"
                        onClick={() => navigate(`/teach/edit/${skill.id}`)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuClick(e, skill)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No {tabValue} skills yet
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {tabValue === 'published' 
                  ? 'You haven\'t published any skills yet. Create your first skill and share your knowledge with the world!'
                  : tabValue === 'drafts'
                  ? 'You don\'t have any draft skills. Start creating a new skill now!'
                  : 'You haven\'t archived any skills.'
                }
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => navigate('/teach/new')}
                sx={{ mt: 2 }}
              >
                Create New Skill
              </Button>
            </Paper>
          )}
        </>
      )}
      
      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        {selectedSkill?.status === 'published' ? (
          <MenuItem onClick={handleArchive}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </MenuItem>
        ) : selectedSkill?.status === 'draft' ? (
          <MenuItem onClick={handlePublish}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText>Publish</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={handlePublish}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText>Restore</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Teach;
