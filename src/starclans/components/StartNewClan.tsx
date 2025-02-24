import { Box, Button, TextField } from "@mui/material";
import useStarclanStore from "../context/useStarclanStore";
import { useState } from "react";

export default function StartNewClan() {

  const startNewClan = useStarclanStore((state) => state.startNewClan);
  const [clanName, setClanName] = useState<string>('');

  const handleClanNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClanName(event.target.value);
  };

  const handleClanNameSubmit = () => {
    startNewClan(clanName);
  };

  const validateClanName = (name: string) => {
    return name.length > 2;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', m: 4 }}>
    <TextField 
      label="clan name"
      value={clanName}
      variant="outlined" 
      error={false}
      onChange={handleClanNameChange}
    />
    <Button disabled={!validateClanName(clanName)} sx={{ m: 3 }} onClick={handleClanNameSubmit}>{'Launch >>'}</Button>
  </Box>
  );
}