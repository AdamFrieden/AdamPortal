import React, { useState } from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

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

  // Example submenus with their items
  const submenus = [
    {
      id: 'moreOptions',
      label: 'More Options',
      items: [
        { label: 'Option 1', path: '/option1' },
        { label: 'Option 2', path: '/option2' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      items: [
        { label: 'Profile', path: '/profile' },
        { label: 'Account', path: '/account' },
      ],
    },
  ];

  
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

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
        {/* Main Navigation Items */}
        <ListItemButton component={Link} to="/" onClick={onToggleDrawer} selected={isActive('/')}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/about" onClick={onToggleDrawer} selected={isActive('/about')}>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contact" onClick={onToggleDrawer} selected={isActive('/contact')}>
          <ListItemText primary="Contact" />
        </ListItemButton>

        {/* Dynamically Render Submenus */}
        {submenus.map((submenu) => (
          <React.Fragment key={submenu.id}>
            <ListItemButton onClick={() => handleSubmenuToggle(submenu.id)}>
              <ListItemText primary={submenu.label} />
              {openSubmenu === submenu.id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSubmenu === submenu.id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {submenu.items.map((item) => (
                  <ListItemButton
                    key={item.path}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={item.path}
                    selected={isActive(item.path)}
                    onClick={onToggleDrawer}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
