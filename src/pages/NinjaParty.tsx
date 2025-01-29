import { Box, Typography } from '@mui/material';

const NinjaParty = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centers content horizontally
        justifyContent: 'center', // Keeps content aligned properly
        mt: 4, // Push content down to avoid overlap with header
        px: 2, // Adds side padding to prevent touching screen edges
      }}
    >
      <Typography variant="h4" gutterBottom>
        Check out this Ninja Party!
      </Typography>

      {/* Video Wrapper with Correct Aspect Ratio */}
      <Box
        sx={{
          position: 'relative',
          width: '100%', // Take full available width
          maxWidth: '800px', // Don't exceed 800px on large screens
          aspectRatio: '16 / 9', // Ensure the correct aspect ratio
          borderRadius: 2, // Optional: Rounded edges for aesthetics
          overflow: 'hidden', // Prevents any unwanted overflow
          boxShadow: 3, // Adds a subtle shadow
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/SKHXHcrn_xw"
          title="Ninja Party Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default NinjaParty;
