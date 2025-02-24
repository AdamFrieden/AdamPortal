import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Groups3Icon from '@mui/icons-material/Groups3';
import BiotechIcon from '@mui/icons-material/Biotech';
import PermScanWifiIcon from '@mui/icons-material/PermScanWifi';
import { useState } from "react";

export default function BottomNavBar() {

  const [tabValue, setTabValue] = useState<number>(0);
    const handleTabChange = (_event: React.SyntheticEvent, newTabValue: number) => {
      setTabValue(newTabValue);
  }

  return (
    <BottomNavigation
      showLabels
      sx={{ my: 0, width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0 }}
      value={tabValue}
      onChange={handleTabChange}
    >
      <BottomNavigationAction label="Clan" icon={<Groups3Icon />} />
      <BottomNavigationAction label="Tech" icon={<BiotechIcon />} />
      <BottomNavigationAction label="Scan" icon={<PermScanWifiIcon />} />
    </BottomNavigation>
  );
}