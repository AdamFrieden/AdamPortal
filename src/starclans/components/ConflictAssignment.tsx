import React from 'react';
import styled from 'styled-components';
import { ClientGladiator } from '../domain/models';
import { CircularProgress, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GladiatorAvatar from './GladiatorAvatar';

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

const GladiatorSlotStyled = styled.div`
    padding: 1rem;
    background: #2a2a2a;
    border-radius: 6px;
    min-height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    .nameContainer {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;

        h3 {
            margin: 0;
            color: #fff;
        }

        .secondaryLabel {
            color: #888;
            font-size: 0.875rem;
        }
    }

    .projectedValue {
        font-weight: bold;
        font-size: 2rem;
        padding-right: 0rem;
    }
`;

// const Stats = styled.div`
//     display: flex;
//     gap: 1rem;
//     color: #888;
// `;

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

// Component definitions
const EmptySlot: React.FC<{ onSelect: () => void, isOpponent?: boolean }> = ({ onSelect, isOpponent }) => (
    <EmptySlotStyled onClick={onSelect}>
        <EmptySlotContent>
            <p>{isOpponent ? 'Add Opponent' : 'Select Gladiator'}</p>
        </EmptySlotContent>
    </EmptySlotStyled>
);

const GladiatorSlot: React.FC<{ gladiator: ClientGladiator }> = ({ gladiator }) => {
    const projectedPower = Math.round(gladiator.estimatedPower * gladiator.stamina * 0.01);
    
    return (
        <GladiatorSlotStyled>
            <GladiatorAvatar stamina={gladiator.stamina} size={72} />
            <div className="nameContainer">
                <h3>M.Titus</h3>
                <span className="secondaryLabel">{gladiator.estimatedPower}</span>
            </div>
            <span className="projectedValue">
                {projectedPower}
            </span>
            <IconButton 
                size="small" 
                onClick={() => console.log('Remove gladiator:', gladiator.id)}
                sx={{ color: '#666' }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </GladiatorSlotStyled>
    );
};

const ConflictAssignment: React.FC = () => {
    // Demo data
    const demoGladiator: ClientGladiator = {
        id: '1',
        name: 'Marcus',
        estimatedPower: 100,
        stamina: 85,
        status: 'RESTING',
        knownTraits: ['Strong'],
        description: 'A mighty warrior',
        lastRefresh: Date.now()
    };

    const totalPower = 100;

    return (
        <Container>
            <Header>
                <Totals>
                    <Stat>
                        <label>Total Power:</label>
                        <span>{totalPower}</span>
                    </Stat>
                </Totals>
            </Header>
            
            <ColumnsContainer>
                <Column>
                    <h2>Your Gladiators</h2>
                    <Slots>
                        <GladiatorSlot gladiator={demoGladiator} />
                        <EmptySlot onSelect={() => console.log('Select gladiator')} />
                        <EmptySlot onSelect={() => console.log('Select gladiator')} />
                    </Slots>
                </Column>
                
                <Column>
                    <h2>Opponents</h2>
                    <Slots>
                        <EmptySlot onSelect={() => console.log('Select opponent')} isOpponent />
                        <EmptySlot onSelect={() => console.log('Select opponent')} isOpponent />
                        <EmptySlot onSelect={() => console.log('Select opponent')} isOpponent />
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