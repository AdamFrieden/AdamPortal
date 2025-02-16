import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import useStarclanStore from "../context/useStarclanStore";

export default function DebugPanel() {

  const timeTravelAction = useStarclanStore((s) => s.timeTravel);
  const starDateRaw = useStarclanStore((state) => state.getStarDate());
  const starDateFormatted = new Date(starDateRaw ?? 0).toISOString();
  const [timeTravelValue, setTimeTravelValue] = useState<number>(3600);

  return (
    <Box>
      <Typography variant="h6">Debug Panel</Typography>
      
      <Typography>StarDateRaw: {starDateRaw}</Typography>
      <Typography>StarDate: {starDateFormatted}</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', m: 2}}>
        <TextField
          label="Seconds"
          type="numeric"
          value={timeTravelValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTimeTravelValue(Number(e.target.value))
          }
        />
        <Button variant="contained" onClick={() => { timeTravelAction(timeTravelValue * 1000); }}>
          Time Travel
        </Button>
      </Box>
    </Box>
  );
}
