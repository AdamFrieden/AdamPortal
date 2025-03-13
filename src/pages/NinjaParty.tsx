import { Box, Typography, Grid, Paper, Divider } from '@mui/material';

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
        Ninja Party
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
          mb: 4, // Add margin bottom for spacing
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

      {/* Main Content Container */}
      <Box sx={{ maxWidth: '800px', width: '100%' }}>
        {/* Game Overview Section */}
        <Typography variant="h5" gutterBottom>
          About the Game
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Ninja Party is an adventure RPG that combines tactical combat with endless dungeon exploration. 
          Players journey through various Dojos across different worlds, mastering the art of combat while 
          discovering powerful weapons and abilities.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Endless Adventure
              </Typography>
              <Typography variant="body1">
                Explore procedurally generated dungeons with infinite replayability. Each run offers new 
                challenges and discoveries.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Tactical Combat
              </Typography>
              <Typography variant="body1">
                Master grid-based positioning and strategic combat. Plan your moves, utilize skills, and 
                outsmart your opponents.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Character Growth
              </Typography>
              <Typography variant="body1">
                Level up your ninja, unlock new abilities, and discover legendary weapons to become more 
                powerful with each adventure.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Development History Section */}
        <Typography variant="h5" gutterBottom>
          Development Story
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                The Team
              </Typography>
              <Typography variant="body1">
                Ninja Party was developed by Adam and Drew Frieden as a passion project, 
                starting their game development journey in 2014. What began as a side project 
                grew into a full-featured mobile RPG experience.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Technical Details
              </Typography>
              <Typography variant="body1">
                Built using Unity3D and written in C#, the game was developed for both iOS and 
                Android platforms. The team focused on creating a robust system that could generate 
                endless unique dungeon experiences.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NinjaParty;
