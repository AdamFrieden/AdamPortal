// components/Sidebar.tsx
import { Drawer, Toolbar, List, ListItemButton, ListItemText } from '@mui/material';

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
  );
};

export default Sidebar;
