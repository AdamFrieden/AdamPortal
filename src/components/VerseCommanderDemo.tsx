import { Box } from '@mui/material';

const VerseCommanderDemo = () => {
  return (
    <Box sx={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <iframe 
          src="/VerseCommanderWebGL/index.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default VerseCommanderDemo;
