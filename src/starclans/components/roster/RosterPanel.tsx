import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Button, 
  useMediaQuery, 
  Theme, 
  Typography,
  Paper
} from '@mui/material';
import useStarclanGameStore from '../../context/useStarclanGameStore';
import useStarclanUIStore from '../../context/useStarclanUIStore';
import GladiatorRosterCard from './GladiatorRosterCard';
import EventBanner from './EventBanner';
import RosterSummary from './RosterSummary';
import { ClientGladiator, ScanResult, GladiatorStatus } from '../../domain/models';

// Define stable selectors outside component
const selectIsApiProcessing = (state: ReturnType<typeof useStarclanUIStore.getState>) => 
  state.isApiProcessing;

const selectRoster = (state: ReturnType<typeof useStarclanGameStore.getState>) => 
  state.gameState?.roster || [];

interface RosterPanelProps {
  event: ScanResult;
  requiredSlots: number;
  onRosterConfirm: (gladiatorIds: string[]) => void;
  onCancel: () => void;
}

const RosterPanel: React.FC<RosterPanelProps> = ({ 
  event, 
  requiredSlots,
  onRosterConfirm,
  onCancel
}) => {
  // Keep track of the initial render to avoid unnecessary effects
  const isInitialRender = useRef(true);
  
  // Memoize the event ID to avoid unnecessary re-renders
  const eventId = useMemo(() => event?.id, [event?.id]);
  
  // Responsive layout detection - with stable reference
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
    noSsr: true,
    defaultMatches: false
  });
  
  // Tabs state (only used in mobile view)
  const [activeTab, setActiveTab] = useState<'available' | 'selected'>('available');
  
  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Get data from stores with stable selectors
  const isApiProcessing = useStarclanUIStore(selectIsApiProcessing);
  const roster = useStarclanGameStore(selectRoster);
  
  // Filter gladiators outside of the selector
  const availableGladiators = useMemo(() => 
    roster.filter(g => 
      // Check for valid statuses: either RESTING or TRAINING
      (g.status === 'RESTING' || g.status === 'TRAINING') && 
      // And sufficient stamina
      g.stamina > 30
    ),
    [roster]
  );
  
  // Toggle selection handler
  const toggleSelection = useCallback((gladiatorId: string) => {
    setSelectedIds(prev => {
      // If already selected, remove it
      if (prev.includes(gladiatorId)) {
        return prev.filter(id => id !== gladiatorId);
      }
      // If not at limit, add it
      else if (prev.length < requiredSlots) {
        return [...prev, gladiatorId];
      }
      // No change if at limit
      return prev;
    });
  }, [requiredSlots]);
  
  // Filter gladiators into available and selected - memoized to prevent re-renders
  const { selectedGladiators, unselectedGladiators } = useMemo(() => {
    const selected = availableGladiators.filter(g => selectedIds.includes(g.id));
    const unselected = availableGladiators.filter(g => !selectedIds.includes(g.id));
    return { selectedGladiators: selected, unselectedGladiators: unselected };
  }, [availableGladiators, selectedIds]);
  
  // Handle confirmation with stable reference
  const handleConfirm = useCallback(() => {
    onRosterConfirm(selectedIds);
  }, [selectedIds, onRosterConfirm]);

  // Reset selection when event changes - but only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    
    if (eventId) {
      setSelectedIds([]);
      setActiveTab('available');
    }
  }, [eventId]);
  
  // Handle tab switching based on selection state
  useEffect(() => {
    if (isMobile) {
      if (selectedIds.length > 0 && activeTab !== 'selected') {
        setActiveTab('selected');
      } else if (selectedIds.length === 0 && activeTab !== 'available') {
        setActiveTab('available');
      }
    }
  }, [selectedIds.length, isMobile, activeTab]);
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        maxHeight: isMobile ? 'none' : '80vh',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper'
      }}
    >
      {/* Event Banner - shows on both layouts */}
      <EventBanner event={event} requiredSlots={requiredSlots} />
      
      {/* Roster Summary - shows selections count */}
      <RosterSummary 
        selectedCount={selectedIds.length} 
        requiredSlots={requiredSlots} 
      />
      
      {isMobile ? (
        // Mobile Layout - Tabs
        <>
          <Tabs 
            value={activeTab} 
            onChange={(_, value) => setActiveTab(value)}
            variant="fullWidth"
          >
            <Tab 
              label={`Available (${unselectedGladiators.length})`} 
              value="available" 
            />
            <Tab 
              label={`Selected (${selectedIds.length}/${requiredSlots})`} 
              value="selected" 
            />
          </Tabs>
          
          <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
            {activeTab === 'available' ? (
              // Available Gladiators Tab
              unselectedGladiators.length > 0 ? (
                unselectedGladiators.map(gladiator => (
                  <GladiatorRosterCard
                    key={gladiator.id}
                    gladiator={gladiator}
                    isSelected={false}
                    onToggle={() => toggleSelection(gladiator.id)}
                    disabled={selectedIds.length >= requiredSlots}
                    showAddButton
                  />
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No gladiators available with sufficient stamina
                  </Typography>
                </Box>
              )
            ) : (
              // Selected Gladiators Tab
              selectedGladiators.length > 0 ? (
                selectedGladiators.map(gladiator => (
                  <GladiatorRosterCard
                    key={gladiator.id}
                    gladiator={gladiator}
                    isSelected={true}
                    onToggle={() => toggleSelection(gladiator.id)}
                    showRemoveButton
                  />
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No gladiators selected yet
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </>
      ) : (
        // Desktop Layout - Two Columns
        <Box sx={{ 
          display: 'flex', 
          flex: 1,
          overflow: 'hidden'
        }}>
          {/* Available Column */}
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            p: 1,
            borderRight: '1px solid rgba(255,255,255,0.12)'
          }}>
            <Box sx={{ typography: 'h6', mb: 2, px: 1 }}>Available Gladiators</Box>
            {unselectedGladiators.length > 0 ? (
              unselectedGladiators.map(gladiator => (
                <GladiatorRosterCard
                  key={gladiator.id}
                  gladiator={gladiator}
                  isSelected={false}
                  onToggle={() => toggleSelection(gladiator.id)}
                  disabled={selectedIds.length >= requiredSlots}
                  showAddButton
                />
              ))
            ) : (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No gladiators available with sufficient stamina
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Selected Column */}
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            p: 1 
          }}>
            <Box sx={{ typography: 'h6', mb: 2, px: 1 }}>Selected Roster</Box>
            {selectedGladiators.map(gladiator => (
              <GladiatorRosterCard
                key={gladiator.id}
                gladiator={gladiator}
                isSelected={true}
                onToggle={() => toggleSelection(gladiator.id)}
                showRemoveButton
              />
            ))}
            {Array.from({ length: requiredSlots - selectedIds.length }).map((_, i) => (
              <Box 
                key={`empty-${i}`}
                sx={{ 
                  height: '80px', 
                  border: '1px dashed rgba(255,255,255,0.3)',
                  borderRadius: 1,
                  m: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.7
                }}
              >
                Empty Slot
              </Box>
            ))}
          </Box>
        </Box>
      )}
      
      {/* Action Buttons - appears on both layouts */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(255,255,255,0.12)', 
        display: 'flex', 
        justifyContent: 'space-between',
        gap: 2
      }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isApiProcessing}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={selectedIds.length !== requiredSlots || isApiProcessing}
          onClick={handleConfirm}
        >
          Confirm Roster
        </Button>
      </Box>
    </Paper>
  );
};

export default RosterPanel; 