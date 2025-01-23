// components/Sidebar.tsx
import { Drawer, Toolbar, List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarProps {
  drawerOpen: boolean;
  isSmallScreen: boolean;
  onToggleDrawer: () => void;
}

const Sidebar = ({ drawerOpen, isSmallScreen, onToggleDrawer }: SidebarProps) => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={drawerOpen}
      onClose={onToggleDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton component={Link} to="/" onClick={onToggleDrawer}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/about" onClick={onToggleDrawer}>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contact" onClick={onToggleDrawer}>
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
