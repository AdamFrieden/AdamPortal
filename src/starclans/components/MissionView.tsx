import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import MissionCard, { Mission } from './MissionCard';
import GladiatorTile from './GladiatorTile';
import { ClientGladiator } from '../domain/models';

// Define container IDs
const UNASSIGNED_CONTAINER_ID = 'unassigned';

// Sample mission data
const initialMissions: Mission[] = [
  { id: 'mission-1', title: 'Scout the Outer Rim', description: 'Gather intel.' },
  { id: 'mission-2', title: 'Mine Asteroid Belt', description: 'Extract resources.' },
  { id: 'mission-3', title: 'Diplomatic Envoy', description: 'Negotiate deals.' },
];

// Sample Gladiator Data
const sampleGladiators: ClientGladiator[] = Array.from({ length: 8 }, (_, i) => ({
  id: `gladiator-${i + 1}`,
  owner: 'player',
  name: `Gladiator ${i + 1}`,
  description: `Desc ${i + 1}`,
  status: 'RESTING',
  stamina: Math.floor(Math.random() * 80) + 20,
  estimatedPower: Math.floor(Math.random() * 100) + 50,
  knownTraits: [],
  equippedTech: [],
  techTokens: 0,
  lastRefresh: Date.now(),
}));

// Type for the state holding containers and their items
type GladiatorContainers = {
  [containerId: string]: ClientGladiator[];
};

const MissionView = () => {
  const [containers, setContainers] = useState<GladiatorContainers>(() => {
    // Initialize state: put all sample gladiators in the unassigned pool initially
    const initialContainerState: GladiatorContainers = {
      [UNASSIGNED_CONTAINER_ID]: sampleGladiators,
    };
    // Add empty arrays for each mission container
    initialMissions.forEach(mission => {
      initialContainerState[mission.id] = [];
    });
    return initialContainerState;
  });

  // Keep track of mission definitions separately (could come from props/store later)
  const [missions] = useState<Mission[]>(initialMissions);
  const [activeId, setActiveId] = useState<string | null>(null); // State to track active dragged item ID

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find the container ID for a given draggable item ID
  const findContainer = (itemId: string) => {
    if (itemId === UNASSIGNED_CONTAINER_ID || missions.some(m => m.id === itemId)) {
      return itemId; // It's a container itself
    }
    // It's a gladiator, find which container it belongs to
    return Object.keys(containers).find(key => containers[key].some(item => item.id === itemId));
  };

  // Function to find the gladiator object by its ID
  const findGladiatorById = (id: string): ClientGladiator | undefined => {
    for (const containerKey in containers) {
      const found = containers[containerKey].find(g => g.id === id);
      if (found) return found;
    }
    return undefined;
  };

  // Get the currently dragged gladiator data (used for DragOverlay)
  const activeGladiator = activeId ? findGladiatorById(activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null); // Clear activeId when drag ends

    if (!over) return;

    const activeIdStr = active.id.toString();
    const overId = over.id.toString();

    const activeContainerId = findContainer(activeIdStr);
    const overContainerId = findContainer(overId);

    if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) {
      if (activeContainerId && activeIdStr !== overId) {
        setContainers(prev => ({
          ...prev,
          [activeContainerId]: arrayMove(
            prev[activeContainerId],
            prev[activeContainerId].findIndex(item => item.id === activeIdStr),
            // Use over.data.current?.sortable?.index ?? fallback if dropping directly on container
            prev[activeContainerId].findIndex(item => item.id === overId) // Simplified for now
          ),
        }));
      }
      return;
    }

    setContainers(prev => {
      const activeItems = prev[activeContainerId];
      const overItems = prev[overContainerId];
      const activeIndex = activeItems.findIndex(item => item.id === activeIdStr);
      // Handle cases where overIndex might be -1 (e.g., dropping on the container itself)
      let overIndex = overItems.findIndex(item => item.id === overId);

      const movedItem = activeItems[activeIndex];
      let newOverItems = [...overItems];

      // Check if dropping onto a container (MissionCard/Unassigned Box) directly
      const droppingOnContainer = overId === overContainerId;

      if (droppingOnContainer) {
        // Append to the end of the container list
         newOverItems.splice(newOverItems.length, 0, movedItem);
      } else {
         // Dropped onto an item within a container, insert at that item's index
         if (overIndex === -1) overIndex = newOverItems.length; // Failsafe if index not found
         newOverItems.splice(overIndex, 0, movedItem);
      }

      return {
        ...prev,
        [activeContainerId]: activeItems.filter(item => item.id !== activeIdStr),
        [overContainerId]: newOverItems,
      };
    });
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  // --- Render Logic ---
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 1 }}>

        {/* Render Missions as Droppable Areas */}
        {/* <Typography variant="h5" gutterBottom>Missions</Typography> */}
        {missions.map((mission) => (
          <SortableContext key={mission.id} items={containers[mission.id]?.map(g => g.id) || []} strategy={verticalListSortingStrategy}>
            {/* MissionCard needs updating to be a droppable container and render gladiators */}
            <MissionCard mission={mission}>
              {/* Placeholder for where gladiators will render inside MissionCard */}
              {containers[mission.id]?.map(gladiator => (
                 <GladiatorTile key={gladiator.id} gladiator={gladiator} />
              ))}
              {/* Add a min-height or visual cue if empty */}
            </MissionCard>
          </SortableContext>
        ))}

        {/* Render Unassigned Gladiators */}
        <SortableContext items={containers[UNASSIGNED_CONTAINER_ID]?.map(g => g.id) || []} strategy={verticalListSortingStrategy}>
          <Box sx={{ p: 2, border: '1px solid #444', borderRadius: 1, minHeight: '100px' }}>
            {containers[UNASSIGNED_CONTAINER_ID]?.map(gladiator => (
              <GladiatorTile key={gladiator.id} gladiator={gladiator} />
            ))}
             {containers[UNASSIGNED_CONTAINER_ID]?.length === 0 && (
                <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', color: 'text.disabled' }}>
                  <Typography variant="caption">No Available Gladiators</Typography>
                </Box>
              )}
          </Box>
        </SortableContext>

      </Box>

      {/* Drag Overlay - Renders the component being dragged */}
      <DragOverlay>
        {activeId && activeGladiator ? (
          // Render the GladiatorTile using the active gladiator's data
          <GladiatorTile gladiator={activeGladiator} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default MissionView; 