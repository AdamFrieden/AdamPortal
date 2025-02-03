// components/Header.tsx
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../context/ThemeProvider';
import LightMode from '@mui/icons-material/LightMode'; // Sun icon
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'; // Moon icon

interface HeaderProps {
  isSmallScreen: boolean;
  onToggleDrawer: () => void;
}

const Header = ({ isSmallScreen, onToggleDrawer }: HeaderProps) => {
    const { darkMode, toggleDarkMode } = useTheme();
  
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton edge="start" color="inherit" onClick={onToggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            adam@frieden.org
          </Typography>
          {/* Toggle Button with Sun/Moon Icons */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <DarkModeOutlined /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  };
  
export default Header;
