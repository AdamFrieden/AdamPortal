import React from 'react';
import { Button, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

interface MapControlsProps {
  onResetMap: () => void;
  onToggleSearch: () => void;
  isSearchVisible: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({ 
  onResetMap, 
  onToggleSearch, 
  isSearchVisible 
}) => {
  return (
    <>
      {/* Reset Map Button */}
      <Tooltip title="Reset map view" placement="left">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onResetMap}
          aria-label="Reset map view"
          sx={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000,
            minWidth: 40,
            width: 40,
            height: 40,
            p: 0
          }}
        >
          <RefreshIcon />
        </Button>
      </Tooltip>
      
      {/* Search Toggle Button */}
      <Tooltip title={isSearchVisible ? "Hide search" : "Search trips"} placement="left">
        <Button
          variant="contained"
          color="secondary"
          onClick={onToggleSearch}
          aria-label={isSearchVisible ? "Hide search" : "Search trips"}
          sx={{
            position: 'absolute',
            top: 70, // Positioned below the reset button
            right: 16, // Aligned with reset button
            zIndex: 1000,
            minWidth: 40,
            width: 40,
            height: 40,
            p: 0
          }}
        >
          {isSearchVisible ? <CloseIcon /> : <SearchIcon />}
        </Button>
      </Tooltip>
    </>
  );
};

export default MapControls; 