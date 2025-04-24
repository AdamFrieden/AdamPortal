import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, HexUtils } from 'react-hexgrid';
import { Box } from '@mui/material';

interface BattleGridViewProps {
  // Define props needed for the battle grid, e.g., grid dimensions, active pieces, etc.
  onClose: () => void; // Function to close the view
}

const BattleGridView: React.FC<BattleGridViewProps> = ({ onClose }) => {
  // Define grid configuration (size, flat/pointy top)
  const gridWidth = 1200;
  const gridHeight = 1000; // Adjusted height to better fit a parallelogram
  const hexagonSize = { x: 7, y: 7 }; // Example size

  // TODO: Generate hexagons based on game state/rules
  const hexagons = GridGenerator.parallelogram(-2, 0, -2, 1);

  // Define the color cycle
  const colors = ['#333', 'lightblue', '#111', 'tomato', 'lightgreen']; // Default, color1, color2, color3

  // State to track the color index for each hexagon { 'q,r,s': index }
  const [hexColors, setHexColors] = useState<{ [id: string]: number }>({});

  // Handle clicking on a hexagon
  const handleHexClick = (hex: { q: number; r: number; s: number }) => {
    const hexId = HexUtils.getID(hex);
    const currentIdx = hexColors[hexId] || 0; // Default to index 0 if not set
    const nextIdx = (currentIdx + 1) % colors.length; // Cycle through colors
    setHexColors(prev => ({
      ...prev,
      [hexId]: nextIdx
    }));
  };

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
        '& .battle-hexagon': { // Target hexagons by class
          stroke: '#000', // Add a subtle border
          strokeWidth: 0.6,
          transition: 'fill 0.2s ease-in-out', // Smooth transition
          cursor: 'pointer',
        },
        '& .color-0': { fill: colors[0] },
        '& .color-1': { fill: colors[1] },
        '& .color-2': { fill: colors[2] },
        '& .color-3': { fill: colors[3] },
        '& .color-4': { fill: colors[4] },
        '& .battle-hexagon:hover': {
          // Example: slightly lighten the stroke on hover?
          // stroke: '#999', 
          // Or maybe apply a filter?
          // filter: 'brightness(1.2)' 
        }
      }}
      onClick={onClose} // Allow closing by clicking the background
    >
      <Box
        sx={{ backgroundColor: '#222', padding: 2, borderRadius: 1 }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the overlay
      >
        <HexGrid width={gridWidth} height={gridHeight}>
          <Layout size={hexagonSize} flat={false} spacing={1.1} origin={{ x: 0, y: 0 }}>
            {hexagons.map((hex, i) => {
              // Generate class names: base class + specific color class
              const hexId = HexUtils.getID(hex);
              const colorIdx = hexColors[hexId] || 0; // Default to index 0
              const hexClassName = `battle-hexagon color-${colorIdx}`;

              return (
                <Hexagon 
                  key={i} 
                  q={hex.q} 
                  r={hex.r} 
                  s={hex.s}
                  className={hexClassName} // Apply base and color-specific class
                  onClick={() => handleHexClick(hex)} // Add click handler
                >
                  {/* TODO: Add content or styling based on hex state */}
                </Hexagon>
              );
            })}
          </Layout>
        </HexGrid>
        {/* TODO: Add controls for placing shapes, confirming turns, etc. */}
        <button onClick={onClose}>Close</button>
      </Box>
    </Box>
  );
};

export default BattleGridView; 