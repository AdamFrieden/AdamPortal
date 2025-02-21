import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Card, Divider, Skeleton, Tab, Tabs, TextField, Toolbar, Typography } from "@mui/material";
import useStarclanStore from "../context/useStarclanStore";
import { useEffect, useState } from "react";
import DebugPanel from "./DebugPanel";
import Groups3Icon from '@mui/icons-material/Groups3';
import BiotechIcon from '@mui/icons-material/Biotech';
import PermScanWifiIcon from '@mui/icons-material/PermScanWifi';
import NavigationIcon from '@mui/icons-material/Navigation';
import React from "react";
import { GladiatorCardSkeleton } from "./GladiatorSkeletonCard";
import { GladiatorCard } from "./GladiatorCard";
import { ClientGladiator } from "../domain/models";
import mockupGladiators from "./TestGladiatorData";
import { GladiatorGrid } from "./GladiatorGrid";

export default function ClanShipDashboard() {

  const refreshGameState = useStarclanStore((state) => state.refreshGameState);
  const startNewClan = useStarclanStore((state) => state.startNewClan);

  const [tabValue, setTabValue] = useState<number>(0);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  }

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
    <Box id='dashboardBox' sx={{ p: 0, maxWidth: '100vw', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      <Box id='dashContextBox' width='100%'>
        {/* <Card> */}
        <AppBar position="static">
          {/* <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
          </Toolbar> */}
           <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            // indicatorColor="secondary"
            // textColor="inherit"
            variant="scrollable"
            // scrollButtons="auto"
            // allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
              },
              '& .MuiTab-root': {
                flex: 1,  // This makes each tab flexible but equal in width
              }
            }}
          >
            <Tab icon={<Groups3Icon />} label="Clan" sx={{ fontSize: '1rem', '& .MuiSvgIcon-root': { fontSize: '2rem' } }} />
            <Tab icon={<BiotechIcon />} label="Tech" />
            <Tab icon={<PermScanWifiIcon />} label="Scan" />
          </Tabs>
        </AppBar>
        <DebugPanel />
        {/* <GladiatorCardSkeleton /> */}

        <GladiatorGrid gladiators={mockupGladiators} />
        {/* {exGlads.map((g) => <GladiatorCard gladiator={g} />)} */}


        <BottomNavigation
          showLabels
          sx={{ my: 0, width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0 }}
          value={tabValue}
          onChange={(event, newTabValue) => {
            setTabValue(newTabValue);
          }}
        >
          <BottomNavigationAction label="Clan" icon={<Groups3Icon />} />
          <BottomNavigationAction label="Tech" icon={<BiotechIcon />} />
          <BottomNavigationAction label="Scan" icon={<PermScanWifiIcon />} />
          {/* <BottomNavigationAction label="Map" icon={<NavigationIcon />} /> */}
        </BottomNavigation>
      </Box>
      }
    </Box>
  );
}