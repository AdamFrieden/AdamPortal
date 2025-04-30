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

const containerLabels = {
  [initialContainerId]: 'Available Missions',
  // 'Assigned Missions': 'Assigned Missions'
};

// --- Main MissionView Component ---

const MissionView = () => {
  const [missionItems, setMissionItems] = useState<Items>(() => prepareInitialItems(initialMissions));

  // Create a map for easy mission lookup by ID - useMemo prevents recreating it on every render
  const missionsMap = useMemo(() => {
    const map = new Map<string, Mission>();
    initialMissions.forEach(mission => map.set(mission.id, mission));
    return map;
  }, []); // Empty dependency array means it only runs once

  const handleItemsChange = useCallback((newItems: Items) => {
      setMissionItems(newItems);
      // Potentially trigger API calls or other side effects here
  }, []);

  const handleContainersChange = useCallback((newContainers: string[]) => {
     // Update container order state if you manage it separately
     console.log('Container order changed:', newContainers);
   }, []);

  // Define the function to render a specific mission item
  const renderMissionItem = useCallback((id: string): React.ReactNode => {
      const mission = missionsMap.get(id);
      if (!mission) {
          return <Typography color="error">Unknown Mission ID: {id}</Typography>;
      }
      // Render your desired component here!
      // Example 1: Simple Typography
      return (
           <Box sx={{ textAlign: 'left' }}> {/* Ensure text aligns left within the Paper */} 
               <Typography variant="body1" component="div" noWrap>{mission.title}</Typography>
               <Typography variant="caption" component="div" sx={{ opacity: 0.7}} noWrap>{mission.description}</Typography>
           </Box>
      );
      // Example 2: Using MissionCard component
      // return <MissionCard mission={mission} />;
  }, [missionsMap]); // Dependency on the mission map

  return (
      <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>Mission Board</Typography>
          <MultipleDraggableLists
              initialItems={missionItems} // Pass initial state or direct object
              renderItem={renderMissionItem} // PASS the render function
              containerLabels={containerLabels} // Pass container labels
              itemHandle={true} // Example: Enable handles for mission items
              containerHandle={true} // Example: Enable handles for containers
              onItemsChange={handleItemsChange} // Pass handler to update state
              onContainersChange={handleContainersChange} // Pass handler for container changes
          />
      </Box>
  );
};

export default MissionView; 