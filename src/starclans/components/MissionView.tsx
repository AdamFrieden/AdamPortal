import { useState } from 'react';
import { Box } from '@mui/material';

import MissionCard, { Mission } from './MissionCard';
import MissionAssignmentDialog from './MissionAssignmentDialog';

// Sample mission data (can come from store later)
const initialMissions: Mission[] = [
  { id: 'mission-1', title: 'Scout the Outer Rim', description: 'Gather intel.' },
  { id: 'mission-2', title: 'Mine Asteroid Belt', description: 'Extract resources.' },
  { id: 'mission-3', title: 'Diplomatic Envoy', description: 'Negotiate deals.' },
  { id: 'mission-4', title: 'Defend Starbase Alpha', description: 'Repel attackers.' },
];

const MissionView = () => {
  // State for dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  // State for missions (could come from store)
  const [missions] = useState<Mission[]>(initialMissions);

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMission(null); // Clear selection on close
  };

  return (
    <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto' }}>
      {/* <Typography variant="h4" gutterBottom>Missions</Typography> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {missions.map((mission) => (
          <MissionCard 
            key={mission.id} 
            mission={mission} 
            onClick={() => handleMissionClick(mission)} 
          />
        ))}
      </Box>

      {/* Render the Dialog */}
      {selectedMission && (
        <MissionAssignmentDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          mission={selectedMission}
        />
      )}
    </Box>
  );
};

export default MissionView; 