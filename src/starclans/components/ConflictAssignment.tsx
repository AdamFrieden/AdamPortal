import React, { useState } from 'react';
import styled from 'styled-components';
import { ClientGladiator } from '../domain/models';
import useStarclanGameStore from '../context/useStarclanGameStore';
import GladiatorRow from './GladiatorRow';
import { ContentFactory } from '../domain/contentFactory';
import { getRandomInt } from '../context/helpers';
import { Button } from '@mui/material';

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    background: #1a1a1a;
    border-radius: 8px;
`;

const Header = styled.div`
    background: #2a2a2a;
    padding: 1rem;
    border-radius: 6px;
`;

const Totals = styled.div`
    display: flex;
    gap: 2rem;
`;

const Stat = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    
    label {
        color: #888;
    }
`;

const ColumnsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        color: #888;
        font-size: 1.2rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #333;
    }
`;

const Slots = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const EmptySlotStyled = styled.div`
    padding: 1rem;
    background: #2a2a2a;
    border-radius: 6px;
    min-height: 80px;
    border: 2px dashed #444;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &:hover {
        border-color: #666;
        background: #333;
    }
`;

const EmptySlotContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;

    span {
        font-size: 1.5rem;
        color: #666;
    }

    p {
        margin: 0;
        color: #888;
        font-size: 0.875rem;
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 1rem;
`;

const ConfirmButton = styled.button`
    padding: 0.75rem 2rem;
    background: #4a5568;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #2d3748;
    }
`;

// Add new styled component for the roster button
const RosterButton = styled(Button)`
    margin-bottom: 1rem;
`;

// Add a new styled component for the column header
const ColumnHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #333;

    h2 {
        color: #888;
        font-size: 1.2rem;
        margin: 0;
    }

    .powerValue {
        color: #888;
        font-size: 1.2rem;
    }
`;

// Component definitions
const EmptySlot: React.FC<{ onSelect: () => void, isOpponent?: boolean }> = ({ onSelect, isOpponent }) => (
    <EmptySlotStyled onClick={onSelect}>
        <EmptySlotContent>
            <p>{isOpponent ? 'Add Opponent' : 'Select Gladiator'}</p>
        </EmptySlotContent>
    </EmptySlotStyled>
);

const ConflictAssignment: React.FC = () => {
    const contentFactory = new ContentFactory();
    const gameState = useStarclanGameStore(state => state.gameState);
    const [assignedGladiators, setAssignedGladiators] = useState<ClientGladiator[]>([]);
    const [opponentGladiators, setOpponentGladiators] = useState<ClientGladiator[]>([]);

    const populateOpponentGladiators = () => {
        // Get 2-4 random enemy gladiators from the content factory
        const enemyCount = getRandomInt(2, 4);
        const enemies = contentFactory.getRandomEnemyGladiators(enemyCount);
        
        // Update the opponent gladiators state
        setOpponentGladiators(enemies);
    }

    const addFromRoster = () => {
        if (!gameState?.roster) return;
        
        // Get up to 3 available gladiators from the roster
        const availableGladiators = gameState.roster.filter(g => 
            g.status === 'RESTING' && !assignedGladiators.find(ag => ag.id === g.id)
        ).slice(0, 3);

        setAssignedGladiators([...assignedGladiators, ...availableGladiators]);
    };

    const removeGladiator = (gladiatorId: string) => {
        setAssignedGladiators(assignedGladiators.filter(g => g.id !== gladiatorId));
    };

    const totalPower = assignedGladiators.reduce((sum, glad) => 
        sum + Math.round(glad.estimatedPower * glad.stamina * 0.01), 0
    );

    const totalOpponentPower = opponentGladiators.reduce((sum, glad) => 
        sum + Math.round(glad.estimatedPower * glad.stamina * 0.01), 0
    );

    return (
        <Container>
            <Header>
                <Totals>
                    <Stat>
                        <label>Total Power:</label>
                        <span>{totalPower}</span>
                    </Stat>
                    <Stat>
                        <label>Opponent Power:</label>
                        <span>{totalOpponentPower}</span>
                    </Stat>
                </Totals>
            </Header>
            
            <ColumnsContainer>
                <Column>
                    <ColumnHeader>
                        <h2>Your Gladiators</h2>
                        <span className="powerValue">{totalPower}</span>
                    </ColumnHeader>
                    <RosterButton 
                        variant="contained" 
                        onClick={addFromRoster}
                        disabled={!gameState?.roster?.length}
                    >
                        Add from Roster
                    </RosterButton>
                    
                    <Slots>
                        {assignedGladiators.map(gladiator => (
                            <GladiatorRow 
                                key={gladiator.id} 
                                gladiator={gladiator} 
                                onRemove={removeGladiator}
                            />
                        ))}
                        {[...Array(3 - assignedGladiators.length)].map((_, i) => (
                            <EmptySlot key={i} onSelect={() => {}} />
                        ))}
                    </Slots>
                </Column>
                
                <Column>
                    <ColumnHeader>
                        <h2>Opponents</h2>
                        <span className="powerValue">{totalOpponentPower}</span>
                    </ColumnHeader>
                    <RosterButton 
                        variant="contained" 
                        onClick={populateOpponentGladiators}
                    >
                        Add Enemies
                    </RosterButton>
                    <Slots>
                        {opponentGladiators.map(gladiator => (
                            <GladiatorRow 
                                key={gladiator.id} 
                                gladiator={gladiator} 
                                onRemove={removeGladiator}
                            />
                        ))}
                        {/* {[...Array(4 - opponentGladiators.length)].map((_, i) => (
                            <EmptySlot key={i} onSelect={() => console.log('Select opponent')} isOpponent />
                        ))} */}
                    </Slots>
                </Column>
            </ColumnsContainer>

            <Footer>
                <ConfirmButton onClick={() => console.log('Confirm assignments')}>
                    Confirm Assignment
                </ConfirmButton>
            </Footer>
        </Container>
    );
};

export default ConflictAssignment;