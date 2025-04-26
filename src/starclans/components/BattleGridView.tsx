import React, { useState, useMemo } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, HexUtils } from 'react-hexgrid';
import { Box, useTheme, useMediaQuery, Slider, TextField, Switch, FormControlLabel, Typography, Grid } from '@mui/material';

interface BattleGridViewProps {
  // Define props needed for the battle grid, e.g., grid dimensions, active pieces, etc.
  onClose: () => void; // Function to close the view
}

const BattleGridView: React.FC<BattleGridViewProps> = ({ onClose }) => {
  // Get theme and check for mobile breakpoint
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- State for Grid Configuration ---
  const [paraParams, setParaParams] = useState({ q1: -2, q2: 0, r1: -2, r2: 1 });
  const [isFlat, setIsFlat] = useState(false);
  const [currentSpacing, setCurrentSpacing] = useState(1.1);
  // Keep hex size responsive, but allow slight override via potential future control
  const baseHexSize = isMobile ? 5 : 7;
  const [hexSizeFactor, setHexSizeFactor] = useState(1); // Example for future control
  const currentHexSize = { x: baseHexSize * hexSizeFactor, y: baseHexSize * hexSizeFactor };

  // Responsive grid dimensions and origin (can still be adjusted)
  const gridWidth = isMobile ? '90vw' : 1000; 
  const gridHeight = isMobile ? '70vh' : 800; 
  const layoutOrigin = isMobile ? { x: 10, y: 0 } : { x: 10, y: 0 }; 
  // ---

  // Generate hexagons based on state - useMemo to avoid regeneration on every render
  const hexagons = useMemo(() => {
    try {
      // Ensure params are numbers
      const q1 = Number(paraParams.q1);
      const q2 = Number(paraParams.q2);
      const r1 = Number(paraParams.r1);
      const r2 = Number(paraParams.r2);
      if ([q1,q2,r1,r2].some(isNaN)) return []; // Prevent errors on invalid input
      return GridGenerator.parallelogram(q1, q2, r1, r2);
    } catch (error) {
      console.error("Error generating grid:", error);
      return []; // Return empty array on error
    }
  }, [paraParams]);

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
        sx={{
          backgroundColor: '#222',
          padding: isMobile ? 1 : 2, // Less padding on mobile
          borderRadius: 1,
          width: isMobile ? '95vw' : 'auto', // Adjust width on mobile
          height: isMobile ? '80vh' : 'auto', // Adjust height on mobile
          maxWidth: '1200px', // Optional: Max width for larger screens
          maxHeight: '90vh', // Optional: Max height
          overflow: 'hidden', // Hide overflow if grid is larger than box
          display: 'flex', // Use flex to center grid if needed
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the overlay
      >
        {/* Grid Area */}
        <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <HexGrid width={gridWidth} height={gridHeight}>
            <Layout size={currentHexSize} flat={isFlat} spacing={currentSpacing} origin={layoutOrigin}>
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
        </Box>

        {/* Controls Area */} 
        <Box sx={{ 
             padding: isMobile ? 1 : 2, 
             borderTop: '1px solid #444', 
             width: '100%',
             maxHeight: isMobile ? '30vh' : '25vh', // Limit height 
             overflowY: 'auto' // Allow scrolling if controls overflow
             }}>
            <Typography variant="caption" display="block" gutterBottom>Debug Controls</Typography>
            <Grid container spacing={isMobile ? 1 : 2} alignItems="center">
                {/* Parallelogram Params */} 
                {Object.keys(paraParams).map(key => (
                    <Grid item xs={6} sm={3} key={key}>
                        <TextField
                            label={key.toUpperCase()}
                            type="number"
                            size="small"
                            value={paraParams[key as keyof typeof paraParams]}
                            onChange={(e) => setParaParams(prev => ({ ...prev, [key]: e.target.value }))}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                ))}
                {/* Spacing Slider */} 
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" display="block">Spacing: {currentSpacing.toFixed(2)}</Typography>
                    <Slider
                        size="small"
                        value={currentSpacing}
                        min={0.5}
                        max={2.0}
                        step={0.05}
                        onChange={(_, newValue) => setCurrentSpacing(newValue as number)}
                        valueLabelDisplay="auto"
                    />
                </Grid>
                {/* Flat/Pointy Toggle */}
                 <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Switch checked={isFlat} onChange={(e) => setIsFlat(e.target.checked)} size="small" />}
                        label="Flat Top"
                    />
                </Grid>
                {/* Add Hex Size control here if needed */}
            </Grid>
             <button onClick={onClose} style={{ marginTop: isMobile ? '8px' : '16px' }}>Close</button> 
        </Box>
      </Box>
    </Box>
  );
};

export default BattleGridView; 