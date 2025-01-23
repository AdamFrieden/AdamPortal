// components/MainContent.tsx
import { Box, Typography, Link } from '@mui/material';

const MainContent = () => {
  return (
    <Box>
      <Typography variant="h4">Hey it's Adam</Typography>
      <br/>
      <Typography>
          A simple site to learn and share.
      </Typography>
      <Typography>
          {`Follow along `}
          <Link
            href="https://github.com/AdamFrieden/AdamPortal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Link>.
      </Typography>
    </Box>
  );
};

export default MainContent;
