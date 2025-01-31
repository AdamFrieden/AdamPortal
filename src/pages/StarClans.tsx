// pages/StarClans.tsx
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const underconstruction = '[Under Construction]'

const StarClans = () => {
  return (
    <div>
      <Box pt={2}>
        <Typography variant="h4" mb={4}>
            <Link component={RouterLink} to="/starclandemo" color="secondary">
              {underconstruction}
            </Link>
          </Typography>
        </Box>
    </div>
  );
};

export default StarClans;
