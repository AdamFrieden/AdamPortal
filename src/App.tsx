import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  useMediaQuery,
  CssBaseline,
  Box,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240; // Define drawer width

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Check for small screens
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#658e70',
        light: '#363950',
      },
      secondary: {
        main: '#5bc5bc',
      },
      background: {
        default: '#121314',
        paper: '#161e29',
      },
      text: {
        primary: '#95c9fb',
        secondary: '#2979ff',
      },
      error: {
        main: '#e2756d',
      },
    },
    typography: {
      fontFamily: 'Silkscreen',
    },
    shape: {
      borderRadius: 8, // Rounded corners for components
    },
  });

  // Close the drawer when transitioning to small screens
  useEffect(() => {
    if (isSmallScreen) {
      setDrawerOpen(false);
    }
  }, [isSmallScreen]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100vh', 
        }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1, // Ensure AppBar is above Drawer
          }}
        >
          <Toolbar>
            {/* Show hamburger icon only on small screens */}
            {isSmallScreen && (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Adam Portal
            </Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Drawer
            variant={isSmallScreen ? 'temporary' : 'permanent'}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar /> {/* Spacer for AppBar height */}
            <List>
              <ListItemButton onClick={() => console.log('Home')}>
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton onClick={() => console.log('About')}>
                <ListItemText primary="About" />
              </ListItemButton>
              <ListItemButton onClick={() => console.log('Contact')}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </List>
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3
            }}
          >
            <Toolbar /> {/* Spacer for AppBar height */}
            <Typography variant="h4">Welcome to My App</Typography>
            <Typography>
              This is a simple app with a sidebar navigation and a dark/light theme toggle.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;


