import { Box, Typography, Link, Paper, Divider } from '@mui/material';

const HomeContent = () => {
  return (
    <Box
      id='MainContentBoxContent123'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        pt: 2
      }}
    >
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, p: 4, m: 2 }}>
        <Typography variant="body1" gutterBottom>
          Just a simple site to learn and share.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {`See `}
          <Link
            href="https://github.com/AdamFrieden/AdamPortal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            how it's built
          </Link>
          .
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic' }}>
          I'm a software engineer with 15+ years of experience in SaaS. I love skiing, hiking, books, games, travel, and food.
        </Typography>
        {/* <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Typography variant="body2" sx={{ display: 'flex', mb: 0, alignItems: 'center', fontStyle: 'italic' }}>
            adam@frieden.org
          </Typography>
        </Box> */}
      </Paper>
    </Box>
  );
};

export default HomeContent;
