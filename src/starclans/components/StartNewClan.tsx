import { Box, Button, TextField } from "@mui/material";
import useStarclanGameStore from "../context/useStarclanGameStore";
import { useState } from "react";

export default function StartNewClan() {

  const startNewClan = useStarclanGameStore((state) => state.startNewClan);
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
    <Box id='startNewClan' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '50vh', m: 4 }}>
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