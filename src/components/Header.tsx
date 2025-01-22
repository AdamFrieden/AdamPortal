// components/Header.tsx
import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  isSmallScreen: boolean;
  darkMode: boolean;
  onToggleDrawer: () => void;
  onToggleTheme: () => void;
}

const Header = ({ isSmallScreen, darkMode, onToggleDrawer, onToggleTheme }: HeaderProps) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isSmallScreen && (
          <IconButton edge="start" color="inherit" onClick={onToggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Adam Portal
        </Typography>
        <Switch checked={darkMode} onChange={onToggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
