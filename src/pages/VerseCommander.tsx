import { Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const VerseCommander = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Vertical stacking on small screens, horizontal on medium and larger screens
        alignItems: 'flex-start',
        p: { xs: 2, md: '16px 32px' }, // Responsive padding
      }}
    >
      <Box flexGrow={1} p={2}>
        <Typography variant="h4" gutterBottom>
          Verse Commander
        </Typography>
        <Typography variant="body1">
          A text-based roguelike with simple interactions and endless space to adventure through.
        </Typography>
        <Box pt={2}>
          <Typography>
            <Link component={RouterLink} to="/versecommanderdemo" color="primary">
              Check out a demo.
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box>
        <video
          width="360"   // Set the width of the video
          height="640"  // Set the height of the video
          controls      // Shows the video playback controls
          autoPlay      // Optional: Autoplay the video (consider usability)
          muted         // Recommended if autoplay is used (required by some browsers to autoplay)
          loop          // Optional: Loop the video
        >
          <source src="/verse_commander_interaction.mp4" type="video/mp4" />
        </video>
      </Box>
    </Box>
  );
};

export default VerseCommander;
