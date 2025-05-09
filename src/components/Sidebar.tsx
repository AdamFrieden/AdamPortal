import React, { useMemo, useState } from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Submenu from './Submenu';

interface SidebarProps {
  drawerOpen: boolean;
  isSmallScreen: boolean;
  onToggleDrawer: () => void;
}

const Sidebar = ({ drawerOpen, isSmallScreen, onToggleDrawer }: SidebarProps) => {
  const drawerWidth = 240;

  // State to track which submenu is open
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Handle submenu toggle
  const handleSubmenuToggle = (id: string) => {
    setOpenSubmenu((prev) => (prev === id ? null : id)); // Toggle the submenu
  };

  // Memoized styles for Drawer
  const drawerStyles = useMemo(
    () => ({
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }),
    [drawerWidth]
  );

  // Example submenus with their items
  const submenus = [
    {
      id: 'creativeWriting',
      label: 'Creative Writing',
      items: [
        { label: '[empty]', path: '/' },
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      items: [
        { label: 'Ninja Party', path: '/ninjaparty' },
        { label: 'Verse Commander', path: '/versecommander' },
        // { label: 'Star Clans', path: '/starclans' },
      ],
    },
  ];

  const location = useLocation();
  // Memoized check for router path
  const isActive = React.useCallback((path: string) => location.pathname === path, [location.pathname]);

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={drawerOpen}
      onClose={onToggleDrawer}
      sx={drawerStyles}
    >
      <Toolbar />
      <List>
        {/* Main Navigation Items */}
        <ListItemButton component={Link} to="/" onClick={onToggleDrawer} selected={isActive('/')}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/travel" onClick={onToggleDrawer} selected={isActive('/travel')}>
          <ListItemText primary="Travel" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dev-knowledge" onClick={onToggleDrawer} selected={location.pathname.startsWith('/dev-knowledge')}>
          <ListItemText primary="Dev Learning" />
        </ListItemButton>

        {/* Dynamically Render Submenus */}
        {submenus.map((submenu) => (
          <Submenu
            key={submenu.id}
            id={submenu.id}
            label={submenu.label}
            items={submenu.items}
            openSubmenu={openSubmenu}
            onToggle={handleSubmenuToggle}
            isActive={isActive}
            onCloseDrawer={onToggleDrawer}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
