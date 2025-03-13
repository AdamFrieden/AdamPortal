import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import useStarclanGameStore from "../context/useStarclanGameStore";
import useStarclanUIStore from "../context/useStarclanUIStore";

export default function DebugPanel() {

  const timeTravelAction = useStarclanGameStore((s) => s.timeTravel);
  const starDateRaw = useStarclanGameStore((state) => state.getStarDate());
  const starDateFormatted = new Date(starDateRaw ?? 0).toISOString();
  const [timeTravelMs, setTimeTravelMs] = useState<number>(0);
  const showDebugPanel = useStarclanUIStore((s) => s.isShowingDebugPanel);

  if (!showDebugPanel) {
    return (<></>);
  }

  return (
    <Box sx={{ maxWidth: '50vw' }}>
      <Typography variant="h6">Debug Panel</Typography>
      
      <Typography>StarDateRaw: {starDateRaw}</Typography>
      <Typography>StarDate: {starDateFormatted}</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', m: 2}}>
        <TextField
          label="Seconds"
          type="numeric"
          value={timeTravelMs}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTimeTravelMs(Number(e.target.value))
          }
        />
        <Button variant="contained" onClick={() => { timeTravelAction(timeTravelMs * 1000); }}>
          Time Travel
        </Button>
      </Box>
    </Box>
  );
}
