import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import StatusComponent from "./StatusComponent";
import DisplayData from "./DisplayData";
import UpdateDataForm from "./UpdateDataForm";
import useStarclanStore from "../context/useStarclanStore";
import { useEffect, useState } from "react";
import DebugPanel from "./DebugPanel";

export default function ClanShipDashboard() {

  const refreshGameState = useStarclanStore((state) => state.refreshGameState);
  const startNewClan = useStarclanStore((state) => state.startNewClan);

  useEffect(() => {
    refreshGameState();
  }, []);

  // const startNewGame = useStarclanStore((state) => state.startNewGame);
  const gameSaveStatus = useStarclanStore((state) => state.gameSaveStatus);
  const hasGameState = useStarclanStore((state) => !!state.gameState);
  const apiProcessing = useStarclanStore((state) => state.isApiProcessing);

  // const gameState = useStarclanStore((state) => state.gameState);
  const [clanName, setClanName] = useState<string>('');

  // const [dashStatus, setDashStatus] = useState<DashboardState>('START_NEW_GAME');
  // const [statusText, setStatusText] = useState<string>('');
  // if (startNewGame) {
  //   setStatusText('Start a new game');
  // } else if (hasGameState) {
  //   setStatusText(`Clan ${clanName} Dashboard`);
  // }
  // let statusText = startNewGame ? 'start a new game' : `clan ${gameState?.clanName} dashboard`;
  // if (apiProcessing && startNewGame) {
  //   statusText = 'loading...';
  // }

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
    <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>
        {/* {statusText} */}
      </Typography>
      {gameSaveStatus === 'NO_SAVE_FOUND' && !apiProcessing && (
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
      {hasGameState &&
      // <Stack spacing={2} my={5}>
      //   <StatusComponent name='Advanced Scanner'/>
      //   <StatusComponent name='Resource Module'/>
      //   <StatusComponent name='Medica Pod'/>
      //   {/* <DisplayData />
      //   <UpdateDataForm /> */}
      // </Stack>
      <Box>
        <Divider flexItem />
        <DebugPanel />
        <Divider flexItem />
      </Box>
      }
    </Box>
  );
}