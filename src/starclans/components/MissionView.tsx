import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { createPortal } from 'react-dom';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
  UniqueIdentifier,
  CollisionDetection,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  MeasuringStrategy,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import MissionCard, { Mission } from './MissionCard';
import MissionAssignmentDialog from './MissionAssignmentDialog';
import { MultipleDraggableLists, Items } from './dnd/MultipleDraggableLists';
import { GladiatorCard } from './GladiatorCard';
import { ClientGladiator } from '../domain/models';

// Sample mission data
const initialMissions: Mission[] = [
  { id: 'mission-1', title: 'Scout the Outer Rim', description: 'Gather intel.' },
  { id: 'mission-2', title: 'Mine Asteroid Belt', description: 'Extract resources.' },
  { id: 'mission-3', title: 'Diplomatic Envoy', description: 'Negotiate deals.' },
  { id: 'mission-4', title: 'Defend Starbase Alpha', description: 'Repel attackers.' },
];

// Sample Gladiator Data (Simplified structure for demonstration)
const initialGladiators: Partial<ClientGladiator>[] = [
    { id: 'glad-1', name: 'Crixus', description: 'Champion of Capua', estimatedPower: 150, stamina: 80, status: 'RESTING', knownTraits: ['Strong', 'Brawler'] },
    { id: 'glad-2', name: 'Spartacus', description: 'The Bringer of Rain', estimatedPower: 180, stamina: 95, status: 'TRAINING', knownTraits: ['Fast', 'Leader'] },
];

// Prepare data for MultipleDraggableLists
const initialContainerId = 'Available Items';

// Combine mission and gladiator IDs for the initial state
const prepareInitialItems = (missions: Mission[], gladiators: Partial<ClientGladiator>[]) => {
  return {
    [initialContainerId]: [...missions.map(m => m.id), ...gladiators.map(g => g.id!)],
    // Add other containers here if needed
  };
};

// Create a map combining both mission and gladiator data
const prepareBoardItemsMap = (missions: Mission[], gladiators: Partial<ClientGladiator>[]) => {
    // Use a union type for the map value
    const map = new Map<string, Mission | Partial<ClientGladiator>>();
    missions.forEach(mission => map.set(mission.id, mission));
    // No need for __type hint here
    gladiators.forEach(gladiator => map.set(gladiator.id!, gladiator));
    return map;
};

const containerLabels = {
  [initialContainerId]: 'Available Items',
  // 'Assigned Missions': 'Assigned Missions'
};

// --- Main MissionView Component ---

const MissionView = () => {
  // Initialize state with combined items
  const [boardItemsState, setBoardItemsState] = useState<Items>(() => prepareInitialItems(initialMissions, initialGladiators));

  // Memoize the combined data map
  const boardItemsMap = useMemo(() => {
    return prepareBoardItemsMap(initialMissions, initialGladiators);
  }, []); // Recalculate only if initial data changes (won't in this example)

  const handleItemsChange = useCallback((newItems: Items) => {
      setBoardItemsState(newItems);
  }, []);

  const handleContainersChange = useCallback((newContainers: string[]) => {
     console.log('Container order changed:', newContainers);
   }, []);

  // Define the function to render *either* a mission or a gladiator
  const renderBoardItem = useCallback((id: string): React.ReactNode => {
      const item = boardItemsMap.get(id);

      if (!item) {
          return <Typography color="error">Unknown Item ID: {id}</Typography>;
      }

      // Check for a property unique to gladiators (e.g., 'status')
      if ('status' in item) {
          // Render GladiatorCard
          return <GladiatorCard gladiator={item as ClientGladiator} />;
      }
      // Check for a property unique to missions (e.g., 'title')
      else if ('title' in item) {
          // Render Mission info (simple version)
          const mission = item as Mission;
          return (
               <Box sx={{ textAlign: 'left', p: 1 }}> {/* Added padding */} 
                   <Typography variant="body1" component="div" noWrap>{mission.title}</Typography>
                   <Typography variant="caption" component="div" sx={{ opacity: 0.7}} noWrap>{mission.description}</Typography>
               </Box>
          );
      }

      // Fallback for unknown item types
       return <Typography>Unknown item type for ID: {id}</Typography>;

  }, [boardItemsMap]); // Dependency on the data map

  return (
      <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>Mission & Gladiator Board</Typography> {/* Updated Title */} 
          <MultipleDraggableLists
              initialItems={boardItemsState}
              renderItem={renderBoardItem} // Use the combined render function
              containerLabels={containerLabels}
              itemHandle={true}
              containerHandle={true}
              onItemsChange={handleItemsChange}
              onContainersChange={handleContainersChange}
          />
      </Box>
  );
};

export default MissionView; 