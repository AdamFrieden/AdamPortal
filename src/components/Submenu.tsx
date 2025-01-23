import React, { memo } from 'react';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Submenu Props
interface SubmenuProps {
  id: string;
  label: string;
  items: { label: string; path: string }[];
  openSubmenu: string | null;
  onToggle: (id: string) => void;
  isActive: (path: string) => boolean;
  onCloseDrawer: () => void;
}

const Submenu: React.FC<SubmenuProps> = ({
  id,
  label,
  items,
  openSubmenu,
  onToggle,
  isActive,
  onCloseDrawer,
}) => {
  return (
    <>
      <ListItemButton onClick={() => onToggle(id)}>
        <ListItemText primary={label} />
        {openSubmenu === id ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSubmenu === id} timeout={200} unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItemButton
              key={item.path}
              sx={{ pl: 4 }}
              component={Link}
              to={item.path}
              selected={isActive(item.path)}
              onClick={onCloseDrawer}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

// Use `memo` to prevent unnecessary re-renders if props don't change
export default memo(Submenu);
