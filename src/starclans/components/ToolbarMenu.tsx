import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Refresh from '@mui/icons-material/Refresh';
import useStarclanGameStore from '../context/useStarclanGameStore';
import useStarclanUIStore from '../context/useStarclanUIStore';
import { DarkModeOutlined, Delete, Info, LightMode } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeProvider';

export default function ToolbarMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const refreshData = useStarclanGameStore((state) => state.refreshGameState);
  const deleteData = useStarclanGameStore((state) => state.deleteData);
  const showDebugPanel = useStarclanUIStore((state) => state.showDebugPanel);
  const isShowingDebugPanel = useStarclanUIStore((state) => state.isShowingDebugPanel);
  const { darkMode, toggleDarkMode } = useTheme();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDebugToggle = () => {
    showDebugPanel(!isShowingDebugPanel);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mr: '1.5rem' }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Settings />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDebugToggle}>
          <ListItemIcon>
            <Info fontSize="small" />
          </ListItemIcon>
          Debug
        </MenuItem>
        <MenuItem onClick={refreshData}>
          <ListItemIcon>
            <Refresh fontSize="small" />
          </ListItemIcon>
          Refresh
        </MenuItem>
        <MenuItem onClick={deleteData}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
        <MenuItem onClick={toggleDarkMode}>
          <ListItemIcon>
            {darkMode ? <DarkModeOutlined /> : <LightMode />}
          </ListItemIcon>
          {darkMode ? 'Light' : 'Dark'}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
