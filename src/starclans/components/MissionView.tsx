import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import { MultipleDraggableLists } from './dnd/MultipleDraggableLists';

// Sample mission data
const initialMissions: Mission[] = [
  { id: 'mission-1', title: 'Scout the Outer Rim', description: 'Gather intel.' },
  { id: 'mission-2', title: 'Mine Asteroid Belt', description: 'Extract resources.' },
  { id: 'mission-3', title: 'Diplomatic Envoy', description: 'Negotiate deals.' },
  { id: 'mission-4', title: 'Defend Starbase Alpha', description: 'Repel attackers.' },
];

// Prepare data for MultipleDraggableLists
const initialContainerId = 'Available Missions';

const prepareInitialItems = (missions: Mission[]) => {
  return {
    [initialContainerId]: missions.map(m => m.id),
    // Add other containers here if needed, e.g., 'Assigned Missions': []
  };
};

const prepareItemData = (missions: Mission[]) => {
  const data: Record<string, { name: string; description?: string }> = {};
  missions.forEach(mission => {
    data[mission.id] = { name: mission.title, description: mission.description };
  });
  return data;
};

const containerLabels = {
  [initialContainerId]: 'Available Missions',
  // 'Assigned Missions': 'Assigned Missions'
};

// --- Types ---
// You might want to import the Items type from MultipleDraggableLists if possible
// Otherwise, redefine it here or use Record
interface Items {
    [containerId: string]: string[];
}

// --- Main MissionView Component ---

const MissionView = () => {
  // State to manage the items if you want interactions to persist
  // For a static example, you can pass the prepared data directly
  const [missionItems, setMissionItems] = useState<Items>(() => prepareInitialItems(initialMissions));
  const [missionItemData] = useState(() => prepareItemData(initialMissions));

  // Callback to update state when items change (optional but recommended for interaction)
  const handleItemsChange = useCallback((newItems: Items) => {
      setMissionItems(newItems);
      // Potentially trigger API calls or other side effects here
  }, []);

  // Callback for container changes (optional)
   const handleContainersChange = useCallback((newContainers: string[]) => {
     // Update container order state if you manage it separately
     console.log('Container order changed:', newContainers);
   }, []);

  return (
      <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>Mission Board</Typography>
          <MultipleDraggableLists
              initialItems={missionItems} // Pass initial state or direct object
              itemData={missionItemData} // Pass mission details
              containerLabels={containerLabels} // Pass container labels
              itemHandle={true} // Example: Enable handles for mission items
              // containerHandle={true} // Example: Enable handles for containers
              // trashableItems={true} // Example: Enable trash functionality
              onItemsChange={handleItemsChange} // Pass handler to update state
              onContainersChange={handleContainersChange} // Pass handler for container changes
          />
      </Box>
  );
};

export default MissionView; 