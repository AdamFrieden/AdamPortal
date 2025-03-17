import { useState } from 'react';
import { GladiatorGrid } from './GladiatorGrid';
import { RecruitGladiatorsDialog } from './RecruitGladiatorDialogue';
import useStarclanGameStore from '../context/useStarclanGameStore';

const ClanView = () => {
  const roster = useStarclanGameStore((state) => state.gameState?.roster);
  const rosterCapacity = useStarclanGameStore((state) => state.gameState?.rosterCapacity) || 0;
  const waiverWire = useStarclanGameStore((state) => state.gameState?.waiverWire) || [];
  const availableSlots = Math.max(0, rosterCapacity - (roster?.length || 0));

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {roster && (
        <GladiatorGrid 
          gladiators={roster} 
          emptySlots={availableSlots} 
          onAdd={() => setDialogOpen(!dialogOpen)} 
        />
      )}
      <RecruitGladiatorsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        gladiators={waiverWire} 
        onRecruit={() => setDialogOpen(false)} 
      />
    </>
  );
};

export default ClanView; 