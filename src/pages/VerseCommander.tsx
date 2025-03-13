import { Typography, Box, Link, Grid, Paper, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const VerseCommander = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        px: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Verse Commander
      </Typography>

      {/* Main Content Layout */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mb: 4,
        }}
      >
        {/* Left Column - Game Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" paragraph>
            Embark on an endless journey through procedurally generated space in this text-based sci-fi roguelike adventure.
            As a Verse Commander, you'll navigate through the cosmos, engaging in strategic battles, trading with space merchants,
            and uncovering the mysteries of the universe.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Endless Space Adventure
                </Typography>
                <Typography variant="body1">
                  Navigate through an infinite procedurally generated universe, each playthrough offering unique encounters,
                  events, and challenges to overcome.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Ship Customization
                </Typography>
                <Typography variant="body1">
                  Modify your ship with powerful weapons and equipment. Trade with vendors across space
                  to build the perfect loadout for your playstyle.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Dynamic Events
                </Typography>
                <Typography variant="body1">
                  Encounter a variety of NPCs, engage in combat with space mobs, and react to random
                  events that shape your journey through the cosmos.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <Link component={RouterLink} to="/versecommanderdemo" color="primary">
                Try the interactive demo →
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Right Column - Video */}
        <Box 
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <video
              width="360"
              height="640"
              controls
              muted
              loop
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <source src="/verse_commander_interaction.mp4" type="video/mp4" />
            </video>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ width: '100%', maxWidth: '1200px', my: 4 }} />

      {/* Development Section */}
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
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
                Verse Commander was developed by Adam Frieden, Drew Frieden, and Miles Benjamin.
                The team focused on creating an immersive text-based experience that proves
                compelling gameplay doesn't always require complex graphics.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Technical Approach
              </Typography>
              <Typography variant="body1">
                Built with Unity3D, the game emphasizes efficient systems and light assets
                to create a rich, text-based universe. This approach allows for complex gameplay
                mechanics while maintaining a clean, accessible interface.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VerseCommander;
