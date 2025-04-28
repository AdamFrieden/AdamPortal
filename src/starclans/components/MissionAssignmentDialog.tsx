import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Paper,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
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
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Mission } from './MissionCard';
import GladiatorTile from './GladiatorTile';
import { ClientGladiator } from '../domain/models';

// Mock available gladiators (replace with actual data fetching/state management later)
const allAvailableGladiators: ClientGladiator[] = Array.from({ length: 10 }, (_, i) => ({
  id: `gladiator-${i + 1}`,
  owner: 'player',
  name: `Available Glad ${i + 1}`,
  description: `Desc ${i + 1}`,
  status: 'RESTING',
  stamina: Math.floor(Math.random() * 80) + 20,
  estimatedPower: Math.floor(Math.random() * 100) + 50,
  knownTraits: [],
  equippedTech: [],
  techTokens: 0,
  lastRefresh: Date.now(),
}));

// Define container IDs for this dialog
const AVAILABLE_ID = 'available';
const MISSION_SLOTS_ID = 'missionSlots';

// Type for the state holding containers and their items within the dialog
type AssignmentContainers = {
  [AVAILABLE_ID]: ClientGladiator[];
  [MISSION_SLOTS_ID]: ClientGladiator[];
};

// Full screen dialog transition
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MissionAssignmentDialogProps {
  open: boolean;
  onClose: () => void;
  mission: Mission;
  // Add prop for initial assigned gladiators if needed
}

// Simple Droppable Zone component
const DropZone = ({ id, children, title }: { id: string; children: React.ReactNode, title: string }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <Paper 
      ref={setNodeRef} 
      elevation={0}
      sx={{ 
        p: 1,
        border: isOver ? `2px solid ${id === MISSION_SLOTS_ID ? 'green' : 'blue'}` : '1px dashed grey',
        borderRadius: 1, 
        backgroundColor: isOver ? (id === MISSION_SLOTS_ID ? 'rgba(0, 255, 0, 0.05)' : 'rgba(0, 0, 255, 0.05)') : '#282828',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minHeight: '80px'
      }}
    >
       <Typography variant="subtitle1" align="center" gutterBottom sx={{ flexShrink: 0 }}>{title}</Typography>
      <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 1 }}>
         {children}
      </Box>
    </Paper>
  );
};

const MissionAssignmentDialog: React.FC<MissionAssignmentDialogProps> = ({ open, onClose, mission }) => {
  
  // Initialize state with all gladiators available, none assigned to the mission
  // TODO: Replace mock data with real available list and potentially pre-assigned list for the mission
  const [containers, setContainers] = useState<AssignmentContainers>({
    [AVAILABLE_ID]: allAvailableGladiators, // Assume all are initially available
    [MISSION_SLOTS_ID]: [], // Start with empty mission slots
  });
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Helper to find the gladiator object by ID across both containers
  const findGladiatorById = (id: string): ClientGladiator | undefined => {
    return containers[AVAILABLE_ID].find(g => g.id === id) || 
           containers[MISSION_SLOTS_ID].find(g => g.id === id);
  };

  // Memoize the active gladiator data for the overlay
  const activeGladiator = useMemo(() => 
    activeDragId ? findGladiatorById(activeDragId) : null,
  [activeDragId, containers]);

  // Helper to find which container (AVAILABLE_ID or MISSION_SLOTS_ID) an item belongs to
  const findContainer = (itemId: string) => {
    if (containers[MISSION_SLOTS_ID].some(item => item.id === itemId)) {
      return MISSION_SLOTS_ID;
    }
    if (containers[AVAILABLE_ID].some(item => item.id === itemId)) {
      return AVAILABLE_ID;
    }
    // Check if the ID is one of the container IDs themselves
    if (itemId === MISSION_SLOTS_ID || itemId === AVAILABLE_ID) {
        return itemId;
    }
    return null; // Item not found in any container
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (!over) return;

    const activeIdStr = active.id.toString();
    const overId = over.id.toString();

    const activeContainerId = findContainer(activeIdStr);
    let overContainerId = findContainer(overId);

    if (!activeContainerId || !overContainerId) return;

    // If dropped onto a tile, the target is that tile's container
    if (overContainerId !== overId) { 
      overContainerId = findContainer(overId);
      if (!overContainerId) return;
    }

    // Reordering within the same container
    if (activeContainerId === overContainerId) {
      if (activeIdStr !== overId) { 
        setContainers(prev => {
          // Ensure the containerId is a valid key before indexing
          if (!(activeContainerId in prev)) return prev;
          const items = prev[activeContainerId as keyof AssignmentContainers]; // Type assertion
          const oldIndex = items.findIndex(item => item.id === activeIdStr);
          const newIndex = items.findIndex(item => item.id === overId);
          if (oldIndex === -1 || newIndex === -1) return prev; 
          return {
             ...prev,
             // Use type assertion again for the update
            [activeContainerId as keyof AssignmentContainers]: arrayMove(items, oldIndex, newIndex),
          }
        });
      }
      return;
    }

    // Moving between containers
    setContainers(prev => {
      // Ensure container IDs are valid keys
      if (!(activeContainerId in prev) || !(overContainerId in prev)) return prev;

      const activeItems = prev[activeContainerId as keyof AssignmentContainers]; // Type assertion
      const overItems = prev[overContainerId as keyof AssignmentContainers]; // Type assertion
      const activeIndex = activeItems.findIndex(item => item.id === activeIdStr);
      
      if (activeIndex === -1) return prev;

      const movedItem = activeItems[activeIndex];
      let newOverItems = [...overItems];

      const overItemIndex = overItems.findIndex(item => item.id === overId);
      const insertIndex = overItemIndex !== -1 ? overItemIndex : newOverItems.length;
      
      newOverItems.splice(insertIndex, 0, movedItem);

      // TODO: Add mission capacity constraints here if needed

      return {
        ...prev,
        // Use type assertions for updates
        [activeContainerId as keyof AssignmentContainers]: activeItems.filter(item => item.id !== activeIdStr),
        [overContainerId as keyof AssignmentContainers]: newOverItems,
      };
    });
  };

  const handleDragCancel = () => {
    setActiveDragId(null);
  };
  
  const handleSave = () => {
      // TODO: Implement save logic - e.g., update game state with assigned gladiators
      console.log('Assigned Gladiators:', containers[MISSION_SLOTS_ID]);
      onClose(); 
  };

  return (
    <Dialog 
      fullScreen 
      open={open} 
      onClose={onClose} 
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Assign Gladiators to: {mission.title}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ bgcolor: 'background.default', p: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', gap: 1, overflowY: 'auto' }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {/* Corrected Structure Start */}
          
          {/* --- Top Box: Assigned Slots --- */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}> 
            <SortableContext items={containers[MISSION_SLOTS_ID].map(g => g.id)} strategy={verticalListSortingStrategy}>
               <DropZone id={MISSION_SLOTS_ID} title="Mission">
                {containers[MISSION_SLOTS_ID].map(gladiator => (
                  <GladiatorTile key={gladiator.id} gladiator={gladiator} />
                ))}
                {containers[MISSION_SLOTS_ID].length === 0 && (
                   <Typography variant="caption" color="text.disabled" align="center" sx={{mt: 2}}>Drag gladiators here</Typography>
                )}
              </DropZone>
            </SortableContext>
          </Box>

          {/* Divider */}
           <Box sx={{ borderTop: '2px solid #555', mx: -1, my: 1, flexShrink: 0 }} />

          {/* --- Bottom Box: Available Gladiators --- */}
          {/* Add flexGrow: 1 here so it tries to take remaining space AFTER top box sizes to content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}> 
            <SortableContext items={containers[AVAILABLE_ID].map(g => g.id)} strategy={verticalListSortingStrategy}>
              <DropZone id={AVAILABLE_ID} title="">
                {containers[AVAILABLE_ID].map(gladiator => (
                  <GladiatorTile key={gladiator.id} gladiator={gladiator} />
                ))}
                {containers[AVAILABLE_ID].length === 0 && (
                   <Typography variant="caption" color="text.disabled" align="center" sx={{mt: 2}}>None</Typography>
                )}
               </DropZone>
            </SortableContext>
          </Box>
          
          {/* Corrected Structure End */}
          
          <DragOverlay>
            {activeDragId && activeGladiator ? (
              <GladiatorTile gladiator={activeGladiator} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </DialogContent>
    </Dialog>
  );
};

export default MissionAssignmentDialog; 