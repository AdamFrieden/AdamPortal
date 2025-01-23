// components/AlternativeLayout.tsx
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AlternativeLayout = () => {
  return (
    <Box sx={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ margin: '20px 0' }}>
        Welcome to the Alternative Layout
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Outlet /> {/* Render child routes here */}
      </Box>
    </Box>
  );
};

export default AlternativeLayout;
