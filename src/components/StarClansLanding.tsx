// pages/StarClansLanding.tsx
import { Stack, Typography } from '@mui/material';
// import StatusComponent from '../components/StatusComponent';
import ProfilePage from './ProfilePage';
import StatusComponent from './StatusComponent';

const StarClansLanding = () => {
  return (
    <div>
      <ProfilePage />
      <Stack spacing={2}>
        <Typography variant="h4" mb={4}>
          Research
        </Typography>
        <StatusComponent name='High-Grav Chamber'/>
        <StatusComponent name='Med Bay'/>
        <StatusComponent name='Bio Recycler'/>
      </Stack>
    </div>
  );
};

export default StarClansLanding;
