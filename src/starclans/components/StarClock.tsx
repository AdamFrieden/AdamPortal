import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import useStarclanStore from '../context/useStarclanStore';

export default function StarClock() {
  const [time, setTime] = useState<string>('');
  const starDateRaw = useStarclanStore((state) => state.getStarDate());

  useEffect(() => {

   const timer = setInterval(() => {

      const totalTime = Date.now() + starDateRaw;
      const dateObject = new Date(totalTime)

      const hour = String(dateObject.getHours()).padStart(2, '0');
      const minute = String(dateObject.getMinutes()).padStart(2, '0');
      const second = String(dateObject.getSeconds()).padStart(2, '0');

      const currentTime = `${hour}:${minute}:${second}`;
      
      setTime(currentTime)
    }, 1000)
    return () => clearInterval(timer);
  }, [starDateRaw])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '5rem', width: '8rem' }}>
      <Typography>{time}</Typography>
    </Box>
  );
}