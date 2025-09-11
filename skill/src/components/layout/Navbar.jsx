import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  School as SchoolIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  AccountCircle,
  Dashboard as DashboardIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Navbar = ({ colorMode, mode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  
  // Check if user is logged in (in a real app, this would come from your auth context)
  useEffect(() => {
    // Simulate checking if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem('user');
    setUser(null);
    handleMenuClose();
    navigate('/login');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem 
        component={RouterLink} 
        to="/dashboard/profile" 
        onClick={handleMenuClose}
      >
        <AccountCircle sx={{ mr: 1 }} /> Profile
      </MenuItem>
      <MenuItem 
        component={RouterLink} 
        to="/dashboard/settings" 
        onClick={handleMenuClose}
      >
        <SettingsIcon sx={{ mr: 1 }} /> Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={RouterLink} to="/browse" onClick={handleMobileMenuClose}>
        <Typography>Browse Skills</Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to="/teach" onClick={handleMobileMenuClose}>
        <Typography>Teach a Skill</Typography>
      </MenuItem>
      <MenuItem onClick={colorMode.toggleColorMode}>
        <IconButton size="large" color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <p>Theme</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            SkillShare Hub
          </Typography>

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            <Button 
              component={RouterLink} 
              to="/browse" 
              color="inherit" 
              sx={{ 
                my: 2, 
                display: 'block',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                ...(location.pathname === '/browse' && {
                  borderBottom: '2px solid',
                  borderRadius: 0,
                })
              }}
            >
              Browse Skills
            </Button>
            <Button 
              component={RouterLink} 
              to="/teach" 
              color="inherit" 
              sx={{ 
                my: 2, 
                display: 'block',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                ...(location.pathname === '/teach' && {
                  borderBottom: '2px solid',
                  borderRadius: 0,
                })
              }}
            >
              Teach a Skill
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Theme Toggle */}
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton 
                sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }} 
                onClick={colorMode.toggleColorMode} 
                color="inherit"
              >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar 
                    alt={user?.name || 'User'} 
                    src={user?.avatar} 
                    sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                  >
                    {user?.name?.charAt(0) || 'U'}
                  </Avatar>
                </IconButton>
                <Typography 
                  variant="subtitle2" 
                  sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}
                >
                  {user?.name || 'User'}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button 
                  component={RouterLink} 
                  to="/login" 
                  color="inherit"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/register" 
                  variant="contained" 
                  color="secondary" 
                  sx={{ 
                    ml: 2,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};

export default Navbar;
