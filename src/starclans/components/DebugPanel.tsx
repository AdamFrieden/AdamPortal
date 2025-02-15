import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import useStarclanStore from "../context/useStarclanStore";

export default function DebugPanel() {
  const updateGameState = useStarclanStore((state) => state.updateGameState);
  const refresh = useStarclanStore((state) => state.refreshData)
  const starDateRaw = useStarclanStore((state) => state.gameState?.lastRefresh);
  const starDateFormatted = new Date(starDateRaw ?? 0).toISOString();
  const existingTimeTravel = useStarclanStore((state) => state.gameState?.timeTravelMs);

  const [timeTravelValue, setTimeTravelValue] = useState<number>(0);

  const handleTimeTravelUpdate = () => {
    updateGameState({ timeTravelMs: (timeTravelValue * 1000) + (existingTimeTravel ?? 0) });
    refresh();
  };

  return (
    <Box>
      <Typography variant="h6">Debug Panel</Typography>
      
      <Typography>StarDateRaw: {starDateRaw}</Typography>
      <Typography>StarDate: {starDateFormatted}</Typography>
      
      <TextField
        label="Time"
        type="number"
        value={timeTravelValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTimeTravelValue(Number(e.target.value))
        }
      />

      {/* Button to update the timeTravelMs field */}
      <Button variant="contained" onClick={handleTimeTravelUpdate}>
        Update Time Travel
      </Button>
    </Box>
  );
}
