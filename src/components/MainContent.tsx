import { Box, Typography, Link, Paper, Divider } from '@mui/material';

const MainContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'top',
        // justifyContent: 'center',
        minHeight: '100vh',
        // p: 3
      }}
    >
      <Paper elevation={3} sx={{ width: '80%', maxWidth: 600, p: 4, m: 2 }}>
        <Typography variant="body1" gutterBottom>
          Just a simple site to learn and share.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {`Follow along with the `}
          <Link
            href="https://github.com/AdamFrieden/AdamPortal/blob/main/DevLog.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            log
          </Link>
          {` on my `}
          <Link
            href="https://github.com/AdamFrieden/AdamPortal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository.
          </Link>
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic' }}>
          I am a software engineer with 15+ years of experience in SaaS. I love skiing, hiking, books, games, travel, and food.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Typography variant="body2" sx={{ display: 'flex', mb: 0, alignItems: 'center', fontStyle: 'italic' }}>
            adam@frieden.org
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default MainContent;
