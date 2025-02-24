import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react'

export default function StarClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {

   const timer = setInterval(() => {

      const dateObject = new Date()

      const hour = String(dateObject.getHours()).padStart(2, '0');
      const minute = String(dateObject.getMinutes()).padStart(2, '0');
      const second = String(dateObject.getSeconds()).padStart(2, '0');

      const currentTime = `${hour} : ${minute} : ${second}`;
      
      setTime(currentTime)
    }, 1000)
    return () => clearInterval(timer);
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '5rem', width: '8rem' }}>
      <Typography>{time}</Typography>
    </Box>
  );
}