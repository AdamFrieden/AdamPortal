import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import StatusComponent from "../../components/StatusComponent";
import DisplayData from "./DisplayData";
import UpdateDataForm from "./UpdateDataForm";
import useStarclanStore, { getStartingGameState } from "../context/useStarclanStore";
import { useState } from "react";

export default function ClanShipDashboard() {

  const startNewGame = useStarclanStore((state) => state.startNewGame);
  const hasGameState = useStarclanStore((state) => !!state.gameState);
  const saveData = useStarclanStore((state) => state.saveData);
  const [clanName, setClanName] = useState<string>('');

  const handleClanNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClanName(event.target.value);
  };

  const handleClanNameSubmit = () => {
    const newClan = getStartingGameState(clanName);
    setClanName('');
    saveData(newClan);
  };

  const validateClanName = (name: string) => {
    return name.length > 2;
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <Typography variant="h5" gutterBottom>
        Clan Ship Dashboard Component
      </Typography> */}
      {startNewGame && (
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
      )}
      {hasGameState && !startNewGame &&
      <Stack spacing={2} my={5}>
        <StatusComponent name='Advanced Scanner'/>
        <StatusComponent name='Resource Module'/>
        <StatusComponent name='Medica Pod'/>
        <DisplayData />
        <UpdateDataForm />
      </Stack>}
    </Box>
  );
}