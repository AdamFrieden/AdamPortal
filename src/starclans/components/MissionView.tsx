import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import MissionCard, { Mission } from './MissionCard';

// Sample mission data
const initialMissions: Mission[] = [
  { id: 'mission-1', title: 'Scout the Outer Rim', description: 'Gather intel on nearby systems.' },
  { id: 'mission-2', title: 'Mine Asteroid Belt', description: 'Extract valuable resources.' },
  { id: 'mission-3', title: 'Diplomatic Envoy', description: 'Negotiate trade deals.' },
  { id: 'mission-4', title: 'Patrol Sector 7G', description: 'Ensure sector security.' },
];

const MissionView = () => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setMissions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={missions} strategy={verticalListSortingStrategy}>
        <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto' }}>
          <Typography variant="h4" gutterBottom>Missions</Typography>
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default MissionView; 