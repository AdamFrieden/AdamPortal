// pages/StarClansLanding.tsx
import { Box, Stack, Typography } from '@mui/material';
import StatusComponent from '../components/StatusComponent';

const StarClansLanding = () => {
  return (
    <div>
      <Box pt={2}>
        <Typography variant="h4" mb={4}>
              Research
          </Typography>
        </Box>
      <Stack spacing={2}>
        <StatusComponent name='High-Grav Chamber'/>
        <StatusComponent name='Med Bay'/>
        <StatusComponent name='Bio Recycler'/>
      </Stack>
    </div>
  );
};

export default StarClansLanding;
