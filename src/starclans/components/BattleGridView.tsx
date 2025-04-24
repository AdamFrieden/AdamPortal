import React from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import { Box } from '@mui/material';

interface BattleGridViewProps {
  // Define props needed for the battle grid, e.g., grid dimensions, active pieces, etc.
  onClose: () => void; // Function to close the view
}

const BattleGridView: React.FC<BattleGridViewProps> = ({ onClose }) => {
  // TODO: Define grid configuration (size, flat/pointy top)
  const gridWidth = 1200;
  const gridHeight = 1000; // Adjusted height to better fit a parallelogram
  const hexagonSize = { x: 7, y: 7 }; // Example size

  // TODO: Generate hexagons based on game state/rules
  const hexagons = GridGenerator.parallelogram(-2, 3, -2, 1);

  return (
    <Box
      sx={{
        position: 'fixed', // Overlay behavior
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's on top
      }}
      onClick={onClose} // Allow closing by clicking the background
    >
      <Box
        sx={{ backgroundColor: '#222', padding: 2, borderRadius: 1 }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the overlay
      >
        <HexGrid width={gridWidth} height={gridHeight}>
          <Layout size={hexagonSize} flat={false} spacing={1.1} origin={{ x: 0, y: 0 }}>
            {hexagons.map((hex, i) => (
              <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}>
                {/* TODO: Add content or styling based on hex state */}
              </Hexagon>
            ))}
          </Layout>
        </HexGrid>
        {/* TODO: Add controls for placing shapes, confirming turns, etc. */}
        <button onClick={onClose}>Close</button>
      </Box>
    </Box>
  );
};

export default BattleGridView; 