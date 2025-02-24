import { AppBar, Box, Tabs, Tab, Toolbar, LinearProgress } from "@mui/material";
import ToolbarMenu from "./ToolbarMenu";
import { useState } from "react";
import Groups3Icon from '@mui/icons-material/Groups3';
import BiotechIcon from '@mui/icons-material/Biotech';
import PermScanWifiIcon from '@mui/icons-material/PermScanWifi';
import React from "react";
import useStarclanStore from "../context/useStarclanStore";

export default function TopTabBar() {

  const [tabValue, setTabValue] = useState<number>(0);
    const handleTabChange = (_event: React.SyntheticEvent, newTabValue: number) => {
      setTabValue(newTabValue);
  }

  const isApiActive = useStarclanStore((state) => state.isApiProcessing);

  return (
  <React.Fragment>
    <Toolbar /> {/* for spacing since the app bar is fixed */}
    <AppBar sx={{ width:'100%' }} position="fixed">
      {isApiActive && //  fix this so its below the tabs and doesn't move the UI
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>}
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box sx={{flexGrow: 1}}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
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
        </Box>
        <ToolbarMenu />
      </Box>
    </AppBar>
  </React.Fragment>
  );

}