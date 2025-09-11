import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Chip, 
  Divider, 
  Avatar, 
  Rating, 
  Tabs, 
  Tab, 
  Paper,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon,
  PlayCircleOutline as PlayIcon,
  ArticleOutlined as ArticleIcon,
  QuizOutlined as QuizIcon,
  CodeOutlined as CodeIcon
} from '@mui/icons-material';
import useApi from '../hooks/useApi';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Fetch skill details
  const { data: skill, loading, error } = useApi(`/api/skills/${id}`);
  
  // Fetch related skills
  const { data: relatedSkills = [] } = useApi(`/api/skills?category=${skill?.category}&limit=4`);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  };
  
  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: skill?.name,
        text: `Check out this skill: ${skill?.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // Show a toast/snackbar here
    }
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading skill: {error.message}</div>;
  if (!skill) return <div>Skill not found</div>;
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Chip 
                  label={skill.category} 
                  color="primary" 
                  size="small" 
                  sx={{ mb: 2, textTransform: 'capitalize' }} 
                />
                <Typography variant="h4" component="h1" gutterBottom>
                  {skill.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={skill.rating || 0} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({skill.ratingCount || 0} reviews)
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                  {skill.shortDescription}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={toggleBookmark} color="primary">
                  {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
            
            {/* Skill Image/Video */}
            <Box 
              sx={{
                height: 400,
                width: '100%',
                backgroundColor: 'action.hover',
                borderRadius: 2,
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {skill.imageUrl ? (
                <img 
                  src={skill.imageUrl} 
                  alt={skill.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              ) : (
                <PlayIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
              )}
            </Box>
            
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                aria-label="skill details tabs"
              >
                <Tab label="Overview" value="overview" />
                <Tab label="Curriculum" value="curriculum" />
                <Tab label="Instructor" value="instructor" />
                <Tab label="Reviews" value="reviews" />
              </Tabs>
            </Box>
            
            {/* Tab Content */}
            <Box sx={{ minHeight: 300 }}>
              {tabValue === 'overview' && (
                <div>
                  <Typography variant="h6" gutterBottom>About This Skill</Typography>
                  <Typography paragraph>{skill.description}</Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>What You'll Learn</Typography>
                  <Grid container spacing={2}>
                    {skill.learningOutcomes?.map((outcome, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <PlayIcon color="primary" sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                          <Typography>{outcome}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Prerequisites</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {skill.prerequisites?.map((prereq, index) => (
                      <Chip key={index} label={prereq} variant="outlined" />
                    )) || <Typography>No prerequisites required</Typography>}
                  </Box>
                </div>
              )}
              
              {tabValue === 'curriculum' && (
                <div>
                  <Typography variant="h6" gutterBottom>Skill Curriculum</Typography>
                  {skill.modules?.map((module, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                        Module {index + 1}: {module.title}
                      </Typography>
                      {module.lessons?.map((lesson, idx) => (
                        <Box 
                          key={idx} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            p: 2, 
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            mb: 1,
                            '&:hover': {
                              backgroundColor: 'action.hover',
                              cursor: 'pointer'
                            }
                          }}
                        >
                          {lesson.type === 'video' ? (
                            <PlayIcon color="action" sx={{ mr: 2 }} />
                          ) : lesson.type === 'article' ? (
                            <ArticleIcon color="action" sx={{ mr: 2 }} />
                          ) : lesson.type === 'quiz' ? (
                            <QuizIcon color="action" sx={{ mr: 2 }} />
                          ) : (
                            <CodeIcon color="action" sx={{ mr: 2 }} />
                          )}
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography>{lesson.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {lesson.duration}
                            </Typography>
                          </Box>
                          {lesson.isFree && (
                            <Chip label="Free" color="success" size="small" />
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </div>
              )}
              
              {tabValue === 'instructor' && skill.instructor && (
                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Avatar 
                    src={skill.instructor.avatar} 
                    alt={skill.instructor.name}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {skill.instructor.name}
                      {skill.instructor.verified && (
                        <Chip 
                          label="Verified Instructor" 
                          size="small" 
                          color="success" 
                          sx={{ ml: 1, fontSize: '0.7rem' }} 
                        />
                      )}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {skill.instructor.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {skill.instructor.bio}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {skill.instructor.expertise?.map((expertise, idx) => (
                        <Chip key={idx} label={expertise} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}
              
              {tabValue === 'reviews' && (
                <div>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ textAlign: 'center', mr: 4 }}>
                      <Typography variant="h2">{skill.rating || 0}</Typography>
                      <Rating value={skill.rating || 0} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        Based on {skill.ratingCount || 0} reviews
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ width: 30 }}>{star} star</Typography>
                          <Box sx={{ flexGrow: 1, mx: 2 }}>
                            <Box 
                              sx={{
                                height: 8,
                                backgroundColor: 'action.hover',
                                borderRadius: 4,
                                overflow: 'hidden'
                              }}
                            >
                              <Box 
                                sx={{
                                  width: `${(skill.ratingDistribution?.[star] || 0) * 100}%`,
                                  height: '100%',
                                  backgroundColor: 'primary.main'
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ width: 40 }}>
                            {Math.round((skill.ratingDistribution?.[star] || 0) * 100)}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  
                  <Button variant="outlined">Write a Review</Button>
                  
                  {/* Reviews List */}
                  <Box sx={{ mt: 4 }}>
                    {skill.reviews?.length > 0 ? (
                      skill.reviews.map((review, index) => (
                        <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: 1, borderColor: 'divider' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                src={review.user.avatar} 
                                alt={review.user.name}
                                sx={{ width: 40, height: 40, mr: 2 }}
                              />
                              <Box>
                                <Typography variant="subtitle2">{review.user.name}</Typography>
                                <Rating value={review.rating} size="small" readOnly />
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(review.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography variant="body1" sx={{ mt: 1 }}>{review.comment}</Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>No reviews yet. Be the first to review!</Typography>
                    )}
                  </Box>
                </div>
              )}
            </Box>
          </Paper>
          
          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>You May Also Like</Typography>
              <Grid container spacing={2}>
                {relatedSkills
                  .filter(s => s.id !== skill.id)
                  .slice(0, 4)
                  .map((relatedSkill) => (
                    <Grid item xs={12} sm={6} md={6} key={relatedSkill.id}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          display: 'flex', 
                          alignItems: 'center',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            cursor: 'pointer'
                          }
                        }}
                        component={Link}
                        to={`/skills/${relatedSkill.id}`}
                      >
                        <Avatar 
                          src={relatedSkill.imageUrl} 
                          variant="rounded"
                          sx={{ width: 80, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" noWrap>{relatedSkill.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating 
                              value={relatedSkill.rating || 0} 
                              size="small" 
                              readOnly 
                              precision={0.5}
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              ({relatedSkill.ratingCount || 0})
                            </Typography>
                          </Box>
                          {relatedSkill.isFree && (
                            <Chip 
                              label="Free" 
                              size="small" 
                              color="success" 
                              sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }} 
                            />
                          )}
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Box 
              sx={{ 
                height: 200, 
                backgroundColor: 'action.hover',
                borderRadius: 2,
                mb: 3,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {skill.previewVideoUrl ? (
                <video 
                  src={skill.previewVideoUrl} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  controls
                />
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  color: 'text.secondary'
                }}>
                  <PlayIcon sx={{ fontSize: 60 }} />
                </Box>
              )}
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Skill Level</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {skill.level?.charAt(0).toUpperCase() + skill.level?.slice(1) || 'All Levels'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Duration</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {skill.duration || 'Self-paced'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Students</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {skill.studentCount?.toLocaleString() || '0'} enrolled
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Language</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {skill.language || 'English'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {new Date(skill.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>This Skill Includes:</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PlayIcon color="primary" sx={{ fontSize: 20, mr: 1 }} />
                  <Typography variant="body2">
                    {skill.content?.videoCount || 0} hours on-demand video
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArticleIcon color="primary" sx={{ fontSize: 20, mr: 1 }} />
                  <Typography variant="body2">
                    {skill.content?.articleCount || 0} articles
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CodeIcon color="primary" sx={{ fontSize: 20, mr: 1 }} />
                  <Typography variant="body2">
                    {skill.content?.codingExerciseCount || 0} coding exercises
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <QuizIcon color="primary" sx={{ fontSize: 20, mr: 1 }} />
                  <Typography variant="body2">
                    {skill.content?.quizCount || 0} quizzes
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Share This Skill</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="primary" size="small">
                  <i className="fab fa-facebook"></i>
                </IconButton>
                <IconButton color="primary" size="small">
                  <i className="fab fa-twitter"></i>
                </IconButton>
                <IconButton color="primary" size="small">
                  <i className="fab fa-linkedin"></i>
                </IconButton>
                <IconButton color="primary" size="small" onClick={handleShare}>
                  <i className="fas fa-link"></i>
                </IconButton>
              </Box>
            </Box>
            
            <Button 
              fullWidth 
              variant="contained" 
              size="large"
              sx={{ mb: 2 }}
            >
              Enroll Now
            </Button>
            
            <Button 
              fullWidth 
              variant="outlined" 
              size="large"
              startIcon={isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              onClick={toggleBookmark}
            >
              {isBookmarked ? 'Bookmarked' : 'Save for later'}
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                30-Day Money-Back Guarantee
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SkillDetails;
