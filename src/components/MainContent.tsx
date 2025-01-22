// components/MainContent.tsx
import { Box, Toolbar, Typography, Link } from '@mui/material';

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h4">Hey it's Adam</Typography>
      <Typography>
        <p>
          A simple site to learn and share.
          <br />
          {`Follow along `}
          <Link
            href="https://github.com/AdamFrieden/AdamPortal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Link>.
        </p>
      </Typography>
    </Box>
  );
};

export default MainContent;
